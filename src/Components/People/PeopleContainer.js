import { useEffect } from "react";
import People from "./People";
import { connect } from "react-redux";
import { getPeople, setPeoplePage, togglePreloader } from "../../store/PeopleReducer";
import withAuthRedirect from "../HOC/withAuthRedirect";


let PeopleContainer = (props) =>{
    const fetchPeople = (page)=>{
            props.togglePreloader(true)
            fetch(`https://swapi.dev/api/people/?page=${page}`)
            .then (function(response){
                if(!response.ok){
                    throw new Error('Ошибка GET запроса, статус ' + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                let characters = data.results;
                props.getPeople(characters, data.count)
                props.togglePreloader(false)
            })
            .catch(function(error) {
                console.error("Произошла ошибка:", error);
            });
    }
    useEffect(()=>{
        fetchPeople(props.PeoplePage.currentPeoplePage)
    },[props.PeoplePage.currentPeoplePage])
    return <People {...props}/>
}

let mapStateToProps = (state) => {
    return{
        PeoplePage: state.PeoplePage,
        isLoad: state.PeoplePage.isLoad
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        getPeople:(people, totalPeopleCount) => {
            dispatch(getPeople(people, totalPeopleCount))
        },
        setPeoplePage: (page)=>{
            dispatch(setPeoplePage(page))
        },
        togglePreloader: (status)=>{
            dispatch(togglePreloader(status))
        }
    }
}

let AuthRedirect = withAuthRedirect(PeopleContainer)
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect)