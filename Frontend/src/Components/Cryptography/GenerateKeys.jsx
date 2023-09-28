import React, { useState } from 'react';

function KeyGenerator() {
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [generated, setGenerated] = useState(false);

    const generateKeys =async  () => {

        let response=await fetch("http://localhost:8000/generatekeys")
        response=await response.json();
        setPublicKey(response.publicKey)
        setPrivateKey(response.privateKey)
        setGenerated(true)
        handleDownload(response.publicKey,"PublicKey")
        handleDownload(response.privateKey,"PrivateKey")


    };

    const handleDownload = (inputdata,type) => {
        const blob = new Blob([inputdata], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}.txt`; // Set the desired file name
        a.style.display = 'none';
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <button onClick={generateKeys}>Generate Keys</button>
            {generated && (
                <div>
                    <button onClick={()=>handleDownload(publicKey,"PublicKey")}>Download Public Key</button>
                    <button onClick={()=>handleDownload(privateKey,"PrivateKey")}>Download Private Key</button>
                </div>
            )}
        </div>
    );
}

export default KeyGenerator;

