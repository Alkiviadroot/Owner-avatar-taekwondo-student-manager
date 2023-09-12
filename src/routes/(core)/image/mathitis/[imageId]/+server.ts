import type { RequestHandler } from '@sveltejs/kit';
export const GET = (async ({ locals, params, setHeaders }) => {
    const fileToken = await locals.pb.files.getToken();
    const mathitisid: string = params.imageId!
    
    const mathitis = await locals.pb.collection('mathites').getOne(mathitisid);

    const url = locals.pb.files.getUrl(mathitis, mathitis.fotografia, {
        token: fileToken
    });

    let img = await fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            return blob;
        });



    setHeaders({
        'Content-Type': img.type,
        'Content-Length': img.size.toString(),
    });

    return new Response(img);
}) satisfies RequestHandler;
