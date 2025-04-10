import React from 'react';

export default function DailyForecast({ forecast }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">7-Day Forecast</h2>
        
        <div className="flex justify-between overflow-x-auto">
            {forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center min-w-max px-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{day.day}</div>
                <div className="text-2xl mb-1">{day.icon}</div>
                <div className="text-sm font-medium text-gray-800 dark:text-white">{day.temp}°</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{day.humidity}%</div>
            </div>
            ))}
        </div>
        </div>
    );
}  