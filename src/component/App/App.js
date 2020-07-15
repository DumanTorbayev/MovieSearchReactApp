import React, {useEffect, useReducer, useState} from 'react';
import css from './App.module.scss';
import Header from "../Header/Header";
import Search from "../Search/Search";
import Movie from "../Movie/Movie";
import {
    initialState,
    reducer,
    searchMovieFail,
    searchMovieRequest,
    searchMovieSuccess,
    setTotalResults
} from "../../reducers/reducer";
import ReactPaginate from 'react-paginate';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=action&apikey=10f16cad'

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [savedSearchValue, setSavedSearchValue] = useState('action');

    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                dispatch(searchMovieSuccess(jsonResponse.Search))
                dispatch(setTotalResults(jsonResponse.totalResults))
            });
    }, []);

    const search = (searchValue, page = 1) => {
        setSavedSearchValue(searchValue)
        dispatch(searchMovieRequest());

        fetch(`https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=10f16cad`)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Response === 'True') {
                    dispatch(searchMovieSuccess(jsonResponse.Search))
                } else {
                    dispatch(searchMovieFail(jsonResponse.Error))
                }
            })
    }

    const handlePageClick = ({selected}) => {
        selected++;
        console.log(selected);
        search(savedSearchValue, selected);
    }

    const {loading, movies, error, totalResults} = state;

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
                                        <Movie key={`${index}_${movie}`} movie={movie}/>
                                    ))
                                )
                    }
                </div>
                <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalResults / 10}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
}

export default App;
