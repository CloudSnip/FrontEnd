import { 
    calculateHeatIndex, 
    calculateDewPoint, 
    calculateAbsoluteHumidity,
    calculateFeelsLike
  } from '../utils/calculations';
import React from 'react';
  
export default function WeatherMetrics({ temperature, humidity }) {
const heatIndex = calculateHeatIndex(temperature, humidity);
const dewPoint = calculateDewPoint(temperature, humidity);
const absoluteHumidity = calculateAbsoluteHumidity(temperature, humidity);
const feelsLike = calculateFeelsLike(temperature, humidity);

const metrics = [
    { 
    title: 'Heat Index', 
    value: `${heatIndex}°C`,
    description: 'How hot it actually feels to your body',
    icon: '🌡️'
    },
    { 
    title: 'Dew Point', 
    value: `${dewPoint}°C`,
    description: 'Temperature at which dew forms',
    icon: '💧'
    },
    { 
    title: 'Absolute Humidity', 
    value: `${absoluteHumidity} g/m³`,
    description: 'Amount of water vapor in the air',
    icon: '🌫️'
    },
    { 
    title: 'Feels Like', 
    value: `${feelsLike}°C`,
    description: 'Perceived temperature based on conditions',
    icon: '🌡️'
    }
];

return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
    <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Current Conditions</h2>
    
    <div className="flex flex-wrap -mx-2">
        <div className="w-full px-2 mb-4">
        <div className="flex justify-between items-center border-b pb-3 border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Temperature</span>
            <span className="font-medium text-gray-800 dark:text-white">{temperature}°C</span>
        </div>
        </div>
        
        <div className="w-full px-2 mb-4">
        <div className="flex justify-between items-center border-b pb-3 border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Humidity</span>
            <span className="font-medium text-gray-800 dark:text-white">{humidity}%</span>
        </div>
        </div>
    </div>
    
    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4 mt-6">Calculated Metrics</h3>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-start">
            <div className="text-2xl mr-3">{metric.icon}</div>
            <div>
                <h4 className="font-medium text-gray-800 dark:text-white">{metric.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{metric.value}</p>
            </div>
            </div>
        </div>
        ))}
    </div>
    </div>
);
}