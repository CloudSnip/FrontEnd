import { useState, useEffect } from 'react';
import Header from './components/Header';
import TemperatureDisplay from './components/TemperatureDisplay';
import WeatherMetrics from './components/WeatherMetrics';
import WeatherChart from './components/WeatherChart';
import DailyForecast from './components/DailyForecast';
import MenuSidebar from './components/MenuSidebar';
import React from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentMetric, setCurrentMetric] = useState('temperature'); // 'temperature' or 'humidity'
  
  const [currentWeather, /*setCurrentWeather*/] = useState({
    temp: 23,
    humidity: 65,
    device: 'San Francisco',
    date: new Date(),
    conditions: 'Partly Cloudy'
  });
  
  const [hourlyData, /*setHourlyData*/] = useState([
    { time: '12 AM', temp: 19, humidity: 72 },
    { time: '2 AM', temp: 18, humidity: 75 },
    { time: '4 AM', temp: 17, humidity: 78 },
    { time: '6 AM', temp: 18, humidity: 76 },
    { time: '8 AM', temp: 20, humidity: 70 },
    { time: '10 AM', temp: 22, humidity: 65 },
    { time: '12 PM', temp: 23, humidity: 62 },
    { time: '2 PM', temp: 24, humidity: 60 },
    { time: '4 PM', temp: 23, humidity: 63 },
    { time: '6 PM', temp: 22, humidity: 67 },
    { time: '8 PM', temp: 21, humidity: 70 },
    { time: '10 PM', temp: 20, humidity: 72 }
  ]);
  
  const [dailyForecast, /*setDailyForecast*/] = useState([
    { day: 'Mon', temp: 24, humidity: 60, icon: '☀️' },
    { day: 'Tue', temp: 23, humidity: 65, icon: '🌤️' },
    { day: 'Wed', temp: 25, humidity: 55, icon: '☀️' },
    { day: 'Thu', temp: 22, humidity: 70, icon: '🌤️' },
    { day: 'Fri', temp: 20, humidity: 75, icon: '🌧️' },
    { day: 'Sat', temp: 21, humidity: 68, icon: '🌥️' },
    { day: 'Sun', temp: 23, humidity: 63, icon: '🌤️' }
  ]);
  
  // Initialize dark mode based on user preference
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
          window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update theme when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Menu Sidebar */}
      <MenuSidebar 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      {/* Main Content */}
      <div className="flex flex-col h-screen">
        <Header 
          onMenuClick={() => setMenuOpen(true)} 
          device={currentWeather.device}
          isDarkMode={isDarkMode}
        />
        
        <main className="flex-grow overflow-auto">
          {/* Temperature Display with Background */}
          <TemperatureDisplay 
            temperature={currentWeather.temp}
            date={currentWeather.date}
            conditions={currentWeather.conditions}
            isDarkMode={isDarkMode}
          />
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-6">
            {/* Left Column - Weather Metrics */}
            <div className="space-y-6">
              <WeatherMetrics 
                temperature={currentWeather.temp}
                humidity={currentWeather.humidity}
                isDarkMode={isDarkMode}
              />
            </div>
            
            {/* Right Column - Chart and Daily Forecast */}
            <div className="space-y-6">
              <WeatherChart 
                data={hourlyData}
                currentMetric={currentMetric}
                setCurrentMetric={setCurrentMetric}
                isDarkMode={isDarkMode} 
              />
              
              <DailyForecast 
                forecast={dailyForecast}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;