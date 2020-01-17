const getRoundId = (state={}, action)=>{
    if(action.type === `SET_ROUND_ID`){
        return action.payload;
    }
    return state;
}

export default getRoundId;