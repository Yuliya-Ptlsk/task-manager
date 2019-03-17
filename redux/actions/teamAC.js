import isoFetch from 'isomorphic-fetch';

import { TEAM_DATA_IS_LOADING,TEAM_DATA_HAS_ERROR,TEAM_FETCH_DATA_SUCCESS,TEAM_FILTER } from '../constants/constants';

export function teamDataIsLoading(bool){
    return {
        type: TEAM_DATA_IS_LOADING,
        isLoading: bool,
    }
}

export function teamDataHasError(bool){
    return{
        type: TEAM_DATA_HAS_ERROR,
        hasError: bool,
    }
}

export function teamFetchDataSuccess(team){
    return{
        type: TEAM_FETCH_DATA_SUCCESS,
        team
    }
}

export function teamFetchData(url){
    return (dispatch)=>{
        dispatch(teamDataIsLoading(true));

        isoFetch(url)
            .then((response)=>{
                if(!response.ok){
                    throw Error(response.statusText);
                }
                dispatch(teamDataIsLoading(false));
                return response;
            })
            .then((response)=> response.json())
            .then((data)=> dispatch(teamFetchDataSuccess(data)))
            .catch(()=> dispatch(teamDataHasError(true)))
    };
}

export function teamFilter(value){
    return{
        type:TEAM_FILTER,
        value
    }
}