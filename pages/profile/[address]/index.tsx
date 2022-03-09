import QRCode from "react-qr-code";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { useRouter } from "next/router";
import { Props } from "../../../components/types";
import { ShortenPubkey } from "../../../components/UI/Shorten";

const AddressHolder = styled.h1`
  word-wrap: break-word;
`;

export default function Profile(props: Props) {
  const router = useRouter();
  const { address } = router.query;

  const [displayAddress, setDisplayAddress] = useState("");

  const handleCopyAddress = () => {
    copy(address.toString());
  };

  useEffect(() => {
    let key = props.pubkey.toString();
    if (typeof key === "string") {
      setDisplayAddress(ShortenPubkey(key, false, true));
    } else {
      setDisplayAddress("loading...");
    }
  }, [props.pubkey]);

  const displayAddAppGuide = () => {
    props.onShowAppGuide();
    router.push("/");
  };

  return (
    <div className="flex flex-col text-white overflow-x-hidden mx-4 md:mx-32 lg:mx-42">
      <div className=" h-fit py-4 border-b-2  border-gray-300 flex flex-row">
        <AddressHolder
          className={`
            
          text-3xl lg:text-3xl font-bold`}
          id="home"
        >
          {displayAddress}
        </AddressHolder>
        <div className="relative h-full w-fit ml-auto mr-0 -mt-4 md:-mt-8 text-6xl lg:text-7xl text-blue-600 ">
          <Link href="/">&#x2715;</Link>
        </div>
      </div>
      <h2 className="pt-6 mx-2 text-center text-2xl">
        Looking to connect with others? Ask them to scan this QR code on their
        Meta Message app
      </h2>
      <QRCode
        className="mx-auto mt-6 border-1 border-gray-300"
        size={props.mobile ? 200 : 256}
        bgColor="#2563EB"
        value={props.pubkey.toString()}
      />
      <h3 className="text-2xl text-center pt-6 pb-4 border-b-2 ">
        Or.. tap{" "}
        <span
          className="text-blue-500 underline font-bold hover:cursor-pointer"
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
              <Image
                src="/img/icon.jpeg"
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
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
