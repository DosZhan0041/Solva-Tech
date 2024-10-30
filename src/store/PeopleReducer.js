const GET_PEOPLE = 'GET_PEOPLE'
const SET_PEOPLE_PAGE = 'SET_PEOPLE_PAGE'
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER'

let initialState = {
    people: [],
    totalPeoplePages: 0,
    currentPeoplePage: 1,
    isLoad: true,
};

let PeopleReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_PEOPLE:{
            return{
                ...state, 
                people: action.people,
                totalPeoplePages: Math.ceil(action.totalPeopleCount / 10)
            }
        }
        case SET_PEOPLE_PAGE:{
            return{
                ...state,
                currentPeoplePage: action.page
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

export const getPeople = (people, totalPeopleCount)=>({type: GET_PEOPLE, people: people, totalPeopleCount: totalPeopleCount})
export const setPeoplePage = (page) =>({type: SET_PEOPLE_PAGE, page: page})
export const togglePreloader = (status)=>({type: TOGGLE_PRELOADER, status: status})
export default PeopleReducer;


