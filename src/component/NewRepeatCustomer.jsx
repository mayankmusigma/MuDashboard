import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import salesData from '../assets/dataset.json'; 

const COLORS = ['#0088FE', '#FF8042']; 

const NewRepeatCustomer = ({ year }) => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const previousYears = salesData.filter(item => item.Year < year);
    const currentYearData = salesData.filter(item => item.Year === year); 

    const previousCustomers = new Set(previousYears.map(item => item['Customer ID']));

    let newCustomers = 0;
    let repeatCustomers = 0;

    currentYearData.forEach(item => {
      if (previousCustomers.has(item['Customer ID'])) {
        repeatCustomers++;
      } else {
        newCustomers++;
      }
    });

    const formattedData = [
      { name: 'New Customers', value: newCustomers },
      { name: 'Repeat Customers', value: repeatCustomers }
    ];

    setCustomerData(formattedData);
  }, [year]); 

  return (
    <ResponsiveContainer width={160} height={230}>
      <PieChart>
        <Pie
          data={customerData}
          cx="55%" 
          cy="97%" 
          innerRadius={30} 
          outerRadius={50} 
          startAngle={180}  // Start at 180 degrees (top left)
          endAngle={0} 
          fill="#8884d8"
          dataKey="value"
        >
          {customerData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
        layout="horizontal" 
        align="left" 
        verticalAlign="bottom" 
        wrapperStyle={{paddingBottom:'100px'}} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default NewRepeatCustomer;
