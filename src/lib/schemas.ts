import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = '.*(.png|.jpg|.jpeg|.webp)';
const ACCEPTED_FILE_TYPES = '.*(.png|.jpg|.jpeg|.webp|.pdf)';

export const mathitis = z.object({
	id: z.string().trim(),
	onoma: z.string({ required_error: "Απαιτείται" }).max(64, "Πάρα πολλοί χαρακτήρες").trim(),
	epitheto: z.string({ required_error: "Απαιτείται" }).max(64, "Πάρα πολλοί χαρακτήρες").trim(),
	energos: z.string().trim(),
	diefthinsi: z.string().max(100, "Πάρα πολλοί χαρακτήρες").trim(),
	tk: z.number().min(1000, "Απαιτεί τουλάχιστον 4 χαρακτήρες").nonnegative("Μη έγκυρος χαρακτήρας ( - )").int("Μη έγκυρος χαρακτήρας ( . ) ").finite().safe(),
	perioxi: z.string().max(64, "Πάρα πολλοί χαρακτήρες").trim(),
	kinito: z.number().min(10000000, "Απαιτεί τουλάχιστον 8 χαρακτήρες").nonnegative("Μη έγκυρος χαρακτήρας ( - )").int("Μη έγκυρος χαρακτήρας ( . ) ").finite().safe(),
	tilefonoS: z.number().min(10000000, "Απαιτεί τουλάχιστον 8 χαρακτήρες").nonnegative("Μη έγκυρος χαρακτήρας ( - )").int("Μη έγκυρος χαρακτήρας ( . ) ").finite().safe(),
	tilefonoE: z.number().min(10000000, "Απαιτεί τουλάχιστον 8 χαρακτήρες").nonnegative("Μη έγκυρος χαρακτήρας ( - )").int("Μη έγκυρος χαρακτήρας ( . ) ").finite().safe(),
	epankelma: z.string().max(64, "Πάρα πολλοί χαρακτήρες").trim(),
	genethlia: z.string().trim(),
	enarksi: z.string().trim(),
	email: z.string().email("Δεν είναι διεύθυνση Email").trim(),
	fotografia: z.string().regex(new RegExp(ACCEPTED_IMAGE_TYPES), "Ο τύπος του αρχείου δεν είναι αποδεκτός")

}).partial({
	diefthinsi: true,
	tk: true,
	perioxi: true,
	kinito: true,
	tilefonoS: true,
	tilefonoE: true,
	epankelma: true,
	genethlia: true,
	enarksi: true,
	email: true,
	fotografia: true
});

export const provlimata = z.object({
	mathitis: z.string().trim(),
	kardiaka: z.string().trim(),
	kardiakaL: z.string().max(1500, "Πάρα πολλοί χαρακτήρες").trim(),

	asthma: z.string().trim(),
	asthmaL: z.string().max(1500, "Πάρα πολλοί χαρακτήρες").trim(),

	lipothimia: z.string().trim(),
	lipothimiaL: z.string().max(1500, "Πάρα πολλοί χαρακτήρες").trim(),

	allo: z.string().trim(),
	alloL: z.string().max(1500, "Πάρα πολλοί χαρακτήρες").trim(),

}).partial({
	mathitis: true,
	kardiakaL: true,
	asthmaL: true,
	lipothimiaL: true,
	alloL: true,
})


export const deltia = z.object({
	mathitis: z.string().trim(),

	forma_GDPR: z.string().regex(new RegExp(ACCEPTED_FILE_TYPES), "Ο τύπος του αρχείου δεν είναι αποδεκτός"),
	fotografia_adia: z.string().trim(),

	gal_Number: z.number().nonnegative("Μη έγκυρος χαρακτήρας ( - )").int("Μη έγκυρος χαρακτήρας ( . ) ").finite().safe(),
	gal_Date: z.string().trim(),
	deltio_Igias: z.string().trim(),

}).partial({
	mathitis: true,
	forma_GDPR: true,
	deltio_Igias: true,
	gal_Number: true,
	gal_Date: true,
});

export const epafes = z.object({
	mathitis: z.string().trim(),
	sxesi: z.string({ required_error: "Απαιτείται" }).trim(),
	onoma: z.string({ required_error: "Απαιτείται" }).max(64, "Πάρα πολλοί χαρακτήρες").trim(),
	epitheto: z.string({ required_error: "Απαιτείται" }).max(64, "Πάρα πολλοί χαρακτήρες").trim(),
	paralavi: z.string().trim().default('false'),
	epankelma: z.string().max(64, "Πάρα πολλοί χαρακτήρες").trim(),
	tilefono: z.number().min(10000000, "Απαιτεί τουλάχιστον 8 χαρακτήρες").nonnegative("Μη έγκυρος χαρακτήρας ( - )").int("Μη έγκυρος χαρακτήρας ( . ) ").finite().safe(),
	tilefonoE: z.number().min(10000000, "Απαιτεί τουλάχιστον 8 χαρακτήρες").nonnegative("Μη έγκυρος χαρακτήρας ( - )").int("Μη έγκυρος χαρακτήρας ( . ) ").finite().safe(),
	email: z.string().email("Δεν είναι διεύθυνση Email").trim(),

}).partial({
	mathitis: true,
	allo: true,
	tilefono: true,
	tilefonoE: true,
	email: true,
	epankelma: true
});

export const exetasi = z.object({
	mathitis: z.string().trim(),
	date: z.string({ required_error: "Απαιτείται" }).trim(),
	leptomeries: z.string().max(1500, "Πάρα πολλοί χαρακτήρες").trim(),
	epitixia: z.string().trim(),

}).partial({
	mathitis: true,
	leptomeries: true,
});

export const meres = z.object({
	mera: z.string({ required_error: "Απαιτείται" }).trim(),
	start: z.string({ required_error: "Απαιτείται" }).trim(),
	stop: z.string({ required_error: "Απαιτείται" }).trim(),
	sort: z.number(),
}).partial({
	sort: true,
});
