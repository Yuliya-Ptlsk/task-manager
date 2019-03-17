import React from 'react';

import Calendar from '../../components/Calendar/Calendar';


import './Page_Calendar.css'

class Page_Calendar extends React.PureComponent{
    render(){
        return(
            <div className="calendar-page">
                <h1 className="calendar-title">Календарь</h1>
                <Calendar/>
            </div>
        )
    }
}

export default Page_Calendar;