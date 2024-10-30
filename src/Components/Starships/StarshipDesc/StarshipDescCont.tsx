import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import StarshipDesc from "./StarshipDesc";
import withAuthRedirect from "../../HOC/withAuthRedirect";


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
}

let StarshipDescContainer: React.FC<propsType> = (props) => {
    let [oneStarship, setOneStarship] = useState<StarshipType>({
        name: '',
        model: '',
        cost_in_credits: '',
        length: '',
        passengers: '',
        starship_class: '',
        max_atmosphering_speed: '',
        crew: '',
        url : ''
    });
    let [editMode, setEditMode] = useState(false);
    let [editedStarship, setEditedStarship] = useState<StarshipType>({
        name: '',
        model: '',
        cost_in_credits: '',
        length: '',
        passengers: '',
        starship_class: '',
        max_atmosphering_speed: '',
        crew: '',
        url : ''
    });

    const { id } = useParams();

    useEffect(() => {
        const adjustedId = id;
        fetch(`https://swapi.dev/api/starships/${adjustedId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                setOneStarship(data);
                setEditedStarship(data); 
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = (data: Partial<StarshipType>) => {
      const updatedStarship = {
          ...editedStarship, 
          ...data
      };
      setOneStarship(updatedStarship);  
      setEditedStarship(updatedStarship); 
      setEditMode(false);   
  };

    return (
        <StarshipDesc
            {...props} 
            oneStarship={editMode ? editedStarship : oneStarship}
            onEdit={handleEdit}
            onSave={handleSave}
            editMode={editMode}
        />
    );
};

interface RootState{
    StarshipPage: StarshipPageType
}

let mapStateToProps = (state: RootState) => {
    return {
        StarshipPage: state.StarshipPage
    };
};

let AuthRedirect = withAuthRedirect(StarshipDescContainer)
export default connect(mapStateToProps)(AuthRedirect);
