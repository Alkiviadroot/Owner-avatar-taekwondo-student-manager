import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server"
import { provlimata } from '$lib/schemas';

export const load = async () => {
    const provlimataForm = await superValidate(provlimata);

    return { provlimataForm };
}

export const actions = {
    provlimata: async ({ request, locals, params }: any) => {
        const form = await request.formData();
        const provlimataForm = await superValidate(form, provlimata);

        if (!provlimataForm.valid) {
            return fail(400, {
                provlimataForm
            })
        }

        provlimataForm.data.mathitis = params.mathitisId
        if (provlimataForm.data.kardiaka == 'false')
            provlimataForm.data.kardiakaL = ""
        if (provlimataForm.data.asthma == 'false')
            provlimataForm.data.asthmaL = ""
        if (provlimataForm.data.lipothimia == 'false')
            provlimataForm.data.lipothimiaL = ""
        if (provlimataForm.data.allo == 'false')
            provlimataForm.data.alloL = ""

        try {
            await locals.pb.collection('provlimata').create(provlimataForm.data);
        } catch {
            throw redirect(303, "/" + params.mathitisId )
        }
        throw redirect(303, "/new/" + params.mathitisId + "/deltia")

    }
}