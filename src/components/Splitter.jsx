import { motion } from "framer-motion";

export default function Splitter() {
  return (
    <div className="absolute inset-0 z-50 flex w-full h-full pointer-events-none bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center z-20">
        <img src="/logo/karlovaVesLogo.png" width={50} height={50} />
        <h1 className="text-3xl font-kamerik text-baseBlueDarker">
          GIS Karlova Ves
        </h1>
      </div>

      {/* Modré panely - na celú šírku */}
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.65 }}
      />
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.75 }}
      />
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.85 }}
      />
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.95 }}
      />

      {/* Biele panely - na celú šírku */}
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.0, duration: 0.5 }}
      />
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.05, duration: 0.65 }}
      />
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.1, duration: 0.75 }}
      />
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.15, duration: 0.85 }}
      />
      <motion.div
        className="bg-baseBlue w-full h-full z-30"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.2, duration: 0.95 }}
      />
    </div>
  );
}
