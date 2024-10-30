import { useEffect } from "react";
import Starship from "./Starship";
import { connect } from "react-redux";
import { getStarship,  setStarshipPage, togglePreloader } from "../../store/StarshipReducer";
import withAuthRedirect from "../HOC/withAuthRedirect";


let StarshipContainer = (props) =>{
    const fetchPeople = (page)=>{
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
        fetchPeople(props.StarshipPage.currentStarshipPage)
    },[props.StarshipPage.currentStarshipPage])
    return <Starship {...props}/>
}

let mapStateToProps = (state) => {
    return{
        StarshipPage: state.StarshipPage,
        isLoad: state.StarshipPage.isLoad
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        getStarship:(Starship, totalStarshipCount) => {
            dispatch(getStarship(Starship, totalStarshipCount))
        },
        setStarshipPage: (page)=>{
            dispatch(setStarshipPage(page))
        },
        togglePreloader: (status)=>{
            dispatch(togglePreloader(status))
        }
    }
}

let AuthRedirect = withAuthRedirect(StarshipContainer)
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect)