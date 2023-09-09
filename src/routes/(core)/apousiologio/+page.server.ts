import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }: any) => {
	const meresAll = serializeNonPOJOs(
		await locals.pb.collection('meres').getFullList({
			sort: 'sort'
		})
	);
	return { meresAll };
};
