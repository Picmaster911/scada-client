import React, { useState, useEffect } from 'react';
import BasicCardItem from '../components/BasicCardItem'
import logo from '../logo.svg';


function MainPage() {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://scada.asuscomm.com:8081/api/v1/data'); // Замените URL на ваш реальный эндпоинт http://scada.asuscomm.com:8082
                if (response.ok) {
                    const json = await response.json();
                    //console.log(json);
                    setData(json); // Предположим, что в ответе есть поле 'data'
                    // console.log(data)
                } else {
                    console.error('Ошибка HTTP: ' + response.status);
                }
            } catch (error) {
                console.error('Ошибка при запросе:', error);
            }
        };

        const interval = setInterval(() => {
            fetchData();
        }, 1000); // Запрос каждую секунду

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только при монтировании

    useEffect(() => {
        console.log('Updated data state:', data); // Проверка обновленного состояния
    }, [data]);

    return (
        <header className="App-header">
            <p>SCADA ПНС & КНФС</p>
            {!data ? <h1>Load data</h1> : data.map((sensorItem) => (
                <BasicCardItem key={sensorItem.Station_id} sensorItemProps={sensorItem} />
            ))}
            <br />
            <img src={logo} className="App-logo" alt="logo" />
        </header>
    )
}

export default MainPage


