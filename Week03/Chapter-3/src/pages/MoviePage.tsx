import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() => {
    const fetchMovies = async () => {
        const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
            headers: {
            // Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2NkZGQwNjNjYmVhNTYxNzYwZDQyMWI4ZjVhZWE3NSIsIm5iZiI6MTc3NDU3OTY4My45OTQsInN1YiI6IjY5YzVlZmUzYWQ5OTYwMWIzY2FmZDE0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mG9xgarzQH_jjgZHR2ReN_Zxkzyl-AuY-c9GS5hIqgc`,
            },
        }
        );
        setMovies(data.results);
    };

    fetchMovies();
    }, []);

    return (
    <ul>
        {movies.map((movie) => (
        <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.release_date}</p>
        </li>
        ))}
    </ul>
    );
};

export default MoviesPage;