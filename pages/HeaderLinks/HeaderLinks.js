import React from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderLinks.css';

class HeaderLinks extends React.Component {
    render(){
        return (
            <header>
                {/*<NavLink to="/" exact className="header-link" activeClassName="header-link-active" >Календарь</NavLink>*/}
                {/*<NavLink to="/projects" className="header-link" activeClassName="header-link-active" >Проекты</NavLink>*/}
                <NavLink to="/" exact className="header-link" activeClassName="header-link-active" >Сотрудники</NavLink>
            </header>
        )
    }
}
export default HeaderLinks;