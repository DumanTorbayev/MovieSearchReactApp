import React from 'react';
import css from './Movie.module.scss'
import posterImg from '../../images/poster.png'

const Movie = ({movie}) => {
    const poster = movie.Poster === 'N/A' ? posterImg : movie.Poster

    return (
        <div className={css.movieCard}>
            <div className={css.poster}>
                <img src={poster} alt=""/>
            </div>
            <div className={css.dFlex}>
                <h2>{movie.Title}</h2>
                <span>{movie.Year}</span>
            </div>
        </div>
    );
};

export default Movie;