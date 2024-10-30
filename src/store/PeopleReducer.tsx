const GET_PEOPLE = 'GET_PEOPLE';
const SET_PEOPLE_PAGE = 'SET_PEOPLE_PAGE';
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER';

interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    gender: string;
    birth_year: string;
}

interface PeopleState {
    people: Person[];
    totalPeoplePages: number;
    currentPeoplePage: number;
    isLoad: boolean;
}

interface GetPeopleAction {
    type: typeof GET_PEOPLE;
    people: Person[];
    totalPeopleCount: number;
}

interface SetPeoplePageAction {
    type: typeof SET_PEOPLE_PAGE;
    page: number;
}

interface TogglePreloaderAction {
    type: typeof TOGGLE_PRELOADER;
    status: boolean;
}

type PeopleActionTypes = GetPeopleAction | SetPeoplePageAction | TogglePreloaderAction;

const initialState: PeopleState = {
    people: [],
    totalPeoplePages: 0,
    currentPeoplePage: 1,
    isLoad: true,
};

const PeopleReducer = (state = initialState, action: PeopleActionTypes): PeopleState => {
    switch (action.type) {
        case GET_PEOPLE: {
            return {
                ...state,
                people: action.people,
                totalPeoplePages: Math.ceil(action.totalPeopleCount / 10),
            };
        }
        case SET_PEOPLE_PAGE: {
            return {
                ...state,
                currentPeoplePage: action.page,
            };
        }
        case TOGGLE_PRELOADER: {
            return {
                ...state,
                isLoad: action.status,
            };
        }
        default:
            return state;
    }
};

export const getPeople = (people: Person[], totalPeopleCount: number): GetPeopleAction => ({
    type: GET_PEOPLE,
    people: people,
    totalPeopleCount: totalPeopleCount,
});

export const setPeoplePage = (page: number): SetPeoplePageAction => ({
    type: SET_PEOPLE_PAGE,
    page: page,
});

export const togglePreloader = (status: boolean): TogglePreloaderAction => ({
    type: TOGGLE_PRELOADER,
    status: status,
});

export default PeopleReducer;
