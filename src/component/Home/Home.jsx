import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'

export default function Home() {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTvshows, setTrendingTvshows] = useState([]);
  let [trendingPeople, settrendingPeople] = useState([]);
  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';
  let navigate=useNavigate();



  async function getTrendingIems(mediaType,callback){

     let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    // let {data}= await axios ('https://api.themoviedb.org/3/movie/550?api_key=7063f2fcf1500f8dfc2f92869694db2c');

    callback(data.results);
  }


  useEffect(() => {
    getTrendingIems("movie",setTrendingMovies);
    getTrendingIems("tv",setTrendingTvshows);
    getTrendingIems("person",settrendingPeople);
  }, [])
  function goToDetails(id){
    navigate({pathname:'/details',
    search:`?id=${id}`
  });
  }
  return (
    <>
    <div className="row">
      <div className="col-md-4">
        <div className="welcome my-5">
          <div className={`${styles.brdr} w-25 my-3`}></div>
          <h2>Trending</h2>
          <h2>Movies</h2>
          <h2>To wacth now</h2>
          <h2>most wacthed movies dy day</h2>
          <div className={`${styles.brdr} w-75 my-3`}></div>
        </div>
      </div>

      {trendingMovies.map((movie)=>
        <div onClick={()=>goToDetails(movie.id)} key={movie.id} className="col-md-2">
          
          <div className="movie my-3" >
            <img src={baseImgUrl+movie.poster_path} className="w-100"  alt="" />
            <h2 className="h6">{movie.title}</h2>
            
          </div>
        </div>

      )}
    </div>
    
    <div className="row">
      <div className="col-md-4">
        <div className="welcome my-5">
          <div className={`${styles.brdr} w-25 my-3`}></div>
          <h2>Trending</h2>
          <h2>Tv shows</h2>
          <h2>To wacth now</h2>
          <h2>most wacthed Tv shows dy day</h2>
          <div className={`${styles.brdr} w-75 my-3`}></div>
        </div>
      </div>

      {trendingTvshows.map((tv)=>
        <div onClick={()=>goToDetails(tv.id)} key={tv.id} className="col-md-2">
          <div className="tv my-3" >
            <img src={baseImgUrl+tv.poster_path} className="w-100"  alt="" />
            <h2 className="h6">{tv.name}</h2>
            
          </div>
        </div>

      )}
    </div>
    <div className="row">
      <div className="col-md-4">
        <div className="welcome my-5">
          <div className={`${styles.brdr} w-25 my-3`}></div>
          <h2>Trending</h2>
          <h2>People</h2>
          <h2>To wacth now</h2>
          <h2>most wacthed Tv shows dy day</h2>
          <div className={`${styles.brdr} w-75 my-3`}></div>
        </div>
      </div>

      {trendingPeople.map((person)=>
        <div onClick={()=>goToDetails(person.id)} key={person.id} className="col-md-2">
          <div className="person my-3" onClick={goToDetails}>
            <img src={baseImgUrl+person.profile_path} className="w-100"  alt="" />
            <h2 className="h6">{person.name}</h2>
            
          </div>
        </div>

      )}
    </div>
    </>
  )
}
