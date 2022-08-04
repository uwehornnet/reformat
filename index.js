const express = require("express");
const xlsx = require("xlsx");
const axios = require("axios").default;
const fs = require("fs");

const app = express();
const port = 3000;

const filename = "output.xlsx";
const source = [
	[
		"Date",
		"Segment",
		"Country",
		"Device Type",
		"Sessions",
		"W/W% Sessions",
		"Impressions",
		"W/W% Impressions",
		"Pageviews",
		"W/W% Pageviews",
		"Paid Clicks",
		"W/W% Paid Clicks",
		"Nonpaid Clicks",
		"W/W% Nonpaid Clicks",
		"Total Clicks",
		"W/W% Total Clicks",
		"Revenue",
		"W/W% Revenue",
		"Paid CTR",
		"W/W% Paid CTR",
		"Total CTR",
		"W/W% Total CTR",
		"RPM",
		"W/W% RPM",
		"RPC",
		"W/W% RPC",
		"Pageviews Per Session",
		"W/W% Pageviews Per Session",
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"GB",
		"mobile",
		0,
		-100.0,
		0,
		-100.0,
		0,
		-100.0,
		0,
		-100.0,
		0,
		100.0,
		0,
		-100.0,
		0.0,
		-100.0,
		0.0,
		-100.0,
		0.0,
		-100.0,
		0.0,
		-100.0,
		0.0,
		-100.0,
		0.0,
		-100.0,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"PH",
		"desktop",
		1,
		100.0,
		1,
		100.0,
		1,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		1.0,
		100.0,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"IN",
		"desktop",
		1,
		-80.0,
		0,
		-100.0,
		1,
		-90.0,
		0,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		1.0,
		-50.0,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"GB",
		"desktop",
		3345,
		-2.71,
		4021,
		-3.73,
		4318,
		-3.59,
		1140,
		10.47,
		0,
		100.0,
		1140,
		10.47,
		218.26,
		12.41,
		0.34,
		13.33,
		0.34,
		13.33,
		65.25,
		15.53,
		0.19,
		0.0,
		1.29,
		-0.77,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"GB",
		"tablet",
		4,
		0.0,
		3,
		0.0,
		4,
		-20.0,
		0,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		1.0,
		-20.0,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"GG",
		"desktop",
		6,
		100.0,
		6,
		200.0,
		6,
		100.0,
		0,
		-100.0,
		0,
		100.0,
		0,
		-100.0,
		0.0,
		-100.0,
		0.0,
		-100.0,
		0.0,
		-100.0,
		0.0,
		-100.0,
		0.0,
		-100.0,
		1.0,
		0.0,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"CN",
		"mobile",
		1,
		100.0,
		0,
		100.0,
		1,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		1.0,
		100.0,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"IM",
		"desktop",
		3,
		50.0,
		2,
		0.0,
		4,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		1.33,
		33.0,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"US",
		"desktop",
		1,
		-80.0,
		1,
		-90.0,
		1,
		-90.0,
		0,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		1.0,
		-50.0,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"JE",
		"desktop",
		1,
		100.0,
		1,
		100.0,
		1,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		1.0,
		100.0,
	],
	[
		"2022-08-02",
		"cheaper99uk1",
		"JP",
		"desktop",
		0,
		100.0,
		0,
		100.0,
		0,
		100.0,
		1,
		100.0,
		0,
		100.0,
		1,
		100.0,
		0.05,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.0,
		100.0,
		0.05,
		100.0,
		0.0,
		100.0,
	],
];

const convertToXlsx = async (data) => {
	let Headers = data[0];
	let Data = data.slice(1);

	let workbook = xlsx.utils.book_new();
	let worksheet = xlsx.utils.aoa_to_sheet([]);

	xlsx.utils.book_append_sheet(workbook, worksheet);

	xlsx.utils.sheet_add_aoa(worksheet, [Headers], { origin: "A1" });
	Data.forEach((row, index) => {
		xlsx.utils.sheet_add_aoa(worksheet, [row], { origin: `A${index + 2}` });
	});

	return xlsx;
};

const convertToJson = async (data) => {
	try {
		const header = data[0];
		const body = data.slice(1);
		const response = body.map((row) => {
			return row.reduce((acc, curr, index) => {
				acc[header[index]] = curr;
				return acc;
			}, {});
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};

app.get("/test", (req, res) => {
	try {
		return res.status(400).json(source);
	} catch (err) {
		console.log(err);
	}
});

app.get("/", async (req, res) => {
	try {
		if (!req.query.endpoint) {
			res.status(400).json({
				error: "endpoint is required",
			});
			return;
		}
		const data = await axios.get(req.query.endpoint);

		if (req.query.download) {
			const response = await convertToXlsx(data.data);
			const file = xlsx.writeFile(response, filename);
			res.download(file);
			return;
		}

		const response = await convertToJson(data.data);
		res.status(400).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
