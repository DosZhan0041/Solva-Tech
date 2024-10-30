import { combineReducers, legacy_createStore as createStore } from "redux";
import PeopleReducer from "./PeopleReducer";
import PlanetReducer from "./PlanetsReducer";
import StarshipReducer from "./StarshipReducer";


let reducers = combineReducers({
    PeoplePage: PeopleReducer,
    PlanetPage: PlanetReducer,
    StarshipPage: StarshipReducer
});
let store = createStore(reducers);

export default store;