import React from 'react';
import { Route } from 'react-router-dom';

import Page_Calendar from './Page_Calendar/Page_Calendar';
import Page_Projects from './Page_Projects/Page_Projects';
import Page_Team from './Page_Team/Page_Team';
import Page_CorrectEmployee from './Page_CorrectEmployee/Page_CorrectEmployee';

class PagesRouter extends React.Component {
    render(){
        return(
            <div className="pages">
                <Route path="/" exact component={Page_Calendar} />
                <Route path="/projects" component={Page_Projects} />
                <Route path="/team/:id" component={Page_CorrectEmployee} />
                <Route path="/team" exact component={Page_Team} />

            </div>
        )
    }
}

export default PagesRouter;