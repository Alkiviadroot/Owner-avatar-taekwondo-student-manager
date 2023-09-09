import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { mathitis } from '$lib/schemas';
import { generateString } from '$lib/utils';

export const load = async () => {
	const mathitisForm = await superValidate(mathitis);

	return { mathitisForm };
};

export const actions = {
	mathitis: async ({ request, locals }: any) => {
		const form = await request.formData();
		const mathitisForm = await superValidate(form, mathitis);

		if (!mathitisForm.valid) {
			return fail(400, {
				mathitisForm
			});
		}

		const formData = new FormData();
		//Required
		formData.append('id', mathitisForm.data.id);
		formData.append('onoma', mathitisForm.data.onoma);
		formData.append('epitheto', mathitisForm.data.epitheto);
		formData.append('energos', mathitisForm.data.energos);
		//Opional
		formData.append(
			'diefthinsi',
			mathitisForm.data.diefthinsi !== undefined ? mathitisForm.data.diefthinsi : ''
		);
		formData.append(
			'tk',
			mathitisForm.data.tk !== undefined ? mathitisForm.data.tk.toString() : ''
		);
		formData.append(
			'perioxi',
			mathitisForm.data.perioxi !== undefined ? mathitisForm.data.perioxi : ''
		);
		formData.append(
			'kinito',
			mathitisForm.data.kinito !== undefined ? mathitisForm.data.kinito.toString() : ''
		);
		formData.append(
			'tilefonoS',
			mathitisForm.data.tilefonoS !== undefined ? mathitisForm.data.tilefonoS.toString() : ''
		);
		formData.append(
			'tilefonoE',
			mathitisForm.data.tilefonoE !== undefined ? mathitisForm.data.tilefonoE.toString() : ''
		);
		formData.append(
			'epankelma',
			mathitisForm.data.epankelma !== undefined ? mathitisForm.data.epankelma : ''
		);
		formData.append(
			'genethlia',
			mathitisForm.data.genethlia !== undefined ? mathitisForm.data.genethlia : ''
		);
		formData.append(
			'enarksi',
			mathitisForm.data.enarksi !== undefined ? mathitisForm.data.enarksi : ''
		);
		formData.append('email', mathitisForm.data.email !== undefined ? mathitisForm.data.email : '');

		try {
			await locals.pb.collection('mathites').getOne(mathitisForm.data.id);
			mathitisForm.data.id = generateString(15);
		} catch {}

		const file = form.get('fotografia');
		if (file instanceof File && file?.size != 0) {
			const name =
				mathitisForm.data.onoma.toString() +
				'_' +
				mathitisForm.data.epitheto.toString() +
				'.' +
				file.type.replace('image/', '');
			formData.append('fotografia', new Blob([file]), name);
		}

		await locals.pb.collection('mathites').create(formData);
		throw redirect(303, '/new/' + mathitisForm.data.id + '/provlimata');
	}
};
