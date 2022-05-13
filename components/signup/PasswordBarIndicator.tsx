const PasswordBarIndicator = (props: { score: number }) => {
	return (
		<div className="flex w-full ">
			{props.score >= 1 &&
				<div className="w-full h-1 rounded-md bg-green-500"></div>
			}
		</div>
	);
};

export default PasswordBarIndicator;
