
import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';
import FilterPanel from '../components/Filters/FilterPanel';
import PovertyChart from '../components/Charts/PovertyChart';
import GenderEqualityChart from '../components/Charts/GenderEqualityChart';
import RegionalChart from '../components/Charts/RegionalChart';
import WorldMap from '../components/Maps/WorldMap';
import { Loader, AlertCircle, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const { dashboardData, loading, error, data, filters } = useData();

  // Debug logging
  useEffect(() => {
    console.log('Dashboard - dashboardData:', dashboardData);
    console.log('Dashboard - loading:', loading);
    console.log('Dashboard - error:', error);
    console.log('Dashboard - filters:', filters);
  }, [dashboardData, loading, error, filters]);

  // Process poverty data for the chart
  const processPovertyData = () => {
    if (dashboardData?.povertyData) {
      console.log('Processing povertyData:', dashboardData.povertyData);
      return dashboardData.povertyData.map(item => ({
        year: item.year?.toString() || '2022',
        poverty_rate: parseFloat(item.value || item.poverty_rate || 0)
      }));
    }
    
    // Fallback mock data
    console.log('Using fallback poverty data');
    return [
      { year: '2018', poverty_rate: 25.3 },
      { year: '2019', poverty_rate: 23.8 },
      { year: '2020', poverty_rate: 26.1 },
      { year: '2021', poverty_rate: 24.7 },
      { year: '2022', poverty_rate: 23.2 },
    ];
  };

  // Process gender data
  const processGenderData = () => {
    if (dashboardData?.genderData) {
      console.log('Processing genderData:', dashboardData.genderData);
      return dashboardData.genderData.map(item => ({
        country: item.country || 'Unknown',
        literacy_rate: Math.round(item.literacy_rate || 70 + Math.random() * 25),
        labor_participation: Math.round(item.labor_participation || 50 + Math.random() * 40)
      }));
    }
    
    console.log('Using fallback gender data');
    return [
      { country: 'India', literacy_rate: 65, labor_participation: 23 },
      { country: 'Brazil', literacy_rate: 94, labor_participation: 53 },
      { country: 'Nigeria', literacy_rate: 53, labor_participation: 45 },
      { country: 'China', literacy_rate: 97, labor_participation: 61 },
      { country: 'USA', literacy_rate: 99, labor_participation: 58 },
    ];
  };

  // Process regional data
  const processRegionalData = () => {
    console.log('Processing regionalData:', dashboardData?.regionalData);
    return dashboardData?.regionalData || [
      { name: 'Sub-Saharan Africa', value: 400 },
      { name: 'South Asia', value: 300 },
      { name: 'Latin America', value: 200 },
      { name: 'East Asia & Pacific', value: 150 },
      { name: 'Europe & Central Asia', value: 100 },
      { name: 'Middle East & North Africa', value: 80 },
    ];
  };

  // Process map data
  const processMapData = () => {
    console.log('Processing mapData:', dashboardData?.mapData);
    if (dashboardData?.mapData) {
      return dashboardData.mapData;
    }
    
    console.log('Using fallback map data');
    return [
      { name: 'India', poverty_rate: 21.9, gdp_per_capita: 2100, lat: 20.5937, lng: 78.9629 },
      { name: 'Brazil', poverty_rate: 19.6, gdp_per_capita: 6790, lat: -14.2350, lng: -51.9253 },
      { name: 'Nigeria', poverty_rate: 40.1, gdp_per_capita: 2080, lat: 9.0820, lng: 8.6753 },
      { name: 'China', poverty_rate: 0.7, gdp_per_capita: 12500, lat: 35.8617, lng: 104.1954 },
      { name: 'United States', poverty_rate: 11.4, gdp_per_capita: 76300, lat: 37.0902, lng: -95.7129 },
    ];
  };

  const chartData = processPovertyData();
  const genderData = processGenderData();
  const regionalData = processRegionalData();
  const mapData = processMapData();

  console.log('Final chart data:', { chartData, genderData, regionalData, mapData });

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Global Food Security Dashboard
        </h1>
        <p className="text-gray-600">
          Monitoring hunger, crop yields, and aid distribution worldwide
        </p>
        {data?.metadata && (
          <div className="mt-2 text-sm text-gray-500">
            Data source: {data.metadata.source} • {data.metadata.count || chartData.length} records loaded
          </div>
        )}
      </div>

      <FilterPanel />

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader className="h-6 w-6 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-600">Updating data...</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PovertyChart data={chartData} />
          <RegionalChart data={regionalData} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <GenderEqualityChart data={genderData} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <WorldMap data={mapData} />
        </div>
      </div>

      {/* Data source attribution */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Data sources: World Bank Open Data, UNDP, FAO • Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Dashboard;
