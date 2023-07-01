import React from 'react';
import { NavLink } from 'react-router-dom';
import style from'./Landing.module.css';

function Landing() {
  return (
    <div className={style.Landing}>
      <h1>WELCOME</h1>
      <NavLink to={'/home'}>
        <button className='homeBtn'>Start</button>
      </NavLink>
    </div>
  );
}

export default Landing;