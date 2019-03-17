import isoFetch from 'isomorphic-fetch';

import { PROJECTS_DATA_IS_LOADING,PROJECTS_DATA_HAS_ERROR,PROJECTS_FETCH_DATA_SUCCESS,PROJECTS_FILTER,SET_TASKS_FILTER } from '../constants/constants';

export function projectsDataIsLoading(bool){
    return {
        type: PROJECTS_DATA_IS_LOADING,
        isLoading: bool,
    }
}

export function projectsDataHasError(bool){
    return{
        type: PROJECTS_DATA_HAS_ERROR,
        hasError: bool,
    }
}

export function projectsFetchDataSuccess(projects){
    return{
        type: PROJECTS_FETCH_DATA_SUCCESS,
        projects
    }
}

export function projectsFetchData(url){
    return (dispatch)=>{
        dispatch(projectsDataIsLoading(true));

        isoFetch(url)
            .then((response)=>{
                if(!response.ok){
                    throw Error(response.statusText);
                }
                dispatch(projectsDataIsLoading(false));
                return response;
            })
            .then((response)=> response.json())
            .then((data)=> dispatch(projectsFetchDataSuccess(data)))
            .then(()=>dispatch(tasksFilter()))
            .catch(()=> dispatch(projectsDataHasError(true)))
    };
}

export function projectsFilter(value){
    return{
        type:PROJECTS_FILTER,
        value
    }
}

export function tasksFilter(filter='showAll',value=''){
    return{
        type: SET_TASKS_FILTER,
        filter,
        value
    }
}
