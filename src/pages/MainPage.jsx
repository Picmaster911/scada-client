import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Hidden   } from '@mui/material';
import BasicCardItem from '../components/BasicCardItem'
import { useDispatch, useSelector } from 'react-redux';
import getAllCarts from '../store/allcart/thunks'
//import logo from '../logo.svg';

function MainPage() {

    const { respone } = useSelector((state) => state.getAllCartsSlice);
    const dispatch = useDispatch();
    const getCart = () => {  dispatch(getAllCarts.getAllCarts())};
    useEffect(() => {
        const interval = setInterval(() => {
            getCart();
        }, 1000); 

        return () => clearInterval(interval);
    }, []);
    return (
        <header className="App-header">
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Hidden smUp>
                    <Typography variant="h4" component="p" marginTop="5px">
                        SCADA ПНС & КНФС
                    </Typography>
                </Hidden>
                <Grid item xs={12}>
                    {!respone ? (
                        <Typography variant="h1">Load data</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {respone.map((sensorItem) => (
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
            </Grid>
        </header>
    )
}

export default MainPage


