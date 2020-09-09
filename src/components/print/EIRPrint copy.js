import React from "react";
import "./print.css";
import brandLogo from "@assests/img/logo-new.svg";
export default function EIRPrint(props) {
  

  return (
    <>
      <div className="ticket">
      <img src={brandLogo} alt="Logo" />
        <p className="centered" style={{marginBottom:'0px'}}>
          JEBEL ALI PORT
        </p>
        <br />
        <p className="centered" style={{marginTop:'0px'}}>
          EQUIPMENT INTERCHANGE RECEIPT
        </p>
        <table>
          <tbody>
            <tr>
              <td className="description">CAMCO VISIT ID:</td>
              <td className="price">8164621</td>
            </tr>
            <tr>
              <td className="description">Print Date</td>
              <td className="price">28-May-2020 19:00:19</td>
            </tr>
            <tr>
              <td className="description">seq. Number</td>
              <td className="price">8164621</td>
            </tr>
            <tr>
              <td className="description">Terminal ID</td>
              <td className="price">T1</td>
            </tr>
            <tr>
              <td className="description">Vehical No.</td>
              <td className="price">61349</td>
            </tr>
            <tr>
              <td className="description">Token No.</td>
              <td className="price">972401</td>
            </tr>
            <tr>
              <td className="description">Contr. No.</td>
              <td className="price">TEMJ628066 / FULL / OUT</td>
            </tr>
            <br />
            
            <tr>
              <td className="description">Consignee</td>
              <td className="price">QUEBEISI S</td>
            </tr>
            <tr>
              <td className="description">Yard Loc:</td>
              <td className="price">74E9882</td>
            </tr>
            <tr>
              <td className="description">Seal No:</td>
              <td className="price"></td>
            </tr>
            <tr>
              <td className="description">Customs Seal</td>
              <td className="price"></td>
            </tr>
            <tr>
              <td className="description">DPA Seal</td>
              <td className="price"></td>
            </tr>
            <tr>
              <td className="description">Agent Seal</td>
              <td className="price"></td>
            </tr>
            <br />
            
            <tr>
              <td className="description">Eir No:</td>
              <td className="price">21242</td>
            </tr>
            <tr>
              <td className="description">EIR Date</td>
              <td className="price">07-Mar-2013</td>
            </tr>
            <tr>
              <td className="description">EIR Time</td>
              <td className="price">10:02</td>
            </tr>
            
          </tbody>
        </table>
      </div>
      
    </>
  );
}
