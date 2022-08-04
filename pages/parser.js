import { useState } from "react";
import Head from "next/head";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { convertToJson } from "../lib/convertToJson";
import styles from "../styles/Parser.module.css";

export default function Parser() {
	const [url, setUrl] = useState("");
	const [output, setOutput] = useState("");

	const handleInputBlur = async () => {
		if (url === "") return;
		const data = await fetch(url).then((res) => res.json());
		const json = await convertToJson(data);
		setOutput(JSON.stringify(json, null, "\t"));
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>reformat fetch response</title>
				<meta name="description" content="reformat fetch response" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.sticky}>
					<input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						onBlur={handleInputBlur}
						className={styles.input}
						placeholder="your url comes here"
					/>
				</div>
				<SyntaxHighlighter
					language="json"
					style={nightOwl}
					className={styles.highlighter}
					showLineNumbers={true}
					wrapLongLines={true}
					lineProps={{ style: { flexWrap: "wrap" } }}
				>
					{output}
				</SyntaxHighlighter>
			</main>
		</div>
	);
}
