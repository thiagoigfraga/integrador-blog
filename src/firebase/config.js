import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCNpC8WmZUQ0Wo6yzDAlxP6sVDAgcbJ5kU',
    authDomain: 'miniblog-csr.firebaseapp.com',
    projectId: 'miniblog-csr',
    storageBucket: 'miniblog-csr.appspot.com',
    messagingSenderId: '305951542597',
    appId: '1:305951542597:web:05e956780ad0a306aec22c',
    measurementId: 'G-NB0NR07C3Q',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
