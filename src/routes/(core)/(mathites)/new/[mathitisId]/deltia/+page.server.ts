import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server"
import { deltia } from '$lib/schemas';

export const load = async () => {
    const deltiaForm = await superValidate(deltia);

    return { deltiaForm };
}

export const actions = {
    deltia: async ({ request, locals, params }: any) => {
        const form = await request.formData();
        const deltiaForm = await superValidate(form, deltia);

        if (!deltiaForm.valid) {
            return fail(400, {
                deltiaForm
            })
        }

        const formData = new FormData();
        //Required
        formData.append("mathitis", params.mathitisId)
        formData.append("fotografia_adia", deltiaForm.data.fotografia_adia);
        //Opional
        formData.append("gal_Number", deltiaForm.data.gal_Number !== undefined ? deltiaForm.data.gal_Number.toString() : "");
        formData.append("gal_Date", deltiaForm.data.gal_Date !== undefined ? deltiaForm.data.gal_Date : "");
        formData.append("deltio_Igias", deltiaForm.data.deltio_Igias !== undefined ? deltiaForm.data.deltio_Igias : "");

        const file = form.get('forma_GDPR');
        if (file instanceof File && file?.size != 0) {
            let name = params.mathitisId + "." + file.type.replace('image/', '')
            formData.append("forma_GDPR", new Blob([file]), (name));
        }

        try {
            await locals.pb.collection('deltia').create(formData);
        } catch {
            throw redirect(307, "/update/" + params.mathitisId + "/deltia")
        }
        throw redirect(307, "/new/" + params.mathitisId + "/epafes")

    }
}