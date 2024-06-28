import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
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
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="p">
                        SCADA ПНС & КНФС
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {!data ? (
                        <Typography variant="h1">Load data</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {data.map((sensorItem) => (
                                <Grid
                                    display="flex"
                                    align-items='center'
                                    justifyContent="center"
                                    item key={sensorItem.Station_id} xs={12} sm={6} md={4}>
                                    <Box sx={{ maxWidth: 350, width: '100%' }}>
                                        <BasicCardItem sensorItemProps={sensorItem} />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <img src={logo} className="App-logo" alt="logo" />
                </Grid>
            </Grid>
        </header>
    )
}

export default MainPage


