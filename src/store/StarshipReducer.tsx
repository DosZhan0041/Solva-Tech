const GET_STARSHIP = 'GET_STARSHIP';
const SET_STARSHIP_PAGE = 'SET_STARSHIP_PAGE';
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER';

interface Starship {
    name: string,
    model: string,
    cost_in_credits: string,
    length: string,
    passengers: string,
    starship_class: string,
    max_atmosphering_speed: string,
    crew: string,
    url : string
}

interface StarshipState {
    Starship: Starship[];
    totalStarshipPages: number;
    currentStarshipPage: number;
    isLoad: boolean;
}

interface GetStarshipAction {
    type: typeof GET_STARSHIP;
    Starship: Starship[];
    totalStarshipCount: number;
}

interface SetStarshipPageAction {
    type: typeof SET_STARSHIP_PAGE;
    page: number;
}

interface TogglePreloaderAction {
    type: typeof TOGGLE_PRELOADER;
    status: boolean;
}

type StarshipActionTypes = GetStarshipAction | SetStarshipPageAction | TogglePreloaderAction;

const initialState: StarshipState = {
    Starship: [],
    totalStarshipPages: 0,
    currentStarshipPage: 1,
    isLoad: true,
};

const StarshipReducer = (state = initialState, action: StarshipActionTypes): StarshipState => {
    switch (action.type) {
        case GET_STARSHIP: {
            return {
                ...state,
                Starship: action.Starship,
                totalStarshipPages: Math.ceil(action.totalStarshipCount / 10),
            };
        }
        case SET_STARSHIP_PAGE: {
            return {
                ...state,
                currentStarshipPage: action.page,
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

export const getStarship = (Starship: Starship[], totalStarshipCount: number): GetStarshipAction => ({
    type: GET_STARSHIP,
    Starship: Starship,
    totalStarshipCount: totalStarshipCount,
});

export const setStarshipPage = (page: number): SetStarshipPageAction => ({
    type: SET_STARSHIP_PAGE,
    page: page,
});

export const togglePreloader = (status: boolean): TogglePreloaderAction => ({
    type: TOGGLE_PRELOADER,
    status: status,
});

export default StarshipReducer;
