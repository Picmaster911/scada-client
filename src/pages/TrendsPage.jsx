import React from 'react'
import { useLocation } from 'react-router-dom';

function TrendsPage() {
    const location = useLocation();
    const sensorItem = location.state?.sensorItemProps;
    console.log(sensorItem)
    return (
        <div>
            <h1>
                Trends
            </h1>
            <h2>
                  {JSON.stringify(sensorItem)}
            </h2>
        </div>

    )
}
export default TrendsPage
