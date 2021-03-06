import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { Movie, MovieDBNowResponse } from "../interfaces/movieInterface";


interface MoviesState {
     nowPlaying: Movie[];
     popular: Movie[],
     topRated: Movie[],
     upcoming: Movie[]
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
         nowPlaying: [],
         topRated: [],
         upcoming: [],
         popular: []
    });


    const getMovies = async () => {

        const nowPlayingPromise = movieDB.get<MovieDBNowResponse>('/now_playing');
        const popularPromise = movieDB.get<MovieDBNowResponse>('/popular');
        const topRatedPromise = movieDB.get<MovieDBNowResponse>('/top_rated');
        const upcomingPromise = movieDB.get<MovieDBNowResponse>('/upcoming');

        const resps = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise]);

       
        setMoviesState({
              nowPlaying: resps[0].data.results,
              popular: resps[1].data.results,
              topRated: resps[2].data.results,
              upcoming:  resps[3].data.results
        });

        setIsLoading(false);

    }
    
    useEffect(() => {

        getMovies();
     
     }, [])
   
    return {
         ...moviesState,
         isLoading
    }

}


