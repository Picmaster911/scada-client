import React from 'react'
import { Box, Paper,Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider, styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function MoreDetails() {
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
const CommandButton = (e) =>{getDataAxios()}

async function  getDataAxios(){
  const res = await axios({
    method: 'put',
    url: 'http://scada.asuscomm.com:8081/api/v1/user_put/user1',

  });
  console.log(res)

}
  return (
    <WraperBox>
      {[darkTheme].map((theme, index) => (
        <ThemeProvider theme={theme}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
            <Item key={1} elevation={0}>
              <Box>
              <Typography variant="h4">
                 Расширеная информация елемента управления
             </Typography>
              <Typography variant="h4">
              Имя станции :  {sensorItem.Station_name}
             </Typography>
             
             <Box sx={{marginTop:'10px'}}>
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
             <Box>
             <Button sx={{marginLeft:"5px"}} variant="outlined" onClick={CommandButton} >Команда старт</Button>
             <Button sx={{marginLeft:"5px"}} variant="outlined" onClick={CommandButton}>Команда стоп</Button>
             <Button sx={{marginLeft:"5px"}} variant="outlined" onClick={CommandButton} >Команда старт</Button>
             <Button sx={{marginLeft:"5px"}} variant="outlined" onClick={CommandButton}>Команда стоп</Button>
             <Button sx={{marginLeft:"5px"}} variant="outlined" onClick={CommandButton} >Команда старт</Button>
             <Button sx={{marginLeft:"5px"}} variant="outlined" onClick={CommandButton}>Команда стоп</Button>
             </Box>
            </Box>        
            </Item>
          </Box>
        </ThemeProvider>
      ))}
    </WraperBox>
  )
}
export default MoreDetails


