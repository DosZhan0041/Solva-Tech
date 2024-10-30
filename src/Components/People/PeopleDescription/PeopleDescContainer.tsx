import React, { useEffect, useState } from "react";
import PeopleDescription from "./PeopleDescription";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";

interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    gender: string;
    birth_year: string;
    image: string
}

interface authUserType{
    email: string,
    password: string
}

interface PeoplePageType{
    currentPeoplePage: number,
    isLoad: boolean,
    people: Person[],
    totalPeoplePages: number
}

interface PropsType {
    PeoplePage: PeoplePageType,
    authUser: authUserType
}

let PeopleDescContainer: React.FC<PropsType>= (props) => {
    
    let [onePerson, setOnePerson] = useState<Person>({
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        gender: '',
        birth_year: '',
        image: ''
    });
    let [editMode, setEditMode] = useState(false);
    const [editedPerson, setEditedPerson] = useState<Person>({
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        gender: '',
        birth_year: '',
        image: ''
    });

    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) { 
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
        }
    }, [id]);
    

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = (data: Partial<Person>) => {
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

interface RootState {
    PeoplePage: PeoplePageType
}

let mapStateToProps = (state: RootState) => {
    return {
        PeoplePage: state.PeoplePage
    };
};

let AuthRedirect = withAuthRedirect(PeopleDescContainer)
export default connect(mapStateToProps)(AuthRedirect);
