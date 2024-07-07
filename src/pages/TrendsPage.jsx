import React, { useState, useEffect } from 'react';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import LineChart from '../charts/LineChart';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

function TrendsPage() {
    const location = useLocation();
    const sensorItem = location.state?.sensorItemProps;
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const WraperBox = styled(Box)({
        marginTop: "75px",
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: '0px',
        boxSizing: 'border-box', // Включаем padding в размер контейнер
        overflow: 'auto', // предотвращаем обрезку содержимого
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
            <Typography variant="h5" color="LightCyan" sx={{marginTop:'30px'}}>
                 {(sensorItem && sensorItem.Station_name) ? sensorItem.Station_name : 'Название станции не определено'}
            </Typography>
            <LineChart plcData={data} />
        </WraperBox>
    )
}
export default TrendsPage
