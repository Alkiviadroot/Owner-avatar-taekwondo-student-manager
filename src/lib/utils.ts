import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';


export const serializeNonPOJOs = (obj: any) => {
	return structuredClone(obj);
};

export const getImageURL = (collectionId:any, recordId:any, fileName:any, size = '0x0') => {
	return `${PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateString = (length:number) => {
	let result = ' ';
	const charactersLength = characters.length;
	for ( let i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result.trim();
}

export const addHours=(date:Date, hours:number) =>{
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	return date;
  }