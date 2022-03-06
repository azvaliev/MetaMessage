interface Props {
  message: string;
  warning: boolean;
  neutral: boolean;
}

const AlertMessage = (props: Props) => {
  return (
    <>
      {props.message.length > 1 && (
        <div
          className={`flex flex-row p-4 mx-8 alert-anim rounded-md text-white text-3xl ${
            props.warning
              ? "bg-red-600"
              : props.neutral
              ? "bg-gray-500"
              : "bg-green-500"
          }`}
        >
          <h4 className="w-fit">{props.message}</h4>
          <h4 className="w-fit mr-0 ml-auto border-1 rounded-full h-fit">
            &nbsp;&nbsp;i&nbsp;&nbsp;
          </h4>
        </div>
      )}
    </>
  );
};
export default AlertMessage;

