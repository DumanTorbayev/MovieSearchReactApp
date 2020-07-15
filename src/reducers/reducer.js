const SEARCH_MOVIE_REQUEST = 'SEARCH_MOVIE_REQUEST';
const SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS';
const SEARCH_MOVIES_FAIL = 'SEARCH_MOVIES_FAIL';
const SET_TOTAL_RESULTS = 'SET_TOTAL_RESULTS';

export const initialState = {
    loading: true,
    movies: [],
    error: null,
    totalResults: null
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
        case SET_TOTAL_RESULTS:
            return {
                ...state,
                totalResults: action.totalResults
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
export const setTotalResults = (totalResults) => ({type: SET_TOTAL_RESULTS, totalResults});