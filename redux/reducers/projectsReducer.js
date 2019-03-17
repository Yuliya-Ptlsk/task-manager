import { PROJECTS_DATA_IS_LOADING, PROJECTS_DATA_HAS_ERROR,PROJECTS_FETCH_DATA_SUCCESS, PROJECTS_FILTER,SET_TASKS_FILTER,SHOW_ALL_TASKS, SHOW_SORT_INC_TASKS,SHOW_SORT_DEC_TASKS,SHOW_SORT_TASKS_BY_PERSON } from '../constants/constants';

const initialState = {
    loadedProjects:[],
    filteredProjects:[],
    tasks:[],
    //sortInkTasks:[],
    //sortDecTasks:[],
    //sortTasksByPerson:[]
};

export function projectsDataIsLoading(state=false,action){
    switch(action.type){
        case PROJECTS_DATA_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function projectsDataHasError(state=false,action){
    switch(action.type){
        case PROJECTS_DATA_HAS_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

export function projects(state=initialState,action) {
    switch (action.type) {
        case PROJECTS_FETCH_DATA_SUCCESS: {
            let newState = {...state, loadedProjects: [...action.projects]};
            return newState;
        }


        case PROJECTS_FILTER: {
            if (action.value) {
                let newState = {
                    ...state,
                    filteredProjects: [...state.loadedProjects].filter((item) => item.projectName.toLocaleLowerCase().indexOf(action.value.toLocaleLowerCase()) != -1)
                };
                return newState;
            } else if (!action.value) {
                let newState = {...state, filteredProjects: [...state.loadedProjects]};
                return newState;
            }
        }


        case SET_TASKS_FILTER: {
            let tasksArr = [...state.loadedProjects.map((v)=>(v.projectTasks))];
            let allTasks = [];
            tasksArr.map((v)=>(v.forEach((t)=>(allTasks.push(t)))));

            if(action.filter ==='showAll'){
                let newState = {...state,tasks:allTasks.filter((t)=>(!t.tCompleted))};
                return newState;
            }else if(action.filter==='filterByPerson'){
                let newState = {...state,tasks:allTasks.filter((t)=>(t.respPerson==action.value&&!t.tCompleted))};
                return newState;
            }else if(action.filter==='sortDateIncTasks'){
                let newState = {...state,tasks: allTasks.filter((t)=>(!t.tCompleted)).sort((a,b)=>{
                    return new Date(a.completeDate.split('.').reverse().join(',')).getTime() - new Date(b.completeDate.split('.').reverse().join(',')).getTime();
                })};
                return newState;
            }else if(action.filter==='sortDateDecTasks'){
                let newState = {...state,tasks: allTasks.filter((t)=>(!t.tCompleted)).sort((a,b)=>{
                    return new Date(b.completeDate.split('.').reverse().join(',')).getTime() - new Date(a.completeDate.split('.').reverse().join(',')).getTime();
                })};
                return newState;
            }

        }

        default:
            return state;
    }
}