import React from "react";
import "./print.css";
export default function LocationPrint(props) {
  

  return (
    <>
      <div className="ticket">
        <p className="centered">
          Location Slip
        </p>
        <table>
          <tbody>
            <tr>
              <td className="description">CAMCO VISIT ID:</td>
              <td className="price">8164621</td>
            </tr>
            <tr>
              <td className="description">LANE</td>
              <td className="price">1ICG12</td>
            </tr>
            <tr>
              <td className="description">Print Date</td>
              <td className="price">28-May-2020 19:00:19</td>
            </tr>
            <tr>
              <td className="description">Req. Number</td>
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
            <tr>
              <td className="description">Current Loc.:</td>
              <td className="price">11E08C1</td>
            </tr>
            <tr>
              <td className="description">Seal No.:</td>
              <td className="price">8164621</td>
            </tr>
            <tr>
              <td className="description">Remarsk</td>
              <td className="price">8164621</td>
            </tr>
            
          </tbody>
        </table>
      </div>
      
    </>
  );
}
