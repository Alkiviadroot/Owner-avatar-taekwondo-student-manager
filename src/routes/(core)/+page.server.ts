import { addHours, serializeNonPOJOs } from '$lib/utils.js';
import moment from 'moment';
export const load = async ({ locals }: any,) => {

    const d = addHours(new Date(), 3);
    const simera = moment(d).format('MMDD')
    const simeraFull = moment(d).format('YYYYMMDD')


    const mathites = serializeNonPOJOs(await locals.pb.collection('mathites').getFullList({
        filter: 'energos = true',
    }));

    for (const mathitis of mathites) {
        const genethlia = moment(mathitis.genethlia).format('MMDD')
        mathitis.meres = parseInt(genethlia) - parseInt(simera);

        let deltia = [];
        try {
            deltia = await locals.pb.collection('deltia').getFirstListItem('mathitis="' + mathitis.id + '"');
            mathitis.deltioYgias = deltia.deltio_Igias;
            mathitis.gal = deltia.gal_Date;
            const deltioYgiasM = moment(mathitis.deltioYgias).format('YYYYMMDD');
            const galM = moment(mathitis.gal).format('YYYYMMDD');
            mathitis.deltioYgiasM = parseInt(deltioYgiasM) - parseInt(simeraFull);
            mathitis.galM = parseInt(galM) - parseInt(simeraFull);
        } catch { }
    }

    const simeraGenethlia = mathites.filter((item: any) => item.meres == 0);
    const anerxomenaGenethlia = mathites.filter((item: any) => item.meres > 0);
    anerxomenaGenethlia.sort((a: any, b: any) => {
        return a.meres - b.meres;
    });

    const deltioYgiasL = mathites.filter((item: any) => item.deltioYgiasM <= 0);
    const deltioYgiasE = mathites.filter((item: any) => item.deltioYgiasM > 0);
    deltioYgiasE.sort((a: any, b: any) => {
        return a.deltioYgiasM - b.deltioYgiasM;
    });

    const galL = mathites.filter((item: any) => item.galM <= 0);
    const galE = mathites.filter((item: any) => item.galM > 0);
    galE.sort((a: any, b: any) => {
        return a.galM - b.galM;
    });


    return {
        simeraGenethlia, anerxomenaGenethlia,
        deltioYgiasL, deltioYgiasE,
        galL, galE
    }
}