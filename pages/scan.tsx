import { Props } from "../components/types";
import { QrReader } from "react-qr-reader";
import adapter from "webrtc-adapter";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Scan(props: Props) {
  const router = useRouter();

  const handleScanResult = (result) => {
    if (result) {
      alert(result?.text);
      props.setCurrentRecipient(result?.text);
      router.push("/conversation/[address]", `conversation/${result?.text}`);
    }
  };
  return (
    <div className="max-w-screen max-h-screen overflow-y-hidden flex flex-col">
      <h1 className="text-3xl text-white text-center pt-8">
        Scan another users code!
      </h1>
      <QrReader
        onResult={handleScanResult}
        scanDelay={500}
        constraints={{ facingMode: "environment" }}
        containerStyle={{
          paddingTop: "0",
          maxHeight: "33vw",
        }}
        videoStyle={{
          width: "33vw",
          left: "33vw",
          height: "33vw",
          borderRadius: "0.375rem",
        }}
      />
      <Link href="/">
        <button className="z-10 px-4 py-2 bg-blue-600 w-fit text-white font-bold mx-auto text-2xl rounded-xl">
          Cancel
        </button>
      </Link>
    </div>
  );
}
