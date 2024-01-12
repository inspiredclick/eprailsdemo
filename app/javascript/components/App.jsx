import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CableProvider } from "../cable";
import Main from "../components/Main";
import NewShipment from "./shipment";
import NewAddress from "./address";
import Rate from "./shipment/Rate";

export default props => <>
  <CableProvider>
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">EP Rails Demo</span>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shipment/new">New Shipment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/address_book">Address Book</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 offset-2">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/shipment/new" element={<NewShipment />} />
              <Route path="/shipment/:shp_id/rate" element={<Rate />} />
              <Route path="/address_book" element={<NewAddress />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  </CableProvider>
</>
