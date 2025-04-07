import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import AttachmentsContent from "@arcgis/core/popup/content/AttachmentsContent";
import CustomContent from "@arcgis/core/popup/content/CustomContent";
import TextContent from "@arcgis/core/popup/content/TextContent";
import { Menu, X } from "lucide-react";

import {
  FaParking,
  FaTrafficLight,
  FaTree,
  FaLandmark,
  FaMap,
} from "react-icons/fa";
import { useState } from "react";

// Mapa URL na vlastné ikony
const layerIcons = {
  "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/adresy/FeatureServer":
    FaParking,
  "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/vrstevnice/FeatureServer":
    FaTrafficLight,
  "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/obvodyNew/FeatureServer":
    FaTree,
  "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/pamiatky/FeatureServer":
    FaLandmark,
  "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/historickeMapy/FeatureServer":
    FaMap,
};

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
  fontany: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "/logo/karlovaVesLogo.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  tieniacePlachty: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png", // Tento URL môžeš nahradiť podľa potreby
      width: "18px",
      height: "18px",
    },
  },
  pamiatky: {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png", // Tento URL môžeš nahradiť podľa potreby
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
  katastralneUzemie: {
    type: "simple",
    symbol: {
      color: "#FFE100",
      type: "simple-line",
      style: "solid",
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

  fontany: {
    title: "Fontány",
    content: "<b>Id:</b> {id}<br><b>Lokalita:</b> {Lokalita}<br>",
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
  pamiatky: {
    title: "Pamiatky",
    content:
      "<b>Id:</b> {id}<br><b>Adresa:</b> {adresa}<br><b>Názov:</b> {názov}<br><b>GPS:</b> {gps}",
  },
  adresy: {
    title: "Adresy",
    content:
      "<b>Orientačné číslo:</b> {Orientaèn}<br><b>Súpisné číslo:</b> {Súpisné}<br><b>Ulica:</b> {Ulica}<br><b>PSČ:</b> {PSÈ}<br><b>Druh stavby:</b> {Druh stavb}",
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
  katastralneUzemie: {
    title: "Katarastralne územie",
    content: "Bratislava - Karlova Ves",
  },
};

// Funkcia na priradenie vlastnej ikony
const toggleLayer = (url) => {
  const IconComponent = layerIcons[url];
  setActiveLayer(url);

  if (!IconComponent) {
    console.error("Pre túto vrstvu neexistuje definovaná ikona.");
    return;
  }

  const customSymbol = {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
      width: "18px",
      height: "18px",
    },
  };

  const layer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
    renderer: customSymbol,
    popupTemplate,
  });

  map.add(layer);
};

const Header = ({ toggleLayer }) => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(true);
  };

  const handleLayerToggle = (url, symbol) => {
    if (activeLayer === url) {
      setActiveLayer(null);
    } else {
      setActiveLayer(url);
    }

    toggleLayer(url, symbol);
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
            <a
              href="#"
              className="text-white text-md font-semibold hover:text-yellow-400"
            >
              Doprava
            </a>
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
            </ul>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="text-center">
            <a
              href="#"
              className="text-white text-md font-semibold hover:text-yellow-400"
              onClick={() =>
                toggleLayer(
                  "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/obvodyNew/FeatureServer",
                  layerSymbols["test"]
                )
              }
            >
              Zeleň
            </a>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="relative group py-2 flex-1 text-center">
            <a
              href="#"
              className="text-white text-md font-semibold hover:text-yellow-400"
            >
              Infraštruktúra
            </a>
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
            </ul>
          </li>
          <li className="text-center">
            <span className="text-white text-lg">|</span>
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
          <li className="text-center">
            <span className="text-white text-lg">|</span>
          </li>
          <li className="relative group py-2 flex-1 text-center">
            <a
              href="#"
              className="text-white text-md font-semibold hover:text-yellow-400"
            >
              Orientácia
            </a>
            <ul className="absolute -left-2 mt-2 space-y-2 bg-baseBlue text-white py-2 px-4 rounded-md shadow-lg hidden group-hover:block">
              <li>
                <a
                  href="#"
                  className="block text-md hover:text-yellow-400"
                  onClick={() =>
                    toggleLayer(
                      "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/adresy/FeatureServer",
                      layerSymbols["pamiatky"],
                      popupTemplate["adresy"]
                    )
                  }
                >
                  Adresy
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
                      layerSymbols["test"],
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
              <details open>
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
              <details open>
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

            <li className="relative group py-2 flex-1 text-center">
              <a
                href="#"
                className="text-white text-md font-semibold hover:text-yellow-400"
              >
                Infraštruktúra
              </a>
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
              </ul>
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

            <li className="relative group py-2 flex-1 text-center">
              <a
                href="#"
                className="text-white text-md font-semibold hover:text-yellow-400"
              >
                Orientácia
              </a>
              <ul className="absolute -left-2 mt-2 space-y-2 bg-baseBlue text-white py-2 px-4 rounded-md shadow-lg hidden group-hover:block">
                <li>
                  <a
                    href="#"
                    className="block text-md hover:text-yellow-400"
                    onClick={() =>
                      toggleLayer(
                        "https://services6.arcgis.com/CbTtVUhOyFMCoKPU/arcgis/rest/services/adresy/FeatureServer",
                        layerSymbols["pamiatky"],
                        popupTemplate["adresy"]
                      )
                    }
                  >
                    Adresy
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
                        layerSymbols["test"],
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
              <a
                href="#"
                className="text-white text-md font-semibold hover:text-yellow-400"
              >
                Historické mapy
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
};

export default Header;
