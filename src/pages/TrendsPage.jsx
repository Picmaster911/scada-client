import React, { useState, useEffect } from 'react';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import LineChart from '../charts/LineChart';
import { Button } from '@mui/material';

function TrendsPage() {
    const location = useLocation();
    const sensorItem = location.state?.sensorItemProps;
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const GoToPageHome = () => { navigate('/') };

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
        <div className='App-header'>
              <Button sx={{ color: 'white' }} size="small" onClick={GoToPageHome} >На главную</Button>
            <h3>           
                 Тренды {sensorItem.Station_name} / Номер:  {sensorItem.Station_num}
            </h3>
            <LineChart plcData={ data }/>
        </div>

    )
}
export default TrendsPage
