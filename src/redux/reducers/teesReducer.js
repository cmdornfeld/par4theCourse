const getTees = (state=[], action)=>{
    if(action.type === `SET_TEES`){
        return action.payload;
    }
    return state;
}

export default getTees;