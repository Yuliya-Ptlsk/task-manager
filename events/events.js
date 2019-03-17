import {EventEmitter} from "events";

let appEvents = new EventEmitter();
//In appEvents flow will be all events connected with visibility of forms and some content in Employee, Projects
// components
//event "EToggleAddEmployeeFormMode"
//event "EUpdateTeamInfo"
//event "EShowProjectForm"
//event "EToggleEmployeeClass"
//event "EToggleProjectClass"
//event "EUpdateProjectsInfo"
//event "ETogglePopupClass"

export {appEvents};