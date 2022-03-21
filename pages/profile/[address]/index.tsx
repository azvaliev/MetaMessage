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
  const [fullAddress, setFullAddress] = useState("");

  const handleCopyAddress = () => {
    copy(address.toString());
  };

  useEffect(() => {
    try {
      let key = props.pubkey.toString();
      if (typeof key === "string") {
        setDisplayAddress(ShortenPubkey(key, false, true));
        setFullAddress(key);
      } else {
        setDisplayAddress("loading...");
      }
    } catch (err) {
      router.push("/");
    }
  }, [props.pubkey]);

  const displayAddAppGuide = () => {
    props.onShowAppGuide();
    router.push("/");
  };

  return (
    <div className="flex flex-col text-white overflow-x-hidden mx-4 md:w-2/3 md:mx-auto lg:w-1/2">
      <div className=" h-fit pt-4 pb-2 border-b-[1px] border-gray-300 flex flex-row">
        <AddressHolder className={`text-3xl lg:text-3xl font-bold`} id="home">
          {displayAddress}
        </AddressHolder>
        <div className="relative h-full w-fit ml-auto mr-0 -mt-4 md:-mt-8 lg:-mt-6 text-6xl lg:text-7xl text-blue-600 ">
          <Link href="/">&#x2715;</Link>
        </div>
      </div>
      <h2 className="pt-6 mx-2 text-center text-2xl">
        {"Tap "}
        <span
          className="text-blue-500 underline font-bold hover:cursor-pointer"
          onClick={handleCopyAddress}
        >
          here
        </span>
        {" or scan below to copy your address"}
      </h2>
      <QRCode
        className="mx-auto my-6 border-[0.8px] border-gray-700"
        size={props.mobile ? 200 : 256}
        bgColor="#2563EB"
        value={fullAddress}
      />
      {props.mobile && (
        <div className="flex flex-col border-b-[0.5px] pb-6 border-white">
          <div className="flex flex-row h-[14vh] pt-4 border-t-[0.5px] border-white">
            <h2 className="text-2xl md:text-3xl text-left ml-2 w-3/4 mt-4">
              Add Meta Message to your homescreen
            </h2>
            <div className="relative w-1/4 top-0 mb-[0.25rem] mx-0">
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
        </div>
      )}
      <div className="flex flex-row py-4 pb-6 border-b-[0.5px] border-white decoration-[0.7px]">
        <h5
          onClick={props.onDeleteAccount} id="deleteAccount"
          className={`text-red-500 text-2xl md:text-3xl underline mr-3 ml-auto text-center font-light`}
        >
          Delete Account
        </h5>
        <h5
          onClick={props.onLogout} id="logout"
          className={`text-red-500 text-2xl md:text-3xl underline ml-3 mr-auto font-light`}
        >
          Log Out
        </h5>
      </div>
    </div>
  );
}
