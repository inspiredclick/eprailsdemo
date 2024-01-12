import React, { useState, useEffect } from "react";
import AddressForm from "../AddressForm";
import { get } from "react-hook-form";

export default () => {
  const [ addresses, setAddresses ] = useState([]);

  const saveAddress = (address) => {
    const url = "/api/v1/address/create";
    const body = {
      address: address
    };
    fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => {
      getAddresses();
    })
    .catch((e) => console.log(e.message));
  }

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
        setAddresses(response);
      })
      .catch((e) => console.log(e.message));
  }

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <>
    <div>&nbsp;</div>
    <div className="card" id="savedAddresses">
      <div className="card-body">
        <h5 className="card-title">Saved Addresses</h5>
        <table className="table">
          <tbody>
          {addresses && addresses.map((address, index) => {
            return (
              <tr key={index}>
                <td>
                  {address.name}<br />
                  {address.address1}<br />
                  {address.address2 || ""}<br />
                  {address.city}, {address.state} {address.zip}<br />
                  {address.country}<br />
                  {address.email || ""}<br />
                  {address.phone || ""}
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
    <div>&nbsp;</div>
    <div className="card" id="newAddress">
      <div className="card-body">
        <h5 className="card-title">Add Address</h5>
        <AddressForm 
          onValidAddress={(data) => saveAddress(data)}
          submitButton={<button type="submit" className="btn btn-success">Save</button>} />
      </div>
    </div>
    </>
  )
}
