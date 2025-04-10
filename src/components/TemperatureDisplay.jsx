import React from 'react';

export default function TemperatureDisplay({ temperature, date, conditions, isDarkMode }) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
    
    return (
      <div className="relative h-64 md:h-72 w-full overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-900 to-purple-900' 
            : 'bg-gradient-to-r from-blue-400 to-purple-500'
        }`}>
          {/* Weather condition overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Content */}
        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h2 className="text-2xl font-light mb-1">{formattedDate}</h2>
              <p className="text-lg opacity-90 mb-4">{conditions}</p>
              <div className="flex items-start">
                <span className="text-7xl md:text-8xl font-light">{temperature}</span>
                <span className="text-3xl md:text-4xl mt-2">°C</span>
              </div>
            </div>
            
            {/* Weather Icon - Could be replaced with actual icon based on conditions */}
            <div className="mt-4 md:mt-0">
              <div className="text-8xl">
                {conditions.toLowerCase().includes('cloud') ? '🌤️' : 
                 conditions.toLowerCase().includes('rain') ? '🌧️' : '☀️'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }