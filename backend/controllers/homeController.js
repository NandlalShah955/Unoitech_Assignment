import HomeDataModel from "../models/homeModel.js";
import * as cheerio from 'cheerio';
import axios from "axios";

class HomeController {
    // Function for Posting the Scrapped Data in Database  
    static webScrapping = async (req, res) => {
        try {
            const { url } = req.body;
            const UrlData = await HomeDataModel.findOne({ url: url });
            if (UrlData) {
                res
                    .status(400)
                    .send({ status: "failed", message: "This URL data already exists" });
            } else {

                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                // Extracting details
                const name = $('title').text().trim(); // Extracting from <title> tag
                const description = $('meta[name="description"]').attr('content') || ''; // Meta description
                const logoUrl = $('img').first().attr('src'); // Example: Extracting first image src as logo
                const facebookUrl = $('a[href*="facebook.com"]').attr('href') || '';
                const linkedinUrl = $('a[href*="linkedin.com"]').attr('href') || '';
                const twitterUrl = $('a[href*="twitter.com"]').attr('href') || '';
                const instagramUrl = $('a[href*="instagram.com"]').attr('href') || '';
                // const address = $('[itemprop="address"]').text().trim() || '';
                // const phoneNumber = $('[itemprop="Call"]').text().trim() || '';
                // const email = $('a[href^="mailto:"]').attr('href')?.replace('mailto:', '') || '';
                let address = '';
                let phoneNumber = '';
                let email = '';

                // // Look for specific tags or attributes that may contain address, phone, or email
                $('p').each((index, element) => {
                    const text = $(element).text().toLowerCase();

                    // Find address-like content (which often contains numbers, commas, and street names)
                    if (text.includes('address') || text.match(/\d{3,}/)) {
                        address += $(element).text().trim() + ' ';
                    }

                    // Find phone number by detecting patterns like "Phone" or matching number patterns
                    if (text.includes('phone') || text.match(/\+?\d[\d\s()-]{7,}/)) {
                        phoneNumber = $(element).text().replace('Phone:', '').trim();
                    }

                    // Find email using a common email format
                    if (text.includes('mail') || $(element).html().includes('mailto')) {
                        email = $(element).find('a[href^="mailto:"]').attr('href')?.replace('mailto:', '').trim() || $(element).text().replace('Mail:', '').trim();
                    }
                });

                let data = {
                    name,
                    description,
                    logoUrl,
                    facebookUrl,
                    linkedinUrl,
                    twitterUrl,
                    instagramUrl,
                    address,
                    phoneNumber,
                    email,
                }
                const doc = new HomeDataModel({
                    name: name,
                    description: description,
                    logoUrl: logoUrl,
                    facebookUrl: facebookUrl,
                    linkedinUrl: linkedinUrl,
                    twitterUrl: twitterUrl,
                    instagramUrl: instagramUrl,
                    address: address,
                    phoneNumber: phoneNumber,
                    email: email,
                    url: url
                });
                await doc.save();
                res.status(200).send({
                    status: "success",
                    message: "Data Scrapped Successfully",
                    data: data,
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: "failed", message: "There is some error while Scraping the data", error: error });
        }

    }

    // Function for getting all the ScappedData 
    static getScappedData = async (req, res) => {
        try {
            const Scappeddata = await HomeDataModel.find();
            res.send({
                status: "success",
                message: "Fetched Scrapped Data Successfully",
                data: Scappeddata,
            });
        } catch (error) {
            console.log(error, "error");
            res.status(500).send({ status: "failed", message: "There is some error while getting the data", error: error });
        }
    }
    // Function for getting a single ScappedData 
    static getSingleScrappedData = async (req, res) => {
        try {
            const { id } = req.params;
            const SingleScrappedData = await HomeDataModel.findById(id);
            res.send({
                status: "success",
                message: "Fetched Scrapped Data Successfully",
                data: SingleScrappedData,
            });
        } catch (error) {
            console.log(error, "error");
            res.status(500).send({ status: "failed", message: "There is some error while getting the data", error: error });
        }
    }
    static deleteScrappedData = async (req, res) => {
        try {
            const { idArray } = req.body;
            // Validate the input to make sure idArray exists and is an array
            if (!idArray || !Array.isArray(idArray)) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Invalid input. idArray must be a valid array of IDs.',
                });
            }
            //   Use deleteMany with $in to delete all documents at once
            const result = await HomeDataModel.deleteMany({ _id: { $in: idArray } });
          
            // Check if documents were deleted
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'No matching records found to delete.',
                });
            }
            const updatedScrappedData = await HomeDataModel.find()
            res.status(200).json({ status: 'success', message: 'Data deleted successfully', data: updatedScrappedData });
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: "failed", message: "There is some error while getting the data", error: error });
        }
    };
};
export default HomeController;