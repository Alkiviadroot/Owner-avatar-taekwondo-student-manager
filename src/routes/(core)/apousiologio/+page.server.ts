
export const load = async ({ locals }: any) => {
	const meresAll = await locals.pb.collection('meres').getFullList({
		sort: 'sort'
	});
	return { meresAll };
};
