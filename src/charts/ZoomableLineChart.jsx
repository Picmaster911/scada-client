import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    ResponsiveContainer
} from 'recharts';
import { Box } from '@mui/material';

let data = [];


const ZoomableLineChart = ({ plcData }) => {
    let dataChart
    if (plcData) {
        let { Station_trand } = plcData
        dataChart = Station_trand;
      
           data = dataChart.map(element => ({
                name: element.DateTime.substr(11, 5),
                uv: element.var_1,
                pv: element.var_2,
                amt: element.var_3,
                amu: element.var_4,
                amr: element.var_5,
            }))
    }

    return (
          <Box sx={{
            width: '100%',
            height: '90%',
            padding: '0px',
            flexGrow: 1,
          }}
          >
            <ResponsiveContainer width="100%" >
                <LineChart
                    data={data}
                    syncId="anyId"
                    margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid stroke="	#484848" strokeDasharray="3 3" strokeWidth={1} />
                    <XAxis dataKey="name" angle={310} textAnchor="middle" tick={{ fontSize: 14 }}   />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dot={false} dataKey="pv" stroke="#35a2eb" activeDot={{ r: 8 }} />
                    <Line type="monotone" dot={false} dataKey="uv" stroke="#ffb700" fill="#82ca9d" />
                    <Line type="monotone" dot={false} dataKey="amt" stroke="#35a2eb" activeDot={{ r: 8 }} />
                    <Line type="monotone" dot={false} dataKey="amu" stroke="#ffb700" fill="#82ca9d" />
                    <Line type="monotone" dot={false} dataKey="amr" stroke="#ffb700" fill="#82ca9d" />                  
                    <Brush
                        dataKey="name"
                        stroke="#3a3f47"
                        fill="#bfc0c1"
                        travellerWidth={5}
                        height={30}
                        handleStyle={{ fill: '#8884d8' }}
                    />
                </LineChart>
            </ResponsiveContainer>
          </Box>

    );
};

export default ZoomableLineChart;