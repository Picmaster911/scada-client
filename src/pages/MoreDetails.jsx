import React, { useState } from 'react'
import { Box, Paper, Button, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

function MoreDetails() {

  let auth = false
  const location = useLocation();
  const sensorItem = location.state?.sensorItemProps;

  const resultState = useSelector((state) => state.authSlice);
  console.log(resultState)

  if (resultState != null && resultState.result) {
       auth = resultState.result;
  }  
  const darkTheme = createTheme({
     palette: { mode: 'dark' },
     typography: {
      h4: {
        fontSize: '2rem', // default for larger screens
        '@media (max-width:600px)': {
          fontSize: '1.2rem', // smaller font size for mobile devices
        },
      },
      h5: {
        fontSize: '1.5rem', // default for larger screens
        '@media (max-width:600px)': {
          fontSize: '1rem', // smaller font size for mobile devices
        },
      },
    },    
    });
  const lightTheme = createTheme({ palette: { mode: 'light' } });

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto', // Устанавливаем высоту по содержимому
    lineHeight: '60px',
    boxShadow: '0px 4px 6px rgba(25, 255, 255, 0.5)', // Белая тень
    // backgroundColor: theme.palette.background.paper, // Использует цвет фона из темы
    backgroundColor: '#3a4f63'
  }));

  const WraperBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box', // Включаем padding в размер контейнер
  });

  const CommandButtonFeth = (e) => { fetchData(e) }

  const fetchData = async (e) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: sensorItem.Station_id,
          username: resultState.userName,
          command: e.target.id,
        })
      };
      
      const response = await fetch('http://scada.asuscomm.com:8081/api/v1/user_put/user1', requestOptions); // Замените URL на ваш реальный эндпоинт http://scada.asuscomm.com:8082
      if (response.ok) {
        const json = await response.json();
        console.log(json);
      } else {
        console.error('Ошибка HTTP: ' + response.status);
      }
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  };

  return (
    <WraperBox>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
          <Item elevation={0}>
            <Box sx={{ padding: "10px" }}>
              <Typography variant="h4">
                Расширеная информация елемента управления
              </Typography>
              <Typography variant="h4">
                Имя станции :  {sensorItem.Station_name}
              </Typography>

              <Box sx={{ marginTop: '10px' }}>
                <Typography variant="h5">
                  Режим работы :  {sensorItem.Station_status}
                </Typography>
                <Typography variant="h5">
                  Уровень заданный: {sensorItem.Station_SV}
                </Typography>
                <Typography variant="h5">
                  Уровень реальный:  {sensorItem.Station_PV}
                </Typography>
                <Typography variant="h5">
                  Загрузка : {sensorItem.Station_PWM}%, Ток - {sensorItem.Station_Amper}A
                </Typography>
                <Typography variant="h5">
                  Уровень резервуар 3 :  {sensorItem.Station_PV2}
                </Typography>
              </Box>
              {(auth) ?
                <Box>
                  <Button id='1' sx={{ marginLeft: "5px" }} variant="outlined" onClick={(e) => CommandButtonFeth(e)} >КОМАНДА +</Button>
                  <Button id='2' sx={{ marginLeft: "5px" }} variant="outlined" onClick={(e) => CommandButtonFeth(e)} >КОМАНДА -</Button>
                  <Button id='3' sx={{ marginLeft: "5px" }} variant="outlined" onClick={(e) => CommandButtonFeth(e)}  >КОМАНДА СБРОС</Button>
                  <Button id='4' sx={{ marginLeft: "5px" }} variant="outlined" onClick={(e) => CommandButtonFeth(e)} >КОМАНДА БЛОК</Button>
                </Box> : <div></div>
              }
            </Box>
          </Item>
        </Box>
      </ThemeProvider>
    </WraperBox>
  )
}
export default MoreDetails


