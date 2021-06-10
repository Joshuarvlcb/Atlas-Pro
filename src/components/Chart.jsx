import React from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2"
import Detail from "./Detail";

const Chart = ({activePage, chartToggle,chart, newData, weather}) => {


  const labels = {
    today: ['Morning', 'Noon', 'Evening', 'Night'],
    daily: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    hourly: ['Monday 12:00AM', 'Monday 6:00AM', 'Monday 12:00PM', 'Monday 6:00PM', 'Tuesday 12:00AM', 'Tuesday 6:00AM', 'Tuesday 12:00PM', 'Tuesday 6:00PM']
  }

  const weatherData = {
    today: [newData['hourly'][4]['temp'], newData['hourly'][11]['temp'], newData['hourly'][16]['temp'], newData['hourly'][23]['temp']],
    hourly: [newData['hourly'][5]['temp'], newData['hourly'][11]['temp'], newData['hourly'][17]['temp'], newData['hourly'][23]['temp'], newData['hourly'][29]['temp'], newData['hourly'][35]['temp'], newData['hourly'][41]['temp'], newData['hourly'][47]['temp']],
    daily: [newData['daily'][0]['temp']['day'], newData['daily'][1]['temp']['day'], newData['daily'][2]['temp']['day'], newData['daily'][3]['temp']['day'], newData['daily'][4]['temp']['day'], newData['daily'][5]['temp']['day'], newData['daily'][6]['temp']['day']]
  }

  

  const data = {
    labels: labels[activePage],
    datasets: [
      {
        label: 'Temperature',
        data: weatherData[activePage],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      // xAxes: [
      //   {
      //     ticks: {
      //       beginAtZero: true,
      //     }
      //   }
      // ]
    },
  };


  return (
    <>
      <div
        className="chart-con d-flex justify-content-center align-items-center flex-column"
        style = {{ height: (window.innerWidth <= 900) ? 'auto' :'50%' } }
      >
        <div
          className=" d-flex justify-content-between align-items-center"
          style={{ width: "100%" 
        }}
        >
          <h3
            style={{
              paddingLeft: "20px",
            }}
          >
            Chart
          </h3>
 
          <Detail activePage = {activePage} chartToggle = {chartToggle} chart={chart}/>
        </div>
        <Line
        height = {(window.innerWidth <= 900) ? '100%' :'70%'}
          style={{ padding: "0 20px" }}
          data= {data}
          options={options}
        />
      </div>
    </>
  );
};

export default Chart;
