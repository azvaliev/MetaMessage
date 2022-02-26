import Image from 'next/image'
import { useEffect, useState } from 'react'
import GenerateKeypair from '../components/Logic/GenerateKeypair';
import * as solanaWeb3 from '@solana/web3.js';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import Link from 'next/link';
import Compose from '../components/UI/Compose';

export default function Home() {

  const [keypair, setKeypair] = useState({});
  const [pubkey, setPubkey] = useState({});
  const [conversations, setConversations] = useState([
    {
      address: '2zP1dvHobmDMoF4acNPEpHST3PKASbyLBhaDteGVMXdK',
      lastMsg: `Hey, how's everything?`
    },
    {
      address: 'EeJyWaDH6ZjV7mzuy7ZbzB9V8EmoGhsVwb6WzgEhNvie',
      lastMsg: 'We still on for friday?'
    }
  ]);
  const [showCompose, setShowCompose] = useState('default-compose');
  const [typing, setTyping] = useState('');
  

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

  useEffect(() => {
    console.log(Compose);
    const storedData = window.localStorage;
    const keypairCheck = storedData.getItem('keypair');
    if (keypairCheck) {
      setKeypair(new solanaWeb3.Keypair(JSON.parse(keypairCheck)._keypair));
      setPubkey(new solanaWeb3.PublicKey(Object.values(JSON.parse(keypairCheck)._keypair.publicKey)));
    }
  }, []);

  const handleGenerateKeypair = () => {
    console.log('fly')
    setKeypair(GenerateKeypair());
  }

  function isMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  const shortenPubKey = (key, intro) => {
    if (isMobile()){
    return key.substring(0,10) + '...' + key.substring(key.length - 6);
    } else  {
      if (intro) {
        return `Welcome back, ${key}`;
      } else {
        return key;
      }
      
    }
  }

  const handleCopyAddress = cp => {
    copy(cp);
    alert('copied');
  }

  const handleCompose = type => {
    if (type == 'show') {
      setShowCompose('slide-compose');
      setTimeout(() => {
        setShowCompose('show-compose')
      }, 500)
    } else {
      setShowCompose('slide-out-compose');
      setTimeout(() => {
        setShowCompose('default-compose');
        window.scrollTo(0, 0);
      }, 500)
    }

  }


  const handleTyping = v => {
    setTyping(v);
  }


  return (
    <Main className=" flex flex-col h-screen bg-black text-white">
      <div className=" h-fit py-4 border-b-2 border-gray-300 flex flex-row">
        <AddressHolder className="text-3xl lg:text-4xl ml-2" id="home" onClick={() => handleCopyAddress(pubkey.toString())}>
          {Object.keys(pubkey).length == 0 ? 'Meta Message' : shortenPubKey(pubkey.toString(), true)}
        </AddressHolder>
        <ImageHolder className="relative h-full mr-4">
          <Image src="/img/Compose.png" layout="fill" objectFit="contain" onClick={() => handleCompose('show')} />
        </ImageHolder>
      </div>
      
        {Object.keys(keypair).length == 0 ?
        <div className="m-auto lg:mx-2 text-center">
          <h2 className="text-3xl">Welcome!</h2>
          <h3 className="text-2xl">Please claim your keypair below!</h3>
          <button 
          className="bg-blue-700 px-4 py-2 rounded-md mt-4 text-3xl hover:text-4xl font-bold"
          onClick={handleGenerateKeypair}>
            Claim keypair
          </button>
          </div>
        :
          <div className="w-full">
            {conversations.map(conversation => {
              return (<div className="flex flex-col lg:px-2 pt-4 pb-2 w-full border-b-2 border-gray-700">
                <h3 className="text-2xl text-left">{shortenPubKey(conversation.address)}</h3>
                <h4 className="text-xl text-left italic pt-4 text-gray-400">{conversation.lastMsg}</h4>
              </div>)
            })}
          </div>
        }
          <Compose className={showCompose} keypair={keypair} pubkey={pubkey} onTyping={handleTyping} h={typing} handleCompose={handleCompose}/>
    </Main>
  )
}
