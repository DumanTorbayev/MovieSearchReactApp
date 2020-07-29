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
import Pagination from "react-js-pagination";

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=action&apikey=10f16cad'

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [savedSearchValue, setSavedSearchValue] = useState('action');
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                dispatch(searchMovieSuccess(jsonResponse.Search))
                dispatch(setTotalResults(jsonResponse.totalResults))
            });
    }, []);

    const search = (searchValue, page = activePage) => {
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

    const handlePageClick = (pageNumber) => {
        search(savedSearchValue, pageNumber);
        setActivePage(pageNumber);
    }

    const {loading, movies, error, totalResults} = state;

    return (
        <div className={css.App}>
            <Header text={'Movie'}/>
            <div className={css.wrapper}>
                <Search search={search}/>
                <div className={css.container}>
                    {
                        loading && !error ?
                            <div>Loading...</div> :
                            error ?
                                <div>{error}</div> :
                                <div>
                                    <div className={css.movies_container}>
                                        {
                                            movies.map((movie, index) => (
                                                <Movie key={`${index}_${movie}`} movie={movie}/>
                                            ))
                                        }
                                    </div>

                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={10} // 10 количество выводимых фильмов на одной странице, в API нет возможности изменять размер страницы
                                        totalItemsCount={+totalResults} // унарный " + " для преобразования строки в число
                                        pageRangeDisplayed={5}
                                        onChange={handlePageClick}
                                    />
                                </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
