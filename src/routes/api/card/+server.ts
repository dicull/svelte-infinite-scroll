import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
	const page: number = +(event.url.searchParams.get("page") || 1);
	const limit: number = +(event.url.searchParams.get("limit") || 15);
	const start = (page - 1) * limit;
	const end = page * limit;
	const cards = cardData.slice(start, end);

	return json({ success: true, cards, remains: cardData.length - end });
}) satisfies RequestHandler;

const cardData: any = [];

const madeData = (() => {
	for (let i = 0; i < 100; i++) {
		cardData.push({
			title: `Card title ${i + 1}`,
			content: 'With supporting text below as a natural lead-in to additional content.'
		});
	}
})();
