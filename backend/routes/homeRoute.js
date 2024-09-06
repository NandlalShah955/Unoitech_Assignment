import express from 'express';
const router=express.Router();
import HomeController from '../controllers/homeController.js';
// Single route for Posting and getting Scrapped data from the Database 
router
  .route("/webscrap")
  .get(HomeController.getScappedData)
  .post(HomeController.webScrapping);

//   Route for gettting a Single Scrapped data 
  router.route("/webscrap/:id")
  .post(HomeController.getSingleScrappedData)

  // ROute for deleting Multiple Data 
  router.route("/delete/webscrap").post(HomeController.deleteScrappedData);
export default router;