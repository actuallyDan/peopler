import React from 'react';
import { Chart } from 'react-google-charts';

export default class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Population vs. Time',
        hAxis: { title: 'Time'},
        vAxis: { title: 'Population'},
      },
    };
  }
  render() {
  	console.log(this.props.data, [['Age', 'Weight'], [8, 12], [4, 5.5]])
    return (
      <Chart
        chartType="LineChart"
        data={this.props.data}
        options={this.state.options}
        graph_id="LineChart"
        width="100%"
        height="400px"
      />
    );
  }
}
