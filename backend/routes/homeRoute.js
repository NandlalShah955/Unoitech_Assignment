import express from 'express';
const router=express.Router();
import HomeController from '../controllers/homeController.js';
router.post('/webscrap',HomeController.webScrapping);
export default router;