import { useEffect, useState } from "react"
import PeopleDescription from "./PeopleDescription"
import { useParams } from "react-router-dom"
import { connect } from "react-redux"


let PeopleDescContainer = (props) =>{
    
    let [onePerson, setOnePerson] = useState({});
    
    const {id} = useParams();

    useEffect(() => {
        fetch(`https://swapi.dev/api/people/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Ошибка сети: ' + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data)
            setOnePerson(data)
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);  

    return <PeopleDescription {...props} onePerson = {onePerson}/>
}

let mapStateToProps = (state) => {
    return{
        SWpage: state.SWpage
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleDescContainer)