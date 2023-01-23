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
        <Route path='/' element={<Home />} />
        <Route path='/Search' element={<Search />} />
        <Route path='/Films' element={<Films />} />
        <Route path='/Series' element={<Series />} />
        <Route path='/Pelicula/:id' element={<Pelicula />} />
        <Route path='/Serie/:id' element={<Serie />} />
        <Route path='/Episodio/:id/:season/:episode' element={<Episodio />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
