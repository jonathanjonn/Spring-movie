import './App.css';
import api from './api/apiConfig';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer'
import Review from './components/review/Review';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  
  const getMovies = async () =>{

  try {    
    const response = await api.get("api/movies");
      console.log(response.data);
      setMovies(response.data);

  } catch (error) {
    console.log(error);
  }
}

  const getMovieData =  async (movieId) =>{
    try {
      const response = await api.get(`api/movies/${movieId}`)

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviews);

      
    } catch (error) {
      console.error(error);
    }
  }

useEffect(() =>{
  getMovies();
},[])
  

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home movies={movies}/>}></Route>
          <Route path='/Trailer/:ytTrailerId' element={<Trailer/>}></Route>
          <Route path='/Review/:movieId' element={<Review getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;