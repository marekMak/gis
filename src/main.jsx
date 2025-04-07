import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { setAssetPath as setCalciteComponentsAssetPath } from "@esri/calcite-components/dist/components";
setCalciteComponentsAssetPath(
  "https://js.arcgis.com/calcite-components/2.13.2/assets"
);

createRoot(document.getElementById("root")).render(<App />);
