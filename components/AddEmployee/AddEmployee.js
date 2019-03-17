import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';

import './AddEmloyee.css';
import '../../fonts/style.css';

import {appEvents} from "../../events/events";


 class AddEmployee extends React.PureComponent{
     /*static propTypes = {
         addMode: PropTypes.number.isRequired,
     };*/

     state = {
         fioTouch:false,
         posTouch:false,
         telTouch:false,
         emailTouch:false,
         addressTouch:false,
         dateTouch:false,
         fioValid:false,
         posValid:false,
         telValid:false,
         emailValid:false,
         addressValid:false,
         dateValid:false,
         fioValue:null,
         posValue:null,
         telValue:null,
         emailValue:null,
         addressValue:null,
         dateValue:null,
         photoURLValue:"",
     };

     componentDidMount=()=>{
         appEvents.addListener("EToggleAddEmployeeFormMode",this.toggleActiveClass);
     };
     componentWillUnmount=()=>{
         appEvents.removeListener("EToggleAddEmployeeFormMode",this.toggleActiveClass);
     };

     constructor(props){
         super(props);
         this.toggleActiveClass = this.toggleActiveClass.bind(this);
         this.state = {isActive:false};
     }

     cancelBtnClicked = (EO)=>{
         if(this.state.fioValid || this.state.posValid || this.state.telValid || this.state.emailValid || this.state.addressValid || this.state.dateValid){
             if(confirm('Данные не будут сохранены')){
                 this.toggleActiveClass();
             }else{
                 EO.stopPropagation();
                 EO.preventDefault();
             }
         } else {
             this.toggleActiveClass();
             EO.preventDefault();
             EO.stopPropagation();
         }
     };

     toggleActiveClass =()=>{
         this.setState({isActive: !this.state.isActive});

     };

     addEmployeeFormValidate=(EO)=>{
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

     addEmployeeFormTouched=(EO)=>{
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

     newEmployeeInfo=()=>{
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
             photoURL:(this.state.photoURLValue?this.state.photoURLValue:""),
         };
         return info;
     };

     addNewEmployee=()=>{
         isoFetch('http://localhost:3000/team',{
             method:'POST',
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify(this.newEmployeeInfo())
         })
     };

     render(){

         let isActiveClass = (this.state.isActive)? "addForm-holder active":"addForm-holder";
         return(
             <div className={isActiveClass}>
                 <form noValidate>
                         <div className="labels-holder">
                             <label>Ф.И.О.:
                                 <div>
                                     <input type="text" name="fio" onBlur={this.addEmployeeFormTouched} onChange={this.addEmployeeFormValidate}/>
                                 </div>
                                 {this.state.fioTouch
                                    ?(this.state.fioValid?null:<span className="addForm-error">*поле обязательно для заполнения</span>)
                                    :null
                                 }
                             </label>
                             <label>Должность:
                                 <div>
                                     <input type="text" name="pos" onBlur={this.addEmployeeFormTouched} onChange={this.addEmployeeFormValidate}/>
                                 </div>
                                 {this.state.posTouch
                                     ?(this.state.posValid?null:<span className="addForm-error">*поле обязательно для заполнения</span>)
                                     :null
                                 }
                             </label>
                             <label>Телефон:
                                 <div>
                                     <input type="text" name="tel" onBlur={this.addEmployeeFormTouched} onChange={this.addEmployeeFormValidate}/>
                                 </div>
                                 {this.state.telTouch
                                    ?(this.state.telValid ?null:<span className="addForm-error">*поле обязательно для заполнения</span>)
                                    :null
                                 }
                             </label>
                             <label>e-mail:
                                 <div>
                                     <input type="email" name="email" onBlur={this.addEmployeeFormTouched} onChange={this.addEmployeeFormValidate}/>
                                 </div>
                                 {this.state.emailTouch
                                     ?(this.state.emailValid?null:<span className="addForm-error">*поле обязательно для заполнения</span>)
                                     :null
                                 }
                             </label>
                             <label>Адрес:
                                 <div>
                                     <input type="text" name="address" onBlur={this.addEmployeeFormTouched} onChange={this.addEmployeeFormValidate}/>
                                 </div>
                                 {this.state.addressTouch
                                    ?(this.state.addressValid?null:<span className="addForm-error">*поле обязательно для заполнения</span>)
                                    :null
                                 }
                             </label>
                             <label>Дата рождения:
                                 <div>
                                     <input type="date" name="date" onBlur={this.addEmployeeFormTouched} onChange={this.addEmployeeFormValidate}/>
                                 </div>
                                 {this.state.dateTouch
                                    ?(this.state.dateValid?null:<span className="addForm-error">*поле обязательно для заполнения</span>)
                                    :null
                                 }
                             </label>
                             <label>Фото:
                                 <div>
                                     <input type="file" name="photo" onChange={this.addEmployeeFormValidate}/>
                                 </div>
                             </label>
                         </div>
                         <div className="elem-holder_2">
                             <button onClick={this.addNewEmployee}  disabled={!(this.state.fioValid && this.state.posValid && this.state.telValid && this.state.emailValid && this.state.addressValid && this.state.dateValid)}>
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

 export default AddEmployee;