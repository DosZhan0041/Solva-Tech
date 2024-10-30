import { useEffect } from "react";
import Starship from "./Starship";
import { connect } from "react-redux";
import { getStarship,  setStarshipPage, togglePreloader } from "../../store/StarshipReducer";
import withAuthRedirect from "../HOC/withAuthRedirect";
import { Dispatch } from "redux";

interface StarshipType{
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

interface authUserType{
    email: string,
    password: string
}

interface StarshipPageType{
    Starship: StarshipType[],
    currentStarshipPage: number,
    isLoad: boolean,
    totalStarshipPages: number
}

interface propsType{
    StarshipPage: StarshipPageType,
    authUser: authUserType,
    isLoad: boolean,
    getStarship: (Starship: any[], totalStarshipCount: number)=> void;
    setStarshipPage: (page: number)=>void;
    togglePreloader: (status: boolean)=>void;
}


let StarshipContainer: React.FC<propsType> = (props) =>{
    const fetchStarhip = (page: number)=>{
            props.togglePreloader(true)
            fetch(`https://swapi.dev/api/starships/?page=${page}`)
            .then (function(response){
                if(!response.ok){
                    throw new Error('Ошибка GET запроса, статус ' + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                let Starship = data.results;
                props.getStarship(Starship, data.count)
                props.togglePreloader(false)
            })
            .catch(function(error) {
                console.error("Произошла ошибка:", error);
            });
    }
    useEffect(()=>{
        fetchStarhip(props.StarshipPage.currentStarshipPage)
    },[props.StarshipPage.currentStarshipPage])
    return <Starship {...props}/>
}

interface RootState {
    StarshipPage: StarshipPageType,
    isLoad: boolean
}

let mapStateToProps = (state: RootState) => {
    return{
        StarshipPage: state.StarshipPage,
        isLoad: state.StarshipPage.isLoad
    }
}

let mapDispatchToProps = (dispatch: Dispatch<any>) =>{
    return{
        getStarship:(Starship: StarshipType[], totalStarshipCount: number) => {
            dispatch(getStarship(Starship, totalStarshipCount))
        },
        setStarshipPage: (page: number)=>{
            dispatch(setStarshipPage(page))
        },
        togglePreloader: (status: boolean)=>{
            dispatch(togglePreloader(status))
        }
    }
}

let AuthRedirect = withAuthRedirect(StarshipContainer)
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect)