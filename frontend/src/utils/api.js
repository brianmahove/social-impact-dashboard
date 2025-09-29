import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001/api'

export const fetchWorldBankData = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/worldbank`, {
      params: filters
    })
    return response.data
  } catch (error) {
    console.error('Error fetching World Bank data:', error)
    // Return mock data if API fails
    return {
      data: [
        { country_name: 'India', indicator_name: 'Poverty', year: 2022, value: 21.9 },
        { country_name: 'Brazil', indicator_name: 'Poverty', year: 2022, value: 19.6 },
        { country_name: 'Nigeria', indicator_name: 'Poverty', year: 2022, value: 40.1 },
      ],
      metadata: { source: 'World Bank', count: 3 }
    }
  }
}

export const fetchUNDPData = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/undp`, {
      params: filters
    })
    return response.data
  } catch (error) {
    console.error('Error fetching UNDP data:', error)
    // Return mock data if API fails
    return [
      { country: 'India', score: 65, rank: 120, trend: 'improving' },
      { country: 'Brazil', score: 75, rank: 84, trend: 'stable' },
      { country: 'Nigeria', score: 53, rank: 158, trend: 'improving' },
    ]
  }
}

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/dashboard`)
    return response.data
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return null
  }
}

export const checkAPIHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`)
    return response.data
  } catch (error) {
    console.error('API health check failed:', error)
    return { status: 'ERROR', message: 'Backend not reachable' }
  }
} 