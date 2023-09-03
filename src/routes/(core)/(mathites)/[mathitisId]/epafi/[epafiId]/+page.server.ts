import { serializeNonPOJOs } from '$lib/utils.js';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server"
import { epafes } from '$lib/schemas';

let sxesi:string;

export const load = async ({ locals, params }: any,) => {
    const mathitisId = params.mathitisId;
    const epafiId = params.epafiId;
    let epafi = [];

    try {
        epafi = serializeNonPOJOs(await locals.pb.collection('epafes').getOne(epafiId))
    } catch {
        throw redirect(303, "/" + mathitisId)
    }

    if (epafi.tilefono == 0) epafi.tilefono = undefined;
    if (epafi.tilefonoE == 0) epafi.tilefonoE = undefined;
    if (epafi.email == '') epafi.email = undefined;
    sxesi=epafi.sxesi;
    const epafiForm = await superValidate(epafi, epafes);


    return { epafi, epafiForm }
}

export const actions = {
    epafi: async ({ request, locals, params }: any) => {
        const form = await request.formData();
        const epafesForm = await superValidate(form, epafes);

        if (!epafesForm.valid) {
            return fail(400, {
                epafesForm
            })
        }

        epafesForm.data.mathitis=params.mathitisId;
        epafesForm.data.sxesi=sxesi;
        await locals.pb.collection('epafes').update(params.epafiId, epafesForm.data);
        throw redirect(303, "/" + params.mathitisId)
    },

    epafiDelete: async ({locals, params }: any) => {
        await locals.pb.collection('epafes').delete(params.epafiId);
        throw redirect(303, "/" + params.mathitisId)
    }
}