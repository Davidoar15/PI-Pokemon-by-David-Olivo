import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Error.module.css';

function Error() {
  return (
    <div className={style.Error}>
      <NavLink to={'/home'}>
        <button className={style.btnBack}>Back</button>
      </NavLink>
      <div className={style.divError}>
        <div className={style.divErrorText}>
          <h1 className={style.errorH1}>404 Error: Page Not Found</h1>
          <p className={style.errorP}>
            Sorry, The Page that you are searching not Exist.
          </p>
        </div>
        <div className={style.errorGift}>
          <img
            src="https://24.media.tumblr.com/tumblr_macnaxB8ha1rc77ero1_500.gif"
            alt="Gif Error"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Error;