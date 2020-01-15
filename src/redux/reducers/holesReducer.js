const getHoles = (state=[], action)=>{
    if(action.type === `SET_HOLES`){
        return action.payload;
    }
    return state;
}

export default getHoles;