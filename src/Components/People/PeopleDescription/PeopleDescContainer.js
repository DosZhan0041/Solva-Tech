import { useEffect, useState } from "react";
import PeopleDescription from "./PeopleDescription";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";

let PeopleDescContainer = (props) => {
    let [onePerson, setOnePerson] = useState({});
    let [editMode, setEditMode] = useState(false);
    let [editedPerson, setEditedPerson] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const adjustedId = id === "17" ? 18 : parseInt(id);
        fetch(`https://swapi.dev/api/people/${adjustedId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                data.image = `https://starwars-visualguide.com/assets/img/characters/${adjustedId}.jpg`;
                setOnePerson(data);
                setEditedPerson(data); 
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = (data) => {
      const updatedPerson = {
          ...editedPerson, 
          ...data, 
          image: onePerson.image 
      };
      setOnePerson(updatedPerson);  
      setEditedPerson(updatedPerson); 
      setEditMode(false);   
  };

    return (
        <PeopleDescription 
            {...props} 
            onePerson={editMode ? editedPerson : onePerson}
            onEdit={handleEdit}
            onSave={handleSave}
            editMode={editMode}
        />
    );
};

let mapStateToProps = (state) => {
    return {
        PeoplePage: state.PeoplePage
    };
};

let AuthRedirect = withAuthRedirect(PeopleDescContainer)
export default connect(mapStateToProps)(AuthRedirect);
