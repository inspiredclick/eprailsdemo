import React from "react";
import AddressForm from "../AddressForm";

export default ({onValidAddress}) => {
  return (
    <div className="card" id="address">
      <div className="card-body">
        <h5 className="card-title">Recipient</h5>
        <AddressForm onValidAddress={onValidAddress} />
      </div>
    </div>
  )
};
