import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import AttachmentsContent from "@arcgis/core/popup/content/AttachmentsContent";
import CustomContent from "@arcgis/core/popup/content/CustomContent";
import TextContent from "@arcgis/core/popup/content/TextContent";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import { Menu, X, Loader } from "lucide-react";

import { useState, useTransition } from "react";

const layerSymbols = {
  test: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  parking: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/parking.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  parkingWheelchair: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/wheelchair.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  obmedzenia: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/traffic.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  ihriska: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/playground.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "20px",
    },
  },
  fontany: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/fountain.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  malekose: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/smallbins.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "20px",
    },
  },
  velkekose: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/bigbins.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "20px",
    },
  },
  psiekose: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/dogo.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "20px",
    },
  },
  stojiska: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/rubbish.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "20px",
    },
  },
  lavicky: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/benches.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  tieniacePlachty: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/sail.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  komunitna: {
    type: "simple",
    symbol: {
      type: "simple-fill", // Použi "simple-fill" na vykreslenie polygónov
      color: [255, 255, 255, 0.5], // Farba výplne polygónu, tu je biela s polovičnou priesvitnosťou
      outline: {
        color: "#2ecc71", // Čierna farba obrysu
        width: 2, // Šírka obrysu
      },
    },
  },
  vencovisko: {
    type: "simple",
    symbol: {
      type: "simple-fill", // Použi "simple-fill" na vykreslenie polygónov
      color: [255, 255, 255, 0.5], // Farba výplne polygónu, tu je biela s polovičnou priesvitnosťou
      outline: {
        color: "#2ecc71", // Čierna farba obrysu
        width: 2, // Šírka obrysu
      },
    },
  },
  schody: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/stairs.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  adresy: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/location.png", // Tento URL môžeš nahradiť podľa potreby
      width: "16px",
      height: "20px",
    },
  },
  budovy: {
    type: "simple",
    symbol: {
      type: "simple-fill", // Použi "simple-fill" na vykreslenie polygónov
      color: [255, 255, 255, 0.5], // Farba výplne polygónu, tu je biela s polovičnou priesvitnosťou
      outline: {
        color: "#3645B2", // Čierna farba obrysu
        width: 2, // Šírka obrysu
      },
    },
  },
  pamiatky: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/monument.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  vrstevnice: {
    type: "simple",
    symbol: {
      color: "#3645B2",
      type: "simple-line",
      style: "solid",
    },
  },
  koty: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/heights.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "20px",
    },
  },
  katastralneUzemie: {
    type: "simple",
    symbol: {
      color: "#FFE100",
      type: "simple-line",
      style: "solid",
    },
  },
  obvody: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/cap.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "20px",
    },
  },
  opatrenia: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/icons/water.png", // Tento URL môžeš nahradiť podľa potreby
      width: "25px",
      height: "28px",
    },
  },
};

let attachmentsElement = new AttachmentsContent({
  displayType: "list",
  orderByFields: [{ field: "ATT_NAME", order: "descending" }],
});

