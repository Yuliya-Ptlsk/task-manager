export function teamFilterFunc(arr,value){
        let newState = [...arr.filter((item)=>item.fam.toLocaleLowerCase().indexOf(value.toLocaleLowerCase())!=-1)];
        return newState;
}

export function currTasksFunc(arr){
    let newState = [...arr.filter((t)=>(!t.tCompleted))];
    return newState;
}

export function filterByPersonFunc(arr,value){
    let newState = [...arr.filter((t)=>(t.respPerson==value&&!t.tCompleted))];
    return newState;
}

export function sortDateIncTasksFunc(arr){
    let newState = [...arr.filter((t)=>(!t.tCompleted)).sort((a,b)=>{
        return new Date(a.completeDate.split('.').reverse().join(',')).getTime() - new Date(b.completeDate.split('.').reverse().join(',')).getTime();
    })];
    return newState;
}

export function sortDateDecTasksFunc(arr){
    let newState = [...arr.filter((t)=>(!t.tCompleted)).sort((a,b)=>{
        return new Date(b.completeDate.split('.').reverse().join(',')).getTime() - new Date(a.completeDate.split('.').reverse().join(',')).getTime();
    })];
    return newState;
}

