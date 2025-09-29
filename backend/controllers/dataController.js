 import { db } from '../database/db.js';

export const getWorldBankData = async (req, res) => {
  try {
    const { country, indicator, year } = req.query;
    
    let query = `
      SELECT c.country_name, i.indicator_name, d.year, d.value
      FROM indicator_data d
      JOIN countries c ON d.country_code = c.country_code
      JOIN indicators i ON d.indicator_code = i.indicator_code
      WHERE 1=1
    `;
    const params = [];

    if (country && country !== 'All Countries') {
      query += ' AND c.country_name = ?';
      params.push(country);
    }

    if (indicator) {
      query += ' AND i.indicator_code = ?';
      params.push(indicator);
    }

    if (year) {
      query += ' AND d.year = ?';
      params.push(year);
    }

    query += ' ORDER BY c.country_name, d.year';

    db.all(query, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        data: rows,
        metadata: {
          source: 'World Bank',
          count: rows.length,
          filters: { country, indicator, year }
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch World Bank data' });
  }
};

export const getUNDPData = async (req, res) => {
  try {
    const { country, goal } = req.query;
    
    // Mock UNDP data from SQLite
    const query = `
      SELECT c.country_name, 
             AVG(CASE WHEN i.indicator_code = 'SE.ADT.LITR.ZS' THEN d.value END) as education_score,
             AVG(CASE WHEN i.indicator_code = 'SP.DYN.LE00.IN' THEN d.value END) as health_score,
             AVG(CASE WHEN i.indicator_code = 'NY.GDP.PCAP.CD' THEN d.value END) as economic_score
      FROM countries c
      LEFT JOIN indicator_data d ON c.country_code = d.country_code
      LEFT JOIN indicators i ON d.indicator_code = i.indicator_code
      WHERE d.year = 2022
      ${country && country !== 'All Countries' ? 'AND c.country_name = ?' : ''}
      GROUP BY c.country_name
      ORDER BY (education_score + health_score + economic_score) / 3 DESC
    `;

    const params = country && country !== 'All Countries' ? [country] : [];

    db.all(query, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const data = rows.map(row => ({
        country: row.country_name,
        score: Math.round(((row.education_score || 0) + (row.health_score || 0) + (row.economic_score || 0)) / 3),
        rank: Math.floor(Math.random() * 100) + 1,
        trend: 'improving',
        metadata: {
          source: 'UNDP',
          last_updated: new Date().toISOString()
        }
      }));

      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch UNDP data' });
  }
};

export const getCountryData = async (req, res) => {
  try {
    const query = `
      SELECT country_code as code, country_name as name, region, income_level as incomeLevel
      FROM countries
      ORDER BY country_name
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country data' });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    // Get poverty data for dashboard
    const povertyQuery = `
      SELECT c.country_name as country, d.year, d.value as poverty_rate
      FROM indicator_data d
      JOIN countries c ON d.country_code = c.country_code
      WHERE d.indicator_code = 'SI.POV.DDAY'
      AND d.year BETWEEN 2018 AND 2022
      ORDER BY d.year
    `;

    // Get gender equality data
    const genderQuery = `
      SELECT 
        c.country_name as country,
        AVG(CASE WHEN d.indicator_code = 'SE.ADT.LITR.ZS' THEN d.value END) as literacy_rate,
        AVG(CASE WHEN d.indicator_code = 'SL.TLF.ACTI.ZS' THEN d.value END) as labor_participation
      FROM indicator_data d
      JOIN countries c ON d.country_code = c.country_code
      WHERE d.year = 2022
      GROUP BY c.country_name
    `;

    db.serialize(() => {
      db.all(povertyQuery, [], (err, povertyData) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        db.all(genderQuery, [], (err, genderData) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }

          res.json({
            povertyData,
            genderData,
            regionalData: [
              { name: 'Sub-Saharan Africa', value: 400 },
              { name: 'South Asia', value: 300 },
              { name: 'Latin America', value: 200 },
              { name: 'East Asia & Pacific', value: 150 },
              { name: 'Others', value: 100 },
            ],
            mapData: [
              { name: 'India', poverty_rate: 21.9, gdp_per_capita: 2100, lat: 20.5937, lng: 78.9629 },
              { name: 'Brazil', poverty_rate: 19.6, gdp_per_capita: 6790, lat: -14.2350, lng: -51.9253 },
              { name: 'Nigeria', poverty_rate: 40.1, gdp_per_capita: 2080, lat: 9.0820, lng: 8.6753 },
            ]
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
}; 