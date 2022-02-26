import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import ComposeField from "./ComposeField";
import Image from "next/image";
import SendMsg from "../Logic/SendMsg";

let Main = styled.div`
overflow-y: hidden;
`;

export default function Compose (props) {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [height, setHeight] = useState('vh-55')
    const recipientRef = useRef(null);
    const messageRef = useRef(null);
    const formRef = useRef(null);
    

    const handleTypingMessage = e => {
        setMessage(e.target.value);
    }

    const preventDefault = e => {
        e.preventDefault();
    }

    const handleTypingRecipient = e => {
        setRecipient(e.target.value);
    }
    const handlePreventScroll = e => {
        e.preventDefault();
        console.log('FIRING');
        window.scrollTo(0, 0);
        setHeight('vh-55');
    }
    const handleLeaveField = (event) => {
        if (!formRef.current.contains(event.relatedTarget)) {
            setHeight('vh-90');
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 50);
            
        } 
    }

    function handleSendMessage()  {
        if (message.length < 1) {
            alert('Message too short');
        } else {
            if (recipient.length < 32) {
                alert('Please enter valid public address')
            } else {
                setMessage('');
                SendMsg(message, recipient, props.keypair, props.pubkey);
                
            }
        }
    }


    useEffect(() => {
        formRef.current.addEventListener('focusout', handleLeaveField)
        return () =>{
            document.removeEventListener('scroll', handlePreventScroll);
        }
    }, [])


    return (
        <Main className={`bg-black w-full z-50 ${props.className} ${height}`}>
            <form onSubmit={preventDefault} ref={formRef} className="lg:h-screen lg:flex lg:flex-col">
            <div className="relative z-20 text-white ">
                <a href="#home">
                <h4 className="text-7xl ml-auto mr-0 w-fit z-20" onClick={props.handleCompose}>
                    &#x2715;
                </h4>
                </a>
            </div>
            <div className="flex flex-row text-white -mt-16">
                <h2 className="text-3xl lg:text-5xl mx-auto pt-4 pb-2 lg:pb-6 -z-0">New Message</h2>
                
            </div>
            <div className="flex flex-row border-y-1 border-gray-300 enter text-3xl text-white lg:mx-12 lg:border-2 lg:rounded-3xl">
                <ComposeField
                    value={recipient} 
                    onInputChange={handleTypingRecipient}
                    placeholder="Recipient..."
                    ref={recipientRef}
                />

            </div>
            <div className="absolute bottom-0 top-auto enter flex flex-row text-3xl border-1 border-gray-300 rounded-3xl w-full lg:static lg:mt-auto lg:mb-12 lg:w-auto lg:mx-12 lg:border-2">
                <ComposeField
                    textarea={true}
                    value={message} 
                    onInputChange={handleTypingMessage}
                    placeholder="Message"
                    preventScroll={handlePreventScroll}
                    ref={messageRef}
                />
                <div className="m-auto bg-gradient-to-r from-pink-500 to-yellow-500 py-2 px-1 rounded-3xl mr-0">
                <div className="relative w--10 h-10vw mr-2" onClick={handleSendMessage}>
                    <Image src="/img/compose.png" layout="fill" objectFit="contain"/>
                </div>
                </div>
            </div>
            </form>
        </Main>
    );
}