import React, { useRef, useEffect } from 'react';
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
import { Box, Button } from '@mui/material';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

const LineChart = ({ plcData }) => {
  let dataChart
  if (plcData) {
    let { Station_trand } = plcData
    dataChart = Station_trand;
  }

  var data = {
    labels: dataChart?.map(x => new Date(x.DateTime).toLocaleTimeString()),
    datasets: [{
      label: 'Задание',
      data: dataChart?.map(x => x.var_1),
      borderColor: 'rgb(75, 192, 192)',
      pointRadius: 0, // Убираем точки
      tension: 0.1
    },
    {
      label: 'Фактическое',
      data: dataChart?.map(x => x.var_2),
      borderColor: 'rgb(53, 162, 235)',
      pointRadius: 0, // Убираем точки
      tension: 0.1,
    },
    {
      label: 'Загрузка',
      data: dataChart?.map(x => x.var_3),
      borderColor: 'rgb(162, 162, 235)',
      pointRadius: 0, // Убираем точки
      tension: 0.1,
    },
    {
      label: 'Ток',
      data: dataChart?.map(x => x.var_4),
      borderColor: 'rgb(53, 53, 235)',
      pointRadius: 0, // Убираем точки
      tension: 0.1,
    },
    {
      label: 'PV_2',
      data: dataChart?.map(x => x.var_5),
      borderColor: 'rgb(192, 192, 75)',
      pointRadius: 0, // Убираем точки
      tension: 0.1,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          maxRotation: 90,
          minRotation: 50,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          fontSize: 25,
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
  };

  const chartRef = useRef(null);


  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };
  

  useEffect(() => {
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
            ref={chartRef}
            data={data}
            options={options} />
          <Button onClick={handleResetZoom} variant="contained" sx={{ marginTop: '10px' }}>
            Reset Zoom
          </Button>
        </Box>
        : <h2>Load data from server</h2>}
    </Box>

  )
}
<div></div>
export default LineChart
