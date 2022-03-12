import { Props } from "../components/types";
import { QrReader } from "react-qr-reader";
import adapter from "webrtc-adapter";
import { useRouter } from "next/router";
import Link from "next/link";
import { MouseEvent, useState } from "react";
export default function Scan(props: Props) {
  const router = useRouter();
  const [scanPrompt, setScanPrompt] = useState({
    xPos: 0,
    yPos: 0,
    show: false,
    text: "",
  });
  const [intervalC, setIntervalC] = useState({ interval: null });

  const handleScanResult = (result: any) => {
    if (result) {
      console.log(result);
      props.setCurrentRecipient(result?.text);
      router.push("/conversation/[address]", `conversation/${result?.text}`);
    }
  };
  const handleScanPrompt = (e: MouseEvent<HTMLDivElement>) => {
    setScanPrompt({
      xPos: e.screenX + window.innerWidth * 0.02,
      yPos: e.screenY + window.innerHeight * 0.02,
      show: true,
      text: "Scanning.",
    });
    clearInterval(intervalC.interval);
    let dotAnim = setInterval(() => {
      let newText: string;
      scanPrompt.text === "Scanning..."
        ? (newText = "Scanning.")
        : (newText = scanPrompt.text + ".");
      setScanPrompt({
        ...scanPrompt,
        text: newText,
      });
    }, 200);
    setIntervalC({ interval: dotAnim });
    setTimeout(() => {
      setScanPrompt({
        ...scanPrompt,
        show: false,
        text: "Scanning",
      });
      clearInterval(dotAnim);
    }, 750);
  };
  return (
    <div className="max-w-screen max-h-screen overflow-y-hidden flex flex-col">
      <h1 className="text-3xl text-white text-center pt-8">
        Scan another users code!
      </h1>
      <div onClick={handleScanPrompt}>
        <QrReader
          onResult={handleScanResult}
          scanDelay={500}
          constraints={{ facingMode: "environment" }}
          containerStyle={{
            padding: "0",
            margin: "1.5vh auto",
            width: "100vw",
            height: "70vh",
          }}
          videoStyle={{
            width: "100vw",
            left: "0",
            top: "0.3%",
            height: "70vh",
            borderRadius: "2.5rem",
          }}
        />
      </div>
      <Link href="/">
        <button className="z-10 px-4 py-2 bg-blue-600 w-fit text-white font-bold mx-auto text-2xl rounded-xl">
          Cancel
        </button>
      </Link>
      {scanPrompt.show && (
        <h5
          className={`absolute z-30 bottom-[${scanPrompt.yPos}px] left-[${scanPrompt.xPos}] bg-blue-500 bg-opacity-80text-white rounded-sm`}
        >
          {scanPrompt.text}
        </h5>
      )}
    </div>
  );
}
