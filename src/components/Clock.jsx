import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

const Clock = () => {
    const [time, setTime] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date(Date.now()).toLocaleString());
            console.log(new Date(Date.now()).toLocaleString())
        }, 1000);

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    }, []);

    return (
        <Typography variant="h4">
            {time}
        </Typography>

    );
};

export default Clock;