import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//import { fetchData } from "../../redux/actions/dataLoadingAC";
import { teamFetchData,teamFilter } from "../../redux/actions/teamAC";
import AddEmployee from '../AddEmployee/AddEmployee';
import Employee from '../Employee/Employee';

import './Team.css';
import '../../fonts/style.css';

import {appEvents} from "../../events/events";

class Team extends React.PureComponent{

    static propTypes = {
        teamFetchData : PropTypes.func.isRequired,
        team: PropTypes.array.isRequired,
        filteredTeam: PropTypes.array,
        isLoading: PropTypes.bool.isRequired,
        hasError: PropTypes.bool.isRequired,
    };

    state = {
        selectedEmployee: null,
        isFiltered: false,
    };

    componentDidMount = () =>{
        this.props.teamFetchData('http://localhost:3000/team');
        /*appEvents.addListener("EHideEmployeeForm", this.hideEmployeeForm);*/
        appEvents.addListener("EToggleEmployeeClass", this.selectEmployee);
        appEvents.addListener("EUpdateTeamInfo",this.updateInfo);
    };
    componentWillUnmount = () =>{
        /*appEvents.removeListener("EHideEmployeeForm", this.hideEmployeeForm);*/
        appEvents.removeListener("EToggleEmployeeClass", this.selectEmployee);
        appEvents.removeListener("EUpdateTeamInfo",this.updateInfo);
    };

    /*addEmployee = () =>{
        this.setState({addEmployeeMode:1})
    };*/

    /*hideEmployeeForm = (EO) => {
        EO.stopPropagation();
        this.setState({addEmployeeMode: 0});
    };*/

    showAddEmployeeForm=()=>{
        appEvents.emit("EToggleAddEmployeeFormMode");
    };

    selectEmployee = (code)=>{
        this.setState({selectedEmployee:code});
    };

    filterEmployee = (EO)=>{
        if(EO.target.value){
            this.setState({isFiltered:true});
        } else if(!EO.target.value){
            this.setState({isFiltered:false});
        }

        this.props.filteredArr(EO.target.value);
    };

    updateInfo=()=>{
        this.props.teamFetchData('http://localhost:3000/team');
    };


    render(){

        let currData = this.state.isFiltered?this.props.filteredTeam:this.props.team;
        let employeeCode = currData.map((item)=> {
            return <Employee
                      key={item.id}
                      code={item.id}
                      fam={item.fam}
                      name={item.name}
                      otch={item.otch}
                      position={item.position}
                      tel={item.tel}
                      email={item.email}
                      date={item.dateOfBirth}
                      address={item.address}
                      url={item.photoURL}
                      isSelected={this.state.selectedEmployee==item.id}
                    />
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
        return(
            <div className="team-list">
                <div className="elem-holder_1">
                    <input className="search" type="text" placeholder="Поиск..." onChange={this.filterEmployee}/>
                    <button className="add-button" onClick={this.showAddEmployeeForm}><span className="icon-user-plus1"></span> добавить сотрудника</button>
                </div>
                <AddEmployee />
                <ul className="team-list">{employeeCode}</ul>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{

    return {
        team: state.team.loadedTeam,
        filteredTeam:state.team.filteredTeam,
        isLoading: state.teamDataIsLoading,
        hasError: state.teamDataHasError
    };
};
const mapDispatchToProps = (dispatch) =>{
    return{
        teamFetchData: (url) => dispatch(teamFetchData(url)),
        filteredArr: (value) => dispatch(teamFilter(value)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Team);