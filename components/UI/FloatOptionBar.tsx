import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OptionHolder, OptionInnerHolder, Bar } from "../StyledHome";
import QRCode from "react-qr-code";
import IsMobile from "../Logic/IsMobile";

export default function FloatOptionBar() {
  const [showOptions, setShowOptions] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(true);
  };

  return (
    <Bar className="h-full left-auto z-20 absolute flex flex-col-reverse">
      <Link href={IsMobile ? "/compose-mobile" : "/compose"}>
        <OptionHolder className="relative top-auto right-1 left-auto bg-yellow-500 rounded-3xl">
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
      {!showOptions ? (
        <OptionHolder
          className="relative top-auto right-1 left-auto bg-gray-300 rounded-3xl"
          onClick={handleToggleOptions}
        >
          <OptionInnerHolder className="relative bottom-4  md:bottom-auto top-auto flex my-auto">
            <h5 className="mx-auto text-7xl lg:-mt-2">...</h5>
          </OptionInnerHolder>
        </OptionHolder>
      ) : (
        <Link href="/scan">
          <OptionHolder className="z-10 relative top-auto right-1 left-auto bg-gray-300 rounded-3xl">
            <OptionInnerHolder className="relative top-2 m-auto w-fit h-fit flex">
              <QRCode
                value=""
                size={IsMobile ? 55 : 70}
                className="m-auto"
                bgColor="#2E2A24"
                fgColor="#fff"
              />
            </OptionInnerHolder>
          </OptionHolder>
        </Link>
      )}
    </Bar>
  );
}
