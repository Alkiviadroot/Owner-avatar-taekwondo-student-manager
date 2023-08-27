import { error, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }: any) => {

		const body = Object.fromEntries(await request.formData()) as {
			username: string
			password: string
		}

		try {
			await locals.pb.collection('users').authWithPassword(body.username, body.password);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true,
					message: "Ο λογαριασμός σας έχει απενεργοποιηθεί",
				};
			}
		} catch {
			return {
				notValid: true,
				message: "Το όνομα χρήστη ή ο κωδικός  δεν είναι έγκυρο",
			};
		}

		throw redirect(303, '/');
	}
};