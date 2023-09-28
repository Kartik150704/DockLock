import React, { useState, useEffect } from "react";

const fetchAPI = (url, data, method) => {
    
    const options = {
        method: method, 
        headers: {
            'Content-Type': 'application/json', 
           
        },
        body: JSON.stringify(data), 
    };

    
    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            throw error; 
        });
};

export default fetchAPI;
