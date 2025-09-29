
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PovertyChart = ({ data }) => {
  console.log('PovertyChart data:', data); // Debug log
  
  // Ensure data is properly formatted
  const chartData = Array.isArray(data) ? data : [];
  
  // If no data, show message
  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Poverty Headcount Ratio Over Time
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">
          No poverty data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Poverty Headcount Ratio Over Time
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              label={{ 
                value: '% of Population', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#6b7280' }
              }} 
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Poverty Rate']}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="poverty_rate" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Poverty Rate (%)"
              dot={{ fill: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PovertyChart;
