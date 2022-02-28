import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import ComposeField from "../components/UI/ComposeField";
import DesktopCompose from "../components/UI/DesktopCompose";
import SendMsg from "../components/Logic/SendMsg";
import AlertMessage from "../components/UI/AlertMessage";


let Main = styled.div`
overflow-y: hidden;
`;

export default function Compose (props) {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [theAlertMessage, setTheAlertMessage] = useState({
        message: '',
        warning: true
    });
    

    const handleTypingMessage = e => {
        setMessage(e.target.value);
    }

    const preventDefault = e => {
        e.preventDefault();
    }

    const handleTypingRecipient = e => {
        setRecipient(e.target.value);
    }

    async function handleSendMessage()  {
        if (message.length < 1) {
            sendAlert('Message too short', true);
        } else {
            if (recipient.length < 32) {
                sendAlert('Please enter valid address', true);
            } else {
                if (message.length > 300) {
                    sendAlert('Please shorten your message')
                } else {
                    setMessage('');
                    let result = await SendMsg(message, recipient, props.keypair);
                    if (result == 'badkey') {
                        sendAlert('Recipient address is invalid: Please Verify', true);
                    } else if (result == 'success') {
                        sendAlert('Message Delivered', false)
                    }
                }
            }
        }
    }

    useEffect(() => {
        let stayup = setInterval(() => {
            window.scrollTo(0, 0);
        }, 1);
        return () => {
            clearInterval(stayup);
        }
    })



    const sendAlert = (message, warning) => {
        setTheAlertMessage({message: message, warning: warning});
        setTimeout(() => {
            setTheAlertMessage({
                message: '',
                warning: true,
            })
        }, 7500)
    }



    return (
        <Main className={`bg-black z-50 px-72 h-screen max-h-screen`}>
            <form onSubmit={preventDefault} className="lg:h-screen lg:flex lg:flex-col">
            <div className="relative z-20 text-white ">
                <Link href="/">
                <h4 className="text-7xl ml-auto mr-0 w-fit z-20">
                    &#x2715;
                </h4>
                </Link>
            </div>
            <div className="flex flex-row text-white -mt-16">
                <h2 className="text-3xl lg:text-5xl mx-auto pt-4 pb-2 lg:pb-6 -z-0">New Message</h2>
                
            </div>
            <div className="flex flex-row border-y-1 border-gray-300 enter lg:py-4 text-3xl text-white lg:mx-12 lg:border-2 lg:rounded-xl">
                <ComposeField
                    value={recipient} 
                    onInputChange={handleTypingRecipient}
                    placeholder="Recipient..."
                />

            </div>
            <DesktopCompose bottom='bottom-35' extramargin={true} message={message} handleTypingMessage={handleTypingMessage} handleSendMessage={handleSendMessage} />
            
            </form>
            <AlertMessage message={theAlertMessage.message} warning={theAlertMessage.warning}/>
        </Main>
    );
}