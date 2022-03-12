const PasswordBarIndicator = (props: { score: number; halfBar?: boolean }) => {
  return (
    <div className="flex w-full ">
      {/* No bar for -1 score i.e user still typing first 4 characters */}
      {/* Setting password has 3 levels, each take 1/3 of the bar, while 
		the confirm field has only 2 states, incorrect/correct, hence the halfbar prop */}
      {props.score < 0 ? null : props.score <= 1 ? (
        <div
          className={`${
            props.halfBar ? "w-1/2" : "w-1/3"
          } h-1 rounded-md bg-red-500`}
        ></div>
      ) : props.score <= 2 ? (
        <div className="w-2/3 h-1 rounded-md bg-blue-500"></div>
      ) : (
        <div className="w-full h-1 rounded-md bg-green-500"></div>
      )}
    </div>
  );
};

export default PasswordBarIndicator;
