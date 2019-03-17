import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import {appEvents} from "../../events/events";

import './CorrectEmployee.css';
import '../../fonts/style.css';

class CorrectEmployee extends React.PureComponent{
    static propTypes = {
        code:PropTypes.string.isRequired,
        fam:PropTypes.string.isRequired,
        name:PropTypes.string.isRequired,
        otch:PropTypes.string.isRequired,
        position:PropTypes.string.isRequired,
        tel:PropTypes.string.isRequired,
        email:PropTypes.string.isRequired,
        date:PropTypes.string.isRequired,
        address:PropTypes.string.isRequired,
        url:PropTypes.any.isRequired,
    };

    state={
        fioTouch:false,
        posTouch:false,
        telTouch:false,
        emailTouch:false,
        addressTouch:false,
        dateTouch:false,
        fioValid:true,
        posValid:true,
        telValid:true,
        emailValid:true,
        addressValid:true,
        dateValid:true,
        fioValue:this.props.fam+' '+this.props.name+' '+this.props.otch,
        posValue:this.props.position,
        telValue:this.props.tel,
        emailValue:this.props.email,
        addressValue:this.props.address,
        dateValue:this.props.date,
        photoURLValue:this.props.url,
    };

    correctEmployeeFormValidate=(EO)=>{
        switch(EO.target.name){
            case "fio":
                if(EO.target.value){
                    this.setState({
                        fioValid:true,
                        fioValue:EO.target.value,
                    })
                }else{
                    this.setState({fioValid:false})
                }
                break;
            case "pos":
                if(EO.target.value){
                    this.setState({
                        posValid:true,
                        posValue:EO.target.value,
                    })
                }else{
                    this.setState({posValid:false})
                }
                break;
            case "tel":
                if(EO.target.value){
                    this.setState({
                        telValid:true,
                        telValue:EO.target.value,
                    })
                }else{
                    this.setState({telValid:false})
                }
                break;
            case "email":
                if(EO.target.value){
                    this.setState({
                        emailValid:true,
                        emailValue:EO.target.value,
                    })
                }else{
                    this.setState({emailValid:false})
                }
                break;
            case "address":
                if(EO.target.value){
                    this.setState({
                        addressValid:true,
                        addressValue:EO.target.value,
                    })
                }else{
                    this.setState({addressValid:false})
                }
                break;
            case "date":
                if(EO.target.value){
                    this.setState({
                        dateValid:true,
                        dateValue:EO.target.value,
                    })
                }else{
                    this.setState({dateValid:false})
                }
                break;
            case "photo":
                if(EO.target.files[0]){
                    let selectedPhoto = EO.target.files[0];
                    let reader = new FileReader();
                    reader.onload = ()=> {
                        this.setState({photoURLValue:reader.result});
                    };
                    reader.readAsDataURL(selectedPhoto);
                }
            break;
        }

    };

    correctEmployeeFormTouched=(EO)=>{
        switch(EO.target.name){
            case "fio":
                this.setState({fioTouch:true});
                break;
            case "pos":
                this.setState({posTouch:true});
                break;
            case "tel":
                this.setState({telTouch:true});
                break;
            case "email":
                this.setState({emailTouch:true});
                break;
            case "address":
                this.setState({addressTouch:true});
                break;
            case "date":
                this.setState({dateTouch:true});
                break;
        }
    };

    correctEmployeeInfo=()=>{
        let info = {
            id:(this.state.fioValue.trim().split(' ')[0].charAt(0)+'.'
                +this.state.fioValue.trim().split(' ')[1].charAt(0)+'.'
                +this.state.fioValue.trim().split(' ')[2].charAt(0)+'.'+this.state.dateValue.split('-').reverse().join('.')),
            fam:this.state.fioValue.trim().split(' ')[0],
            name:this.state.fioValue.trim().split(' ')[1],
            otch:this.state.fioValue.trim().split(' ')[2],
            position:this.state.posValue,
            tel:this.state.telValue,
            email:this.state.emailValue,
            dateOfBirth:this.state.dateValue.split('-').reverse().join('.'),
            address:this.state.addressValue,
            photoURL:this.state.photoURLValue,
        };
        return info;
    };

