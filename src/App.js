import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import NotFound from './Components/NotFound/NotFound';
import PeopleContainer from './Components/People/PeopleContainer';
import PeopleDescContainer from './Components/People/PeopleDescription/PeopleDescContainer';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="App">
        <Routes>
          <Route path='/' element={<PeopleContainer/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/people/:id' element={<PeopleDescContainer/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
