import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import ShortenPubkey from "../components/UI/ShortenPubkey";
import { CompareDates } from "../components/Logic/CreateFormatDate";
import { Props, Message } from "../components/types";

export default function Home(props: Props) {
  const Main = styled.div`
    width: 100%;
  `;

  const ProfileHolder = styled.div`
    min-width: 6vw;
    height: 6vw;
    @media screen and (max-width: 767px) {
      min-width: 11vw;
      height: 11vw;
    }
  `;

  const OptionHolder = styled.div`
    filter: invert(1);
    min-width: 7vw;
    height: 7vw;
    @media screen and (max-width: 767px) {
      min-width: 19vw;
      min-height: 19vw;
    }
  `;

  const OptionInnerHolder = styled.div`
    filter: invert(1);
    min-width: 6vw;
    height: 6vw;
    @media screen and (max-width: 767px) {
      min-width: 14vw;
      min-height: 14vw;
    }
  `;

  const AddressHolder = styled.h1`
    width: 91vw;
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(props.conversations);
  });

  return (
    <Main className=" flex flex-col max-h-screen bg-black text-white lg:px-36">
      <div className=" h-fit py-4 border-b-2 border-gray-300 flex flex-row">
        <AddressHolder className="text-3xl lg:text-4xl ml-2 my-auto" id="home">
          {/* onClick={() => handleCopyAddress(props.pubkey.toString())}> */}
          <Link
            href="/profile/[address]"
            as={`/profile/${props.pubkey.toString()}`}
          >
            {Object.keys(props.pubkey).length == 0
              ? "Meta Message"
              : ShortenPubkey(props.pubkey.toString(), true, props.mobile)}
          </Link>
        </AddressHolder>
        <ProfileHolder className="relative h-full top-0 mt-0 mr-2">
          <Link
            href="/profile/[address]"
            as={`/profile/${props.pubkey.toString()}`}
          >
            <Image
              src="/img/logoblue.webp"
              alt="Profile"
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </ProfileHolder>
      </div>

      {props.keypair == null ? (
        <div className="m-auto lg:mx-2 text-center">
          <h2 className="text-3xl">Welcome to Meta Message beta!</h2>
          <h3 className="text-2xl">Please claim your keypair below</h3>
          <button
            className="bg-blue-700 px-4 py-2 rounded-md mt-4 text-3xl hover:text-4xl font-bold"
            onClick={props.onGenerateKeypair}
          >
            Claim keypair
          </button>
        </div>
      ) : props.conversations.length == 0 ? (
        <div className="w-full">
          <h3 className="text-3xl text-center pt-8">Loading...</h3>
        </div>
      ) : props.conversations[0] == "N/A" ? (
        <div className="w-full">
          <h3 className="text-3xl text-center pt-8">No conversations yet</h3>
        </div>
      ) : (
        <div className="w-full">
          {props.conversations.map((conversation: Array<Message>) => {
            let recipient = null;
            conversation.forEach((message) => {
              if (
                message.from !== props.pubkey.toString() &&
                message.from !== undefined
              ) {
                recipient = message.from;
              }
            });
            if (recipient !== null) {
              return (
                <Link
                  href="/conversation/[address]"
                  as={`/conversation/${recipient}`}
                >
                  <div className="flex flex-col px-2 pt-4 pb-2 w-full border-b-2 border-gray-700">
                    <div className="flex flex-row">
                      <h3 className="text-2xl ml-0 mr-auto">
                        {ShortenPubkey(recipient, false, props.mobile)}
                      </h3>
                    </div>
                    <h4 className="text-xl text-left italic pt-4 text-gray-400">
                      {conversation[conversation.length - 1].from !==
                      props.pubkey.toString()
                        ? ""
                        : "You: "}
                      {conversation[conversation.length - 1].message}
                    </h4>
                    <h3 className="text-xl ml-0 mr-auto">
                      {
                        CompareDates(
                          conversation[conversation.length - 1].date
                        )[1]
                      }
                    </h3>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      )}
      <OptionHolder className="absolute moreopts top-auto right-1 left-auto bg-gray-300 rounded-3xl">
        <OptionInnerHolder className="relative bottom-4 flex">
          <h5 className="mx-auto text-7xl">...</h5>
        </OptionInnerHolder>
      </OptionHolder>
      <Link href={props.mobile ? "/compose-mobile" : "/compose"}>
        <OptionHolder className="absolute compose top-auto right-1 left-auto bg-yellow-500 rounded-3xl">
          <OptionInnerHolder className="relative top-3">
            <Image
              src="/img/compose.png"
              alt="Compose"
              layout="fill"
              objectFit="contain"
              className="my-auto"
            />
          </OptionInnerHolder>
        </OptionHolder>
      </Link>
    </Main>
  );
}
