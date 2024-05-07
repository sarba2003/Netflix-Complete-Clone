import React, { useEffect, useState } from "react";

// importing components from react-router-dom package
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useParams,
    useLocation,
} from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

function Second() {

    const [movies, setMovies] = useState([])
    const [details, setDetails] = useState([])

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("details");
    const type = queryParams.get("type");

    const getMovies = async() => {
        try{
            await fetch("https://api.themoviedb.org/3/discover/movie?api_key=ac6c2275c02f1a8d534daeedfcb0eea7")
            .then(res => res.json())
            .then(json => setMovies(json.results))
        }catch(err){
            console.log(err)
        }        
    }

    var Mediatype
    const getDetails = async() => {
        try{
            if(type == 'm'){
                Mediatype = 'movie';
            }else if(type == 't'){
                Mediatype = 'tv';
            }else{
                Mediatype = 0;
            }
            await fetch("https://api.themoviedb.org/3/"+ Mediatype +"/"+ id +"?&append_to_response=videos&api_key=ac6c2275c02f1a8d534daeedfcb0eea7")
            .then(res => res.json())
            .then(json => setDetails(json))
        }catch(err){
            console.log(err)
        }        
    }

    useEffect(() => {
        getMovies()
        getDetails()
    }, [])

    function handleView(id, ty) {
        window.location.replace(`/about?details=${id}&type=${ty}`);
    }

    function handleVideo(vid, ty) {
        window.location.replace(`/video?details=${vid}&type=${ty}`);
    }
    
    return (
        <div class="bg-black">
            {/*<!-- Navigation -->*/}
            <nav class="navbar navbar-expand-lg bg-black bg-opacity-75" data-bs-theme="dark">
                <div class="container-fluid mx-5">
                    <a class="navbar-brand" href="#">
                        <img src="./Assets/img/netflix-logo-png-large.png" alt="Bootstrap" width="120" class="mx-2" />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item mx-3">
                                <a class="nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item me-3">
                                <a class="nav-link" href="#">TV Shows</a>
                            </li>
                            <li class="nav-item me-3">
                                <a class="nav-link active" href="#">Movies</a>
                            </li>
                            <li class="nav-item me-3">
                                <a class="nav-link" href="#">New & Popular</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">My List</a>
                            </li>
                                                    
                        </ul>
                        <span class="d-flex mt-2">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control bg-black rounded-0" placeholder="Search..." aria-label="Search..." aria-describedby="basic-addon2" />
                                <span class="input-group-text bg-black border border-black" id="basic-addon2"><i class="bi bi-search"></i></span>
                            </div>
                            
                            <span class="dropdown ms-4 me-5 mt-2">
                                <a class="dropdown-toggle nav-link text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </span>
                        </span>
                        
                    </div>
                </div>
            </nav>

            {/*<!-- Section-00 -->*/}
            <div class="position-relative height_60 overflow-hidden">
                <img src={`https://image.tmdb.org/t/p/w500/${details.backdrop_path}`} class="h-100 float-end img" />
            </div>
            <div class="position-absolute z-3 w-100 ms-0 my-5 p-5 content_banner">
                    {console.log(details)}
                    <div class="ms-5">
                        <h1 class="text-light">
                            {   type == 'm'?
                                   details.original_title
                                :
                                    details.original_name
                            }
                        </h1>
                        <p class="text-light w-50 my-4">
                            {details.overview}
                        </p>
                        {   details.videos?.results?.length > 0 ?
                                <button class="btn btn-light fw-bold px-4 fs-5 mt-4" onClick={() => handleVideo(details.id, type)}>
                                <i class="bi bi-play-fill"></i>
                                    Play
                                </button>
                            :
                                <button class="btn btn-secondary fw-bold px-4 fs-5 mt-4 visually-hidden" disabled>
                                <i class="bi bi-play-fill"></i>
                                   Play
                                </button>
                        }
                        
                        <button class="btn btn-dark fw-bold ms-2 px-4 fs-5 py-2 mt-4">More info</button>
                    </div>

                                
            </div>

            {/*<!-- Section-01 -->*/}
            <div class="mx-5 section">
                
                <h3 class="text-light">
                    Most Popular
                </h3>

                <div class="">
                    <Swiper
                        slidesPerView={9}
                        spaceBetween={5}
                        modules={[Navigation]}
                        navigation
                        className="mySwiper"
                    >
                        {movies.map((data) => {
                            return<>                   
                            <SwiperSlide>
                                <div class="card" onClick={() => handleView(data.id, 'm')}>
                                    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} class="img-fluid" />
                                </div>
                            </SwiperSlide>
                            </>
                        })}
                    </Swiper>
                </div>
            </div>

            {/*<!-- Section-02 -->*/}
            <div className="mx-5 my-5 section">
                
                <h3 className="text-light">
                    Most Popular
                </h3>

                <div class="">
                    <Swiper
                        slidesPerView={9}
                        spaceBetween={5}
                        modules={[Navigation]}
                        navigation
                        className="mySwiper"
                    >
                        {movies.map((data) => {
                            return<>                   
                            <SwiperSlide>
                                <div class="card" onClick={() => handleView(data.id, type)}>
                                    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} class="img-fluid" />
                                </div>
                            </SwiperSlide>
                            </>
                        })}
                    </Swiper>
                </div>
            </div>

            <div className="my-5">..</div>
        </div>
    );
}

export default Second;