import React, {useEffect, useReducer} from 'react';
import css from './App.module.scss';
import Header from "../Header/Header";
import Search from "../Search/Search";
import Movie from "../Movie/Movie";
import {
    initialState,
    reducer,
    searchMovieFail,
    searchMovieRequest,
    searchMovieSuccess
} from "../../reducers/reducer";

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=action&apikey=10f16cad'

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                dispatch(searchMovieSuccess(jsonResponse.Search))
            });
    }, []);

    const search = (searchValue= 'action') => {
        dispatch(searchMovieRequest());

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=10f16cad`)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Response === 'True') {
                    dispatch(searchMovieSuccess(jsonResponse.Search))
                } else {
                    dispatch(searchMovieFail(jsonResponse.Error))
                }
            })
    }

    const {loading, movies, error} = state;

    return (
        <div className={css.App}>
            <Header text={'Movie'}/>
            <div className={css.wrapper}>
                <Search search={search}/>
                <div className={css.movieWrap}>
                    {
                        loading && !error ?
                            <div>Loading...</div> :
                            error ?
                                <div>{error}</div> :
                                (
                                    movies.map((movie, index) => (
                                        <Movie key={index} movie={movie}/>
                                    ))
                                )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
