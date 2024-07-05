import React, { useState, useEffect } from 'react';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import LineChart from '../charts/LineChart';
import ZoomableLineChart from '../charts/ZoomableLineChart'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

function TrendsPage() {
    const location = useLocation();
    const sensorItem = location.state?.sensorItemProps;
    const [data, setData] = useState(null);

    const WraperBox = styled(Box)({
        marginTop: "20px",
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box', // Включаем padding в размер контейнера
      });
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://scada.asuscomm.com:8081/api/v1/trand/${sensorItem.Station_id}`); 
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    console.error('Ошибка HTTP: ' + response.status);
                }
            } catch (error) {
                console.error('Ошибка при запросе:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
    }, [data])
  
    return (
        <WraperBox>
            <h3>           
                 Тренды: { (sensorItem && sensorItem.Station_name) ? sensorItem.Station_name: 'Название станции не определено' }
            </h3>
                <ZoomableLineChart plcData={data} />
        </WraperBox>
    )
}
export default TrendsPage
