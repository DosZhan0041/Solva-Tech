import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PlanetDescription from "./PlanetsDescription";
import withAuthRedirect from "../../HOC/withAuthRedirect";

interface Planet {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    population: string
}

interface PlanetPageType{
    currentPlanetPage: number,
    isLoad: boolean,
    planet: Planet[],
    totalPlanetPages: number
}

interface authUserType{
    email: string,
    password: string
}

interface propsType {
    PlanetPage: PlanetPageType,
    authUser: authUserType
}


let PlanetDescContainer: React.FC<propsType> = (props) => {
    let [onePlanet, setOnePlanet] = useState<Planet>({
        name: '',
        rotation_period: '',
        orbital_period: '',
        diameter: '',
        climate: '',
        gravity: '',
        terrain: '',
        population: ''
    });
    let [editMode, setEditMode] = useState(false);
    let [editedPlanet, setEditedPlanet] = useState<Planet>({
        name: '',
        rotation_period: '',
        orbital_period: '',
        diameter: '',
        climate: '',
        gravity: '',
        terrain: '',
        population: ''
    });

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

    const handleSave = (data: Partial<Planet>) => {
      const updatedPlanet = {
          ...editedPlanet, 
          ...data 
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

interface RootState {
    PlanetPage: PlanetPageType
}

let mapStateToProps = (state: RootState) => {
    return {
        PlanetPage: state.PlanetPage
    };
};

let AuthRedirect = withAuthRedirect(PlanetDescContainer)
export default connect(mapStateToProps)(AuthRedirect);
