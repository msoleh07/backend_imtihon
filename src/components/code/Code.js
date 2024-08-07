import React, { useRef } from "react";
import "./Code.css";
import Barcode from "react-barcode";
import { BsFillPrinterFill, BsX } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";

const Code = ({ text, setOpenBarcode }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => "width",
  });

  return (
    <div className="code_page">
      <div className="container">
        <div className="code_container">
          <div className="code_print">
            <button onClick={() => setOpenBarcode(false)}>
              <BsX />
            </button>
            <button className="printer" onClick={handlePrint}>
              <BsFillPrinterFill />
            </button>
          </div>
          <div ref={componentRef} className="code_card">
            <Barcode value={text} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
