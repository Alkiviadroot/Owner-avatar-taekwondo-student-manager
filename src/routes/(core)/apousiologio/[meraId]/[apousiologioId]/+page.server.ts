let meraA: string;
let minas: string;
let xronos: string;

export const load = async ({ locals, params }: any) => {
	const apousiologioId = params.apousiologioId;
	const mathitesList = [];
	let apousiologioDate = apousiologioId.slice(11, 20);

	meraA = apousiologioDate.slice(3, 5);
	xronos = apousiologioDate.slice(5, 9);
	switch (apousiologioDate.slice(0, 3)) {
		case 'Jan':
			minas = '1';
			break;
		case 'Feb':
			minas = '2';
			break;
		case 'Mar':
			minas = '3';
			break;
		case 'Apr':
			minas = '4';
			break;
		case 'May':
			minas = '5';
			break;
		case 'Jun':
			minas = '6';
			break;
		case 'Jul':
			minas = '7';
			break;
		case 'Aug':
			minas = '8';
			break;
		case 'Sep':
			minas = '9';
			break;
		case 'Oct':
			minas = '10';
			break;
		case 'Nov':
			minas = '11';
			break;
		case 'Dec':
			minas = '12';
			break;
	}
	apousiologioDate = meraA + '/' + minas + '/' + xronos;

	const mathitesProgramatos = await locals.pb.collection('programa').getFullList({
		filter: 'mera = "' + params.meraId + '"'
	});

	const parousies = await locals.pb.collection('parousies').getFullList({
		filter: 'apousiologioId = "' + params.apousiologioId + '"'
	});

	const mera = await locals.pb.collection('meres').getFirstListItem('id = "' + params.meraId + '"');

	const parousiesDouble: any = [];

	for (const mathitis of mathitesProgramatos) {
		const mathitisObj = await locals.pb.collection('mathites').getOne(mathitis.mathitis);
		if (mathitisObj.energos) {
			mathitisObj.parousia = false;

			parousies.find((o: any, i: any) => {
				if (o.mathitis == mathitisObj.id) {
					mathitisObj.parousia = true;
					parousiesDouble.push(parousies[i]);
				}
			});

			mathitesList.push(mathitisObj);
		}

	}

	const difference = parousies.filter((element: any) => !parousiesDouble.includes(element));

	for (const mathitis of difference) {
		const mathitisObj = await locals.pb.collection('mathites').getOne(mathitis.mathitis);
		mathitisObj.parousia = true;
		mathitesList.push(mathitisObj);
	}

	return { mathitesList, mera, apousiologioId, apousiologioDate };
};

export const actions = {
	parousiesSave: async ({ request, locals, params }: any) => {
		const form = await request.formData();
		const parousies = JSON.parse(form.get('parousiesIds') as string);

		const records = await locals.pb.collection('parousies').getFullList({
			filter: 'apousiologioId = "' + params.apousiologioId + '"'
		});

		for (const parousia of records)
			try {
				await locals.pb.collection('parousies').delete(parousia.id);
			} catch { }

		const formData = new FormData();
		formData.append('apousiologioId', params.apousiologioId);
		formData.append('minas', minas);
		formData.append('xronos', xronos);

		for (const mathitiId of parousies) {
			formData.append('mathitis', mathitiId);
			await locals.pb.collection('parousies').create(formData);
		}
	}
};
