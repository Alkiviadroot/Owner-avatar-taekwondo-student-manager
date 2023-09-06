import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils.js';

export const load = async ({ locals }: any,) => {
    let mathites: any = [];
    try {
        mathites = serializeNonPOJOs(await locals.pb.collection('mathites').getFullList({
            sort: '-energos',
        }));
    } catch {
        throw redirect(307, "/")
    }

    return { mathites }
}

export const actions = {
    addMathiti: async ({ request, locals, params }: any) => {
        const form = await request.formData();
        const idMathiti = form.get("idMathiti") as string;
        let minas: string = "";
        let xronos: string;
        const apousiologioId = params.apousiologioId
        let apousiologioDate = apousiologioId.slice(11, 20);
        xronos = apousiologioDate.slice(5, 9);
        switch (apousiologioDate.slice(0, 3)) {
            case "Jan": minas = "1"; break;
            case "Feb": minas = "2"; break;
            case "Mar": minas = "3"; break;
            case "Apr": minas = "4"; break;
            case "May": minas = "5"; break;
            case "Jun": minas = "6"; break;
            case "Jul": minas = "7"; break;
            case "Aug": minas = "8"; break;
            case "Sep": minas = "9"; break;
            case "Oct": minas = "10"; break;
            case "Nov": minas = "11"; break;
            case "Dec": minas = "12"; break;

        }

        const formData = new FormData();
        formData.append("apousiologioId", params.apousiologioId)
        formData.append("minas", minas)
        formData.append("xronos", xronos)
        formData.append("mathitis", idMathiti);


        try {
            await locals.pb.collection('parousies').create(formData);
        } catch { }
        throw redirect(303, "/apousiologio/" + params.meraId + "/" + params.apousiologioId)

    }

}