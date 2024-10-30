const GET_STARSHIP = 'GET_STARSHIP'
const SET_STARSHIP_PAGE = 'SET_STARSHIP_PAGE'
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER'

let initialState = {
    Starship: [],
    totalStarshipPages: 0,
    currentStarshipPage: 1,
    isLoad: true,
};

let StarshipReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_STARSHIP:{
            return{
                ...state, 
                Starship: action.Starship,
                totalStarshipPages: Math.ceil(action.totalStarshipCount / 10)
            }
        }
        case SET_STARSHIP_PAGE:{
            return{
                ...state,
                currentStarshipPage: action.page
            }
        }
        case TOGGLE_PRELOADER:{
            return{
                ...state,
                isLoad: action.status
            }
        }
        default: 
        return state;
    }
}

export const getStarship = (Starship, totalStarshipCount)=>({type: GET_STARSHIP, Starship: Starship, totalStarshipCount: totalStarshipCount})
export const setStarshipPage = (page) =>({type: SET_STARSHIP_PAGE, page: page})
export const togglePreloader = (status)=>({type: TOGGLE_PRELOADER, status: status})
export default StarshipReducer;