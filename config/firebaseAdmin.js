const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

if (process.env.NODE_ENV === "production") {
    initializeApp();
} else {
    const serviceAccount = require("./firebase-adminsdk.json");
    initializeApp({
        credential: cert(serviceAccount)
    });
}
const auth = getAuth();
module.exports = auth;