const popupTemplate = {
  parkovanie: {
    title: "Parkovanie Karlova Ves",
    content: "<b>Id:</b> {id}<br><b>EČV:</b> {EČV}",
  },

  parkovanieZŤP: {
    title: "ZŤP Parkovanie Karlova Ves",
    content: "<b>Id:</b> {id}<br><b>EČV:</b> {EČV}",
  },
  obmedzenia: {
    title: "Dopravné obmedzenia",
    content:
      "<b>Id:</b> {id}<br><b>Obmedzenie:</b> {popis}<br><b>Doba trvania obmedzenia:</b> {doba}",
  },
  ihriska: {
    title: "Detské ihriská",
    content: "<b>Id:</b> {1}",
  },
  fontany: {
    title: "Fontány",
    content: "<b>Id:</b> {id}<br><b>Lokalita:</b> {Lokalita}<br>",
  },
  lavicky: {
    title: "Lavičky",
    content: "<b>Id:</b> {ID}",
  },
  malekose: {
    title: "Malé koše",
    content: "<b>Id:</b> {ID}",
  },
  velkekose: {
    title: "Veľké koše",
    content: "<b>Id:</b> {ID}",
  },
  stojiska: {
    title: "Kontajnerové stojiská",
    content:
      "<b>Id:</b> {ID}<br><b>Ulice</b> {Ulica}<br><b>Počty kontajnerov</b> {popis}<br><b>Stojisko</b> {Status}<br><b>Komunikácia v správe</b> {v správe}",
  },
  psiekose: {
    title: "Koše na psie exkrementy",
    content: "<b>Id:</b> {ID}",
  },
  tieniacePlachty: {
    title: "Tieniace plachty",
    outFields: ["id", "Lokalita", "Stav"], // Pridaj potrebné polia
    content: [
      // Definujeme HTML obsah pre text
      new TextContent({
        text: `<b>Id:</b> {id}<br>
          <b>Lokalita:</b> {Lokalita}<br>
          <b>Stav:</b> {Stav}<br>
        `,
      }),

      // Tu môžeš pridať AttachmentsContent pre zobrazenie príloh, ak je to potrebné
      new AttachmentsContent({
        displayType: "list",
        orderByFields: [{ field: "ATT_NAME", order: "descending" }],
      }),
    ],
  },
  komunitna: {
    title: "Komunitná záhrada",
    content: "<b>Id</b>{Id}",
  },
  vencovisko: {
    title: "Venčovisko",
    content: "<b>Id</b>{Id}",
  },
  schody: {
    title: "Schody",
    content: "<b>Id:</b> {id}",
  },
  // pamiatky: {
  //   title: "Pamiatky",
  //   content:
  //     "<b>Id:</b> {id}<br><b>Adresa:</b> {adresa}<br><b>Názov:</b> {názov}<br><b>GPS:</b> {gps}",
  // },
  pamiatky: {
    title: "Pamiatky",
    outFields: ["id", "adresa", "názov, gps"], // Pridaj potrebné polia
    content: [
      // Definujeme HTML obsah pre text
      new TextContent({
        text: `<b>Id:</b> {id}<br><b>Adresa:</b> {adresa}<br><b>Názov:</b> {názov}<br><b>GPS:</b> {gps}
        `,
      }),

      // Tu môžeš pridať AttachmentsContent pre zobrazenie príloh, ak je to potrebné
      new AttachmentsContent({
        displayType: "list",
        orderByFields: [{ field: "ATT_NAME", order: "descending" }],
      }),
    ],
  },
  adresy: {
    title: "Adresy",
    content:
      "<b>Orientačné číslo:</b> {Orientaèn}<br><b>Súpisné číslo:</b> {Súpisné}<br><b>Ulica:</b> {Ulica}<br><b>PSČ:</b> {PSÈ}<br><b>Druh stavby:</b> {Druh stavb}",
  },
  budovy: {
    title: "Budovy",
    content:
      "<b>Súpisné číslo:</b> {SC}<br><b>Číslo parcely:</b> {PARCIS}<br><b>Typ:</b> {TYP}",
  },
  vrstevnice: {
    title: "Vrstevnice",
    content: "<b>Nadmorská výška:</b> {VAL}",
  },
  obvody: {
    title: "Školské obvody",
    content:
      "<b>Ulica:</b> {ulica}<br><b>Orientačné číslo:</b> {orientacne}<br><b>Súpisné číslo:</b> {supisne}<br><b>Obvod:</b> {obvod}",
  },
  koty: {
    title: "Výškové kóty",
    content: "<b>Nadmorská výška:</b> {NnMV}",
  },
  katastralneUzemie: {
    title: "Katarastralne územie",
    content: "Bratislava - Karlova Ves",
  },
  opatrenia: {
    title: "Vodozádržné opatrenia",
    content:
      "<b>Typ opatrenia:</b> {typ_opatre}<br><b>Objem:</b> {objem}<br><b>Realizácia:</b> {realizacia}<br><b>Lokalita:</b> {miesto_rea}",
  },
};

// Funkcia na priradenie vlastnej ikony
const toggleLayer = (layerInfo) => {
  const { url, type } = layerInfo;
  const IconComponent = layerIcons[url];
  setActiveLayer(url);

  if (!IconComponent) {
    console.error("Pre túto vrstvu neexistuje definovaná ikona.");
  }

  let layer;

  if (type === "feature") {
    const customSymbol = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
        width: "18px",
        height: "18px",
      },
    };

    layer = new FeatureLayer({
      url,
      renderer: customSymbol,
      popupTemplate,
    });
  } else if (type === "tile") {
    layer = new TileLayer({ url });
  } else {
    console.error("Nepodporovaný typ vrstvy:", type);
    return;
  }

  map.add(layer);
};

const toggleTileLayer = (url) => {
  const tileLayer = new TileLayer({ url });
  map.add(tileLayer);
};

