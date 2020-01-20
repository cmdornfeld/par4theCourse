const getDetails = (state=[], action)=>{
    switch(action.type) {
        case 'SET_DETAILS' :
            return action.payload
        
        case 'SET_ROUND_DETAILS' :
            return action.payload

        default:
            return state
    }
}

export default getDetails;

// switch(action.type) {
//     case 'SET_DETAILS' :
//         return {
//             userData: action.payload,
//             roundData: []
//         }
    
//     case 'SET_ROUND_DETAILS' :
//         return {...state, roundData: action.payload}

//     default:
//         return state
// }