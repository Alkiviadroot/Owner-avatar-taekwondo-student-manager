import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }: any) => {
	event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
	} else {
		event.locals.user = null;
	}

	if (!event.url.pathname.startsWith('/login')) {
		if (!event.locals.user) {
			throw redirect(303, '/login');
		} else {
			try {
				const record = await event.locals.pb.collection('users').getOne(event.locals.user.id);
				if (!record.verified) {
					event.locals.pb.authStore.clear();
					event.locals.user = null;
					throw redirect(303, '/login');
				}
			} catch {}
		}
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};
