import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Use methods to access firebase SDK
class Firebase {
  constructor() {
    app.initializeApp({
      apiKey: "AIzaSyC6nY6LMRHW7GX_p1NXTAoZ9vOafS9DzPE",
      authDomain: "unc-cs-resume-database-af14e.firebaseapp.com",
      databaseURL: "https://unc-cs-resume-database-af14e.firebaseio.com",
      projectId: "unc-cs-resume-database-af14e",
      storageBucket: "unc-cs-resume-database-af14e.appspot.com",
      messagingSenderId: "129154722676",
      appId: "1:129154722676:web:583be355ee4dbcfe261a21",
      measurementId: "G-WDT2LDB336",
    });
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  async login(email, pass) {
    try {
      const cred = await this.auth.signInWithEmailAndPassword(email, pass);
      return cred.user;
    } catch (err) {
      console.error(err);
    }
  }

  async logout() {
    try {
      return await this.auth.signOut();
    } catch (err) {
      console.error(err);
    }
  }

  // Creates user and returns User object
  async createUser(email, pass) {
    try {
      const cred = await this.auth.createUserWithEmailAndPassword(email, pass);
      return cred.user;
    } catch (err) {
      console.error(err);
    }
  }

  // returns all docs from a given collection
  async getDocs(collection) {
    try {
      const data = await this.db.collection(collection).get();
      return data.docs.map((doc) => doc.data());
    } catch (err) {
      console.error(err);
    }
  }

  // gets all current profile information for the user
  async getUserInfo(userID) {
    // let userInfo = null;
    try {
      const data = await this.db
        .collection("students")
        .where("UID", "==", userID)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const allData = doc.data().Email;
            console.log(doc.data()["First Name"]);
            return allData;
          });
        });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Firebase();
