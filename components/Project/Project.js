import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';
import {connect} from 'react-redux';

import './Project.css';
import '../../fonts/style.css';

import {appEvents} from "../../events/events";

class Project extends React.PureComponent{
    static propTypes = {
        code:PropTypes.string,
        name:PropTypes.string,
        tasks:PropTypes.arrayOf(
            PropTypes.shape({
                id:PropTypes.string,
                taskName:PropTypes.string,
                tCompleted:PropTypes.bool,
                createDate:PropTypes.string,
                completeDate:PropTypes.string,
                factDate:PropTypes.string,
                respPerson:PropTypes.string,
            })
        ),
        team:PropTypes.array,
        projects: PropTypes.array,
        isSelected:PropTypes.bool,
        selectedProject:PropTypes.string,
    };

    constructor(props){
        super(props);
        this.addActiveClass = this.addActiveClass.bind(this);
        this.state = {
            isActive:this.props.isSelected,
            isActiveTaskForm:false,
        };
    }

    state={
        taskTouch:false,
        taskValue:null,
        taskValid:false,
        personTouch:false,
        personValue:null,
        personValid:false,
        dateTouch:false,
        dateValue:null,
        dateValid:false,
        project:this.props.selectedProject,
    };

    projectSelected = ()=> {
        appEvents.emit("EToggleProjectClass", this.props.code);
        this.addActiveClass();
    };

    addActiveClass =()=>{
        this.setState({isActive: !this.state.isActive});
    };

    getScrollHeight=()=>{
        return window.scrollY;
    };
    setScrollHeight=(Y)=>{
        window.scrollTo(0,Y);
    };

