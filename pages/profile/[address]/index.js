import QRCode from "react-qr-code";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import ShortenPubkey from "../../../components/UI/ShortenPubkey";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
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
  const { address } = router.query;

  const [displayAddress, setDisplayAddress] = useState("");

  const handleCopyAddress = () => {
    copy(address);
  };

  useEffect(() => {
    let key = props.pubkey.toString();
    if (typeof key === "string") {
      setDisplayAddress(key);
    } else {
      setDisplayAddress("loading...");
    }
  }, [props.pubkey]);

  const attemptShortenPubkey = () => {
    try {
      return ShortenPubkey(displayAddress, false, props.mobile);
    } catch (err) {
      setTimeout(async () => {
        router.push(
          "/profile/[address]",
          `/profile/${props.pubkey.toString()}`
        );
      });
    }
  };

  const displayAddAppGuide = () => {
    props.onShowAppGuide();
    router.push("/");
  };

  return (
    <div className="flex flex-col text-white overflow-x-hidden md:mx-32 lg:mx-56">
      <div className=" h-fit py-4 border-b-2  border-gray-300 flex flex-row">
        <AddressHolder
          className="text-3xl lg:text-4xl ml-1 md:-ml-8 lg:-ml-24 md:text-center font-bold"
          id="home"
        >
          {attemptShortenPubkey()}
        </AddressHolder>
        <ImageHolder className="relative h-full ml-1 -mt-4 text-6xl text-blue-600 ">
          <Link href="/">&#x2715;</Link>
        </ImageHolder>
      </div>
      <h2 className="pt-6 mx-2 text-center text-2xl">
        Looking to connect with others? Ask them to scan this QR code on their
        Meta Message
      </h2>
      <QRCode
        className="mx-auto mt-6"
        size={props.mobile ? "200" : "256"}
        bgColor="#2563EB"
        value={displayAddress}
      />
      <h3 className="text-2xl text-center pt-6 pb-4 border-b-2 ">
        Or.. tap{" "}
        <span
          className="text-blue-500 underline font-bold"
          onClick={handleCopyAddress}
        >
          here
        </span>{" "}
        to copy your address
      </h3>
      {props.mobile && (
        <>
          <div className="flex flex-row h-25vh pt-4">
            <h2 className="text-2xl md:text-3xl text-left ml-2 w-3/4 mt-4">
              Add Meta Message to your homescreen
            </h2>
            <div className="relative w-1/4 top-0 mb-1 mx-0">
              <Image src="/img/icon.jpeg" layout="fill" objectFit="contain" />
            </div>
          </div>
          <span className="italic text-center text-xl font-bold">
            (Coming Very Soon)
          </span>
          <button
            className="mx-auto px-4 py-2 mt-4 text-4xl bg-indigo-600 rounded-md font-semibold line-through"
            onClick={displayAddAppGuide}
          >
            Show me how
          </button>
        </>
      )}
    </div>
  );
}

