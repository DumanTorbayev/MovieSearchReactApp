const SEARCH_MOVIE_REQUEST = 'SEARCH_MOVIE_REQUEST';
const SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS';
const SEARCH_MOVIES_FAIL = 'SEARCH_MOVIES_FAIL';
const SET_TOTAL_PAGE = 'SET_TOTAL_PAGE';

export const initialState = {
    loading: true,
    movies: [],
    error: null,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case SEARCH_MOVIE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SEARCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case SEARCH_MOVIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return {
                ...state
            }
    }
}

export const searchMovieSuccess = (payload) => ({type: SEARCH_MOVIES_SUCCESS, payload});
export const searchMovieRequest = () => ({type: SEARCH_MOVIE_REQUEST});
export const searchMovieFail = (error) => ({type: SEARCH_MOVIES_FAIL, error});