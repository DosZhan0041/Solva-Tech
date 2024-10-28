const GET_PEOPLE = 'GET_PEOPLE'
const SET_PEOPLE_PAGE = 'SET_PEOPLE_PAGE'


let initialState = {
    people: [],
    planets: [],
    starships: [],
    totalPeoplePages: 0,
    currentPeoplePage: 1 
};

let SWReducer = (state = initialState, action) =>{
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
        default: 
        return state;
    }
}

export const getPeople = (people, totalPeopleCount)=>({type: GET_PEOPLE, people: people, totalPeopleCount: totalPeopleCount})
export const setPeoplePage = (page) =>({type: SET_PEOPLE_PAGE, page: page})
export default SWReducer;


