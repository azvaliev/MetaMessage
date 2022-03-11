import { useEffect } from "react";
import Link from "next/link";
import { ShortenPubkey, ShortenMessage } from "../components/UI/Shorten";
import { CompareDates } from "../components/Logic/CreateFormatDate";
import { Props, MessageObj } from "../components/types";
import { Main } from "../components/StyledHome";
import FloatOptionBar from "../components/UI/FloatOptionBar";

export default function Home(props: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Main className="flex flex-col max-h-screen bg-smoke text-white lg:px-36">
      <div className=" h-fit py-4 border-b-2 border-gray-300 flex px-2 flex-row">
        <h1 className="text-3xl lg:text-35xl mx-auto my-auto" id="home">
          {/* onClick={() => handleCopyAddress(props.pubkey.toString())}> */}
          {props.pubkey === null ? (
            "Meta Message"
          ) : (
            <Link
              href="/profile/[address]"
              as={`/profile/${props.pubkey.toString()}`}
            >
              {ShortenPubkey(props.pubkey.toString(), true, props.mobile)}
            </Link>
          )}
        </h1>
      </div>

      {props.keypair == null ? (
        <div className="m-auto pt-8 lg:pt-12 lg:mx-2 text-center">
          <h2 className="text-3xl lg:text-5xl underline">
            Welcome to Meta Message!
          </h2>
          <h3 className="text-2xl lg:text-3xl pt-2 lg:pt-4 font-light">
            Anonymous, end-to-end encrypted, Blockchain powered.
          </h3>
          <h3 className="text-xl lg:text-4xl pt-20 lg:pt-28 font-light">
            Click below to claim your unique address
          </h3>
          <h3 className="text-lg lg:text-4xl pt-1 lg:pt-2 font-light italic">
            (It&lsquo;s like your phone # for the blockchain)
          </h3>
          <button
            className="bg-blue-700 px-4 py-2 lg:px-6 py-4 rounded-md mt-6 lg:mt-10 text-3xl lg:text-5xl lg:hover:text-6xl font-bold"
            onClick={props.onGenerateKeypair}
          >
            Claim Address
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
          {props.conversations.map((conversation: Array<MessageObj>) => {
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
                  key={recipient}
                >
                  <div className="flex flex-col px-2 pt-4 pb-2 w-full border-b-2 border-gray-700">
                    <div className="flex flex-row">
                      <h3 className="text-2xl ml-0 mr-auto">
                        {ShortenPubkey(recipient, false, props.mobile)}
                      </h3>
                    </div>
                    <h4 className="text-xl text-left italic pt-2 md:pt-4 text-gray-400">
                      {conversation[conversation.length - 1].from !==
                      props.pubkey.toString()
                        ? ""
                        : "You: "}
                      {ShortenMessage(
                        conversation[conversation.length - 1].message,
                        props.mobile
                      )}
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

      {props.keypair !== null && (
        <FloatOptionBar pubkey={props.pubkey} mobile={props.mobile} />
      )}
    </Main>
  );
}
