import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils.js';

export const load = async ({ locals }: any,) => {
    let mathites: any = [];
    try {
        mathites = serializeNonPOJOs(await locals.pb.collection('mathites').getFullList({
            sort: '-energos',
        }));
    } catch {
        throw redirect(307, "/")
    }

    return { mathites }
}