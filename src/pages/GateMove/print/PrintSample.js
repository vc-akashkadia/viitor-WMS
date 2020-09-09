import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './print.css'
import brandLogo from "@assests/img/logo-new.svg";
export default function PrintSample(props) {
    const handlePrint = () => {
        window.print();    
    }
    

  return (
    <>
      <div className="ticket">
        <img src={brandLogo} alt="Logo" />
        <p className="centered">
          RECEIPT EXAMPLE
          <br />
          Address line 1
          <br />
          Address line 2
        </p>
        <table>
          <thead>
            <tr>
              <th className="quantity">Q.</th>
              <th className="description">Description</th>
              <th className="price">$$</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="quantity">1.00</td>
              <td className="description">ARDUINO UNO R3</td>
              <td className="price">$25.00</td>
            </tr>
            <tr>
              <td className="quantity">2.00</td>
              <td className="description">JAVASCRIPT BOOK</td>
              <td className="price">$10.00</td>
            </tr>
            <tr>
              <td className="quantity">1.00</td>
              <td className="description">STICKER PACK</td>
              <td className="price">$10.00</td>
            </tr>
            <tr>
              <td className="quantity"></td>
              <td className="description">TOTAL</td>
              <td className="price">$55.00</td>
            </tr>
          </tbody>
        </table>
        <p className="centered">
          Thanks for your purchase!
          <br />
          parzibyte.me/blog
        </p>
      </div>
      <button id="btnPrint" onClick={handlePrint} className="hidden-print">
        Print
      </button>
    </>
  );
}
