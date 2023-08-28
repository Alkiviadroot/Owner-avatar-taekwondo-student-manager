import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils.js';
import moment from 'moment';

export const load = async ({ locals }: any,) => {
    let simeraGenethlia: any = [];
    let anerxomenaGenethlia: any = [];

    const mathites = serializeNonPOJOs(await locals.pb.collection('mathites').getFullList({
        filter: 'energos = true',
    }));

    for (const mathitis of mathites) {
        const genethlia = moment(mathitis.genethlia).format('DDMM')
        const meres = moment(genethlia, "DDMM").fromNow().split(" ");
        if (meres[0] == 'a')
            mathitis.meres = 0;
        else if (meres[0] == "in")
            mathitis.meres = meres[1];
        else
            mathitis.meres = -1;
    }

    const genethlia = mathites.filter((item: any) => item.meres !== -1);
    simeraGenethlia = genethlia.filter((item: any) => item.meres == 0);
    anerxomenaGenethlia = genethlia.filter((item: any) => item.meres !== 0);

    anerxomenaGenethlia.sort((a: any, b: any) => {
        return a.meres - b.meres;
    });


    return { simeraGenethlia, anerxomenaGenethlia }
}