// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import firebase from "firebase/compat/app"; // compat 라이브러리 사용 유지
import "firebase/compat/auth"; // compat auth 추가
import {
  collection,
  getFirestore,
  type CollectionReference,
  type DocumentData,
  type Firestore,
} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMmZoB0UACbuuV2yX5Y2OYzJy58RjqdHQ",
  authDomain: "breakfast-testdb.firebaseapp.com",
  projectId: "breakfast-testdb",
  storageBucket: "breakfast-testdb.firebasestorage.app",
  messagingSenderId: "957544639999",
  appId: "1:957544639999:web:2038caacd2d2f077b40bca",
};

// Initialize Firebase
let app: FirebaseApp;

// Firebase 앱이 이미 초기화되었는지 확인
if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // 이미 초기화된 앱 가져오기
}
const db: Firestore = getFirestore(app);

// Firestore 컬렉션 가져오기 함수
export const getFirestoreCollection = (
  name: string
): CollectionReference<DocumentData> => {
  return collection(db, name);
};

// Google 로그인 함수 (UI 로직 포함으로 react-query 직접 적용은 부적합)
export const getGoogleLogin = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const email = result.user?.email;
    const allowedDomain = "eximbay.com";

    if (email && !email.endsWith("@" + allowedDomain)) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      await firebase.auth().signOut();
      return null; // 실패 시 null 반환
    } else {
      return result.user; // 성공 시 사용자 정보 반환
    }
  } catch (err) {
    console.error(err);
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
    return null; // 오류 발생 시 null 반환
  }
};

export { app, db };
