import XLSX from "xlsx";

const filename = "output.xlsx";

const convertToJson = async (data) => {
	try {
		const header = data[0];
		const body = data.slice(1);

		const response = body.map((row) => {
			const newRow = {};
			row.forEach((cell, index) => {
				newRow[header[index]] = cell;
			});
			return newRow;
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};

export default async function handler(req, res) {
	try {
		if (!req.query.endpoint) {
			res.status(200).json({
				error: "endpoint is required",
			});
			return;
		}
		const data = await fetch(req.query.endpoint).then((res) => res.json());
		const json = await convertToJson(data);

		if (req.query.download) {
			let workbook = XLSX.utils.book_new();
			let worksheet = XLSX.utils.json_to_sheet(json);

			XLSX.utils.book_append_sheet(workbook, worksheet, "export");

			res.send(XLSX.write(workbook, { bookType: "xlsx", type: "buffer" }));
			return;
		}

		res.status(200).json(json);
		return;
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
}
