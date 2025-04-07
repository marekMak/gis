import React from "react";
import { ImPlus, ImMinus } from "react-icons/im";

const ZoomButtons = ({ view }) => {
  const zoomIn = () => {
    if (view) {
      view.goTo({
        zoom: view.zoom + 1,
      });
    }
  };

  const zoomOut = () => {
    if (view) {
      view.goTo({
        zoom: view.zoom - 1,
      });
    }
  };

  return (
    <div className="flex flex-col absolute top-5 left-4 shadow-xl">
      <button
        onClick={zoomIn}
        className="bg-baseBlue text-baseYellow shadow-md hover:bg-lightBlue p-3 hover:bg-baseBlueDarker transition-colors delay-150"
      >
        <ImPlus size={12} />
      </button>
      <button
        onClick={zoomOut}
        className="bg-baseBlue text-baseYellow shadow-md hover:bg-lightBlue p-3 hover:bg-baseBlueDarker transition-colors delay-150"
      >
        <ImMinus size={12} />
      </button>
    </div>
  );
};

export default ZoomButtons;
