import React, { useEffect, useState, useContext } from "react";
import Recipient from "./Recipient";
import Parcel from "./Parcel";
import { CableContext } from "../../cable";
import { useCookies } from "react-cookie";

const CREATE_SHIPMENT = 1;

let epChannel = null;

export default () => {
  const [senderId, setSenderId] = useState(null);
  const [senders, setSenders] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [parcel, setParcel] = useState(null);
  const cableContext = useContext(CableContext);
  const [cookies, setCookie] = useCookies(["sess_id"]);

  const getAddresses = () => {
    const url = "/api/v1/address";
    fetch(url, {
      'content-type': 'application/json',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response);
        setSenders(response);
      })
      .catch((e) => console.log(e.message));
  }

  useEffect(() => {
    epChannel = cableContext.cable.subscriptions.create({channel: "EasyPostChannel", sess_id: cookies["sess_id"]}, {
      received: (data) => {
        switch (data["command"]) {
          case CREATE_SHIPMENT:
            window.location.href = `/shipment/${data["payload"]["id"]}/rate`;
            break;
          default:
            break;
        }
      }
    });

    getAddresses();
  }, []);

  const onValidForm = (parcelData) => {
    if (recipient && epChannel) {
      epChannel.send({"command": CREATE_SHIPMENT, "sess_id": cookies["sess_id"], "payload": {recipient, parcel: parcelData, sender_id: senderId || 1}});
    }
  }

  return (
    <>
      <h1>New Shipment</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sender</h5>
          <form>
            <select className="form-control" onSelect={(e) => setSenderId(e.value)}>
              {senders && senders.map((address, index) => {
                return (
                  <option key={index} value={address.id}>{address.name} {address.address1} {address.address2} {address.city} {address.zip} {address.country}</option>
                )
              })}
            </select>
          </form>
        </div>
      </div>
      <div>&nbsp;</div>
      <Recipient onValidAddress={(data) => setRecipient(data)}/>
      <div>&nbsp;</div>
      <Parcel onValidParcel={(data) => onValidForm(data)}/>
      <div>&nbsp;</div>
    </>
  );
}
