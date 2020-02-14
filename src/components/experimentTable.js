import React, { Component } from "react";

class ExperimentTable extends Component {
  state = {
    results: {}
  };
  componentDidMount() {
    const url = "http://localhost:9000/.netlify/functions";
    fetch(`${url}/experiments?name=${this.props.name}`)
      .then(res => res.json())
      .then(results => {
        this.setState({ results });
      })
      .catch(console.log);
  }

  renderTableHeader() {
    let header = Object.keys(this.state.results);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTableData() {
    let vals = Object.values(this.state.results);
    return vals.map((value, index) => {
      return <td key={index}>{value}</td>;
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1 id="title">Experiment Results</h1>
        <table>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ExperimentTable;
