import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils.js';

export const load = async ({ locals, params }: any,) => {
    let profile: any = [];
    try {
        profile = serializeNonPOJOs(await locals.pb.collection('mathites').getOne(params.mathitisId))
        const fileToken = await locals.pb.files.getToken();
        profile.fotografia = locals.pb.files.getUrl(profile, profile.fotografia, { 'token': fileToken });

    } catch {
        throw redirect(307, "/")
    }

    return { profile }
}