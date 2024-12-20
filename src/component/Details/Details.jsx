import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function Details() {
  let [SearchParams,setSearchParams]=useSearchParams();
  let [details,setDetails]=useState({});
  let currentId = SearchParams.get('id');
  let baseImgUrl = 'https://image.tmdb.org/t/p/original/';


  async function getTrendingDetails(mediaType){

    let {data}= await axios.get(`https://api.themoviedb.org/3/${mediaType}/${currentId}?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-US`);

    setDetails(data);
    console.log(data.genres);
 }

 useEffect(() => {
  getTrendingDetails('movie')
  getTrendingDetails('tv')
  getTrendingDetails('person')
}, [])


  return (
    <>
    <div className="row my-5" >
      <div className="col-md-4">
          <img src={baseImgUrl+details.poster_path} className="w-100"  alt="" />

      </div>
      <div className="col-md-8 ">
        <h2 className=" my-3" >{details.tagline}</h2>
        <h2 className=" my-3" >{details.original_title}</h2>
        <h2 className="h6 my-3">{details.overview}</h2>
        <h4 className="h5 my-3">vote: {details.vote_average}</h4>
        <h4 className="h5 my-3">vote_count: {details.vote_count}</h4>
        <h4 className="h5 my-3">release_date: {details.release_date}</h4>

      </div>
    </div>
   
    </>
  )
}
