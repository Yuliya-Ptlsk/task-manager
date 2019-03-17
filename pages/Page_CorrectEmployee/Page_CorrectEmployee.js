import React from 'react';
import {connect} from 'react-redux';

import CorrectEmployee from '../../components/CorrectEmployee/CorrectEmployee';

import './Page_CorrectEmployee.css';

class Page_CorrectEmployee extends React.PureComponent{
    render(){
        let persId = this.props.match.params.id;
        let employeeData = this.props.team.find( (person) => person.id == persId);

        return(
            <div className="correctEmployee-page">
                <h1>Корректировка карточки сотрудника</h1>
                <CorrectEmployee
                    key={employeeData.id}
                    code={employeeData.id}
                    fam={employeeData.fam}
                    name={employeeData.name}
                    otch={employeeData.otch}
                    position={employeeData.position}
                    tel={employeeData.tel}
                    email={employeeData.email}
                    date={employeeData.dateOfBirth}
                    address={employeeData.address}
                    url={employeeData.photoURL}
                />
            </div>
        )
    }
}

const mapStateToProps = function(state){
    return {
        team: state.team.loadedTeam,
    }
};

export default connect(mapStateToProps)(Page_CorrectEmployee);