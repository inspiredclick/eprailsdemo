import React, { useEffect, useContext, useState } from "react";
import { CableContext } from "../../cable";
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';

const GET_SHIPMENT = 2;
let epChannel = null;

export default () => {
  const cableContext = useContext(CableContext);
  const [cookies, setCookie] = useCookies(["sess_id"]);
  const { shp_id } = useParams();
  const [rates, setRates] = useState([]);

  useEffect(() => {
    epChannel = cableContext.cable.subscriptions.create({channel: "EasyPostChannel", sess_id: cookies["sess_id"]}, {
      received: (data) => {
        switch (data["command"]) {
          case GET_SHIPMENT:
            setRates(data["payload"]["rates"]);
            break;
          default:
            break;
        }
      }
    });
    setTimeout(() => {
      epChannel.send({"command": GET_SHIPMENT, "sess_id": cookies["sess_id"], payload: {id: shp_id} });
    }, 200);
  }, []);

  return (
    <>
      <h1>Rates</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Carrier</th>
            <th scope="col">Service</th>
            <th scope="col">Rate</th>
            <th scope="col">Est. Delivery Days</th>
            <th scope="col">Select</th>
          </tr>
        </thead>
        <tbody>
        {rates && rates.map((rate) => {
          return (
            <tr key={rate["id"]}>
              <td>{rate["carrier"]}</td>
              <td>{rate["service"]}</td>
              <td>${rate["rate"]}</td>
              <td>{rate["est_delivery_days"]}</td>
              <td></td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </>
  );
}
