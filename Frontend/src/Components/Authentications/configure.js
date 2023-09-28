import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyALrpJ5k3sziQswKNw0NhBXdicxqlnp_kw",
  authDomain: "document-validator-f6227.firebaseapp.com",
  projectId: "document-validator-f6227",
  storageBucket: "document-validator-f6227.appspot.com",
  messagingSenderId: "272093140989",
  appId: "1:272093140989:web:c2328bc564755988dd2b94",
  measurementId: "G-949V70NRLC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { auth, GoogleAuthProvider};
export default firebaseApp

