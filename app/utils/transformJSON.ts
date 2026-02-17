const isDateString = (value: string): value is string => {
	return (
		// UTC with 1–6 fractional seconds
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}Z$/.test(value) ||
		// UTC without fractional seconds
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value) ||
		// With 1–6 fractional seconds + offset
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}[+-]\d{2}:\d{2}$/.test(value) ||
		// Without fractional seconds + offset
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(value) ||
		// Date only (YYYY-MM-DD)
		/^\d{4}-\d{2}-\d{2}$/.test(value)
	);
};

// transformJSON parses object, converts srtings with ISO dates to Date objects.
export const transformJSON = <T>(data: T): T => {
	if (data === null || typeof data !== "object") return data;

	if (Array.isArray(data)) {
		return data.map((item) => transformJSON(item)) as unknown as T;
	}

	return Object.fromEntries(
		Object.entries(data).map(([key, value]) => [
			key,
			typeof value === "string" && isDateString(value)
				? new Date(value)
				: transformJSON(value),
		]),
	) as T;
};


