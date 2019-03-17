import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './TasksPopup.css';
import '../../fonts/style.css';

import { tasksFilter } from "../../redux/actions/projectsAC";
import {appEvents} from "../../events/events";

class TasksPopup extends React.PureComponent {
    static propTypes={
        team:PropTypes.array.isRequired,
        tasks:PropTypes.array.isRequired,
    };

    constructor(props){
        super(props);
        this.toggleActiveClass = this.toggleActiveClass.bind(this);
        this.state = {isActive:false};
    }

    toggleActiveClass =()=>{
        this.setState({isActive: !this.state.isActive});
    };

    componentDidMount=()=>{
        this.props.tasksFilter();
        appEvents.addListener("ETogglePopupClass",this.toggleActiveClass);
    };
    componentWillUnMount=()=>{
        appEvents.removeListener("ETogglePopupClass",this.toggleActiveClass)
    };

    showAllTasks=()=>{
        this.props.tasksFilter('showAll');
    };

    sortIncDate=()=>{
        this.props.tasksFilter('sortDateIncTasks');
    };

    sortDecDate=()=>{
        this.props.tasksFilter('sortDateDecTasks');
    };

    filterByPerson=(EO)=>{
        this.props.tasksFilter('filterByPerson',EO.target.value);
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


    render(){
        let selectCode = this.props.team.map((item,i)=>(
            <option key={i} value={item}>{item}</option>
        ));
        let taskCode =[];
        this.props.tasks.forEach((task,i)=>(
            taskCode.push(<li key={task.id}>
                <div style={{textDecoration:'underline'}}>{task.taskName}</div>
                <div className="task-footer">
                    <div><span className="icon-files" title="проект"></span> {task.id.split('_')[0]}</div>
                    <div><span className="icon-user-solid-circle" title="исполнитель"></span> {task.respPerson}</div>
                    <div><span className="icon-history" title="дата окончания"></span> {task.completeDate}</div>
                </div>
            </li>)
        ));
        let isActiveClass=this.state.isActive?'popup active':'popup';
        return(
            <div className={isActiveClass}>
                <div className="popup_container">
                    <div className="popup_content">
                        <div className="current-date"><span>{this.getCurDate()}</span></div>
                        <div className="tasks-cnt-title">Текущих задач ({this.props.tasks.length})</div>
                        <div className="tasks-filters">
                            <span>фильтрация и сортировка текущих задач: </span>
                            <button onClick={this.showAllTasks} title="показать все задачи">все</button>
                            <button title="сортировать по дате в сторону увеличения" onClick={this.sortIncDate}><span className="icon-sort-amount-asc"></span></button>
                            <button title="сортировать по дате в сторону уменьшения" onClick={this.sortDecDate}><span className="icon-sort-amount-desc"></span></button>
                            <select onChange={this.filterByPerson}>
                                <option>исполнитель</option>
                                {selectCode}
                            </select>
                        </div>
                        <div className="tasks-block">
                            <ul>
                                {taskCode}
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="popup_close" onClick={this.toggleActiveClass}><img src="../../img/cross.png"/></div>
            </div>
        )
    }
}

const mapStateToProps =(state)=>{
    return {};
};
const mapDispatchToProps = (dispatch) =>{
    return{
        tasksFilter: (filter,value) => dispatch(tasksFilter(filter,value)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TasksPopup);