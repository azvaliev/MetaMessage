import QRCode from "react-qr-code";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import ShortenPubkey from "../../../components/UI/ShortenPubkey";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AddressHolder = styled.h1`
width: 91vw;
`;
const ImageHolder = styled.div`
min-width: 6vw;
height: 6vw;
@media screen and (max-width: 767px) {
  min-width: 10vw;
  height: 9vw;
}
`;

export default function Profile(props) {

  const router = useRouter();
  const {address} = router.query;

  const attemptShortenPubkey = () => {
    try {
        return ShortenPubkey(address, false, props.mobile);
    } catch (err) {
        setTimeout(async () => {
            router.push('/profile/[address]', `/profile/${props.pubkey.toString()}`);
        })
    }
}

    return (
        <div className=" h-fit py-4 border-b-2 text-white border-gray-300 flex flex-row">
          <ImageHolder className="relative h-full ml-4 -mt-4 text-6xl text-blue-600">
          <Link href='/'> 
          &#x226A;
          </Link>
        </ImageHolder>
        <AddressHolder className="text-3xl lg:text-4xl ml-2" id="home">
          {attemptShortenPubkey()}
        </AddressHolder>

      </div>
    )
}