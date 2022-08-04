import XLSX from "xlsx";
import { convertToJson } from "../../lib/convertToJson";

const filename = "output.xlsx";

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
