import React from 'react'
import { Globe, BarChart3 } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-primary-600" />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">
                Global Impact Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Data-driven insights for humanitarian action
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <BarChart3 className="h-6 w-6 text-gray-400" />
            <span className="text-sm text-gray-600">UNDP • FAO • World Bank</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar