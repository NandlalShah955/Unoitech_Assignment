import HomeDataModel from "../models/homeModel.js";
import * as cheerio from 'cheerio';
import axios from "axios";

class HomeController {
    static webScrapping = async (req, res) => {
        try {
              const {url}=req.body; 
            // const url = "https://www.aleaitsolutions.com/";  // Replace with actual URL to scrape
            const response = await axios.get(url);
            const html = response.data;
            // console.log(html,"html");
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
                email
            }
            // const doc = new HomeDataModel({
            //     name:name,
            //     description:description,
            //     logoUrl:logoUrl,
            //     facebookUrl:facebookUrl,
            //     linkedinUrl:linkedinUrl,
            //     twitterUrl:twitterUrl,
            //     instagramUrl:instagramUrl,
            //     address:address,
            //     phoneNumber:phoneNumber,
            //     email:email
            //   });
            //   await doc.save();
            res.send({
                status: "success",
                message: "Data Scrapped Successfully",
                data: data,
            });
        } catch (error) {
            console.log(error)
            res.status(500).send({ status: "failed", message: "There is some error while Scraping the data" });
        }

    }
};
export default HomeController;