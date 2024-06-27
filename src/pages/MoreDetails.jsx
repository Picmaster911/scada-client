import React from 'react'
import { useLocation } from 'react-router-dom';

function MoreDetails() {
  const location = useLocation();
  const sensorItem = location.state?.sensorItemProps;
  return (
    <div>
    <h1>
        Details information
    </h1>
    <h2>
          {JSON.stringify(sensorItem)}
    </h2>
</div>
  )
}
export default MoreDetails
