const GET_PLANET = 'GET_PLANET'
const SET_PLANET_PAGE = 'SET_PLANET_PAGE'
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER'

let initialState = {
    planet: [],
    totalPlanetPages: 0,
    currentPlanetPage: 1,
    isLoad: true,
};

let PlanetReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_PLANET:{
            return{
                ...state, 
                planet: action.planet,
                totalPlanetPages: Math.ceil(action.totalPlanetCount / 10)
            }
        }
        case SET_PLANET_PAGE:{
            return{
                ...state,
                currentPlanetPage: action.page
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

export const getPlanet = (planet, totalPlanetCount)=>({type: GET_PLANET, planet: planet, totalPlanetCount: totalPlanetCount})
export const setPlanetPage = (page) =>({type: SET_PLANET_PAGE, page: page})
export const togglePreloader = (status)=>({type: TOGGLE_PRELOADER, status: status})
export default PlanetReducer;