const Header = ({ toggleLayer, toggleTileLayer }) => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleMenu = () => {
    startTransition(() => {
      setMenuOpen(true);
    });
  };

  const handleLayerToggle = (url, symbol) => {
    if (activeLayer === url) {
      setActiveLayer(null);
    } else {
      setActiveLayer(url);
    }

    toggleLayer(url, symbol);
    toggleTileLayer(url);
  };

  return (
    <>
      <div className="absolute left-1/2 -translate-x-[50%] w-full h-10 flex lg:hidden items-center  justify-center top-3 justify-center text-white text-2xl">
        <div
          className="flex justify-center items-center bg-baseBlue p-2 rounded-full shadow-xl cursor-pointer z-50"
          onClick={toggleMenu}
        >
          <Menu />
        </div>
      </div>
      <div className="absolute hidden  lg:block left-1/2 -translate-x-[50%] top-3 bg-baseBlue py-2 px-5 rounded-3xl shadow-xl text-baseYellow">
        <ul className="flex items-center w-full space-x-6">
          <li className="relative group py-2 flex-1 text-center">
            <div className="text-white text-md font-semibold hover:text-yellow-400">
              Doprava
            </div>
            <ul className="absolute -left-2 mt-2 space-y-2 bg-baseBlue text-white py-2 px-4 rounded-md shadow-lg hidden group-hover:block">
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanie/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanie/FeatureServer",
                      layerSymbols["parking"],
                      popupTemplate["parkovanie"]
                    )
                  }
                >
                  {isPending ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    "Parkovanie pre fyzické osoby"
                  )}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanieZTP/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanieZTP/FeatureServer",
                      layerSymbols["parkingWheelchair"],
                      popupTemplate["parkovanieZŤP"]
                    )
                  }
                >
                  Parkovacie miesta ZŤP
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/dopravneObmedzenia/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/dopravneObmedzenia/FeatureServer",
                      layerSymbols["obmedzenia"],
                      popupTemplate["obmedzenia"]
                    )
                  }
                >
                  Dopravné obmedzenia
                </a>
              </li>
            </ul>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="text-center">
            <div
              className="text-white text-md font-semibold hover:text-yellow-400"
              onClick={() =>
                toggleLayer(
                  "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/obvodyNew/FeatureServer",
                  layerSymbols["test"]
                )
              }
            >
              Zeleň
            </div>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="relative group py-2 flex-1 text-center">
            <div className="text-white text-md font-semibold hover:text-yellow-400">
              Infraštruktúra
            </div>
            <ul className="absolute -left-2 mt-2 space-y-2 bg-baseBlue text-white py-2 px-4 rounded-md shadow-lg hidden group-hover:block">
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/pieskoviska/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/pieskoviska/FeatureServer",
                      layerSymbols["ihriska"],
                      popupTemplate["ihriska"]
                    )
                  }
                >
                  Detské ihriská
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/tieniace__plachty/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/tieniace__plachty/FeatureServer",
                      layerSymbols["tieniacePlachty"],
                      popupTemplate["tieniacePlachty"]
                    )
                  }
                >
                  Tieniace plachty
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/schody/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/schody/FeatureServer",
                      layerSymbols["schody"],
                      popupTemplate["schody"]
                    )
                  }
                >
                  Schody
                </a>
              </li>
            </ul>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="relative group py-2 flex-1 text-center">
            <div className="text-white text-md font-semibold hover:text-yellow-400">
              Občianska vybavenosť
            </div>
            <ul className="absolute -left-2 mt-2 space-y-2 bg-baseBlue text-white py-2 px-4 rounded-md shadow-lg hidden group-hover:block">
              <li>
                <a
                  href="#"
                  className="block text-md hover:text-yellow-400"
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/Fontany/FeatureServer",
                      layerSymbols["fontany"],
                      popupTemplate["fontany"]
                    )
                  }
                >
                  Fontány
                </a>
              </li>
              <li className="text-center">
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/lavicky/FeatureServer"
                      ? "text-yellow-400"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/lavicky/FeatureServer",
                      layerSymbols["lavicky"],
                      popupTemplate["lavicky"]
                    )
                  }
                >
                  Lavičky
                </a>
              </li>
              <li className="text-center">
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/malekose/FeatureServer"
                      ? "text-yellow-400"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/malekose/FeatureServer",
                      layerSymbols["malekose"],
                      popupTemplate["malekose"]
                    )
                  }
                >
                  Malé koše
                </a>
              </li>
              <li className="text-center">
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/velkekose/FeatureServer"
                      ? "text-yellow-400"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/velkekose/FeatureServer",
                      layerSymbols["velkekose"],
                      popupTemplate["velkekose"]
                    )
                  }
                >
                  Veľké koše
                </a>
              </li>
              <li className="text-center">
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/psiekose/FeatureServer"
                      ? "text-yellow-400"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/psiekose/FeatureServer",
                      layerSymbols["psiekose"],
                      popupTemplate["psiekose"]
                    )
                  }
                >
                  Koše na psie exkrementy
                </a>
              </li>
              <li className="text-center">
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/stojiska/FeatureServer"
                      ? "text-yellow-400"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/stojiska/FeatureServer",
                      layerSymbols["stojiska"],
                      popupTemplate["stojiska"]
                    )
                  }
                >
                  Kontajnerové stojiská
                </a>
              </li>
              <li className="text-center">
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 text-bold ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/komunitna/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/komunitna/FeatureServer",
                      layerSymbols["komunitna"],
                      popupTemplate["komunitna"]
                    )
                  }
                >
                  Komunitná záhrada
                </a>
              </li>
              <li className="text-center">
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 text-bold ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/vencovisko/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/vencovisko/FeatureServer",
                      layerSymbols["vencovisko"],
                      popupTemplate["vencovisko"]
                    )
                  }
                >
                  Venčovisko
                </a>
              </li>
            </ul>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="text-center">
            <a
              href="#"
              className={`block text-md hover:text-yellow-400 text-bold ${
                activeLayer ===
                "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/pamiatky/FeatureServer"
                  ? "text-yellow-400 font-bold"
                  : "text-white font-bold"
              }`}
              onClick={() =>
                toggleLayer(
                  "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/pamiatky/FeatureServer",
                  layerSymbols["pamiatky"],
                  popupTemplate["pamiatky"]
                )
              }
            >
              Pamiatky
            </a>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="relative group py-2 flex-1 text-center">
            <div className="text-white text-md font-semibold hover:text-yellow-400">
              Orientácia
            </div>
            <ul className="absolute -left-2 mt-2 space-y-2 bg-baseBlue text-white py-2 px-4 rounded-md shadow-lg hidden group-hover:block">
              <li>
                <a
                  href="#"
                  className="block text-md hover:text-yellow-400"
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/adresy/FeatureServer",
                      layerSymbols["adresy"],
                      popupTemplate["adresy"]
                    )
                  }
                >
                  Adresy
                </a>
              </li>
              <li className="text-center">
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 text-bold ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/budovy/FeatureServer"
                      ? "text-yellow-400"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/budovy/FeatureServer",
                      layerSymbols["budovy"],
                      popupTemplate["budovy"]
                    )
                  }
                >
                  Budovy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-md hover:text-yellow-400"
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/vrstevnice/FeatureServer",
                      layerSymbols["vrstevnice"],
                      popupTemplate["vrstevnice"]
                    )
                  }
                >
                  Vrstevnice
                </a>
              </li>
              <li className="text-center">
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/koty/FeatureServer"
                      ? "text-yellow-400"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/koty/FeatureServer",
                      layerSymbols["koty"],
                      popupTemplate["koty"]
                    )
                  }
                >
                  Výškové kóty
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-md hover:text-yellow-400"
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/katastralneUzemie/FeatureServer",
                      layerSymbols["katastralneUzemie"],
                      popupTemplate["katastralneUzemie"]
                    )
                  }
                >
                  Katastrálne územie
                </a>
              </li>
            </ul>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="relative group py-2 flex-1 text-center">
            <div className="text-white text-md font-semibold hover:text-yellow-400">
              Školstvo
            </div>
            <ul className="absolute -left-2 mt-2 space-y-2 bg-baseBlue text-white py-2 px-4 rounded-md shadow-lg hidden group-hover:block">
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/%C5%A1kolsk%C3%A9_obvody/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/%C5%A1kolsk%C3%A9_obvody/FeatureServer",
                      layerSymbols["obvody"],
                      popupTemplate["obvody"]
                    )
                  }
                >
                  Školské obvody
                </a>
              </li>
            </ul>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="relative group py-2 flex-1 text-center">
            <div className="text-white text-md font-semibold hover:text-yellow-400">
              Klíma
            </div>
            <ul className="absolute -left-2 mt-2 space-y-2 bg-baseBlue text-white py-2 px-4 rounded-md shadow-lg hidden group-hover:block">
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/vzopatrenia/FeatureServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/vzopatrenia/FeatureServer",
                      layerSymbols["opatrenia"],
                      popupTemplate["opatrenia"]
                    )
                  }
                >
                  Vodozádržné opatrenia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/odtokovy_model_tiled/MapServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleTileLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/odtokovy_model_tiled/MapServer"
                    )
                  }
                >
                  Odtokový model
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`block text-md hover:text-yellow-400 ${
                    activeLayer ===
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/odtokovy_model_tiled/MapServer"
                      ? "text-yellow-400 font-bold"
                      : "text-white"
                  }`}
                  onClick={() =>
                    toggleTileLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/odtokovy_model_tiled/MapServer"
                    )
                  }
                >
                  Odtokový model
                </a>
              </li>
            </ul>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="text-center">
            <a
              href="#"
              className="text-white text-md font-semibold hover:text-yellow-400"
            >
              Historické mapy
            </a>
          </li>
        </ul>
      </div>

      {menuOpen ? (
        <div className="h-full w-full md:w-[60%] absolute left-0 top-0 z-50 shadow-2xl bg-baseBlue px-4 py-2 flex flex-col gap-2">
          <div className="flex justify-between">
            <a href="https://www.karlovaves.sk/">
              <img
                src="/logo/karlovaVesLogo.png"
                alt="logo Karlova Ves"
                width={60}
                height={60}
              />
            </a>
            <button
              className="bg-red-400 rounded-full shadow-2xl text-red-600 w-10 h-10 flex justify-center items-center"
              onClick={() => setMenuOpen(false)}
            >
              <X />
            </button>
          </div>
          <h1 className="text-white text-center">
            GIS Bratislava - Karlova Ves
          </h1>
          <ul className="menu flex flex-col items-center w-full space-y-2">
            <li>
              <details closed>
                <summary className="text-white text-md font-semibold hover:text-yellow-400">
                  Doprava
                </summary>

                <li>
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanie/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanie/FeatureServer",
                        layerSymbols["parking"],
                        popupTemplate["parkovanie"]
                      )
                    }
                  >
                    {isPending ? (
                      <FaSpinner className="animate-spin mr-2" />
                    ) : (
                      "Parkovanie pre fyzické osoby"
                    )}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanieZTP/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanieZTP/FeatureServer",
                        layerSymbols["parkingWheelchair"],
                        popupTemplate["parkovanieZŤP"]
                      )
                    }
                  >
                    Parkovacie miesta ZŤP
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/dopravneObmedzenia/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/dopravneObmedzenia/FeatureServer",
                        layerSymbols["obmedzenia"],
                        popupTemplate["obmedzenia"]
                      )
                    }
                  >
                    Dopravné obmedzenia
                  </a>
                </li>
              </details>
            </li>

            <li>
              <details closed>
                <summary className="text-white text-md font-semibold hover:text-yellow-400">
                  Zeleň
                </summary>

                <li>
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/obvodyNew/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/obvodyNew/FeatureServer",
                        layerSymbols["test"],
                        popupTemplate["parkovanie"]
                      )
                    }
                  >
                    Parkovanie
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanieZTP/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/parkovanieZTP/FeatureServer",
                        layerSymbols["test"],
                        popupTemplate["parkovanieZŤP"]
                      )
                    }
                  >
                    Parkovacie miesta ZŤP
                  </a>
                </li>
              </details>
            </li>

            <li>
              <details closed>
                <summary className="text-white text-md font-semibold hover:text-yellow-400">
                  Infraštruktúra
                </summary>
                <li>
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/pieskoviska/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/pieskoviska/FeatureServer",
                        layerSymbols["ihriska"],
                        popupTemplate["ihriska"]
                      )
                    }
                  >
                    Detské ihriská
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/tieniace__plachty/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/tieniace__plachty/FeatureServer",
                        layerSymbols["tieniacePlachty"],
                        popupTemplate["tieniacePlachty"]
                      )
                    }
                  >
                    Tieniace plachty
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/schody/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/schody/FeatureServer",
                        layerSymbols["schody"],
                        popupTemplate["schody"]
                      )
                    }
                  >
                    Schody
                  </a>
                </li>
              </details>
            </li>

            <li>
              <details closed>
                <summary className="text-white text-md font-semibold hover:text-yellow-400">
                  Občianska vybavenosť
                </summary>
                <li>
                  <a
                    href="#"
                    className="block text-md hover:text-yellow-400"
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/Fontany/FeatureServer",
                        layerSymbols["fontany"],
                        popupTemplate["fontany"]
                      )
                    }
                  >
                    Fontány
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/lavicky/FeatureServer"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/lavicky/FeatureServer",
                        layerSymbols["lavicky"],
                        popupTemplate["lavicky"]
                      )
                    }
                  >
                    Lavičky
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/malekose/FeatureServer"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/malekose/FeatureServer",
                        layerSymbols["malekose"],
                        popupTemplate["malekose"]
                      )
                    }
                  >
                    Malé koše
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/velkekose/FeatureServer"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/velkekose/FeatureServer",
                        layerSymbols["velkekose"],
                        popupTemplate["velkekose"]
                      )
                    }
                  >
                    Veľké koše
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/psiekose/FeatureServer"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/psiekose/FeatureServer",
                        layerSymbols["psiekose"],
                        popupTemplate["psiekose"]
                      )
                    }
                  >
                    Koše na psie exkrementy
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/stojiska/FeatureServer"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/stojiska/FeatureServer",
                        layerSymbols["stojiska"],
                        popupTemplate["stojiska"]
                      )
                    }
                  >
                    Kontajnerové stojiská
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 text-bold ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/komunitna/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/komunitna/FeatureServer",
                        layerSymbols["komunitna"],
                        popupTemplate["komunitna"]
                      )
                    }
                  >
                    Komunitná záhrada
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 text-bold ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/vencovisko/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/vencovisko/FeatureServer",
                        layerSymbols["vencovisko"],
                        popupTemplate["vencovisko"]
                      )
                    }
                  >
                    Venčovisko
                  </a>
                </li>
              </details>
            </li>

            <li className="text-center">
              <a
                href="#"
                className="text-white text-md font-semibold hover:text-yellow-400"
                onClick={() =>
                  toggleLayer(
                    "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/pamiatky/FeatureServer",
                    layerSymbols["pamiatky"],
                    popupTemplate["pamiatky"]
                  )
                }
              >
                Pamiatky
              </a>
            </li>

            <li>
              <details closed>
                <summary className="text-white text-md font-semibold hover:text-yellow-400">
                  Orientácia
                </summary>
                <li>
                  <a
                    href="#"
                    className="block text-md hover:text-yellow-400"
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/adresy/FeatureServer",
                        layerSymbols["adresy"],
                        popupTemplate["adresy"]
                      )
                    }
                  >
                    Adresy
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 text-bold ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/budovy/FeatureServer"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/budovy/FeatureServer",
                        layerSymbols["budovy"],
                        popupTemplate["budovy"]
                      )
                    }
                  >
                    Budovy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-md hover:text-yellow-400"
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/vrstevnice/FeatureServer",
                        layerSymbols["vrstevnice"],
                        popupTemplate["vrstevnice"]
                      )
                    }
                  >
                    Vrstevnice
                  </a>
                </li>
                <li className="text-center">
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/koty/FeatureServer"
                        ? "text-yellow-400"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/koty/FeatureServer",
                        layerSymbols["koty"],
                        popupTemplate["koty"]
                      )
                    }
                  >
                    Výškové kóty
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-md hover:text-yellow-400"
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/katastralneUzemie/FeatureServer",
                        layerSymbols["katastralneUzemie"],
                        popupTemplate["katastralneUzemie"]
                      )
                    }
                  >
                    Katastrálne územie
                  </a>
                </li>
              </details>
            </li>

            <li>
              <details closed>
                <summary className="text-white text-md font-semibold hover:text-yellow-400">
                  Školstvo
                </summary>
                <li>
                  <a
                    href="#"
                    className={`block text-md hover:text-yellow-400 ${
                      activeLayer ===
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/%C5%A1kolsk%C3%A9_obvody/FeatureServer"
                        ? "text-yellow-400 font-bold"
                        : "text-white"
                    }`}
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/%C5%A1kolsk%C3%A9_obvody/FeatureServer",
                        layerSymbols["obvody"],
                        popupTemplate["obvody"]
                      )
                    }
                  >
                    Školské obvody
                  </a>
                </li>
              </details>
            </li>
            <li className="text-center">
              <a
                href="#"
                className="text-white text-md font-semibold hover:text-yellow-400"
              >
                Historické mapy
              </a>
            </li>
          </ul>
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
              <Loader className="animate-spin text-white text-4xl" />
            </div>
          )}
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
};

export default Header;
