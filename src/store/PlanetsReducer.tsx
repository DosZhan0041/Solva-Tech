const GET_PLANET = 'GET_PLANET';
const SET_PLANET_PAGE = 'SET_PLANET_PAGE';
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER';

interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    population: string;
}

interface PlanetState {
    planet: Planet[];
    totalPlanetPages: number;
    currentPlanetPage: number;
    isLoad: boolean;
}

interface GetPlanetAction {
    type: typeof GET_PLANET;
    planet: Planet[];
    totalPlanetCount: number;
}

interface SetPlanetPageAction {
    type: typeof SET_PLANET_PAGE;
    page: number;
}

interface TogglePreloaderAction {
    type: typeof TOGGLE_PRELOADER;
    status: boolean;
}

type PlanetActionTypes = GetPlanetAction | SetPlanetPageAction | TogglePreloaderAction;

const initialState: PlanetState = {
    planet: [],
    totalPlanetPages: 0,
    currentPlanetPage: 1,
    isLoad: true,
};

const PlanetReducer = (state = initialState, action: PlanetActionTypes): PlanetState => {
    switch (action.type) {
        case GET_PLANET: {
            return {
                ...state,
                planet: action.planet,
                totalPlanetPages: Math.ceil(action.totalPlanetCount / 10),
            };
        }
        case SET_PLANET_PAGE: {
            return {
                ...state,
                currentPlanetPage: action.page,
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

export const getPlanet = (planet: Planet[], totalPlanetCount: number): GetPlanetAction => ({
    type: GET_PLANET,
    planet: planet,
    totalPlanetCount: totalPlanetCount,
});

export const setPlanetPage = (page: number): SetPlanetPageAction => ({
    type: SET_PLANET_PAGE,
    page: page,
});

export const togglePreloader = (status: boolean): TogglePreloaderAction => ({
    type: TOGGLE_PRELOADER,
    status: status,
});

export default PlanetReducer;
