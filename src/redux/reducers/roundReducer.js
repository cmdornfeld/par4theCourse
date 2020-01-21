const getRoundId = (state=[], action)=>{
    if(action.type === `SET_ROUND`){
        return action.payload;
    }
    return state;
}

export default getRoundId;