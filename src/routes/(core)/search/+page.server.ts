import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils.js';
import moment from 'moment';

export const load = async ({ locals }: any,) => {
    let mathites: any = [];
    try {
        mathites = serializeNonPOJOs(await locals.pb.collection('mathites').getFullList({
            sort: '-energos',

        }));

        for (const mathitis of mathites) {
            if (mathitis.genethlia != "") {
                var date = new Date(mathitis.genethlia);
                mathitis.genethlia = moment(date).format('DD/MM/YYYY');
            }
        }

    } catch {
        throw redirect(307, "/")
    }

    return { mathites }
}