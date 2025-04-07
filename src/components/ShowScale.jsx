import { useEffect, useState } from "react";

const ShowScale = ({ view }) => {
  const [scale, setScale] = useState(null);

  useEffect(() => {
    if (!view) {
      return;
    }

    const updateScale = () => {
      setScale(Math.round(view.scale));
    };

    const watcher = view.watch("scale", updateScale);

    updateScale();

    return () => watcher.remove();
  }, [view]);

  return (
    <div className=" bg-baseBlue text-baseYellow p-2">
      {scale ? `1 :${scale}` : "Načítavam..."}
    </div>
  );
};

export default ShowScale;
