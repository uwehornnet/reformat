export const convertToJson = async (data) => {
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
