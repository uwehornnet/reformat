import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>reformat fetch response</title>
				<meta name="description" content="reformat fetch response" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<p className={styles.description}>
					Get started by adding <code className={styles.code}>/api?endpoint=##your-url##</code> to your url.
					<br />
					Make sure to replace <code className={styles.code}>##your-url##</code> with the url you want to get
					your data from. By adding <code className={styles.code}>&download=true</code> at the and of the url,
					you can generate a .xlsx download. Your url should now look something like this:{" "}
					<a href="https://reformat.vercel.app/api/?endpoint=https://reformat.vercel.app/api/url&download=true">
						<code className={styles.code}>
							https://reformat.vercel.app/api?endpoint=https://reformat.vercel.app/api/url&download=true
						</code>
					</a>
				</p>
			</main>
		</div>
	);
}
