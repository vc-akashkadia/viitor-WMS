import React from "react";
import "./print.css";
import brandLogo from "@assests/img/logo-new.svg";
export default function EIRPrint(props) {
  const { gateType,data } = props;

  return (
    <>
      <div className="ticket">
        <img src={brandLogo} alt="Logo" style={{ display: "block", width: 100, margin: "10px auto"}}/>
        <p className="centered" style={{ marginBottom: "0px" }}>
          {data.FacilityCode}
        </p>
        <br />
        <p className="centered" style={{ marginTop: "0px" }}>
          EQUIPMENT INTERCHANGE RECEIPT
        </p>
        <table>
          <tbody>
            <tr>
              <td className="description" style={{width:"103px"}}>CAMCO VISIT ID:</td>
              <td className="price">{data.SeqNo}</td>
            </tr>
            <tr>
              <td className="description">Print Date:</td>
              <td className="price">{data.printDate}</td>
            </tr>
            <tr>
              <td className="description">Seq. Number:</td>
              <td className="price">{data.SeqNo}</td>
            </tr>
            <tr>
              <td className="description">Terminal ID:</td>
              <td className="price">{data.FacilityCode}</td>
            </tr>
            <tr>
              <td className="description">Vehical No.:</td>
              <td className="price">{data.VehicleNumber}</td>
            </tr>
            <tr>
              <td className="description">Token No.:</td>
              <td className="price">{data.TokenNo}</td>
            </tr>
            <tr>
              <td className="description">Contr. No.:</td>
              <td className="price">{data.ContainerNumber}
                {/* / FULL / OUT */}
              </td>
            </tr>
            <br />

            <tr>
              <td className="description">Consignee:</td>
              <td className="price">{data.Consignee}</td>
            </tr>
            <tr>
              <td className="description">Yard Loc:</td>
              <td className="price">{data.YardLocation}</td>
            </tr>
            <tr>
              <td className="description">Seal No:</td>
              <td className="price">{data.SealNo}</td>
            </tr>
            <tr>
              <td className="description">Customs Seal:</td>
              <td className="price">{data.CustomSeal}</td>
            </tr>
            <tr>
              <td className="description">DPA Seal:</td>
              <td className="price">{data.DOASeal}</td>
            </tr>
            <tr>
              <td className="description">Agent Seal:</td>
              <td className="price">{data.AgentSeal}</td>
            </tr>
            <br />

            <tr>
              <td className="description">Eir No:</td>
              <td className="price">{data.EIRNo}</td>
            </tr>
            <tr>
              <td className="description">EIR Date:</td>
              <td className="price">{data.EIRDate}</td>
            </tr>
            <tr>
              <td className="description">EIR Time:</td>
              <td className="price">{data.EIRTime}</td>
            </tr>
            {gateType === "out" && (
              <>
                <tr>
                  <td className="description" cloSpan="2">
                    VALID FOR DELIVERY UNTIL 07-FEB-14 00:00{" "}
                  </td>
                </tr>
                <hr style={{ borderTop: "dotted 1px" }} />
                <p className="centered" style={{ marginTop: "0px" }}>
                  SECURITY COPY
                </p>
                <tr>
                  <td className="description">Vehicle No:</td>
                  <td className="price">{data.VehicleNumber}</td>
                </tr>
                <tr>
                  <td className="description">Contr No:</td>
                  <td className="price">{data.ContainerNumber}</td>
                </tr>
                <tr>
                  <td className="description">Eir No:</td>
                  <td className="price">{data.EIRNo}</td>
                </tr>
                <tr>
                  <td className="description">EIR Date:</td>
                  <td className="price">{data.EIRDate}</td>
                </tr>
                <tr>
                  <td className="description">EIR Time:</td>
                  <td className="price">{data.EIRTime}</td>
                </tr>
                <hr style={{ borderTop: "dotted 1px" }} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
