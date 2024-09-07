import HomeDataModel from "../models/homeModel.js";
import * as cheerio from 'cheerio';
import axios from "axios";
import got from "got";
import fs from "fs";
import Urlbox from "urlbox";
function validateEmail(email) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    return emailRegex.test(email);
}
class HomeController {
    // Function for Posting the Scrapped Data in Database  
    static webScrapping = async (req, res) => {
        try {
            const { url } = req.body;
            // const urlbox = Urlbox("4XoE9c5Vm66JwceB", "e36aae4677904f5e8229b5f63d07d5fb");
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
               
                let phoneNumber = '';
                
                // Regular expressions for more accurate matching
                const phoneRegex = /(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4})/g; // US-based phone numbers
                const email = [];
                $('a[href^="mailto:"]').each((index, element) => {
                    const extractedEmail = $(element).attr('href').replace('mailto:', '');
                    if (validateEmail(extractedEmail)) {
                        email.push(extractedEmail);
                    }
                });

                $('p').each((index, element) => {
                    const text = $(element).text().toLowerCase();
                    console.log('text', text);
                    // Detect phone numbers using the regular expression
                    const phoneMatch = text.match(phoneRegex);
                    if (phoneMatch) {
                        phoneNumber = phoneMatch[0]; // Taking the first phone number found
                    }
                    if (text.includes('@') && (text.includes('.com') || text.includes('.net') || text.includes('.org'))) {
                        const potentialEmail = text.split(' ').find(part => validateEmail(part));
                        if (potentialEmail) {
                            email.push(potentialEmail);
                        }
                    }

                });
                const validatedEmail = email.find(validateEmail);
                console.log('email', email, validatedEmail);

                // Additional logic: If specific attributes exist, they take priority
                const attrPhoneNumber = $('[itemprop="telephone"]').text().trim() || $('[href^="tel:"]').attr('href')?.replace('tel:', '').trim();
                if (attrPhoneNumber) {
                    phoneNumber = attrPhoneNumber;
                }

                const doc = new HomeDataModel({
                    name: name,
                    description: description,
                    logoUrl: logoUrl,
                    facebookUrl: facebookUrl,
                    linkedinUrl: linkedinUrl,
                    twitterUrl: twitterUrl,
                    instagramUrl: instagramUrl,
                    // address: address,
                    phoneNumber: phoneNumber,
                    email: validatedEmail,
                    url: url
                });
                await doc.save();
                const updatedScrappedData = await HomeDataModel.find()
                res.status(200).send({
                    status: "success",
                    message: "Data Scrapped Successfully",
                    data: updatedScrappedData,
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
    };

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
    };

    //  Function for deleting Scrapping Data
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