import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ locals, setHeaders }) => {

    const url = locals.pb.files.getUrl(locals.user, locals.user?.avatar, { 'thumb': '100x100' });

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