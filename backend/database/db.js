import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, 'social_impact.db');

// Create and initialize database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Initialize database tables
const initDB = () => {
  db.serialize(() => {
    // Countries table
    db.run(`CREATE TABLE IF NOT EXISTS countries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT UNIQUE NOT NULL,
      country_name TEXT NOT NULL,
      region TEXT,
      income_level TEXT,
      latitude REAL,
      longitude REAL
    )`);

    // Indicators table
    db.run(`CREATE TABLE IF NOT EXISTS indicators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      indicator_code TEXT UNIQUE NOT NULL,
      indicator_name TEXT NOT NULL,
      source TEXT,
      category TEXT
    )`);

    // Data values table
    db.run(`CREATE TABLE IF NOT EXISTS indicator_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT,
      indicator_code TEXT,
      year INTEGER NOT NULL,
      value REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (country_code) REFERENCES countries (country_code),
      FOREIGN KEY (indicator_code) REFERENCES indicators (indicator_code),
      UNIQUE(country_code, indicator_code, year)
    )`);

    // Insert sample data
    db.run(`INSERT OR IGNORE INTO countries (country_code, country_name, region, income_level, latitude, longitude) VALUES
      ('US', 'United States', 'North America', 'High income', 39.8283, -98.5795),
      ('IN', 'India', 'South Asia', 'Lower middle income', 20.5937, 78.9629),
      ('BR', 'Brazil', 'Latin America', 'Upper middle income', -14.2350, -51.9253),
      ('NG', 'Nigeria', 'Sub-Saharan Africa', 'Lower middle income', 9.0820, 8.6753),
      ('CN', 'China', 'East Asia & Pacific', 'Upper middle income', 35.8617, 104.1954),
      ('ZA', 'South Africa', 'Sub-Saharan Africa', 'Upper middle income', -30.5595, 22.9375)
    `);

    db.run(`INSERT OR IGNORE INTO indicators (indicator_code, indicator_name, source, category) VALUES
      ('SI.POV.DDAY', 'Poverty headcount ratio at $2.15 a day', 'World Bank', 'Poverty'),
      ('SE.ADT.LITR.ZS', 'Literacy rate, adult total', 'World Bank', 'Education'),
      ('SL.TLF.ACTI.ZS', 'Labor force participation rate', 'World Bank', 'Employment'),
      ('SP.DYN.LE00.IN', 'Life expectancy at birth', 'World Bank', 'Health'),
      ('NY.GDP.PCAP.CD', 'GDP per capita', 'World Bank', 'Economy')
    `);

    // Insert sample indicator data
    const indicators = ['SI.POV.DDAY', 'SE.ADT.LITR.ZS', 'SL.TLF.ACTI.ZS', 'SP.DYN.LE00.IN', 'NY.GDP.PCAP.CD'];
    const countries = ['US', 'IN', 'BR', 'NG', 'CN', 'ZA'];
    
    countries.forEach(country => {
      indicators.forEach(indicator => {
        for (let year = 2018; year <= 2022; year++) {
          let value;
          switch (indicator) {
            case 'SI.POV.DDAY': // Poverty rate
              value = Math.random() * 30 + 5;
              break;
            case 'SE.ADT.LITR.ZS': // Literacy
              value = Math.random() * 30 + 70;
              break;
            case 'SL.TLF.ACTI.ZS': // Labor participation
              value = Math.random() * 30 + 60;
              break;
            case 'SP.DYN.LE00.IN': // Life expectancy
              value = Math.random() * 15 + 65;
              break;
            case 'NY.GDP.PCAP.CD': // GDP per capita
              value = Math.random() * 8000 + 2000;
              break;
          }
          
          db.run(
            `INSERT OR IGNORE INTO indicator_data (country_code, indicator_code, year, value) 
             VALUES (?, ?, ?, ?)`,
            [country, indicator, year, value]
          );
        }
      });
    });

    console.log('Database initialized with sample data');
  });
};

export { db, initDB };