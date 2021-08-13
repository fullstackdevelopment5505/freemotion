import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { v4 as uuid } from "uuid";

require("dotenv").config();

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // OPTIONAL
  /* storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID, */
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.fdb = app.firestore(); // Firestore Database

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignOut = () => {
    window.localStorage.removeItem("authUser");
    this.auth.signOut();
    window.location.assign("/");
  };

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  // Store The Users in the Realtime Database - "db"

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // Store the rest of the data in the Firestore Database - "fdb"

  // * Orders * //

  orders = () => this.fdb.collection("orders").get();

  userOrders = async (userId) =>
    this.fdb.collection("orders").where("customerId", "==", userId).get();

  // Change productName to productId !!!
  isVerifiedOrder = async (productId) => {
    let isVerified = false;
    const orders = await this.fdb
      .collection("orders")
      .where("customerId", "==", this.auth.currentUser.uid)
      .get();

    orders.forEach((order) => {
      let products = order.data().products;
      for (let i = 0; i < products.length; i++) {
        console.log(products[i].productId);
        if (products[i].productId === productId) {
          isVerified = true;
          break;
        }
      }
    });

    console.log(isVerified);

    return isVerified;
  };

  order = (id) => this.fdb.collection("orders").doc(id).get();

  // * Reviews * //

  reviews = () => this.fdb.collection("reviews").get();

  productReviews = (productId) =>
    this.fdb.collection("reviews").where("productId", "==", productId).get();

  review = (id) => this.fdb.collection("reviews").doc(id).get();

  categoryReviews = (category) =>
    this.fdb
      .collection("reviews")
      .where("productCategory", "==", category)
      .get();

  submitReview = (data) => {
    const id = uuid();
    var clientName;
    this.user(this.auth.currentUser.uid).on(
      "value",
      (snapshot) =>
        (clientName = snapshot.val().firstName + " " + snapshot.val().lastName),
    );

    // Check if the user also purchased the product
    //const userOrders = this.orders()

    return this.fdb.collection("reviews").doc(id).set({
      id: id,
      customerId: this.auth.currentUser.uid,
      customerName: clientName,
      // Receive Review Data
      rating: data.rating,
      pros: data.pros,
      cons: data.cons,
      reviewContent: data.reviewContent,
      productId: data.productId,
      time: data.time,
      date: data.date,
    });
  };

  // * Support Requests * //

  supportRequests = () => this.fdb.collection("supportRequests").get();

  supportRequest = (id) => this.fdb.collection("supportRequests").doc(id).get();

  submitSupportRequest = (data) => {
    const id = uuid();
    return this.fdb.collection("supportRequests").doc(id).set({
      id: id,
      customerId: this.auth.currentUser.uid,
      customerName: data.name,
      customerEmail: data.email,
      requestSubject: data.subject,
      requestMessage: data.message,
    });
  };

  // • Warranty Requests • //

  submitWarrantyRequest = (data) => {
    const id = uuid();
    data.id = id;
    data.clientId = this.auth.currentUser.uid;
    console.log(data);
    return this.fdb.collection("warrantyRequests").doc(id).set(data);
  };

  // * Wishlist * //

  wishlist = () =>
    this.fdb
      .collection("wishlists")
      .where("client_id", "==", this.auth.currentUser.uid)
      .get();

  updateWishlist = (productData) =>
    this.fdb.collection("wishlists").update({
      products: this.fdb.products.arrayUnion(productData),
    });

  // Left to create a wishlist when the first product is added
}

export default Firebase;
