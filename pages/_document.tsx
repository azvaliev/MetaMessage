import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<title>Meta Message</title>
				<meta
					name="description"
					content="Privacy focused, secure, and encrypted messaging."
				/>
				<link rel="icon" href="/icon/favicon.ico" />
				<link rel="icon" href="/icon/logo32.png" sizes="32x32" />
				<link rel="icon" href="/icon/logo57.png" sizes="57x57" />
				<link rel="icon" href="/icon/logo76.png" sizes="76x76" />
				<link rel="icon" href="/icon/logo96.png" sizes="96x96" />
				<link rel="icon" href="/icon/logo128.png" sizes="128x128" />
				<link rel="icon" href="/icon/logo192.png" sizes="192x192" />
				<link rel="icon" href="/icon/logo228.png" sizes="228x228" />

				{/* <!-- Android --> */}
				<link rel="shortcut icon" sizes="196x196" href="/icon/logo196.png" />

				{/* <!-- iOS -->*/}
				<link rel="apple-touch-icon" href="/icon/logo120.png" sizes="120x120" />
				<link rel="apple-touch-icon" href="/icon/logo152.png" sizes="152x152" />
				<link rel="apple-touch-icon" href="/icon/logo180.png" sizes="180x180" />

				{/* <!-- Windows 8 IE 10--> */}
				<meta name="msapplication-TileColor" content="#FFFFFF" />
				<meta name="msapplication-TileImage" content="/icon/logo144.png" />

				{/* <!-- Windows 8.1 + IE11 and above --> */}
				<meta name="msapplication-config" content="/icon/browserconfig.xml" />

				{/* <!-- Apple Web App Capable --> */}
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
				<meta name="apple-mobile-web-app-title" content="Notentool"/>
				<link rel="manifest" href="/manifest.json"></link>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}