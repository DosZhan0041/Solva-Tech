import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PlanetDescription from "./PlanetsDescription";
import withAuthRedirect from "../../HOC/withAuthRedirect";

let PlanetDescContainer = (props) => {
    let [onePlanet, setOnePlanet] = useState({});
    let [editMode, setEditMode] = useState(false);
    let [editedPlanet, setEditedPlanet] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const adjustedId = id;
        fetch(`https://swapi.dev/api/planets/${adjustedId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                setOnePlanet(data);
                setEditedPlanet(data); 
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = (data) => {
      const updatedPlanet = {
          ...editedPlanet, 
          ...data, 
          image: onePlanet.image 
      };
      setOnePlanet(updatedPlanet);  
      setEditedPlanet(updatedPlanet); 
      setEditMode(false);   
  };

    return (
        <PlanetDescription
            {...props} 
            onePlanet={editMode ? editedPlanet : onePlanet}
            onEdit={handleEdit}
            onSave={handleSave}
            editMode={editMode}
        />
    );
};

let mapStateToProps = (state) => {
    return {
        PlanetPage: state.PlanetPage
    };
};

let AuthRedirect = withAuthRedirect(PlanetDescContainer)
export default connect(mapStateToProps)(AuthRedirect);
