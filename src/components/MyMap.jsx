import { useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config.js";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";

import ScaleSelector from "./ScaleSelector";
import HomeButton from "./HomeButton";
import ShowScale from "./ShowScale";
import Header from "./Header";
import Printer from "./Printer";
import ZoomButtons from "./ZoomButtons";
import Copyright from "./Copyright";
import Logo from "./Logo";

const MyMap = () => {
  const [view, setView] = useState(null);
  const [activeLayers, setActiveLayers] = useState([]);

  useEffect(() => {
    esriConfig.apiKey = import.meta.env.VITE_ESRI_GIS_API;

    const mymap = new Map({
      basemap: "satellite", // Základná mapa
    });

    const view = new MapView({
      map: mymap,
      container: "viewDiv",
      center: [17.052, 48.157], // Slovensko
      zoom: 15,
      zoomEnabled: false,
    });

    setView(view);

    view.ui.remove("zoom");

    const scaleBar = new ScaleBar({
      view: view,
      unit: "metric", // Use "imperial" or "metric" based on your preference
      className: "custom-scale-bar",
    });

    view.ui.add(scaleBar, {
      position: "absolute",
      top: 0,
      left: 0,
      position: "top-right",
      padding: { top: 0, right: 0 },
      backgroundColor: "#3645B2",
      font: "#FFE100",
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  const toggleLayer = (layerUrl, layerSymbol, popupTemplate) => {
    if (!view) return;

    const existingLayer = activeLayers.find((layer) => layer.url === layerUrl);

    if (existingLayer) {
      view.map.remove(existingLayer);
      setActiveLayers((prev) => prev.filter((layer) => layer.url !== layerUrl));
    } else {
      const newLayer = new FeatureLayer({
        url: layerUrl,
        renderer: layerSymbol,
        outFields: ["*"],
        popupTemplate: popupTemplate,
        tileCache: {
          enabled: true, // Povoliť cache pre rýchlejšie načítanie
        },
      });
      view.map.add(newLayer);
      setActiveLayers((prev) => [...prev, newLayer]);
    }
  };

  const toggleTileLayer = (url) => {
    if (!view) return;

    const existingLayer = activeLayers.find((layer) => layer.url === url);

    if (existingLayer) {
      view.map.remove(existingLayer);
      setActiveLayers((prev) => prev.filter((layer) => layer.url !== url));
    } else {
      const tileLayer = new TileLayer({ url });
      view.map.add(tileLayer);
      setActiveLayers((prev) => [...prev, tileLayer]);
    }
  };

  return (
    <div
      id="viewDiv"
      style={{ height: "100vh", width: "100%", outline: "none" }}
      className="relative z-[100]"
    >
      <Header
        className="absolute left-1/2 -translate-x-[50%]"
        toggleLayer={toggleLayer}
        toggleTileLayer={toggleTileLayer}
      ></Header>
      <ZoomButtons view={view}></ZoomButtons>
      <div className="absolute bottom-16 lg:bottom-10 right-2 lg:right-6 flex items-center items-stretch gap-0.5">
        <ScaleSelector view={view}></ScaleSelector>
        <Printer view={view}></Printer>
        <HomeButton view={view}></HomeButton>
        <Copyright />
      </div>
      <Logo />
    </div>
  );
};

export default MyMap;
