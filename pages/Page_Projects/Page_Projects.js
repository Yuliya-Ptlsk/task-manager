import React from 'react';

import Projects from '../../components/Projects/Projects';

import './Page_Projects.css';

class Page_Projects extends React.PureComponent{
    render(){
        return(
            <div className="projects-page">
                <h1>Проекты</h1>
                <Projects/>
            </div>
        )
    }
}

export default Page_Projects;