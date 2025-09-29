 import express from 'express';
import { 
  getWorldBankData, 
  getUNDPData, 
  getCountryData, 
  getDashboardData 
} from '../controllers/dataController.js';

const router = express.Router();

router.get('/worldbank', getWorldBankData);
router.get('/undp', getUNDPData);
router.get('/countries', getCountryData);
router.get('/dashboard', getDashboardData);

export default router;