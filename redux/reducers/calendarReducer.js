import { CALENDAR_DATA_IS_LOADING,CALENDAR_DATA_HAS_ERROR,CALENDAR_FETCH_DATA_SUCCESS } from '../constants/constants';

export function calendarDataIsLoading(state=false,action){
    switch(action.type){
        case CALENDAR_DATA_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function calendarDataHasError(state=false,action){
    switch(action.type){
        case CALENDAR_DATA_HAS_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

export function calendar(state=[],action){
    switch(action.type){
        case CALENDAR_FETCH_DATA_SUCCESS:{
            let newState = [...state, action.calendar];
            return newState;
        }

        default:
            return state;
    }
}