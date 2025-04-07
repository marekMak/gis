import { useState } from "react";

const ScaleSelector = ({ view }) => {
  const [selectedScale, setSelectedScale] = useState(10000);

  const handleScaleChange = (event) => {
    const newScale = Number(event.target.value);
    setSelectedScale(newScale);

    if (view) {
      view.goTo({ scale: newScale }, { animate: false });
    }
  };

  return (
    <>
      <select
        value={selectedScale}
        onChange={handleScaleChange}
        className="bg-baseBlue text-baseYellow p-2 transition-colors delay-150 hover:bg-baseBlueDarker cursor-pointer"
      >
        <option className="hover:bg-baseBlueDarker" value={1000}>
          1 : 1 000
        </option>
        <option className="hover:bg-baseBlueDarker" value={5000}>
          1 : 5 000
        </option>
        <option className="hover:bg-baseBlueDarker" value={10000}>
          1 : 10 000
        </option>
        <option className="hover:bg-baseBlueDarker" value={25000}>
          1 : 25 000
        </option>
        <option className="hover:bg-baseBlueDarker" value={50000}>
          1 : 50 000
        </option>
        <option className="hover:bg-baseBlueDarker" value={100000}>
          1 : 100 000
        </option>
      </select>
    </>
  );
};

export default ScaleSelector;
