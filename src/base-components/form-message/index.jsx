import React, { useEffect } from "react";

export default function FormMessage({field, errors}){
    useEffect(()=>{
        console.log(errors)
    },[])

    if(errors[field]){
        return <p className="error-message">{errors[field]?.message}</p>
    }else{
        return <></>
    }
}

