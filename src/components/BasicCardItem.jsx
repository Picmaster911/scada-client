import { Card, CardContent, Typography, Box, CardActions, Button } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function BasicCardItem({ sensorItemProps }) {

  const navigate = useNavigate();
  const GoToPageTrends = () => {

    navigate(`/trends/${sensorItemProps.Station_id}`, {
      state: { sensorItemProps: sensorItemProps },
    });

  };

  const GoToPageDetails = () => {

    navigate(`/details/${sensorItemProps.Station_id}`, {
      state: { sensorItemProps: sensorItemProps },
    });

  };

  return (
    <Card sx={{ minWidth: 275, margin: 3, alignContent:'center' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="red" gutterBottom>
          {sensorItemProps.Station_alarm}
        </Typography>
        <Typography variant="h5" component="div">
          <Box>
            {sensorItemProps.Station_name}
          </Box>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {sensorItemProps.Station_status}
        </Typography>
        <Typography variant="body2">
          Уровень заданный - {sensorItemProps.Station_SV}
        </Typography>
        <Typography variant="body2">
          Уровень реальный - {sensorItemProps.Station_PV}
        </Typography>
        <Typography variant="body2">
          Загрузка - {sensorItemProps.Station_PWM}%, Ток - {sensorItemProps.Station_Amper}A
        </Typography>
        <Typography variant="body2">
          Уровень резервуар 3 - {sensorItemProps.Station_PV2}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignContent: 'center' }}  >
        <Button size="small" onClick={GoToPageDetails} >Детально</Button>
        <Button size="small" onClick={GoToPageTrends}>Тренды</Button>
      </CardActions>
    </Card>
  )
}

export default BasicCardItem
