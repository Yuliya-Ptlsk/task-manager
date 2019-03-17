import React from 'react';
import { NavLink } from 'react-router-dom';

import './SideBarLinks.css';
import '../../fonts/style.css';

class SideBarLinks extends React.Component {
    render(){
        return(
            <aside>
                <div className="logo-holder"><span><img src="../../img/SVG3/checkbox-checked.svg"/></span> <span>TaskManager</span></div>
                <nav className="side-navigation">
                    <div>
                        <NavLink to="/" exact className="side-link" activeClassName="side-link active" >
                            <span className="icon-calendar2"></span> Календарь
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/projects" className="side-link" activeClassName="side-link active" >
                            <span className="icon-files"></span> Проекты
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/team" exact className="side-link" activeClassName="side-link active" >
                            <span className="icon-users2"></span> Сотрудники
                        </NavLink>
                    </div>
                </nav>
            </aside>
        )
    }
}

export default SideBarLinks;