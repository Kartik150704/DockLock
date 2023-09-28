import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import crypto from 'crypto-js';
import elliptic from 'elliptic'

const pdfToHash = (pdfFile) => {
  return new Promise((resolve, reject) => {
    if (pdfFile && pdfFile.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        // Calculate the SHA-256 hash using crypto-js
        const hashHex = crypto.SHA256(fileData);
        resolve(hashHex.toString(crypto.enc.Hex));
      };
      reader.readAsBinaryString(pdfFile);
    } else {
      reject(new Error('Please select a valid PDF file.'));
    }
  });
};


const stringToHash =async  (string) => {
  // Calculate the SHA-256 hash using crypto-js
  const hashHex = crypto.SHA256(string);
  return hashHex.toString(crypto.enc.Hex);
};

export { pdfToHash ,stringToHash};