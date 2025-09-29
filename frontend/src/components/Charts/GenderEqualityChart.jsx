
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GenderEqualityChart = ({ data }) => {
  console.log('GenderEqualityChart data:', data); // Debug log
  
  const chartData = Array.isArray(data) ? data : [];
  
  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Gender Equality Indicators
        </h3>
        <div className="h-80 flex items-center justify-center text-gray-500">
          No gender equality data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Gender Equality Indicators
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="country" 
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Rate']}
            />
            <Legend />
            <Bar 
              dataKey="literacy_rate" 
              fill="#3b82f6" 
              name="Literacy Rate (%)" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="labor_participation" 
              fill="#f59e0b" 
              name="Labor Participation (%)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GenderEqualityChart;
