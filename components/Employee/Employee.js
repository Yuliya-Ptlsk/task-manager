import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';
import { NavLink } from 'react-router-dom';

import './Employee.css';
import '../../fonts/style.css';

import {appEvents} from "../../events/events";


class Employee extends React.PureComponent{
    static propTypes = {
        code:PropTypes.string,
        fam:PropTypes.string,
        name:PropTypes.string,
        otch:PropTypes.string,
        position:PropTypes.string,
        tel:PropTypes.string,
        email:PropTypes.string,
        date:PropTypes.string,
        address:PropTypes.string,
        url:PropTypes.string,
        isSelected:PropTypes.bool,
    };

    constructor(props){
        super(props);
        this.addActiveClass = this.addActiveClass.bind(this);
        this.state = {isActive:false};
    }

    employeeSelected = ()=> {
        appEvents.emit("EToggleEmployeeClass", this.props.code);
        this.addActiveClass();
    };

    addActiveClass =()=>{
        this.setState({isActive: !this.state.isActive});
    };

    deleteEmployee=(EO)=>{
        if(confirm("Вы действительно хотите удалить этого сотрудника?")){
            isoFetch('http://localhost:3000/team/'+this.props.code,{method:'DELETE'})
                .then((response)=> appEvents.emit("EUpdateTeamInfo"));

        } else {
            EO.preventDefault();
            EO.stopPropagation();
        }
    };


    render(){

        let photoURL = (this.props.url.length !=0)?this.props.url:("img/user-solid-circle.svg");
        let isActiveClass = (this.props.isSelected && this.state.isActive)?"_item-content active":"_item-content";

        return(
        <li className="team-list_item">
            <div className={isActiveClass}>
                <span className="_item-header-arrow" onClick={this.employeeSelected}>
                    <img src="../../img/SVG/keyboard_arrow_down.svg" />
                </span>
                <div className="_item-header">
                    <div className="_item-image"><img src={photoURL}/></div>
                    <div className="_item-header-text">
                        <p>{this.props.position}</p>
                        <p>{this.props.fam} {this.props.name} {this.props.otch}</p>
                    </div>
                </div>
                <div className="_item-info-holder" >
                    <div className="_item-info-inner">
                        <div className="_item-info-line"></div>
                        <div><span className="icon-mobile"></span> тел.: {this.props.tel}</div>
                        <div><span className="icon-email1"></span> e-mail: {this.props.email}</div>
                        <div><span className="icon-home"></span> адрес: {this.props.address}</div>
                        <div><span className="icon-perm_contact_calendar"></span> дата рождения: {this.props.date}</div>
                        <div className="elem-holder_3">
                            <button><NavLink className="_item-link" to={"/team/"+this.props.code}><span className="icon-pen"></span> редактировать</NavLink></button>
                            <button onClick={this.deleteEmployee}><span className="icon-user-minus"></span> удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        )
    }

}

export default Employee;