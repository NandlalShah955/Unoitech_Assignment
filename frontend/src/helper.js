// Created this page so that i don't have to change Backend URL again and again 

const Backend_Url =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/"
    : "https://backend-s40u.onrender.com/api/";
    
export { Backend_Url};