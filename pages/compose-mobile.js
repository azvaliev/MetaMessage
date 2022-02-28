import {KeyboardAvoidingView, View, Text, TextInput} from 'react-native-web'
import Link from 'next/link';
import { useState } from 'react';
import NativeComposeMessage from '../components/UI/NativeComposeMessage';
import SendMsg from '../components/Logic/SendMsg';
import AlertMessage from '../components/UI/AlertMessage';

const Compose2 = props => {

    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [theAlertMessage, setTheAlertMessage] = useState({
        message: '',
        warning: true
    });

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
    const sendAlert = (message, warning) => {
        setTheAlertMessage({message: message, warning: warning});
        setTimeout(() => {
            setTheAlertMessage({
                message: '',
                warning: true,
            })
        }, 7500)
    }

    const handleTypingMessage = e => {
        setMessage(e.target.value);
    }

    const handleTypingRecipient = e => {
        setRecipient(e.target.value);
    }

    const onFocus = () => {
        window.scrollTo(0,0);
        setTimeout(() => {
            window.scrollTo(0,0);
        }, 30)
        setTimeout(() => {
            window.scrollTo(0,0);
        }, 80)
    }
    const onBlur = () => {
        window.scrollTo(0,0)
    }

    return (
        <View style={{height: '90vh', backgroundColor: 'black'}}>
        <KeyboardAvoidingView style={{backgroundColor: 'black', minHeight: '50vh', maxHeight: '90vh'}}>
            <View style={{zIndex: '20'}}>
                <Link href="/">
                    <Text
                        style={{
                            fontSize: '4.5rem',
                            lineHeight: '1',
                            marginLeft: 'auto',
                            marginRight: '2%',
                            width: 'fit-content',
                            zIndex: '20',
                            color: 'white'
                        }}>
                        &#x2715;
                    </Text>
                </Link> 
            </View>
            <View style={{color: 'white', marginTop: '-4.7rem'}}> 
                <Text nativeID="newmessage" style={{
                    fontSize: '1.875rem',
                    lineHeight: '2.25rem',
                    paddingTop: '1.4rem',
                    paddingBottom: '0.5rem',
                    zIndex: '0',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    New Message
                </Text>
            </View>
            {/* <div className="flex flex-row border-y-1 border-gray-300 enter text-3xl text-white lg:mx-12 lg:border-2 lg:rounded-3xl">
                <ComposeField
                    value={recipient} 
                    onInputChange={handleTypingRecipient}
                    placeholder="Recipient..."
                    preventScroll={preventDefault}
                    ref={recipientRef}
                />

            </div> */}
            <View style={{
                borderBottomWidth: '1px',
                borderTopWidth: '1px',
                borderColor: 'grey',
                minHeight: '10vh',
                color: 'white',
                marginTop: '2vh',
                marginLeft: '2%',
                marginRight: '2%'
            }}>
                <TextInput nativeID="textinput"
                    autoFocus={true}
                    value={recipient}
                    onChange={handleTypingRecipient}
                    placeholder="Recipient Address"
                    autoFocus={true}
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: 'rgb(209 213 219)',
                        borderRadius: '0px',
                        marginLeft: '2%',
                        marginRight: '2%',
                        width: '96%',
                        fontSize: '1.875rem',
                        lineHeight: '2.25rem',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    }}
                />
            </View>
            <NativeComposeMessage handleSendMessage={handleSendMessage} message={message} handleTypingMessage={handleTypingMessage} onFocus={onFocus} onBlur={onBlur}/>

        </KeyboardAvoidingView>
        <AlertMessage message={theAlertMessage.message} warning={theAlertMessage.warning}/>
        </View>
    )
}

export default Compose2;