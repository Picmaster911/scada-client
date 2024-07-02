import React, { useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import '../LineChart.css'; // Импортируйте ваш CSS файл
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ plcData }) => {
  let dataChart
  if (plcData) {
    let { Station_trand } = plcData
    dataChart = Station_trand;

    //dataChart.forEach(element => {
    //  console.log(plcData)

    //});
  }

  var data = {
    labels: dataChart?.map(x => new Date(x.DateTime).toLocaleTimeString()),
    datasets: [{
      label: 'var_2',
      data: dataChart?.map(x => x.var_2),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      pointRadius: 0, // Убираем точки
      tension: 0.1
    },
    {
      label: 'var_1',
      data: dataChart?.map(x => x.var_1),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      pointRadius: 0, // Убираем точки
      tension: 0.1,
    },
    ]
  };

  var options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '70vh',
        padding: '20px',
        boxSizing: 'border-box', // Включаем padding в размер контейнера
      }}
    >
      {plcData ?
        <Box sx={{
          width: '100%',
          height: '100%',
          padding: '20px',
        }}
        >
          <Line
            data={data}
            options={options} />
        </Box>
        : <h2>Load data from server</h2>}
    </Box>

  )
}
<div></div>
export default LineChart
