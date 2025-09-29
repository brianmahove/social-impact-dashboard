
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
import L from 'leaflet';

// Create a custom marker icon
const createCustomIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        background-color: #3b82f6; 
        width: 20px; 
        height: 20px; 
        border-radius: 50%; 
        border: 3px solid white; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const WorldMap = ({ data }) => {
  console.log('WorldMap data:', data); // Debug log
  
  const mapData = Array.isArray(data) ? data : [];
  const center = [20, 0];

  if (mapData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Global Impact Map
        </h3>
        <div className="h-96 rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>No map data available</p>
            <p className="text-sm">Check your data source</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Global Impact Map
      </h3>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {mapData.map((country, index) => (
            <Marker
              key={index}
              position={[country.lat, country.lng]}
              icon={createCustomIcon()}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h4 className="font-semibold text-lg text-gray-900">{country.name}</h4>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Poverty Rate:</span> {country.poverty_rate}%
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">GDP per capita:</span> ${country.gdp_per_capita?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default WorldMap;
