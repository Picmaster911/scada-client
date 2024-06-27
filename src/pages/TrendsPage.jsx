import React, { useState, useEffect } from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';
import LineChart from '../charts/LineChart';

function TrendsPage() {
    const location = useLocation();
    const sensorItem = location.state?.sensorItemProps;
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://scada.asuscomm.com:8081/api/v1/trand/0'); // Замените URL на ваш реальный эндпоинт http://scada.asuscomm.com:8082
                if (response.ok) {
                    const json = await response.json();
                   // console.log(json);
                    setData(json); // Предположим, что в ответе есть поле 'data'
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
        <div className='App'>
            <h1>
                Trends
            </h1>
            <h2>
                  {JSON.stringify(sensorItem)}
            </h2>
            <LineChart plcData={ data }/>
        </div>

    )
}
export default TrendsPage
