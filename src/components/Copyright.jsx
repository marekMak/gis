import { useState } from "react";
import { FaCopyright } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
const Copyright = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    document.getElementById("sideBar").style.width = "100%";
    document.getElementById("sideNav").style.width = "60%";
    console.log(isModalOpen);
  };
  return (
    <>
      <button
        onClick={() => handleModal()}
        className="bg-baseBlue text-2xl text-baseYellow shadow-xl px-2 py-2 hover:bg-baseBlueDarker transition-colors delay-150"
      >
        <FaCopyright />
      </button>
      {isModalOpen && (
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-end bg-black bg-opacity-50">
          <div className="copyright-modal bg-baseBlue shadow-2xl px-10 py-2 h-full flex items-center  relative">
            <ul className="text-sm text-white">
              <li>
                <span className="">Adresy</span> © Bratislavský samosprávny kraj
                podla zmluvy č. 026 041 0112
              </li>
              <li>
                <span className="text-bold">Uličná sieť</span> © Bratislavský
                samosprávny kraj podla zmluvy č. 026 041 0112
              </li>
              <li>
                <span className="text-bold">Stavby</span> © Mestská časť
                Bratislava-Karlova Ves
              </li>
              <li>
                <span className="text-bold">Zimná údržba: chodníky</span> ©
                Mestská časť Bratislava-Karlova Ves 2016
              </li>
              <li>
                <span className="text-bold">Zimná údržba: schody</span> ©
                Mestská časť Bratislava-Karlova Ves 2016
              </li>
              <li>
                <span className="text-bold">Zimná údržba: cesty</span> © Mestská
                časť Bratislava-Karlova Ves 2016
              </li>
              <li>
                <span className="text-bold">Parkovacie miesta ZŤP</span> ©
                Mestská časť Bratislava-Karlova Ves 2017
              </li>

              <li>
                <span className="text-bold">
                  Vyhradené parkovacie miesta pre fyzické osoby
                </span>
                © Mestská časť Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">
                  Vyhradené parkovacie miesta pre právnické osoby
                </span>{" "}
                © Mestská časť Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">
                  Rezidenčná parkovacia zóna Silvánska
                </span>{" "}
                © Mestská časť Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">
                  Rezidenčná parkovacia zóna Veternicová
                </span>{" "}
                © Mestská časť Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Detské ihriská</span> © Mestská časť
                Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Schody</span> © Mestská časť
                Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">ParcelyE</span> © Geografický a
                kartografický ústav Bratislava, 2017
              </li>
              <li>
                <span className="text-bold">ParcelyC</span> © Geografický a
                kartografický ústav Bratislava, 2017
              </li>
              <li>
                <span className="text-bold">Hranica katastrálneho územia</span>{" "}
                © Geografický a kartografický ústav Bratislava, 2017
              </li>
              <li>
                <span className="text-bold">Lavičky</span> © Mestská časť
                Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Fontány</span> © Mestská časť
                Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Malé koše</span> © Mestská časť
                Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Košie na psie exkrementy</span> ©
                Mestská časť Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Pieskoviská</span> © Mestská časť
                Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Veľké koše</span> © Mestská časť
                Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Psi</span> © Mestská časť
                Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Plochy kosené MČ KV</span> © Mestská
                časť Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Výsadba v MČ Karlova Ves</span> ©
                Mestská časť Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Kontrola parkovania</span> © Mestská
                časť Bratislava-Karlova Ves 2017
              </li>
              <li>
                <span className="text-bold">Chodníky - Magistrát</span> ©
                Magistrát Hlavného mesta SR Bratislavy 2021
              </li>
              <li>
                <span className="text-bold">Cesty - Magistrát</span> © Magistrát
                Hlavného mesta SR Bratislavy 2021
              </li>
              <li>
                <span className="text-bold">Ortofotomapa</span> ©
                SURVEYE,s.r.o.,EUROSENSE,s.r.o., 2016
              </li>
              <li>
                <span className="text-bold">Historická ortofotomapa</span> ©
                EUROSENSE, s.r.o a GEODIS SLOVAKIA, s.r.o., 1949
              </li>
              <li>
                <span className="text-bold">Historické LMS</span> © Topografický
                ústav Banská Bystrica
              </li>
            </ul>
            <MdCancel
              className="absolute top-5 right-2 text-baseRed text-3xl cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Copyright;
