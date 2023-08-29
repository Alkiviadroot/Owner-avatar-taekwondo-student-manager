import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils.js';
import moment from 'moment';

export const load = async ({ locals }: any,) => {


    const mathites = serializeNonPOJOs(await locals.pb.collection('mathites').getFullList({
        filter: 'energos = true',
    }));

    for (const mathitis of mathites) {
        const genethlia = moment(mathitis.genethlia).format('MMDD')
        const d = new Date();
        const simera=moment(d).format('MMDD')
        const meres=parseInt(genethlia)-parseInt(simera);
        mathitis.meres = meres;
    }

    const simeraGenethlia = mathites.filter((item: any) => item.meres == 0);
    const anerxomenaGenethlia = mathites.filter((item: any) => item.meres >= 0 &&  item.meres!=0 );
    anerxomenaGenethlia.sort((a: any, b: any) => {
        return a.meres - b.meres;
    });


    return { simeraGenethlia, anerxomenaGenethlia }
}