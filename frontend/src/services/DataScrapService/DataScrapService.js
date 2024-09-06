import Http from '../../Http';
import { Backend_Url } from '../../helper';

// Scrapping data from the URL 
export const ScrapDatafromURL = (url) => {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            Http.post(Backend_Url + 'webscrap', url)
                .then((res) => {
                    //dispatch(set_user_auth(res));
                    return resolve(res);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
}

// Getting all Scrapped Data from the Database 
export const getScrapedData = () => {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            Http.get(Backend_Url + 'webscrap')
                .then((res) => {
                    return resolve(res.data);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
}
// Getting Single Scrapped Data from the Database 
export const getSingleScrappedData = (id) => {
    return () =>
        new Promise((resolve, reject) => {
            Http.get(Backend_Url + `webscrap/${id}`)
                .then((res) => {
                    return resolve(res.data);
                })
                .catch((err) => {
                    return reject(err)
                })
        })
}

export const deleteScrappedData=(idArray)=>{
    console.log('idArray', idArray);
    return () =>
        new Promise((resolve, reject) => {
            Http.get(Backend_Url + `/delete/webscrap`, idArray)
                .then((res) => {
                    return resolve(res.data);
                })
                .catch((err) => {
                    return reject(err)
                })
        })
}