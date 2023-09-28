import React from "react";
import { CommonValueProvider,useCommonValue } from "../ContextAPI/ContextAPI";

const InformationScreen=()=>
{
    const {saveCommonValue,getCommonValue}=useCommonValue();

    const test=()=>
    {
        saveCommonValue("Email","kartik")
    }
    return(
        <div>
            <h1>Information Screen</h1>
            <button onClick={test}>Store Value</button>
        </div>
    )
}

export default InformationScreen;