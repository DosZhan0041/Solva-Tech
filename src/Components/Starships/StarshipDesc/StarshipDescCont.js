import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import StarshipDesc from "./StarshipDesc";
import withAuthRedirect from "../../HOC/withAuthRedirect";

let StarshipDescContainer = (props) => {
    let [oneStarship, setOneStarship] = useState({});
    let [editMode, setEditMode] = useState(false);
    let [editedStarship, setEditedStarship] = useState({});

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

    const handleSave = (data) => {
      const updatedStarship = {
          ...editedStarship, 
          ...data, 
          image: oneStarship.image 
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

let mapStateToProps = (state) => {
    return {
        StarshipPage: state.StarshipPage
    };
};

let AuthRedirect = withAuthRedirect(StarshipDescContainer)
export default connect(mapStateToProps)(AuthRedirect);
