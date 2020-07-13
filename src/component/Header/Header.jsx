import React from 'react';
import css from './Header.module.scss'

const Header = (props) => {
    return (
        <>
            <h1 className={css.title}>{props.text}</h1>
        </>
    )
};

export default Header;