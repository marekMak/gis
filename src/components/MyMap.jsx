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
import { Loader } from "lucide-react";

const MyMap = () => {
  const [view, setView] = useState(null);
  const [activeLayers, setActiveLayers] = useState([]);
  const [isPending, setIsPending] = useState(false);

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
    setIsPending(true); // Pred začiatkom načítania nastavíme isPending na true
    const existingLayer = activeLayers.find((layer) => layer.url === layerUrl);

    if (!view) return;

    if (existingLayer) {
      view.map.remove(existingLayer);
      setActiveLayers((prev) => prev.filter((layer) => layer.url !== layerUrl));
      setIsPending(false); // Ak je vrstva už odstránená, animácia skončí
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

      // Skontrolujeme stav načítania vrstvy
      newLayer.when(() => {
        setIsPending(false); // Nastavíme isPending na false až po načítaní
      });

      view.map.add(newLayer);
      setActiveLayers((prev) => [...prev, newLayer]);
    }
  };

  const toggleTileLayer = (url) => {
    setIsPending(true); // Pred začiatkom načítania nastavíme isPending na true
    if (!view) return;

    const existingLayer = activeLayers.find((layer) => layer.url === url);

    if (existingLayer) {
      view.map.remove(existingLayer);
      setActiveLayers((prev) => prev.filter((layer) => layer.url !== url));
      setIsPending(false); // Ak je vrstva už odstránená, animácia skončí
    } else {
      const tileLayer = new TileLayer({ url });

      // Po načítaní tile layer-u nastavíme isPending na false
      tileLayer.when(() => {
        setIsPending(false); // Ak je vrstva načítaná, animácia skončí
      });

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
      />
      <ZoomButtons view={view} />
      <div className="absolute bottom-16 lg:bottom-10 right-2 lg:right-6 flex items-center items-stretch gap-0.5">
        <ScaleSelector view={view} />
        <Printer view={view} />
        <HomeButton view={view} />
        <Copyright />
      </div>
      <Logo />
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center h-screen w-full bg-gray-600 bg-opacity-50 z-50">
          <Loader className="animate-spin text-white text-4xl" />
        </div>
      )}
    </div>
  );
};

export default MyMap;
