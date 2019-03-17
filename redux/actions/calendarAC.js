import isoFetch from 'isomorphic-fetch';

import { CALENDAR_DATA_IS_LOADING,CALENDAR_DATA_HAS_ERROR,CALENDAR_FETCH_DATA_SUCCESS } from '../constants/constants';

export function calendarDataIsLoading(bool){
    return {
        type: CALENDAR_DATA_IS_LOADING,
        isLoading: bool,
    }
}

export function calendarDataHasError(bool){
    return{
        type: CALENDAR_DATA_HAS_ERROR,
        hasError: bool,
    }
}

export function calendarFetchDataSuccess(calendar){
    return{
        type: CALENDAR_FETCH_DATA_SUCCESS,
        calendar
    }
}

export function calendarFetchData(url){
    return (dispatch)=>{
        dispatch(calendarDataIsLoading(true));

        isoFetch(url)
            .then((response)=>{
                if(!response.ok){
                    throw Error(response.statusText);
                }
                dispatch(calendarDataIsLoading(false));
                return response;
            })
            .then((response)=> response.json())
            .then((data)=> dispatch(calendarFetchDataSuccess(data)))
            .catch(()=> dispatch(calendarDataHasError(true)))
    };
}