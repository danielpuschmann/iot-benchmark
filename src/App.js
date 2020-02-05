import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DropdownButton
          id="dropdown-item-button"
          title="Select IoT device to receive results"
        >
          <Dropdown.Item as="button">Siconia</Dropdown.Item>
          <Dropdown.Item as="button">Netvox</Dropdown.Item>
          <Dropdown.Item as="button">Tektelic</Dropdown.Item>
        </DropdownButton>
      </header>
    </div>
  );
}

export default App;