    checkboxClicked=(EO)=>{
        let projectData = [];
        let Y = this.getScrollHeight();
        this.props.projects.forEach((project)=>{
            if(project.id==this.props.selectedProject){
                let tasksCnt = 0;
                let complete = false;
                project.projectTasks.forEach((task,i,arr)=>{
                    if(task.id==EO.target.value){
                        task.tCompleted=EO.target.checked;
                        task.factDate=this.getCurDate();
                    }
                    if(task.tCompleted){
                        tasksCnt++;
                    }
                    if(tasksCnt==arr.length){
                       complete=true;
                    }
                });
                project.pCompleted=complete;
                projectData.push(project);
            }
        });

        isoFetch('http://localhost:3000/projects/'+this.props.selectedProject,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"},
            body:JSON.stringify(projectData[0])
        }).then((response)=>appEvents.emit('EUpdateProjectsInfo') /*this.setScrollHeight(Y)*/)
    };

    deleteTask=(EO)=>{
        if(confirm("Удалить задачу?")){
            let projectData=[];
            let Y = this.getScrollHeight();
            this.props.projects.forEach((project)=>{
                if(project.id==this.props.selectedProject){
                    project.projectTasks = project.projectTasks.filter((task)=>(
                        task.id!==EO.currentTarget.value
                    ));
                    projectData.push(project);
                }
            });

            isoFetch('http://localhost:3000/projects/'+this.props.selectedProject,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"},
                body:JSON.stringify(projectData[0])
            }).then((response)=>appEvents.emit('EUpdateProjectsInfo') /*this.setScrollHeight(Y)*/)
        } else {
            EO.preventDefault();
            EO.stopPropagation();
        }
    };

    deleteProject=(EO)=>{
        if(confirm("Вы действительно хотите удалить этот проект?")){
            isoFetch('http://localhost:3000/projects/'+this.props.selectedProject,{method:'DELETE'})
                .then((response)=> appEvents.emit('EUpdateProjectsInfo'));

        } else {
            EO.preventDefault();
            EO.stopPropagation();
        }
    };

    showAddTaskForm=()=>{
        this.setState({isActiveTaskForm:true});
    };
    cancelBtnClicked = (EO)=>{
        if(this.state.taskValid || this.state.personValid || this.state.dateValid){
            if(confirm('Данные не сохраняться')){
                this.setState({isActiveTaskForm:false});
                EO.preventDefault();
                EO.stopPropagation();
            }else {
                EO.preventDefault();
                EO.stopPropagation();
            }
        }else{
            this.setState({isActiveTaskForm:false});
            EO.preventDefault();
            EO.stopPropagation();
        }
    };

    addTaskFormValidate=(EO)=>{
        switch(EO.target.name){
            case "task":
                if(EO.target.value){
                    this.setState({
                        taskValid:true,
                        taskValue:EO.target.value,
                    })
                }else{
                    this.setState({taskValid:false})
                }
                break;
            case "person":
                if(EO.target.value){
                    this.setState({
                        personValid:true,
                        personValue:EO.target.value,
                    })
                }else{
                    this.setState({personValid:false})
                }
                break;
            case "date":
                if(EO.target.value){
                    this.setState({
                        dateValid:true,
                        dateValue:EO.target.value,
                    })
                }else{
                    this.setState({dateValid:false})
                }
                break;
        }

    };

    addTaskFormTouched=(EO)=>{
        switch(EO.target.name){
            case "task":
                this.setState({taskTouch:true});
                break;
            case "person":
                this.setState({personTouch:true});
                break;
            case "date":
                this.setState({dateTouch:true});
                break;

        }
    };

    getCurDate=()=>{
        let date = new Date;
        return this.formatDate(date);
    };
    formatDate=(dt)=> {
        let year=dt.getFullYear();
        let month=dt.getMonth()+1;
        let day=dt.getDate();
        return this.str0l(day,2) + '.' + this.str0l(month,2) + '.' + year;
    };
    str0l=(val,len)=> {
        let strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
    };

    createTaskId=()=>{
        let taskId;
        let lastId = null;
        this.props.projects.forEach((project)=>{
            if(project.id==this.props.selectedProject){
                if(!project.projectTasks.length){
                    lastId = project.projectName+'_'+'0';
                } else {
                    project.projectTasks.forEach((task,i,arr)=>{
                        if(arr.length && i==arr.length-1){
                            lastId = task.id;
                        }
                    })
                }
            }
        });
        taskId = lastId.split('_')[0]+'_'+(parseInt(lastId.split('_')[1])+1);
        return taskId;
    };

    taskInfo=()=>{
        let info = {
            id:this.createTaskId(),
            taskName:this.state.taskValue,
            tCompleted:false,
            createDate:this.getCurDate(),
            completeDate:this.state.dateValue.split('-').reverse().join('.'),
            respPerson:this.state.personValue,
        };
        return info;
    };

    updateProjectInfo=()=>{
        let projectData=[];
        this.props.projects.forEach((project)=>{
            if(project.id==this.props.selectedProject){
                project.projectTasks = project.projectTasks.concat(this.taskInfo());
                projectData.push(project);
            }
        });
        return projectData[0];
    };

    addNewTask=(EO)=>{
        EO.preventDefault();
        EO.stopPropagation();
        let Y = this.getScrollHeight();
        isoFetch('http://localhost:3000/projects/'+this.props.selectedProject,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(this.updateProjectInfo())
        }).then((response)=>appEvents.emit('EUpdateProjectsInfo'));
    };

    render(){
        let selectCode = this.props.team.map((item,i)=>(
            <option key={i} value={item}>{item}</option>
        ));
        let currTasksCode = [];
        this.props.tasks.forEach((item)=>{
            if(!item.tCompleted){
                currTasksCode.push(
                    <li key={item.id}>
                        <label className="checkbox-holder" >
                            <input type="checkbox" value={item.id} onChange={this.checkboxClicked}/>
                            <span className="custom-checkbox" title="отметить как выполненную"></span>
                        </label>
                        <div style={{textDecoration:'underline'}}>{item.taskName}</div>
                        <div className="task-footer">
                            <div><span className="icon-user-solid-circle" title="исполнитель"></span> {item.respPerson}</div>
                            <div><span className="icon-clock1" title="создано"></span> {item.createDate}</div>
                            <div><span className="icon-history" title="завершить"></span> {item.completeDate}</div>
                        </div>
                        <button value={item.id} onClick={this.deleteTask}><span className="icon-trash" title="удалить задачу" ></span></button>
                    </li>
                )
            }
        });
        let completedTasksCode = [];
        this.props.tasks.forEach((item)=>{
            if(item.tCompleted){
                completedTasksCode.push(
                    <li key={item.id}>
                        <label className="checkbox-holder" >
                            <input type="checkbox" value={item.id} defaultChecked={true} onChange={this.checkboxClicked}/>
                            <span className="custom-checkbox" title="вернуть в текущие"></span>
                        </label>
                        <div style={{textDecoration:'line-through'}}>{item.taskName}</div>
                        <div className="task-footer">
                            <div><span className="icon-user-solid-circle" title="исполнитель"></span> {item.respPerson}</div>
                            <div><span className="icon-history" title="завершить"></span> {item.completeDate}</div>
                            <div><span className="icon-calendar-check-o" title="завершено"></span> {item.factDate}</div>
                        </div>
                        <button value={item.id} onClick={this.deleteTask}><span className="icon-trash" title="удалить задачу" ></span></button>
                    </li>
                )
            }
        });
        let isActiveClass = (this.props.isSelected&&this.state.isActive)?"project-item_content active":"project-item_content";
        let isActiveTaskForm = (this.state.isActiveTaskForm)? "addTaskForm-holder active":"addTaskForm-holder";

        return(
            <li className="project-item">
                <div className={isActiveClass}>
                    <span className="project-item_arrow" onClick={this.projectSelected}>
                        <img src="../../img/SVG/keyboard_arrow_down.svg" />
                    </span>
                    <div className="project-item_header">
                        <div className="project-item_logo">
                            <p>{this.props.name[0].toUpperCase()}</p>
                        </div>
                        <div>{this.props.name}</div>
                    </div>
                    <div className="project-item_info-holder">
                        <div className="project-item_info-inner">
                            <div className="_item-info-line"></div>
                            {(currTasksCode.length || (!currTasksCode.length && !completedTasksCode.length))
                                ?(<div className="addTask-block">
                                    <div className="elem-holder_6">
                                        <button className="add-button" onClick={this.showAddTaskForm}><span className="icon-playlist_add1" title="добавить задачу"></span></button>
                                    </div>
                                    <div className={isActiveTaskForm}>
                                        <form noValidate>
                                            <div className="taskLabel-holder">
                                                <label>Описание задачи:
                                                    <div>
                                                        <input type="text" name="task" onBlur={this.addTaskFormTouched} onChange={this.addTaskFormValidate}/>
                                                    </div>
                                                    {this.state.taskTouch
                                                        ?(this.state.taskValid?null:<span className="addForm-error">*поле обязательно для заполнения</span>)
                                                        :null
                                                    }
                                                </label>
                                                <label>Дата окончания:
                                                    <div>
                                                        <input type="date" name="date" onBlur={this.addTaskFormTouched} onChange={this.addTaskFormValidate}/>
                                                    </div>
                                                    {this.state.dateTouch
                                                        ?(this.state.dateValid?null:<span className="addForm-error">*поле обязательно для заполнения</span>)
                                                        :null
                                                    }
                                                </label>
                                                <label>
                                                    <select name="person" onBlur={this.addTaskFormTouched} onChange={this.addTaskFormValidate}>
                                                        <option>исполнитель</option>
                                                        {selectCode}
                                                    </select>
                                                    {this.state.personTouch
                                                        ?(this.state.personValid?null:<span className="addForm-error">*поле обязательно для выбора</span>)
                                                        :null
                                                    }
                                                </label>
                                            </div>
                                            <div  className="elem-holder_8">
                                                <button onClick={this.addNewTask} disabled={!(this.state.taskValid && this.state.personValid && this.state.dateValid)}>
                                                    <span className="icon-playlist_add_check"></span> сохранить
                                                </button>
                                                <button onClick={this.cancelBtnClicked}>
                                                    <span className="icon-undo1"></span> отменить
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>)
                                :null}
                            <div className="tasks-title">
                                {currTasksCode.length?("Текущие задачи "+"("+currTasksCode.length+")"):null}
                            </div>
                            <ul className="current-tasks">
                                {currTasksCode}
                            </ul>
                            <div className="tasks-title">
                    {completedTasksCode.length?("Выполненные задачи "+"("+completedTasksCode.length+")"):null}
                            </div>
                            <ul className="completed-tasks">
                                {completedTasksCode}
                            </ul>
                            <div className="elem-holder_7">
                                <button onClick={this.deleteProject}><span className="icon-file-minus"></span> удалить проект</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    };
}
const mapStateToProps = (state) =>{

    return {
        projects: state.projects.loadedProjects,
    };
};

export default connect(mapStateToProps)(Project);