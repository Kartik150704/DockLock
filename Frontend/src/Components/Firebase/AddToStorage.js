import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyALrpJ5k3sziQswKNw0NhBXdicxqlnp_kw",
    authDomain: "document-validator-f6227.firebaseapp.com",
    projectId: "document-validator-f6227",
    storageBucket: "document-validator-f6227.appspot.com",
    messagingSenderId: "272093140989",
    appId: "1:272093140989:web:c2328bc564755988dd2b94",
    measurementId: "G-949V70NRLC"
};

const firebaseApp = initializeApp(firebaseConfig);
const uploadFileToStorage = async (fileData, filePath, fileName) => {
    try {
        const storage = getStorage(firebaseApp); // Get Firebase Storage instance
        const storageRef = ref(storage, `${filePath}/${fileName}`);
        await uploadBytes(storageRef, fileData);
        const accessToken = '69e86279-6e89-44cd-a78f-1315fb399bed';
        const url = await getDownloadURL(storageRef,accessToken);
        

        return url; // Return the URL for further use
    } catch (error) {
        console.error('Error uploading file:', error);
        return null; // Return null in case of an error
    }
};


export {uploadFileToStorage}
