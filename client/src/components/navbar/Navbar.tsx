import React, { useEffect, useState } from "react";
import EstiaLogo from "../../img/AppLogo.svg";

import { LogOutButton } from "../buttons/LogOutButton";
import { Link } from "react-router-dom";

import { CreateProjectButton } from "../buttons/CreateProjectButton";
import { LearnPreferencesButton } from "../buttons/LearnPreferencesButton";
import {ProfileButton} from "../buttons/ProfileButton"

export const Navbar: React.FC = () => {

  return (
    <div className="nav-bar" data-scroll-section>
      <Link to="/">
        <img className="logo" src={EstiaLogo}></img>
      </Link>

      <div className="nav-buttons-continer">
        <ProfileButton />
        <LearnPreferencesButton />
        <CreateProjectButton />
      </div>
      <LogOutButton />
    </div>
  );
};
