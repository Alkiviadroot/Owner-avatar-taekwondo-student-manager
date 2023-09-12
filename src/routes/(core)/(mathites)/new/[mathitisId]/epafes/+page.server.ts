import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { epafes } from '$lib/schemas';

export const load = async ({ locals, params }: any) => {
	const epafesForm = await superValidate(epafes);

	const mathitisId = params.mathitisId;
	let records: any = [];

	try {
		records = await locals.pb.collection('epafes').getFullList({
			filter: 'mathitis = "' + params.mathitisId + '"',
			sort: '-paralavi'
		});
	} catch {
		console.log('no record');
	}

	return { epafesForm, mathitisId, records };
};

export const actions = {
	epafes: async ({ request, locals, params }: any) => {
		const form = await request.formData();
		const epafesForm = await superValidate(form, epafes);

		if (!epafesForm.valid) {
			return fail(400, {
				epafesForm
			});
		}
		epafesForm.data.mathitis = params.mathitisId;
		await locals.pb.collection('epafes').create(epafesForm.data);
	}
};
