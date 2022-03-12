import { useState } from "react";
import styled from "styled-components";
import { CompareDates } from "../../logic/messaging/CreateFormatDate";

interface Props {
  showDate: boolean;
  from: boolean;
  message: boolean;
  date: Date;
}

export default function Message(props: Props) {
  const [showDate, setShowDate] = useState(props.showDate);

  const handleClick = () => {
    setShowDate(!showDate);
  };

  return (
    <div className="flex flex-col">
      <div
        className={`w-fit px-4 py-[0.2rem] max-w-[80%] w-fit rounded-lg text-white text-2xl lg:text-2xl mt-2
                ${
                  props.from
                    ? "border-[1px] border-gray-800 ml-0 mr-auto"
                    : "border-[1px] border-blue-600 mr-0 ml-auto"
                }`}
        onClick={handleClick}
      >
        <p>{props.message}</p>
      </div>
      {showDate && (
        <h5
          className={` text-gray-300 italic ${
            props.from ? "ml-0 mr-auto" : "ml-auto mr-0"
          }`}
        >
          {CompareDates(props.date)[1]}
        </h5>
      )}
    </div>
  );
}
