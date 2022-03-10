const PasswordBarIndicator = (props: { strengthScore: number }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full ">
        {props.strengthScore <= 1 ? (
          <div className="w-1/3 h-1 rounded-md bg-red-500"></div>
        ) : props.strengthScore <= 2 ? (
          <div className="w-2/3 h-1 rounded-md bg-yellow-500"></div>
        ) : (
          <div className="w-full h-1 rounded-md bg-green-500"></div>
        )}
      </div>
    </div>
  );
};

export default PasswordBarIndicator;
