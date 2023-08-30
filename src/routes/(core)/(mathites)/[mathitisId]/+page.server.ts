import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server"
import { mathitis } from '$lib/schemas';
import { serializeNonPOJOs } from '$lib/utils.js';

export const load = async ({ locals, params }: any,) => {
    let profile: any = [];
    try {
        profile = serializeNonPOJOs(await locals.pb.collection('mathites').getOne(params.mathitisId))
    } catch {
        throw redirect(307, "/")
    }

    const fileToken = await locals.pb.files.getToken();
    profile.fotografiaView = locals.pb.files.getUrl(profile, profile.fotografia, { 'token': fileToken });

    if (profile.tk == 0) profile.tk = undefined;
    if (profile.kinito == 0) profile.kinito = undefined;
    if (profile.tilefonoS == 0) profile.tilefonoS = undefined;
    if (profile.tilefonoE == 0) profile.tilefonoE = undefined;
    if (profile.email == '') profile.email = undefined;
    if (profile.fotografia == '') profile.fotografia = undefined;
    const mathitisForm = await superValidate(profile, mathitis);

    return { profile, mathitisForm }
}

export const actions = {
    mathitis: async ({ request, locals, params }: any) => {
        const form = await request.formData();
        const mathitisForm = await superValidate(form, mathitis);

        if (!mathitisForm.valid) {
            return fail(400, {
                mathitisForm
            })
        }

        const formData = new FormData();
        //Required
        formData.append("id", params.mathitisId)
        formData.append("onoma", mathitisForm.data.onoma)
        formData.append("epitheto", mathitisForm.data.epitheto)
        formData.append("energos", mathitisForm.data.energos)
        //Opional
        formData.append("diefthinsi", mathitisForm.data.diefthinsi !== undefined ? mathitisForm.data.diefthinsi : "");
        formData.append("tk", mathitisForm.data.tk !== undefined ? mathitisForm.data.tk.toString() : "");
        formData.append("perioxi", mathitisForm.data.perioxi !== undefined ? mathitisForm.data.perioxi : "");
        formData.append("kinito", mathitisForm.data.kinito !== undefined ? mathitisForm.data.kinito.toString() : "");
        formData.append("tilefonoS", mathitisForm.data.tilefonoS !== undefined ? mathitisForm.data.tilefonoS.toString() : "");
        formData.append("tilefonoE", mathitisForm.data.tilefonoE !== undefined ? mathitisForm.data.tilefonoE.toString() : "");
        formData.append("epankelma", mathitisForm.data.epankelma !== undefined ? mathitisForm.data.epankelma : "");
        formData.append("genethlia", mathitisForm.data.genethlia !== undefined ? mathitisForm.data.genethlia : "");
        formData.append("enarksi", mathitisForm.data.enarksi !== undefined ? mathitisForm.data.enarksi : "");
        formData.append("email", mathitisForm.data.email !== undefined ? mathitisForm.data.email : "");

        const file = form.get('fotografia');
        if (file instanceof File && file?.size != 0) {
            let name = mathitisForm.data.onoma.toString() + "_" + mathitisForm.data.epitheto.toString() + "." + file.type.replace('image/', '')
            formData.append("fotografia", new Blob([file]), (name));
        }

        await locals.pb.collection('mathites').update(params.mathitisId, formData);
    },

    mathitisDelete: async ({ locals, params }: any) => {
        await locals.pb.collection('mathites').delete(params.mathitisId);
        throw redirect(307, "/");
    }
}