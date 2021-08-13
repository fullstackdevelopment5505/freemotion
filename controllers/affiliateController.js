const firebase = require("firebase");
const shortid = require("shortid");
const { lookupAffiliateCode } = require("../helpers/checkAffiliateCode");
const { getUserByUid } = require("../helpers/validateAffiliate");

require("dotenv").config();

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // <-- Optional --> //
  /* storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID, */
};

const app = firebase.initializeApp(config);
const db = app.database();
const ref = db.ref("users");
let users, error;

ref.on(
  "value",
  async (snapshot) => {
    users = await snapshot.val();
  },
  (err) => {
    error = err.message;
  },
);

module.exports.generateAffiliateLink = (req, res) => {
  try {
    const affiliateCode = shortid.generate();
    res.status(200).json({
      affiliateCode,
    });
  } catch (err) {
    res.status(400).json({
      error: "Couldn't generate an affiliate code",
    });
  }
};

module.exports.checkAffiliateLink = (req, res) => {
  // Check the code itself of whether or not it exists
  const { code } = req.body;
  try {
    const result = lookupAffiliateCode(users, code);
    res.status(200).json({ result });
  } catch (err) {
    res
      .status(400)
      .json({ error: "The provided affiliate code is not valid." });
  }
};

// Add the current signed up user's uid to
// the reffered users list of the referee

module.exports.validateAffiliateLink = async (req, res) => {
  // Validate on the side of the user who shared the affiliate link
  const { code } = req.body;
  try {
    let foundUser;
    const userUid = getUserByUid(users, code);
    const user = db.ref(`users/${userUid}`);
    user
      .update({ isAdmin: true })
      .then(console.log("Done!"))
      .catch((err) => console.log(err.message));

    user.once("value", (snapshot) => (foundUser = snapshot.val()));

    if (foundUser.numRefferedUsers) {
      const refUsers = foundUser.numRefferedUsers;

      user
        .update({ numRefferedUsers: refUsers + 1 })
        .then(console.log("Incremented Affiliated (Referred) Users!"))
        .catch((err) => console.log(err.message));
    } else {
      user
        .update({ numRefferedUsers: 1 })
        .then(console.log("First Referred User!"))
        .catch((err) => console.log(err.message));
    }
    res.status(200).json({ message: "User Affiliated!" });
  } catch (err) {
    res.status(400).json({ error: "Coudln't validate the affiliate code" });
  }
};

module.exports.setAffiliation = async (req, res) => {
  const { affiliateUserUid, affiliateCode } = req.body;
  try {
    const affiliateInitiatorUserUid = getUserByUid(users, affiliateCode);
    const user = db.ref(`users/${affiliateUserUid}`);
    user
      .update({
        refferedBy: affiliateInitiatorUserUid,
      })
      .then(console.log(`Reffered by ${affiliateInitiatorUserUid}`))
      .catch((err) => console.log({ err }));
    res.status(200).json({ message: "Affiliation Successful!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: "Couldn't fulfill the affiliation process" });
  }
};

module.exports.generateClicksTracker = async (req, res, next) => {
  /* // Generate Clicks Tracking Cookie

  // Cookie Tracker Cookie -> daskcookie
  let cookie = req.cookies.daskcookie;
  if (cookie === undefined) {
    // In case cookie doesn't exist

    let cookieOptions = {
      maxAge: 365 * 24 * 60 * 60,
      httpOnly: true,
      signed: true,
    };

    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);

    // The "0" value will actually be deependent on the databse number of clicks
    res.cookie("daskcookie", 0, cookieOptions);
  }

  console.log(req.cookies);

  next(); */
};

module.exports.manageRefferalInformation = async (req, res) => {
  // Access the refferal code sent from the client
  const refferalCode = req.body.refCode;
  /* { 
    Here we'll check whether or not the reffered user is
    a new user or not
  } */

  /* 
    if (newRefferedUser === true ) {
      We'll make sure to check his actions and log them into the 
      affiliate's account
    } else {
      We'll notice them that the account they are currently logged on
      has been already reffered
    }
  */

  /* 
    Tracking Points:
      - Affiliate User Id / Newly Affiliated User
      - Clicks / Behaviour
      - Orders
      - The users the newly affiliated user brought in
        for both the first affiliate and amonst the others
        
                  AF1
                /  |  \
              /   |    \
            AF2  AF3   AF4
           /
         /
       AF5
    
      AF1 and AF5 will be linked together through AF2
  */
};
