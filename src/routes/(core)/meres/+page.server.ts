import { fail } from '@sveltejs/kit';
import { superValidate, setError } from "sveltekit-superforms/server"
import { meres } from '$lib/schemas';
import { serializeNonPOJOs } from '$lib/utils';


export const load = async ({ locals }) => {

    const meresForm = await superValidate(meres);
    const meresAll = serializeNonPOJOs(await locals.pb.collection('meres').getFullList({
        sort: 'sort',
    }));
    return { meresForm, meresAll };
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
        let meraSort: number = 0;
        const oraSort = parseInt(meresForm.data.start.replace(":", ''));

        if (meresForm.data.mera == "Δευτέρα") meraSort = 10000
        if (meresForm.data.mera == "Τρίτη") meraSort = 20000
        if (meresForm.data.mera == "Τετάρτη") meraSort = 30000
        if (meresForm.data.mera == "Πέμπτη") meraSort = 40000
        if (meresForm.data.mera == "Παρασκευή") meraSort = 50000
        if (meresForm.data.mera == "Σάββατο") meraSort = 60000
        if (meresForm.data.mera == "Κυριακή") meraSort = 70000

        meresForm.data.sort = meraSort + oraSort;
        try {
            await locals.pb.collection('meres').create(meresForm.data);
        } catch {
            return setError(meresForm, 'mera', 'Η μέρα/ώρα υπάρχει ήδη.');
        }
    },

    meraDelete: async ({ locals, request }: any) => {
        const form = await request.formData();
        const meraid = form.get("idMera") as string;
        await locals.pb.collection('meres').delete(meraid);
    }
}