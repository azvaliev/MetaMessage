import { Props } from "../components/types";
import { QrReader } from "react-qr-reader";
import adapter from "webrtc-adapter";
import { useRouter } from "next/router";
import Link from "next/link";
import { TouchEvent, useState } from "react";
export default function Scan(props: Props) {
  const router = useRouter();
  const [scanPrompt, setScanPrompt] = useState({
    xPos: 0,
    yPos: 0,
    show: false,
    text: "",
    success: false,
  });
  const [intervalC, setIntervalC] = useState({ interval: null });

  const handleScanResult = (result: any) => {
    if (result) {
      setScanPrompt((prevState) => {
        return {
          ...prevState,
          success: true,
          text: "Success!",
        };
      });
      setTimeout(() => {
        props.setCurrentRecipient(result?.text);
        router.push("/conversation/[address]", `conversation/${result?.text}`);
      }, 200);
    }
  };

  const handleScanPrompt = (e: TouchEvent<HTMLDivElement>) => {
    setScanPrompt({
      xPos: Math.round(e.touches[0].clientX + window.innerWidth * 0.02),
      yPos: Math.round(e.touches[0].clientY + window.innerHeight * -0.1),
      show: true,
      text: "Scanning.",
      success: false,
    });
    let dotAnim = setInterval(() => {
      let newText: string;
      setScanPrompt((prevState) => {
        console.log(prevState);
        prevState.text === "Scanning..."
          ? (newText = "Scanning.")
          : (newText = prevState.text + ".");
        return {
          ...prevState,
          text: newText,
        };
      });
    }, 1000);
    setIntervalC({ interval: dotAnim });
  };
  const handleReleaseScan = () => {
    setTimeout(() => {
      setScanPrompt({
        xPos: 0,
        yPos: 0,
        show: false,
        text: "Scanning",
        success: false,
      });
    }, 100);
    if (intervalC.interval !== null) {
      clearInterval(intervalC.interval);
    }
  };
  const handleMoveScan = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setScanPrompt((prevState) => {
      return {
        ...prevState,
        xPos: Math.round(e.touches[0].clientX + window.innerWidth * 0.02),
        yPos: Math.round(e.touches[0].clientY + window.innerHeight * -0.1),
      };
    });
  };

  return (
    <div className="max-w-screen overflow-hidden max-h-screen flex flex-col">
      <h1 className="text-2xl text-white text-center pt-8">
        Tap and hold to scan a user code!
      </h1>
      <div
        onTouchMove={handleMoveScan}
        onTouchStart={handleScanPrompt}
        onTouchEnd={handleReleaseScan}
        onScroll={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
      >
        <QrReader
          onResult={handleScanResult}
          scanDelay={scanPrompt.show ? 100 : 30000}
          constraints={{ facingMode: "environment" }}
          videoContainerStyle={{ paddingTop: "0", height: "100%" }}
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
          style={{
            top: `${scanPrompt.yPos.toString()}px`,
            left: `${scanPrompt.xPos.toString()}px`,
          }}
          className={`absolute z-30 text-2xl px-2 top-auto right-auto ${
            scanPrompt.success ? "bg-green-500" : "bg-blue-500"
          } bg-opacity-80 text-white rounded-sm`}
        >
          {scanPrompt.text}
        </h5>
      )}
    </div>
  );
}
