import React from "react";
import "./print.css";
export default function LocationPrint(props) {
  const { data } = props;

  return (
    <>
      <div className="ticket">
        <p className="centered">Location Slip</p>
        <table>
          <tbody>
            <tr>
              <td className="description" style={{ width: "103px" }}>
                CAMCO VISIT ID:
              </td>
              <td className="price">{data.visitId}</td>
            </tr>
            <tr>
              <td className="description">Print Date:</td>
              <td className="price">{data.printDate}</td>
            </tr>
            <tr>
              <td className="description">Req. Number:</td>
              <td className="price">{data.reqestNumber}</td>
            </tr>
            <tr>
              <td className="description">Facility Code:</td>
              <td className="price">{data.facilityName}</td>
            </tr>
            <tr>
              <td className="description">Vehical No.:</td>
              <td className="price">
                {data.vehicleNumber !== null ? data.vehicleNumber : ""}
              </td>
            </tr>
            {/* <tr>
              <td className="description">Token No.</td>
              <td className="price">972401</td>
            </tr> */}
            <tr>
              <td className="description">Contr. No.:</td>
              <td className="price">
                {data.containerNumber !== null ? data.containerNumber : ""}
                {/* / FULL / OUT */}
              </td>
            </tr>
            <tr>
              <td className="description">Current Loc.:</td>
              <td className="price">
                {data.currentLocation !== null ? data.currentLocation : ""}
              </td>
            </tr>
            <tr>
              <td className="description">Seal No.:</td>
              <td className="price">8164621</td>
            </tr>
            <tr>
              <td className="description">Remarks:</td>
              <td className="price">
                {data.remarks !== null ? data.remarks : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
