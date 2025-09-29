import React from 'react'
import { useData } from '../../context/DataContext'

const FilterPanel = () => {
  const { filters, updateFilters } = useData()

  const countries = [
    'All Countries', 'United States', 'India', 'Brazil', 'Nigeria', 
    'Indonesia', 'Pakistan', 'Bangladesh', 'Mexico', 'Philippines'
  ]

  const regions = [
    'All Regions', 'Sub-Saharan Africa', 'South Asia', 'Latin America', 
    'East Asia & Pacific', 'Europe & Central Asia', 'Middle East & North Africa'
  ]

  const indicators = [
    { value: 'poverty', label: 'Poverty Indicators' },
    { value: 'gender', label: 'Gender Equality' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={filters.country}
            onChange={(e) => updateFilters({ country: e.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => updateFilters({ region: e.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Indicator
          </label>
          <select
            value={filters.indicator}
            onChange={(e) => updateFilters({ indicator: e.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            {indicators.map(indicator => (
              <option key={indicator.value} value={indicator.value}>
                {indicator.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => updateFilters({ year: e.target.value })}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            {[2022, 2021, 2020, 2019, 2018].map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel