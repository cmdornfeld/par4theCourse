const getHoles = (state={
    step: 0,
    holeData: []
}, action)=>{
    switch(action.type) {
        case 'SET_HOLES': return {
                step: 0,
                holeData: action.payload
            }
        case 'SET_STEP': return {...state, step: action.payload}
        default: return state
    }
}

export default getHoles;