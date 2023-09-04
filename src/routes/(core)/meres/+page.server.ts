import { fail } from '@sveltejs/kit';
import { superValidate, setError } from "sveltekit-superforms/server"
import { meres } from '$lib/schemas';
import { serializeNonPOJOs } from '$lib/utils';


export const load = async ({ locals }) => {

    const meresForm = await superValidate(meres);
    const meresAll = serializeNonPOJOs(await locals.pb.collection('meres').getFullList());
    return { meresForm,meresAll };
}

export const actions = {
    meres: async ({ request, locals }: any) => {
        const form = await request.formData();
        const meresForm = await superValidate(form, meres);

        if (!meresForm.valid) {
            return fail(400, {
                meresForm
            })
        }

        try {
            await locals.pb.collection('meres').create(meresForm.data);
        } catch {
            return setError(meresForm, 'mera', 'Η μέρα/ώρα υπάρχει ήδη.');
        }
    },

    meraDelete: async ({locals,request }: any) => {
        const form = await request.formData();
        const meraid = form.get("idMera") as string;
        await locals.pb.collection('meres').delete(meraid);
    }
}