import { documentId, getDocs, query, where } from 'firebase/firestore';
import firestore from './firestore';

type BreakfastItem = {
	menu: string;
	dateString: string;
	date: Date;
};

class BreakfastMenu {
	private items: BreakfastItem[] = [];

	async fetchItems(year: number, month: number) {
		const startId = `${year}-${month.toString().padStart(2, '0')}-01`; // 2025-04-01
		const endId = `${year}-${month.toString().padStart(2, '0')}-31`; // 2025-04-31
		try {
			const collection = firestore.getFirestoreCollection('breakfasts');
			const q = query(
				collection,
				where(documentId(), '>=', startId),
				where(documentId(), '<=', endId)
			);
			// collection의 모든 문서 가져오기
			const docsList = await getDocs(q);

			docsList.forEach((doc) => {
				const data = doc.data() as BreakfastItem;
				this.items.push({
					menu: data.menu,
					dateString: data.dateString,
					date: data.date
				});
			});
		} catch (error) {
			console.error('Error fetching breakfast items:', error);
		}
	}

	getMenu(year: number, month: number, day: number) {
		// console.log('getMenu', year, month, day, this.items);

		const menu = this.items.filter((item) => {
			return (
				item.dateString ===
				`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
			);
		});

		if (menu.length === 0) {
			return '';
		}
		return menu[0].menu;
	}

	getItems() {
		return this.items;
	}
}

export default new BreakfastMenu();
