import { combineReducers } from 'redux';

//import { dataIsLoading,dataHasError } from "./dataLoadingReducer";
import { teamDataIsLoading,teamDataHasError,team } from "./teamReducer";
import { projectsDataIsLoading,projectsDataHasError,projects } from "./projectsReducer";
import { calendarDataIsLoading,calendarDataHasError,calendar } from "./calendarReducer";

let rootReducer = combineReducers({
    teamDataIsLoading,
    teamDataHasError,
    team,
    projectsDataIsLoading,
    projectsDataHasError,
    projects,
    calendarDataIsLoading,
    calendarDataHasError,
    calendar,
});

export default rootReducer;

