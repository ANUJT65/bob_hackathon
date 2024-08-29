import React, { useContext, useState } from 'react'
import EmailSentiment from './EmailSentiment'
import { MailContext } from '../contexts/MailContext'; // Ensure this matches your file path and naming


const EmailCard = ({senderName, urgency, time, title, preview, sentiment, email,application_id}) => {
    const { singlemail, setEmail } = useContext(MailContext); 
    const [isClicked, setIsClicked] = useState(false);
    const currentMail = {
        senderName: senderName, 
        urgency: urgency, 
        time: time, 
        title: title, 
        preview: preview, 
        sentiment: sentiment,
        email: email,
        application_id:application_id
    }

    const bg = singlemail.email === currentMail.email
    ? 'hover:shadow-md bg-white'
    : 'hover:shadow-md bg-gray-200';

    const handleClick = () => {
        setEmail(currentMail); // Update with your logic to set the email
        setIsClicked(true); // Set the background color to white on click
    };

    //const { singlemail, setEmail } = useContext(emailContext);
    return (
        <button 
            className={`${bg}`}
            onClick={handleClick}
        >
            <div className='flex flex-col p-4'>
                <div className='flex justify-between'>
                    <div className='text-xl font-bold'>{senderName}</div>
                    <div className='flex justify-center'>
                        <div className='font-bold text-red-500 mx-2'>{urgency}</div>
                        <div className='font-bold text-green-700'>{time}</div>
                    </div>
                </div>
                
                <div className='text-left'>
                    <div className='text-small mt-2'>{title}</div>
                        <div className='text-small mt-2 text-gray-500'>{preview}
                    </div>
                </div>
                <EmailSentiment sentiment={sentiment} />
            </div>
            <hr className='border-black'></hr>
        </button>

        
  )
}

export default EmailCard