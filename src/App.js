import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import People from './Components/People/People';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="App">
        <Routes>
          <Route path='/' element={<People/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
