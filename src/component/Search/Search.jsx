import React, {useState} from 'react';
import css from './Search.module.scss'

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value)
    }

    /*const resetSearchInput = () => {
        setSearchValue('');
    }*/

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        //resetSearchInput();
    }

    return (
        <div className={css.search}>
            <input
                onChange={handleSearchInputChanges}
                value={searchValue}
                type="text"
            />
            <button onClick={callSearchFunction}>Search</button>
        </div>
    )
};

export default Search;