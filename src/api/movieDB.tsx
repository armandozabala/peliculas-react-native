import axios from 'axios';


const movieDB = axios.create({
     baseURL: 'https://api.themoviedb.org/3/movie',
     params: {
          api_key: 'd19eb7ae41b69d5f5847a0c6a50c5b3f',
          language: 'es-ES'
     }
});

export default movieDB;
