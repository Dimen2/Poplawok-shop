import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ТВОЯ конфигурация
const firebaseConfig = {
    apiKey: "AIzaSyAVtiR6s31Q90i0j2q_I9tk77sVlE7SZVc",
    authDomain: "admin-panel-poplawok.firebaseapp.com",
    projectId: "admin-panel-poplawok",
    storageBucket: "admin-panel-poplawok.firebasestorage.app",
    messagingSenderId: "426190863471",
    appId: "1:426190863471:web:87355fddebf5ae56fce19a",
    measurementId: "G-Q9YV1JTS79"
};

// Инициализация
const app = initializeApp(firebaseConfig);

// 🔥 ВОТ ЭТО ГЛАВНОЕ
export const db = getFirestore(app);