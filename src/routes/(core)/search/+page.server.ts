import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }: any) => {
	let mathites: any = [];
	try {
		mathites = await locals.pb.collection('mathites').getFullList({
			sort: '-energos'
		});

	} catch {
		throw redirect(307, '/');
	}

	return { mathites };
};
