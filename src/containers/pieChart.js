import React from 'react';
import { Pie } from '@ant-design/charts';

const StateChart = (props) => {

  const config = {
    data:props.data,
    angleField: 'percent',
    colorField: props.field,
    radius:150,
    showContent:true,
    pieStyle:{
        lineWidth: 0.5,
        cursor: 'pointer'
    },
    onReady: (plot) => {
      plot.on('element:click', (...args) => {
        props.getColleges({[props.field]:(args[0].data.data.state || args[0].data.data.courses)});
      });
      },
  };
  return <Pie {...config} />;
};

export default StateChart;