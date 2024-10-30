import { useEffect } from "react";
import Planets from "./Planets";
import { connect } from "react-redux";
import { getPlanet,  setPlanetPage, togglePreloader } from "../../store/PlanetsReducer";
import withAuthRedirect from "../HOC/withAuthRedirect";


let PlanetContainer = (props) =>{
    const fetchPeople = (page)=>{
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
        fetchPeople(props.PlanetPage.currentPlanetPage)
    },[props.PlanetPage.currentPlanetPage])
    return <Planets {...props}/>
}

let mapStateToProps = (state) => {
    return{
        PlanetPage: state.PlanetPage,
        isLoad: state.PlanetPage.isLoad
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        getPlanet:(planet, totalPlanetCount) => {
            dispatch(getPlanet(planet, totalPlanetCount))
        },
        setPlanetPage: (page)=>{
            dispatch(setPlanetPage(page))
        },
        togglePreloader: (status)=>{
            dispatch(togglePreloader(status))
        }
    }
}

let AuthRedirect = withAuthRedirect(PlanetContainer)
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect)