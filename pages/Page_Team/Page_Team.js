import React from 'react';

import Team from '../../components/Team/Team';

import './Page_Team.css';

class Page_Team extends React.PureComponent{
    render(){
        return(
            <div className="team-page">
                <h1>Сотрудники</h1>
                <Team/>
            </div>
        )
    }
}

export default Page_Team;