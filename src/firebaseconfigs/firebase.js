import {intializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
    apiKey:"AIzaSyBU-XbqiMWoL0zvZm40JG5GWJrwww_oLZk",
    projectId:"chitti-91cde",
    messagingSenderId:"804158019842",
};
const firebaseApp = intializeApp(firebaseConfig);
export const getFirebaseApp = getAuth(firebaseApp);