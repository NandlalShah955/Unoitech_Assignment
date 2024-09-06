// Created this page so that i don't have to change Backend URL again and again 

const Backend_Url =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/"
    : window.location.hostname === "accint.aleaspeaks.com"
    ? "https://accint-fetch.aleaspeaks.com/fetch/"
    : "https://app-fetch.plus1iq.com/fetch/";
    
export { Backend_Url};