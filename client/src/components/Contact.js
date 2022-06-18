import React,{useEffect} from 'react';

export default function Contact() {
    useEffect(()=>{
        document.title="contact us";
    },[]);
    return (
        <div>
            <h1>Contact us</h1>
        </div>
    )
}
