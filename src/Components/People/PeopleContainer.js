import { useEffect } from "react";
import People from "./People";
import { connect } from "react-redux";
import { getPeople, setPeoplePage } from "../../store/SWReducer";


let PeopleContainer = (props) =>{
    const fetchPeople = (page)=>{
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
            })
            .catch(function(error) {
                console.error("Произошла ошибка:", error);
            });
    }
    useEffect(()=>{
        fetchPeople(props.SWpage.currentPeoplePage)
    },[props.SWpage.currentPeoplePage])
    return <People {...props}/>
}

let mapStateToProps = (state) => {
    return{
        SWpage: state.SWpage,
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        getPeople:(people, totalPeopleCount) => {
            dispatch(getPeople(people, totalPeopleCount))
        },
        setPeoplePage: (page)=>{
            dispatch(setPeoplePage(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleContainer)