import React, { useState } from "react";
import { FaHome } from "react-icons/fa";

const HomeButton = ({ view }) => {
  const homeCord = { zoom: 15, center: [17.052, 48.157] };

  const setHomeView = () => {
    view.center = homeCord.center;
    view.zoom = homeCord.zoom;
  };

  return (
    <>
      <button
        onClick={() => setHomeView()}
        className="bg-baseBlue text-3xl text-baseYellow shadow-xl px-2 py-1 hover:bg-baseBlueDarker transition-colors delay-150"
      >
        <FaHome />
      </button>
    </>
  );
};

export default HomeButton;
