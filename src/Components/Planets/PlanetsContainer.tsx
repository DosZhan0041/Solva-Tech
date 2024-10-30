import React, { useEffect } from "react";
import Planets from "./Planets";
import { connect } from "react-redux";
import { getPlanet,  setPlanetPage, togglePreloader } from "../../store/PlanetsReducer";
import withAuthRedirect from "../HOC/withAuthRedirect";
import { Dispatch } from "redux";


interface Planet {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    population: string
}

interface PlanetPageType{
    currentPlanetPage: number,
    isLoad: boolean,
    planet: Planet[],
    totalPlanetPages: number
}

interface authUserType{
    email: string,
    password: string
}

interface propsType {
    PlanetPage: PlanetPageType,
    authUser: authUserType,
    isLoad: boolean,
    getPlanet:(planet: any[], totalPlanetCount: number)=>void;
    setPlanetPage:(page: number)=>void;
    togglePreloader: (status: boolean)=>void;
}


let PlanetContainer:React.FC<propsType> = (props) =>{
    const fetchPlanet = (page: number)=>{
            props.togglePreloader(true)
            fetch(`https://swapi.dev/api/planets/?page=${page}`)
            .then (function(response){
                if(!response.ok){
                    throw new Error('Ошибка GET запроса, статус ' + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                let planet = data.results;
                props.getPlanet(planet, data.count)
                props.togglePreloader(false)
            })
            .catch(function(error) {
                console.error("Произошла ошибка:", error);
            });
    }
    useEffect(()=>{
        fetchPlanet(props.PlanetPage.currentPlanetPage)
    },[props.PlanetPage.currentPlanetPage])
    return <Planets {...props}/>
}

interface RootState {
    PlanetPage: PlanetPageType,
    isLoad: boolean
}

let mapStateToProps = (state: RootState) => {
    return{
        PlanetPage: state.PlanetPage,
        isLoad: state.PlanetPage.isLoad
    }
}

let mapDispatchToProps = (dispatch: Dispatch<any>) =>{
    return{
        getPlanet:(planet: Planet[], totalPlanetCount: number) => {
            dispatch(getPlanet(planet, totalPlanetCount))
        },
        setPlanetPage: (page: number)=>{
            dispatch(setPlanetPage(page))
        },
        togglePreloader: (status: boolean)=>{
            dispatch(togglePreloader(status))
        }
    }
}

let AuthRedirect = withAuthRedirect(PlanetContainer)
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect)