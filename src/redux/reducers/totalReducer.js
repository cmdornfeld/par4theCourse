const getTotals = (state={}, action)=>{
    if(action.type === `SET_TOTALS`){
        return action.payload;
    }
    return state;
}

export default getTotals;