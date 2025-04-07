import { useState } from "react";
import jsPDF from "jspdf";
import { AiFillPrinter } from "react-icons/ai";

const Printer = ({ view }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [format, setFormat] = useState("png");

  const takeScreenshot = async () => {
    if (!view) return null;
    try {
      const screenshot = await view.takeScreenshot();
      return screenshot.dataUrl;
    } catch (error) {
      console.error("Nepodarilo sa vytvoriť screenshot:", error);
      return null;
    }
  };

  const downloadPNG = async () => {
    const screenshot = await takeScreenshot();
    if (!screenshot) return;

    const link = document.createElement("a");
    link.href = screenshot;
    link.download = "mapa.png";
    link.click();
  };

  const downloadPDF = async () => {
    const screenshot = await takeScreenshot();
    if (!screenshot) return;

    const pdf = new jsPDF();
    pdf.addImage(screenshot, "PNG", 10, 10, 180, 120); // Upraviť rozmery podľa potreby
    pdf.save("mapa.pdf");
  };

  const handlePrint = async () => {
    if (format === "png") {
      await downloadPNG();
    } else if (format === "pdf") {
      await downloadPDF();
    }
    setIsModalOpen(false); // Zatvor modálne okno po exporte
  };

  return (
    <div className="printer-container">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-baseBlue text-3xl text-baseYellow shadow-xl px-2 pt-1 pb-2 hover:bg-baseBlueDarker transition-colors delay-150"
      >
        <AiFillPrinter />
      </button>

      {isModalOpen && (
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-baseBlue p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-baseYellow">
              Vyberte formát
            </h3>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mb-4"
            >
              <option value="png" className="text-baseBlue">
                PNG
              </option>
              <option value="pdf" className="text-baseBlue">
                PDF
              </option>
            </select>
            <div className="flex gap-4">
              <button
                onClick={handlePrint}
                className="bg-baseBlue text-baseYellow px-4 py-2 rounded shadow-xl border-baseBlueDarker-1"
              >
                Exportovať
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-baseRed text-white px-4 py-2 rounded"
              >
                Zrušiť
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Printer;
