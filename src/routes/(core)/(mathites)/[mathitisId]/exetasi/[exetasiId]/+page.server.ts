import { serializeNonPOJOs } from '$lib/utils.js';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { exetasi } from '$lib/schemas';
import moment from 'moment';

export const load = async ({ locals, params }: any) => {
	const mathitisId = params.mathitisId;
	const exetasiId = params.exetasiId;
	let exetasiR = [];

	try {
		exetasiR = serializeNonPOJOs(await locals.pb.collection('eksetasis').getOne(exetasiId));
	} catch {
		throw redirect(303, '/' + mathitisId);
	}

	exetasiR.date = moment(exetasiR.date).format('YYYY-MM-DD');

	const exetasiForm = await superValidate(exetasiR, exetasi);

	return { exetasiR, exetasiForm };
};

export const actions = {
	exetasi: async ({ request, locals, params }: any) => {
		const form = await request.formData();
		const exetasiForm = await superValidate(form, exetasi);

		if (!exetasiForm.valid) {
			return fail(400, {
				exetasiForm
			});
		}

		exetasiForm.data.mathitis = params.mathitisId;

		await locals.pb.collection('eksetasis').update(params.exetasiId, exetasiForm.data);
		throw redirect(303, '/' + params.mathitisId+'?/exetasi');
	},

	exetasiDelete: async ({ locals, params }: any) => {
		await locals.pb.collection('eksetasis').delete(params.exetasiId);
		throw redirect(303, '/' + params.mathitisId+'?/exetasi');
	}
};
