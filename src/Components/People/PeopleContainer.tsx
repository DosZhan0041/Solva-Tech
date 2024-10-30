import React, { useEffect } from "react";
import People from "./People";
import { connect } from "react-redux";
import { getPeople, setPeoplePage, togglePreloader } from "../../store/PeopleReducer";
import withAuthRedirect from "../HOC/withAuthRedirect";
import { Dispatch } from "redux";

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

interface PeoplePageType{
    currentPeoplePage: number,
    isLoad: boolean,
    people: Person[],
    totalPeoplePages: number
}

interface authUserType{
    email: string,
    password: string
}

interface propsType {
    PeoplePage: PeoplePageType,
    authUser: authUserType,
    getPeople:(people: any[], totalPeopleCount: number)=>void;
    isLoad: boolean,
    setPeoplePage: (page: number)=>void;
    togglePreloader: (status: boolean)=>void;
}  

let PeopleContainer: React.FC<propsType> = (props) =>{
    
    const fetchPeople = (page: number)=>{
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

interface RootState {
    PeoplePage: PeoplePageType,
    isLoad: boolean
}

let mapStateToProps = (state:RootState) => {
    return{
        PeoplePage: state.PeoplePage,
        isLoad: state.PeoplePage.isLoad
    }
}


let mapDispatchToProps = (dispatch: Dispatch<any>) =>{
    return{
        getPeople:(people: Person[], totalPeopleCount: number) => {
            dispatch(getPeople(people, totalPeopleCount))
        },
        setPeoplePage: (page: number)=>{
            dispatch(setPeoplePage(page))
        },
        togglePreloader: (status: boolean)=>{
            dispatch(togglePreloader(status))
        }
    }
}

let AuthRedirect = withAuthRedirect(PeopleContainer)
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect)