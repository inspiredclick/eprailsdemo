import React, { useContext, useState, useEffect } from "react";
import { CableContext } from "../cable";
import { CookiesProvider, useCookies } from "react-cookie";

export default () => {
  const [shipments, setShipments] = useState([]);
  const [epChannel, setEpChannel] = useState(null);
  const [cookies, setCookie] = useCookies(["sess_id"]);
  const cableContext = useContext(CableContext);
  const trimValue = (value, length) => {
    return value.substr(value.length - length);
  }

  const statusClass = (status) => {
    if (status === "delivered") {
      return "text-bg-success";
    }
    else if (status === "in_transit") {
      return "text-bg-info";
    }
    else {
      return "text-bg-light";
    }
  };

  useEffect(() => {
    const epChannel = cableContext.cable.subscriptions.create({channel: "EasyPostChannel", sess_id: cookies["sess_id"]}, {
      received: (data) => {
        switch (data["command"]) {
          case 0:
            setShipments(data["payload"]);
            break;
          default:
            break;
        }
      }
    });
    setTimeout(() => {
      epChannel.send({"command": 0, "sess_id": cookies["sess_id"]});
    }, 200);
  }, []);

  return (
  <>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Status</th>
          <th scope="col">Tracking</th>
          <th scope="col">Cost</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map((shipment) => (
          <tr key={shipment["id"]}>
            <th scope="row">...{trimValue(shipment["id"], 5)}</th>
            <td><span className={"badge "+statusClass(shipment["status"])}>{shipment["status"]}</span></td>
            <td>...{trimValue(shipment["tracking_code"], 20)}</td>
            <td>${shipment["price"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)};
