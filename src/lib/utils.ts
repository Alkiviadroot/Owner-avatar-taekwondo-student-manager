
export const serializeNonPOJOs = (obj: any) => {
	return structuredClone(obj);
};



const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateString = (length: number) => {
	let result = ' ';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result.trim();
};

export const addHours = (date: Date, hours: number) => {
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	return date;
};

export const getPosition = (string: string, subString: string, index: number) => {
	return string.split(subString, index).join(subString).length;
};
