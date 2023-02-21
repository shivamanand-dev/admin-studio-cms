import { getStorage } from "firebase/storage";

import firebaseApp from ".";

const storage = getStorage(firebaseApp);

export default storage;
