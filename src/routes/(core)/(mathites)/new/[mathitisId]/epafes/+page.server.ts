import { redirect, fail } from '@sveltejs/kit';
import { superValidate, setError } from "sveltekit-superforms/server"
import { epafes } from '$lib/schemas';
import { serializeNonPOJOs } from '$lib/utils.js';


export const load = async ({ locals, params }) => {


    const epafesForm = await superValidate(epafes);

    const mathitisId = params.mathitisId;
    let records: any = [];

    try {
        records = serializeNonPOJOs(await locals.pb.collection('epafes').getFullList({
            filter: 'mathitis = "' + params.mathitisId + '"',
            sort: '-paralavi',

        }));
    } catch { console.log("no record") }


    return { epafesForm, mathitisId, records };
}

export const actions = {
    epafes: async ({ request, locals, params }: any) => {
        const form = await request.formData();
        const epafesForm = await superValidate(form, epafes);

        if (!epafesForm.valid) {
            return fail(400, {
                epafesForm
            })
        }

        epafesForm.data.mathitis = params.mathitisId
        console.log

        let sxesi: string;

        if (epafesForm.data.sxesi == 'undefined')
        return setError(epafesForm, 'allo', 'error 1');

        // if (epafesForm.data.sxesi == 'Άλλο' && epafesForm.data.allo == undefined)
        //     return setError(epafesForm, 'allo', 'error 2');



        if (epafesForm.data.sxesi == 'Άλλο')
            sxesi = epafesForm.data.allo !== undefined ? epafesForm.data.allo : "";
        else
            sxesi = epafesForm.data.sxesi

        const formData = new FormData();
        //Required
        formData.append("mathitis", params.mathitisId)
        formData.append("sxesi", sxesi);
        formData.append("onoma", epafesForm.data.onoma);
        formData.append("epitheto", epafesForm.data.epitheto);
        formData.append("paralavi", epafesForm.data.paralavi);
        //Opional
        formData.append("epankelma", epafesForm.data.epankelma !== undefined ? epafesForm.data.epankelma : "");
        formData.append("tilefono", epafesForm.data.tilefono !== undefined ? epafesForm.data.tilefono.toString() : "");
        formData.append("tilefonoE", epafesForm.data.tilefonoE !== undefined ? epafesForm.data.tilefonoE.toString() : "");
        formData.append("email", epafesForm.data.email !== undefined ? epafesForm.data.email : "");


        await locals.pb.collection('epafes').create(formData);

        let records: any = [];

        try {
            records = serializeNonPOJOs(await locals.pb.collection('epafes').getFullList({
                filter: 'mathitis = "' + params.mathitisId + '"',
            }));

            console.log(records)
        } catch { console.log("no record") }

        return{epafesForm,records}
    }
}