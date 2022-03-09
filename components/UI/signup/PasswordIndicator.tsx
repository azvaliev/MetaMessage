const PasswordIndicator = (props: { strength: number }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full border-gray-500 border-2">
        {props.strength === 0 ? (
          <div className="w-1/3 h-1 rounded-md bg-red-500"></div>
        ) : props.strength === 1 ? (
          <div className="w-2/3 h-1 rounded-md bg-yellow-500"></div>
        ) : (
          <div className="w-full h-1 rounded-md bg-green-500"></div>
        )}
      </div>
    </div>
  );
};

export default PasswordIndicator;
