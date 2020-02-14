import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./App.css";
import ExperimentTable from "./components/experimentTable";

class App extends Component {
  state = {
    devices: [],
    displayExperiment: "None"
  };
  componentDidMount() {
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //const url = process.env.LAMBDA_URI;
    const url = "http://localhost:9000/.netlify/functions";
    fetch(`${url}/devicenames`)
      .then(res => res.json())
      .then(names => {
        this.setState({ devices: names });
        this.state.devices.map(name => console.log(name));
      })
      .catch(console.log);
  }

  displayExperiment = name => {
    console.log("before", name, this.state.displayExperiment);
    this.setState(
      {
        displayExperiment: name
      },
      () => {
        console.log("after", name, this.state.displayExperiment);
      }
    );
  };

  render() {
    if (this.state.displayExperiment !== "None") {
      return (
        <div className="App">
          <header className="App-header">
            <ExperimentTable name={this.state.displayExperiment} />
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <DropdownButton
              id="dropdown-item-button"
              title="Select IoT device to receive results"
            >
              {this.state.devices.map((name, i) => (
                <Dropdown.Item
                  as="button"
                  onClick={() => this.displayExperiment(name)}
                  id={i}
                >
                  {name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </header>
        </div>
      );
    }
  }
}

export default App;

/* fetch(
      "http://localhost:9000/.netlify/functions/deviceNames"
      //"https://laughing-shaw-eaf8b0.netlify.com/.netlify/functions/deviceNames"
    )
      .then(results => {
        return results.json();
      })
      .then(names => {
        return (
          <div className="App">
            <header className="App-header">
              <DropdownButton
                id="dropdown-item-button"
                title="Select IoT device to receive results"
              >
                <Dropdown.Item as="button">${names[0]}</Dropdown.Item>
                <Dropdown.Item as="button">${names[1]}</Dropdown.Item>
                <Dropdown.Item as="button">${names[2]}</Dropdown.Item>
              </DropdownButton>
            </header>
          </div>
        );
      }); */
