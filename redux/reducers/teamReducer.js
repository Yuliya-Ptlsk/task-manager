import { TEAM_DATA_IS_LOADING, TEAM_DATA_HAS_ERROR,TEAM_FETCH_DATA_SUCCESS, TEAM_FILTER } from '../constants/constants';

const initialState = {
    loadedTeam:[],
    filteredTeam:[],
};

export function teamDataIsLoading(state=false,action){
    switch(action.type){
        case TEAM_DATA_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function teamDataHasError(state=false,action){
    switch(action.type){
        case TEAM_DATA_HAS_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

export function team(state=initialState,action){
    switch(action.type){
        case TEAM_FETCH_DATA_SUCCESS:{
            let newState = {...state, loadedTeam:[...action.team]};
            return newState;
        }

        case TEAM_FILTER: {
            if(action.value){
                let newState = {...state,
                    filteredTeam:[...state.loadedTeam].filter((item)=>item.fam.toLocaleLowerCase().indexOf(action.value.toLocaleLowerCase())!=-1)
                };
                return newState;
            } else if(!action.value){
                let newState = {...state, filteredTeam:[...state.loadedTeam]};
                return newState;
            }
        }

        default:
            return state;
    }
}