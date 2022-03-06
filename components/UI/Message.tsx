import { useState } from "react";
import styled from "styled-components";
import { CompareDates } from "../Logic/CreateFormatDate";

interface Props {
  showDate: boolean;
  from: boolean;
  message: boolean;
  date: Date;
}

export default function Message(props: Props) {
  const [showDate, setShowDate] = useState(props.showDate);

  const Msg = styled.div`
    max-width: 80%;
    width: fit-content;
  `;

  const handleClick = () => {
    setShowDate(!showDate);
  };

  return (
    <div className="flex flex-col">
      <Msg
        className={`w-fit px-4 py-2 rounded-2xl text-white text-xl lg:text-2xl mt-2
                ${
                  props.from
                    ? "bg-gray-800 ml-0 mr-auto"
                    : "bg-blue-600 mr-0 ml-auto"
                }`}
        onClick={handleClick}
      >
        <p>{props.message}</p>
      </Msg>
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

