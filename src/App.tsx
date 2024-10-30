import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import NotFound from './Components/NotFound/NotFound';
import PeopleContainer from './Components/People/PeopleContainer';
import PeopleDescContainer from './Components/People/PeopleDescription/PeopleDescContainer';
import PlanetsContainer from './Components/Planets/PlanetsContainer';
import PlanetsDescContainer from './Components/Planets/PlanetsDescription/PlanetsDescContainer';
import StarshipContainer from './Components/Starships/StarshipContainer';
import StarshipDescCont from './Components/Starships/StarshipDesc/StarshipDescCont'
import Register from './Components/Registration/Register';
import Login from './Components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="App">
        <Routes>
          <Route path='/' element={<PeopleContainer/>}/>
          <Route path='/planets' element={<PlanetsContainer/>}/>
          <Route path='/starship' element={<StarshipContainer/>}/>
          <Route path='/people/:id' element={<PeopleDescContainer/>}/>
          <Route path='/planet/:id' element={<PlanetsDescContainer/>}/>
          <Route path='/starship/:id' element={<StarshipDescCont/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          \<Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
