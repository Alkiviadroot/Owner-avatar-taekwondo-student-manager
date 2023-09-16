import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { timi } from '$lib/schemas';
let defaults: any = [];

export const load = async ({ locals }: any) => {
    const data = {
        "geniki": true,
        "timi": 0,
        "mathitis": ""

    };
    try {
        defaults = await locals.pb.collection('times').getFirstListItem('geniki=true');
    } catch {
        defaults = await locals.pb.collection('times').create(data);
    }

    const timiForm = await superValidate(defaults, timi);

    return {
        timiForm
    }

};
export const actions = {
    defaultTimi: async ({ request, locals }: any) => {
        const form = await request.formData();
        const timiForm = await superValidate(form, timi);

        if (!timiForm.valid) {
            return fail(400, {
                timiForm
            });
        }
        const data = {
            "geniki": true,
            "mathitis": "",
            "timi": timiForm.data.timi
        };
        await locals.pb.collection('times').update(defaults.id, data);

    }
}