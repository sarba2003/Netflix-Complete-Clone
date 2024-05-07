import React, { useEffect, useState } from "react";

// YouTube Video
import YouTube from "react-youtube";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

function Third() {

    const [movies, setMovies] = useState([])
    const [video, setVideo] = useState([])

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
    const getVideo = async() => {
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
            .then(json => setVideo(json.videos.results[0]))
        }catch(err){
            console.log(err)
        }        
    }

    useEffect(() => {
        getMovies()
        getVideo()
    }, [])

    function handleView(id) {
        window.location.replace(`/about?details=${id}`);
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

            <div class="w-100 ms-0 playground">
                {console.log(video)}
                <YouTube
                    videoId={video.key}
                    className={"youtube amru"}
                    containerClassName={"youtube-container amru"}
                    opts={{
                            width: '100%',
                            height: '100%',
                            playerVars: {
                                autoplay: 1,
                                controls: 1,
                                cc_load_policy: 0,
                                fs: 1,
                                iv_load_policy: 0,
                                modestbranding: 0,
                                rel: 0,
                                showinfo: 1,
                            },
                        }}
                />
            </div>

            {/*<!-- Section-01 -->*/}
            <div class="mx-2 my-4 section">
                
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
                                <div class="card" onClick={() => handleView(data.id)}>
                                    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} class="img-fluid" />
                                </div>
                            </SwiperSlide>
                            </>
                        })}
                    </Swiper>
                </div>
            </div>

            {/*<!-- Section-02 -->*/}
            <div className="mx-2 my-4 section">
                
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
                                <div class="card">
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

export default Third;