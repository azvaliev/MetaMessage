import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import ShortenPubkey from '../components/UI/ShortenPubkey';
import { CompareDates } from '../components/Logic/CreateFormatDate';

export default function Home(props) {

  const Main = styled.div`
    width: 100%;
  `;

  const ImageHolder = styled.div`
    filter: invert(1);
    min-width: 6vw;
    height: 6vw;
    @media screen and (max-width: 767px) {
      min-width: 10vw;
      height: 9vw;
    }
  `;

  const AddressHolder = styled.h1`
    width: 91vw;
  `;


  const handleCopyAddress = cp => {
    copy(cp);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Main className=" flex flex-col h-screen bg-black text-white lg:px-36">
      <div className=" h-fit py-4 border-b-2 border-gray-300 flex flex-row">
        <AddressHolder className="text-3xl lg:text-4xl ml-2" id="home" onClick={() => handleCopyAddress(props.pubkey.toString())}>
          {Object.keys(props.pubkey).length == 0 ? 'Meta Message' : ShortenPubkey(props.pubkey.toString(), true, props.mobile)}
        </AddressHolder>
        <ImageHolder className="relative h-full mr-4">
          <Link href={props.mobile ? '/compose-mobile': '/compose'}> 
          <Image src="/img/Compose.png" alt="Compose" layout="fill" objectFit="contain" />
          </Link>
        </ImageHolder>
      </div>
      
        {Object.keys(props.keypair).length == 0 ?
        <div className="m-auto lg:mx-2 text-center">
          <h2 className="text-3xl">Welcome to Meta Message beta!</h2>
          <h3 className="text-2xl">Please claim your keypair below</h3>
          <button 
          className="bg-blue-700 px-4 py-2 rounded-md mt-4 text-3xl hover:text-4xl font-bold"
          onClick={props.onGenerateKeypair}>
            Claim keypair
          </button>
          </div>
        :
        props.conversations.length == 0 ?
          <div className="w-full">
            <h3 className="text-3xl text-center pt-8">Loading...</h3>
          </div>
        :
        props.conversations[0] == 'N/A' ?
          <div className="w-full">
            <h3 className="text-3xl text-center pt-8">No conversations yet</h3>
          </div>
        :
          <div className="w-full">
            {props.conversations.map(conversation => {
              let recipient = null;
              conversation.forEach(message => {
                if(message.from !== props.pubkey.toString() && message.from !== undefined) {
                  recipient = message.from;
                }
              })
              if (recipient !== null) {
              return (
              <Link href='/conversation/[address]' as={`/conversation/${recipient}`}>
              <div className="flex flex-col px-2 pt-4 pb-2 w-full border-b-2 border-gray-700">
                <div className="flex flex-row">
                  <h3 className="text-2xl ml-0 mr-auto">{ShortenPubkey(recipient, false, props.mobile)}</h3>
                  
                </div>
                <h4 className="text-xl text-left italic pt-4 text-gray-400">{conversation[conversation.length-1].from !== props.pubkey.toString() ? '' : 'You: '}{conversation[conversation.length-1].message}</h4>
                <h3 className="text-xl ml-0 mr-auto">{CompareDates(conversation[conversation.length-1].date)[1]}</h3>
              </div>
              </Link>
              )
              }
            })}
          </div>
        }
    </Main>
  )
}
