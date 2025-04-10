import React from 'react';

export default function WeatherChart({ data, currentMetric, setCurrentMetric }) {
    // Calculate max values for scaling
    const maxTemp = Math.max(...data.map(item => item.temp)) + 2;
    const maxHumidity = Math.max(...data.map(item => item.humidity)) + 5;
    
    const getHeight = (value, isTemp) => {
      const max = isTemp ? maxTemp : maxHumidity;
      return `${(value / max) * 100}%`;
    };
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">12-Hour Forecast</h2>
          
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button 
              className={`px-3 py-1 text-sm rounded ${
                currentMetric === 'temperature' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setCurrentMetric('temperature')}
            >
              Temperature
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded ${
                currentMetric === 'humidity' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setCurrentMetric('humidity')}
            >
              Humidity
            </button>
          </div>
        </div>
        
        <div className="h-64 flex items-end">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative flex-1 w-full flex items-end justify-center">
                <div 
                  className={`w-2/3 rounded-t transition-all duration-700 ${
                    currentMetric === 'temperature' 
                      ? 'bg-gradient-to-t from-blue-400 to-orange-400' 
                      : 'bg-gradient-to-t from-blue-400 to-cyan-300'
                  }`}
                  style={{ 
                    height: getHeight(
                      currentMetric === 'temperature' ? item.temp : item.humidity, 
                      currentMetric === 'temperature'
                    )
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">{item.time}</div>
              <div className="text-sm font-medium text-gray-800 dark:text-white">
                {currentMetric === 'temperature' ? `${item.temp}°` : `${item.humidity}%`}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }