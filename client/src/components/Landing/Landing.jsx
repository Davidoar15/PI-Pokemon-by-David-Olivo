import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

function Landing() {
  const handleOpenInNewTab = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null;
      newWindow.location = url;
    }
  };

  return (
    <div className={style.Landing}>
      <div>
        <h1 className={style.h1Landing}>WELCOME</h1>
      </div>

      <div className={style.infoLanding}>
        <div className={style.infoWelcome}>
          <p className={style.pWelcome}>
            Hello. This is a Page for Knowing more about the Fantastic 
            and Powerful creatures: Pokémon! 
            Doing click in the button "Start" you going to find a list 
            of various Pokémon, can see their caracteristics, search a 
            Pokémon that not be in the list and others interesting things.
            Enjoy it!
          </p>
        </div>
        <div className={style.btnStartContainer}>
          <NavLink to={"/home"}>
            <button className={style.btnStart}>Start</button>
          </NavLink>
        </div>
      </div>

      <div className={style.contactContainer}>
        <div>
          <h4>Author: David Olivo Alfonso Rodríguez</h4>
        </div>
        <div className={style.contacts}>
          <div>
            <h4>Contact: </h4>
          </div>
          <div>
            <span
              onClick={() =>
                handleOpenInNewTab(
                  "https://www.linkedin.com/in/david-olivo-rodr%C3%ADguez-401412239/"
                )
              }
            >
              LinkedIn
            </span>
          </div>
          <div>
            <span
              onClick={() =>
                handleOpenInNewTab("https://github.com/Davidoar15")
              }
            >
              GitHub
            </span>
          </div>
          <div>
            <span
              onClick={() =>
                handleOpenInNewTab(
                  "https://instagram.com/davidoar15?igshid=MmIzYWVlNDQ5Yg=="
                )
              }
            >
              Instagram
            </span>
          </div>
          <div>
            <span
              onClick={() =>
                handleOpenInNewTab("https://www.facebook.com/david.olivo.1069")
              }
            >
              Facebook
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
