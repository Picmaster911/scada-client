import React, { useState } from 'react'
import { Box, Paper, Button, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function MoreDetails() {

   // alignSelf: 'flex-end' 
  const location = useLocation();
  const sensorItem = location.state?.sensorItemProps;

  const darkTheme = createTheme({ palette: { mode: 'dark' } });
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
  const CommandButton = (e) => { getDataAxios() }
  const CommandButtonFeth = (e) => { fetchData() }

  async function getDataAxios() {
    const res = await axios({
      method: 'put',
      url: 'http://scada.asuscomm.com:8081/api/v1/user_put/user1',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res)
  }

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
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


 const [fildUser, setFildUser] = useState (null)
 const eventFromInputUser = (e) => {
  setFildUser (e)
 }

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
            <Box>
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
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2,  justifyContent: 'center', marginTop:'30px' }}>
                  <Typography variant="h5">
                  Веведите имя пользователя                
                </Typography>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e)=> eventFromInputUser(e.target.value) } />
              </Box>
              <Box>
                <Button sx={{ marginLeft: "5px" }} variant="outlined" onClick={CommandButton} >Команда старт</Button>
                <Button sx={{ marginLeft: "5px" }} variant="outlined" onClick={CommandButtonFeth}>Команда стоп</Button>
                <Button sx={{ marginLeft: "5px" }} variant="outlined" onClick={CommandButton} >Команда старт</Button>
                <Button sx={{ marginLeft: "5px" }} variant="outlined" onClick={CommandButton}>Команда стоп</Button>
                <Button sx={{ marginLeft: "5px" }} variant="outlined" onClick={CommandButton} >Команда старт</Button>
                <Button sx={{ marginLeft: "5px" }} variant="outlined" onClick={CommandButton}>Команда стоп</Button>
              </Box>
            </Box>
          </Item>
        </Box>
      </ThemeProvider>
    </WraperBox>
  )
}
export default MoreDetails


