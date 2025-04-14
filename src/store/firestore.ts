// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { collection, Firestore, getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCMmZoB0UACbuuV2yX5Y2OYzJy58RjqdHQ',
	authDomain: 'breakfast-testdb.firebaseapp.com',
	projectId: 'breakfast-testdb',
	storageBucket: 'breakfast-testdb.firebasestorage.app',
	messagingSenderId: '957544639999',
	appId: '1:957544639999:web:2038caacd2d2f077b40bca'
};

// Initialize Firebase
class Firestoer {
	private app: FirebaseApp;
	private db: Firestore;

	constructor() {
		this.app = initializeApp(firebaseConfig);
		this.db = getFirestore(this.app);
	}

	// forestore 컬렉션 가져오기
	public getFirestoreCollection(name: string) {
		const collectionRef = collection(this.db, name);
		return collectionRef;
	}
}

export default new Firestoer();
