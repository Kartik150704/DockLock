// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    
    struct MyStruct {
        string signature;
        string issuerName;
        string issuerEmail;
        string receiver;
        string documentId;
    }

    mapping(string => MyStruct) public documentMapping;
    mapping(string => string) public documentReference; 

    function addObject(
        string memory key,
        string memory _signature,
        string memory _issuerName,
        string memory _issuerEmail,
        string memory _receiver,
        string memory _documentId
    ) public {
        MyStruct memory newObject = MyStruct({
            signature: _signature,
            issuerName: _issuerName,
            issuerEmail: _issuerEmail,
            receiver: _receiver,
            documentId: _documentId
        });

        documentMapping[key] = newObject;
    }

    function getObject(string memory key) public view returns (MyStruct memory) {
        return documentMapping[key];
    }


    function setDocumentReference(string memory key, string memory docReference) public {
        documentReference[key] = docReference;
    }


    function getDocumentReference(string memory key) public view returns (string memory) {
        return documentReference[key];
    }
}
