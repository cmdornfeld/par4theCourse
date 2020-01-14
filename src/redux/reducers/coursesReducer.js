const getCourses = (state=[], action)=>{
    if(action.type === `SET_COURSES`){
        return action.payload;
    }
    return state;
}

export default getCourses;