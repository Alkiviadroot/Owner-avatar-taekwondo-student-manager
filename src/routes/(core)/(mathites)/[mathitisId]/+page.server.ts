import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server"
import { mathitis, provlimata, deltia, exetasi } from '$lib/schemas';
import { serializeNonPOJOs } from '$lib/utils.js';
import moment from 'moment';

let provlimataNotAvailable = false;
let provlimataId: string;
let deltiaNotAvailable = false;
let deltiId: string;

export const load = async ({ locals, params }: any,) => {
    const fileToken = await locals.pb.files.getToken();
    const mathitisId = params.mathitisId;
    // MathitisForm
    let profile: any = [];
    try {
        profile = serializeNonPOJOs(await locals.pb.collection('mathites').getOne(mathitisId))
    } catch {
        throw redirect(307, "/")
    }

    if (profile.tk == 0) profile.tk = undefined;
    if (profile.kinito == 0) profile.kinito = undefined;
    if (profile.tilefonoS == 0) profile.tilefonoS = undefined;
    if (profile.tilefonoE == 0) profile.tilefonoE = undefined;
    if (profile.email == '') profile.email = undefined;
    if (profile.fotografia == '') profile.fotografia = undefined;
    profile.genethliaRaw = profile.genethlia;
    profile.enarksiRaw = profile.enarksi;
    profile.genethlia = moment(profile.genethlia).format('YYYY-MM-DD');
    profile.enarksi = moment(profile.enarksi).format('YYYY-MM-DD');
    profile.fotografiaView = locals.pb.files.getUrl(profile, profile.fotografia, { 'token': fileToken });

    const mathitisForm = await superValidate(profile, mathitis);

    // ProvlimataForm
    let provlimataR: any = [];
    try {
        provlimataR = serializeNonPOJOs(await locals.pb.collection('provlimata').getFirstListItem('mathitis="' + mathitisId + '"'));
        provlimataId = provlimataR.id;
        provlimataNotAvailable = false;
    } catch {
        provlimataNotAvailable = true;
    }
    const provlimataForm = await superValidate(provlimataR, provlimata);

    // DeltiaForm
    let deltiaR: any = [];
    try {
        deltiaR = serializeNonPOJOs(await locals.pb.collection('deltia').getFirstListItem('mathitis="' + mathitisId + '"'));
        deltiId = deltiaR.id;
        deltiaNotAvailable = false;
    } catch {
        deltiaNotAvailable = true;
    }
    if (deltiaR.gal_Number == 0) deltiaR.gal_Number = undefined;
    if (deltiaR.forma_GDPR == '') deltiaR.forma_GDPR = undefined;
    deltiaR.deltio_IgiasRaw = deltiaR.deltio_Igias;
    deltiaR.gal_DateRaw = deltiaR.gal_Date;
    deltiaR.deltio_Igias = moment(deltiaR.deltio_Igias).format('YYYY-MM-DD');
    deltiaR.gal_Date = moment(deltiaR.gal_Date).format('YYYY-MM-DD');
    deltiaR.forma_GDPR_View = locals.pb.files.getUrl(deltiaR, deltiaR.forma_GDPR, { 'token': fileToken });

    const deltiaForm = await superValidate(deltiaR, deltia);


    let epafes: any = [];
    try {
        epafes = serializeNonPOJOs(await locals.pb.collection('epafes').getFullList({
            filter: 'mathitis = "' + mathitisId + '"',
            sort: '-paralavi',
        }));
    } catch { console.log("no record") }

    let exetasis: any = [];
    try {
        exetasis = serializeNonPOJOs(await locals.pb.collection('eksetasis').getFullList({
            filter: 'mathitis = "' + mathitisId + '"',
        }));
    } catch { console.log("no record") }

    const exetasiForm = await superValidate(exetasi);

    let exetasiCounter = 0;
    for (let exetasi of exetasis) {
        if (exetasi.epitixia) {
            exetasiCounter += 1;
            exetasi.zoni = exetasiCounter;
        } else {
            exetasi.zoni = exetasiCounter + 1;
        }
    }
    const zoni = exetasiCounter

    return {
        profile, mathitisForm,
        provlimataForm, provlimataR,
        deltiaForm, deltiaR,
        epafes,zoni,
        exetasiForm, exetasis,
    }


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
        throw redirect(303, "/");
    },

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

        if (provlimataNotAvailable)
            await locals.pb.collection('provlimata').create(provlimataForm.data);
        else
            await locals.pb.collection('provlimata').update(provlimataId, provlimataForm.data);
    },

    deltia: async ({ request, locals, params }: any) => {
        const form = await request.formData();
        const deltiaForm = await superValidate(form, deltia);
        console.log("teste")

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

        if (deltiaNotAvailable)
            await locals.pb.collection('deltia').create(formData);
        else
            await locals.pb.collection('deltia').update(deltiId, formData);
    },

    exetasi: async ({ request, locals, params }: any) => {
        const form = await request.formData();
        const exetasiForm = await superValidate(form, exetasi);

        if (!exetasiForm.valid) {
            return fail(400, {
                exetasiForm
            })
        }

        exetasiForm.data.mathitis = params.mathitisId
        await locals.pb.collection('eksetasis').create(exetasiForm.data);
    }
}