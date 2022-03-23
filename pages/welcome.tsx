import Link from "next/link";

const Welcome = () => {
	return (
		<div className="flex flex-col max-h-screen bg-smoke text-white lg:px-36">
			<div className=" h-fit py-4 border-b-2 border-gray-300 flex px-2 flex-row">
				<h1 className="text-3xl lg:text-4xl mx-auto my-auto" id="home">
          Welcome to Meta Message!
				</h1>
			</div>
			<div className="m-auto pt-8 lg:pt-12 lg:mx-2 text-center">
				<h2 className="text-2xl lg:text-2xl px-3 pt-1 lg:pt-4 font-light">
          Free, end-to-end encrypted & powered by Solana.
				</h2>
				<h3 className="text-xl lg:text-2xl pt-[15vh] lg:pt-28 font-light">
          Click below to claim your unique address
				</h3>
				<h3 className="text-lg lg:text-xl pt-1 lg:pt-2 font-light italic">
          (It&lsquo;s like your phone # on the blockchain)
				</h3>
				<Link href="/signup">
					<button className="bg-blue-700 px-4 lg:px-6 py-2 rounded-md mt-6 lg:mt-10 text-3xl lg:text-4xl lg:hover:text-[2.6rem] lg:hover:py-3 font-bold">
            Sign Up
					</button>
				</Link>
			</div>
		</div>
	);
};
export default Welcome;
