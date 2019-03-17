import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';

import { projectsFetchData,projectsFilter } from "../../redux/actions/projectsAC";
import { teamFetchData } from "../../redux/actions/teamAC";
import Project from "../Project/Project";

import './Projects.css';
import '../../fonts/style.css';

import {appEvents} from "../../events/events";

class Projects extends React.PureComponent{
    static propTypes = {
        projectsFetchData : PropTypes.func.isRequired,
        projects: PropTypes.array.isRequired,
        filteredProjects: PropTypes.array,
        isLoading: PropTypes.bool.isRequired,
        hasError: PropTypes.bool.isRequired,
    };

    state = {
        selectedProject: null,
        isFiltered: false,
        defSearchValue:null,
        newProject:null,
        projectFieldValid:false,
    };

    componentDidMount = () =>{
        this.props.projectsFetchData('http://localhost:3000/projects');
        this.props.teamFetchData('http://localhost:3000/team');
        appEvents.addListener('EToggleProjectClass',this.selectProject);
        appEvents.addListener('EUpdateProjectsInfo',this.updateInfo);
    };
    componentWillUnmount = () =>{
        appEvents.removeListener('EToggleProjectClass',this.selectProject);
        appEvents.removeListener('EUpdateProjectsInfo',this.updateInfo);
    };

    selectProject = (code)=>{
        this.setState({selectedProject:code});
    };

    filterProjects=(EO)=>{
        if(EO.target.value){
            this.setState({isFiltered:true});
        } else if(!EO.target.value){
            this.setState({isFiltered:false});
        }

        this.props.filteredArr(EO.target.value);
        this.setState({defSearchValue:EO.target.value});
    };

    updateInfo=()=>{
        this.props.projectsFetchData('http://localhost:3000/projects');
    };

    newProjectName=(EO)=>{
       this.setState({newProject:EO.target.value});
        if(EO.target.value){
            this.setState({
                projectFieldValid:true,
                selectedProject:null,
            });
        }
    };

    newProjectInfo=()=>{
        let info = {
            id:this.state.newProject,
            projectName:this.state.newProject,
            pCompleted:false,
            projectTasks:[],
        };
        return info;
    };

    addProject=()=>{
        isoFetch('http://localhost:3000/projects',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(this.newProjectInfo())
        }).then((response)=>appEvents.emit('EUpdateProjectsInfo'));
    };


    render(){
        let currTeam = this.props.team.map((item)=>(
             item.fam+' '+item.name[0]+'.'+item.otch[0]+'.'
        ));
        let currData = this.state.isFiltered?this.props.filteredProjects:this.props.projects;
        let currProjectsCode = [];
            currData.forEach((item)=> {
            if(!item.pCompleted){
                currProjectsCode.push(<Project
                    key={item.id}
                    code={item.id}
                    name={item.projectName}
                    tasks={item.projectTasks}
                    team={currTeam}
                    isSelected={this.state.selectedProject==item.id}
                    selectedProject={this.state.selectedProject}
                />)
            }
        });

        let completedProjectsCode = [];
        currData.forEach((item)=> {
            if(item.pCompleted){
                completedProjectsCode.push(<Project
                    key={item.id}
                    code={item.id}
                    name={item.projectName}
                    tasks={item.projectTasks}
                    team={currTeam}
                    isSelected={this.state.selectedProject==item.id}
                    selectedProject={this.state.selectedProject}
                />)
            }
        });

        if(this.props.isLoading){
            return(
                <div className="loading"><img src="../../img/loader.gif"/></div>
            )
        }
        if(this.props.hasError){
            return(
                <div className="error">Данные не загружены...</div>
            )
        }
        return (
            <div className="projects-list">
                <div className="elem-holder_5">
                    <input className="search" type="text" placeholder="Поиск..." onChange={this.filterProjects} defaultValue={this.state.defSearchValue?this.state.defSearchValue:null}/>
                    <div className="addProject-block">
                        <div>
                            <div>
                                <input type="text" placeholder="Введите название проекта..." onChange={this.newProjectName}/>
                            </div>
                        </div>
                    </div>
                    <button disabled={!this.state.projectFieldValid} className="add-button" onClick={this.addProject}><span className="icon-document-add"></span> добавить проект</button>
                </div>
                <div className="projects-title">
                    {currProjectsCode.length?("Текущие проекты "+"("+currProjectsCode.length+")"):null}
                </div>
                <ul className="current-list">{currProjectsCode}</ul>
                <div className="projects-title">
                    {completedProjectsCode.length?("Выполненные проекты "+"("+completedProjectsCode.length+")"):null}
                </div>
                <ul className="completed-list">{completedProjectsCode}</ul>
            </div>
        )

    };
}

const mapStateToProps = (state) =>{

    return {
        projects: state.projects.loadedProjects,
        filteredProjects:state.projects.filteredProjects,
        isLoading: state.projectsDataIsLoading,
        hasError: state.projectsDataHasError,
        team:state.team.loadedTeam,
    };
};
const mapDispatchToProps = (dispatch) =>{
    return{
        projectsFetchData: (url) => dispatch(projectsFetchData(url)),
        teamFetchData: (url) => dispatch(teamFetchData(url)),
        filteredArr: (value) => dispatch(projectsFilter(value)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Projects);