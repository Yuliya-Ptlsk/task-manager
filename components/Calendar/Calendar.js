import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './Calendar.css';

import { calendarFetchData } from "../../redux/actions/calendarAC";
import { teamFetchData } from "../../redux/actions/teamAC";
import { projectsFetchData } from "../../redux/actions/projectsAC";
import {appEvents} from "../../events/events";
import TasksPopup from '../../components/TasksPopup/TasksPopup';

class Calendar extends React.PureComponent {
    static propTypes = {
        calendar:PropTypes.array.isRequired,
        isLoading:PropTypes.bool.isRequired,
        hasError:PropTypes.bool.isRequired,
        calendarFetchData:PropTypes.func.isRequired,
        teamFetchData:PropTypes.func.isRequired,
        projectsFetchData:PropTypes.func.isRequired,
        //tasksFilter:PropTypes.func.isRequired,
        team:PropTypes.array,
    };

    state = {
        month:'',
    };

    componentDidMount = () =>{
        this.props.projectsFetchData('http://localhost:3000/projects');
        this.props.calendarFetchData('http://localhost:3000/calendar');
        this.props.teamFetchData('http://localhost:3000/team');
        this.setMonthName(new Date().getMonth());
    };

    setMonthName=(month)=>{
        switch(month){
            case 0:{
                this.setState({month:'Январь'});
            }
            break;
            case 1:{
                this.setState({month:'Февраль'});
            }
            break;
            case 2:{
                this.setState({month:'Март'});
            }
                break;
            case 3:{
                this.setState({month:'Апрель'});
            }
                break;
            case 4:{
                this.setState({month:'Май'});
            }
                break;
            case 5:{
                this.setState({month:'Июнь'});
            }
                break;
            case 6:{
                this.setState({month:'Июль'});
            }
                break;
            case 7:{
                this.setState({month:'Август'});
            }
                break;
            case 8:{
                this.setState({month:'Сентябрь'});
            }
                break;
            case 9:{
                this.setState({month:'Октябрь'});
            }
                break;
            case 10:{
                this.setState({month:'Ноябрь'});
            }
                break;
            case 11:{
                this.setState({month:'Декабрь'});
            }
                break;
        }
    };

    createCalendar=()=> {
        let date = new Date;
        let today = date.getDate();
        date.setDate(1);
        let startDay = date.getDay();
        let daysTotal = !(date.getFullYear() % 4) && date.getMonth() === 1 ? 29 : this.props.calendar[0][date.getMonth()];
        let content = [];
        for(let i = 1; i < startDay; i++) {
            content.push(<div key={i+'_'} className="no-day"></div>);
        }
        for(let i = 1; i <= daysTotal; i++) {
            if(i === today) {
                content.push(<div key={i} className="current-day" title="показать текущие задачи" onClick={this.showTasksPopup}><div><span>{i}</span></div><span className="tasks-cnt">{this.props.tasks.length}</span></div>);
            } else {
                content.push(<div key={i} className="day"><div><span>{i}</span></div></div>);
            }
        }
        return content;
    };

    showTasksPopup=()=>{
        appEvents.emit("ETogglePopupClass");
    };


    render(){
        let teamList = this.props.team.map((item)=>(
            item.fam+' '+item.name[0]+'.'+item.otch[0]+'.'
        ));
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
            <div>
                <div className="calendar-holder">
                    <div className="month">
                        <span>{this.state.month}</span>
                    </div>
                    <div>
                        <div className="week-days">
                            <div>Пн</div>
                            <div>Вт</div>
                            <div>Ср</div>
                            <div>Чт</div>
                            <div>Пт</div>
                            <div>Сб</div>
                            <div>Вс</div>
                        </div>
                        <div className="days-holder">{this.props.calendar.length?(this.createCalendar()):null}</div>
                    </div>
                </div>
                <TasksPopup
                    tasks={this.props.tasks}
                    team={teamList}
                />
            </div>
        )
    }
}

const mapStateToProps =(state)=>{

    return {
        calendar: state.calendar,
        isLoading: state.calendarDataIsLoading,
        hasError: state.calendarDataHasError,
        team: state.team.loadedTeam,
        projects:state.projects.loadedProjects,
        tasks: state.projects.tasks,
    };
};
const mapDispatchToProps = (dispatch) =>{
    return{
        calendarFetchData: (url) => dispatch(calendarFetchData(url)),
        teamFetchData: (url) => dispatch(teamFetchData(url)),
        projectsFetchData: (url) => dispatch(projectsFetchData(url)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Calendar);