    correctEmployee=(EO)=>{
        isoFetch('http://localhost:3000/team/'+this.props.code,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(this.correctEmployeeInfo())
        })/*.then((response)=> this.props.history.push('/team'));*/
        confirm('Данные успешно сохранены')?this.props.history.push('/team'):EO.preventDefault();
    };

    cancelBtnClicked=(EO)=>{
        if(this.state.fioTouch || this.state.posTouch || this.state.telTouch || this.state.emailTouch || this.state.addressTouch || this.state.dateTouch){
          if(confirm('Данные не будут сохранены')){
              this.props.history.push('/team');
          }else{
              EO.preventDefault();
              EO.stopPropagation();
          }
        }else{
            this.props.history.push('/team');
        }
    };


    render(){

        return(
            <div className="correctEForm-holder">
                <form noValidate>
                    <div className="correctEForm-image"><img src={this.props.url?('../../'+this.props.url):('../../img/user-solid-circle.svg')}/></div>
                    <div className="labels-holder_2">
                        <label>Ф.И.О.:
                            <div>
                                <input type="text" name="fio" onBlur={this.correctEmployeeFormTouched} onChange={this.correctEmployeeFormValidate} defaultValue={this.props.fam+' '+this.props.name+' '+this.props.otch}/>
                            </div>
                            {this.state.fioTouch
                                ?(this.state.fioValid?null:<span className="correctForm-error">*поле обязательно для заполнения</span>)
                                :null
                            }
                        </label>
                        <label>Должность:
                            <div>
                                <input type="text" name="pos" onBlur={this.correctEmployeeFormTouched} onChange={this.correctEmployeeFormValidate} defaultValue={this.props.position}/>
                            </div>
                            {this.state.posTouch
                                ?(this.state.posValid?null:<span className="correctForm-error">*поле обязательно для заполнения</span>)
                                :null
                            }
                        </label>
                        <label>Телефон:
                            <div>
                                <input type="text" name="tel" onBlur={this.correctEmployeeFormTouched} onChange={this.correctEmployeeFormValidate} defaultValue={this.props.tel}/>
                            </div>
                            {this.state.telTouch
                                ?(this.state.telValid ?null:<span className="correctForm-error">*поле обязательно для заполнения</span>)
                                :null
                            }
                        </label>
                        <label>e-mail:
                            <div>
                                <input type="email" name="email" onBlur={this.correctEmployeeFormTouched} onChange={this.correctEmployeeFormValidate} defaultValue={this.props.email}/>
                            </div>
                            {this.state.emailTouch
                                ?(this.state.emailValid?null:<span className="correctForm-error">*поле обязательно для заполнения</span>)
                                :null
                            }
                        </label>
                        <label>Адрес:
                            <div>
                                <input type="text" name="address" onBlur={this.correctEmployeeFormTouched} onChange={this.correctEmployeeFormValidate} defaultValue={this.props.address}/>
                            </div>
                            {this.state.addressTouch
                                ?(this.state.addressValid?null:<span className="correctForm-error">*поле обязательно для заполнения</span>)
                                :null
                            }
                        </label>
                        <label>Дата рождения:
                            <div>
                                <input type="date" name="date" onBlur={this.correctEmployeeFormTouched} onChange={this.correctEmployeeFormValidate} defaultValue={this.props.date.split('.').reverse().join('-')}/>
                            </div>
                            {this.state.dateTouch
                                ?(this.state.dateValid?null:<span className="correctForm-error">*поле обязательно для заполнения</span>)
                                :null
                            }
                        </label>
                        <label>Фото:
                            <div>
                                <input type="file" name="photo" onChange={this.correctEmployeeFormValidate} />
                            </div>
                        </label>
                    </div>
                    <div className="elem-holder_4">
                        <button onClick={this.correctEmployee}  disabled={!(this.state.fioValid && this.state.posValid && this.state.telValid && this.state.emailValid && this.state.addressValid && this.state.dateValid)}>
                            <span className="icon-user-check"></span> сохранить
                        </button>
                        <button onClick={this.cancelBtnClicked}>
                            <span className="icon-undo1"></span> отменить
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default  withRouter(CorrectEmployee);