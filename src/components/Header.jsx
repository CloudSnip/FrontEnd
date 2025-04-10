import { useState, useEffect } from 'react';
import React from 'react';
import API from '../utils/api'
import LogoLight from '../assets/LogoLight.svg';
import LogoDark from '../assets/LogoDark.svg';

export default function Header({ onMenuClick, device, isDarkMode, onDeviceChange }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDeviceDropdown, setShowDeviceDropdown] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch devices from API
    const fetchDevices = async () => {
      try {
        const response = await API.get('/sensors'); // Adjust the endpoint as needed
        setDevices(response.data.docs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching devices:', error);
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleDeviceSelect = (selectedDevice) => {
    setShowDeviceDropdown(false);
    onDeviceChange(selectedDevice);
  };

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={isDarkMode?LogoLight:LogoDark} alt="Cloudenip Logo" className="h-8 w-auto" />
        </div>
        
        <div className="flex-1 mx-4">
          <div className="relative text-center">
            <button 
              onClick={() => setShowDeviceDropdown(!showDeviceDropdown)}
              className="inline-flex items-center justify-center px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              aria-label="Select device"
            >
              {device || 'Select device'}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Device Dropdown */}
            {showDeviceDropdown && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                {loading ? (
                  <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Loading devices...</div>
                ) : devices.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">No devices available</div>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium text-gray-800 dark:text-white">Select Device</h3>
                    </div>
                    {devices.map((deviceItem) => (
                      <button
                        key={deviceItem._id}
                        onClick={() => handleDeviceSelect(deviceItem)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {deviceItem.name}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Notifications"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-white">Notifications</h3>
                </div>
                <div className="p-4 text-sm text-gray-600 dark:text-gray-300 text-center">
                  No new notifications
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}