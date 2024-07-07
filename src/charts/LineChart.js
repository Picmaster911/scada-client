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
import UseNumberInput from '../components/UseNumberInput'
import { styled } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import '../LineChart.css'; // Импортируйте ваш CSS файл
import { Box, Button, Hidden } from '@mui/material';
import zoomPlugin from 'chartjs-plugin-zoom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

  const WraperBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box', // Включаем padding в размер контейнер
  });

  useEffect(() => {
  }, [data])
  const [value, setValue] = React.useState(null);
  console.log(value)
  const callbkF = (value) => {
    console.log(value)
  }

  return (
    <Box
      sx={{
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '60%',
        padding: '0px',
        // boxSizing: 'border-box', // Включаем padding в размер контейнера
        // overflow: 'auto', // предотвращаем обрезку содержимого
      }}
    >
      {plcData ?
        <Box
          sx={{
            width: '100%',
            height: '100%',
            padding: '2px',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          <Line
            ref={chartRef}
            data={data}
            options={options} />
        </Box>
        : <h2>Load data from server</h2>}
      <WraperBox>
        <Hidden smDown>
          <Button sx={{ m: 1, minWidth: '30px' }} onClick={handleResetZoom} variant="contained">
            <ArrowBackIosNewIcon />
            <ArrowBackIosNewIcon />
          </Button>
        </Hidden>
        <Button sx={{ m: 1, minWidth: '30px' }} onClick={handleResetZoom} variant="contained">
          <ArrowBackIosNewIcon />
        </Button>
        <UseNumberInput callbkF={callbkF} />
        <Button sx={{ m: 1, minWidth: '30px' }} onClick={handleResetZoom} variant="contained" >
          <ArrowForwardIosIcon />
        </Button>
        <Hidden smDown>
          <Button sx={{ m: 1, minWidth: '30px' }} onClick={handleResetZoom} variant="contained" >
            <ArrowForwardIosIcon />
            <ArrowForwardIosIcon />
          </Button>
        </Hidden>
        <Button sx={{ m: 1 }} onClick={handleResetZoom} variant="contained" >
          Reset
        </Button>
      </WraperBox>
    </Box>
  )
}
<div></div>
export default LineChart
