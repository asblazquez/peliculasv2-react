import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Navbar from './components/subComponents/NavBar';
import Films from './components/Films';
import Series from './components/Series';
import Pelicula from './components/Pelicula';
import Serie from './components/Serie';
import Footer from './components/Footer';
import Episodio from './components/Episodio';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/peliculasv2-react/' element={<Home />} />
        <Route path='/peliculasv2-react/Search' element={<Search />} />
        <Route path='/peliculasv2-react/Films' element={<Films />} />
        <Route path='/peliculasv2-react/Series' element={<Series />} />
        <Route path='/peliculasv2-react/Pelicula/:id' element={<Pelicula />} />
        <Route path='/peliculasv2-react/Serie/:id' element={<Serie />} />
        <Route path='/peliculasv2-react/Episodio/:id/:season/:episode' element={<Episodio />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
