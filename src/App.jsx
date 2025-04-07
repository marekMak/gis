import React from "react";
import { motion } from "framer-motion";
import { opacity, expand } from "./lib/anim";
import MyMap from "./components/MyMap";

export default function Layout({ children, backgroundColor }) {
  const anim = (variants, custom = null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const nbOfColumns = 5;
  return (
    <div
      className="page stairs bg-white flex justify-center items-center"
      style={{ backgroundColor }}
    >
      <motion.div {...anim(opacity)} className="transition-background" />
      <div className="transition-container">
        {[...Array(nbOfColumns)].map((_, i) => {
          return <motion.div key={i} {...anim(expand, nbOfColumns - i)} />;
        })}
      </div>
      <div className="absolute z-50 flex flex-col gap-4 items-center">
        <img src="/logo/karlovaVesLogo.png" width={80} height={80} />
        <h1 className="font-kamerik text-3xl text-baseBlue">GIS Karlova Ves</h1>
      </div>
      <MyMap />
    </div>
  );
}
