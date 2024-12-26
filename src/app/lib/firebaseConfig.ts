// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmRbUGujGFZ6tWcUSeE3UIpYZvLASsJic",
    authDomain: "user-form-3c193.firebaseapp.com",
    databaseURL: "https://user-form-3c193-default-rtdb.firebaseio.com",
    projectId: "user-form-3c193",
    storageBucket: "user-form-3c193.firebasestorage.app",
    messagingSenderId: "1009404941519",
    appId: "1:1009404941519:web:f5cc48b897b39eb99f93ba",
    measurementId: "G-FDVV88LZ9P"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Authentication instance
export const auth = getAuth(app);

// Google Auth Provider
export const provider = new GoogleAuthProvider();

// {
//     "type": "service_account",
//     "project_id": "user-form-3c193",
//     "private_key_id": "88f076babb76b831ede1d13d6075cda8dea56682",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAsIaQRdnBRLdL\nw9YWQBA/kedSliJtLtgc99vbCeMtY1tW7dVMQDDJJdVjo9U1zd8r9F6vUkqUTKQO\n8AQGiV82gD1y4ERaqCumqCKtG1nKiphILgwq69fx+wwRXZhtVq+eqGZrGhFqLpFB\nTAdmO016cs48onCk78qdl9cao5octPtUnEWFeyRAOa7KDVg3WAbj5akiohVkrp/o\nMhOnSchCHe6XNeiHZk9mAIolguYCqNGLbM/32V5DaRZn2NRFUlt5mXkTgr1xchqt\nMyxuewWrjqmxA+ZyXF+sbLyWDnH8pJd0AcFFKLoonGyFpOOZFXGoQg1Z9PCbfB3Y\nZjt/MC4RAgMBAAECggEAPpobXcwTzwKwOmFJsLjnjn+sk9xLGwXZGLA+MY+oyxo4\nlql2XuuL7g3oohKcNnrIQtOF35fwuvWbZ277H9SJpn9Ld4L9Mibo56BAg9Ua+v7E\nMs8jDN7KrcdOSGYMG5nKPNWhULKLbd/rOTemP8SMi3e5IWH1DuEJBuJJ9FGqxCBH\n71DiBHmKHbXM8/DgBJ9lHRp2Iec0f1EVF0YRMGwwXOw+XM1+tJzmWIiYJJjvPWpD\n6VIlCzKp6HXn+bdKGH+fQfzIt7xAtNYB51Cfxi7oc9jZAap6WMCFQxFeksdQfXiT\n5SudROCZPZzxpNjVW7aQ+DcgT/6gQH5CcEchjOMa8QKBgQDqjzQHWqs5LnYg+e2i\nbxV/rqP5iAnzwOTWwSh4AGyxHeH6s0XmzfX6Ad2jqdvOHCiHvMklauoB+rFDGfz9\nJmx4RbtsdcRi3DJMW/z0/XT9IyRuZu0cdl/gPFT8vzqU4lgdC9KsSoBbSL02d8dB\nqPUNLRajcT7HDz+EYiRnm1IiGwKBgQDSTYyV0yTFhIPlCHeTqoub4dHtNPUREL+V\nyOGWw7P2FpGE4PUcS2gGpTgZ7asu6KWwWMlLdERHnVDy5+j41ikTnPNScPUHzTJz\ngFxdi67bVxqUO0hTJ8PFkAsIdUWc445NIVk694JZ/ZE2g3jNgPvt/oLK7G1xQ+wn\nBIvF5Q/TQwKBgDhlF+BQx2wnJJXHIYB1btjVF22ubJ4jmaGcrWs0xu1KvwN0yPC2\nQlbKzgxEkambkY8ZL8+ERiEVsjrs66u96kR8l5R7OC2AvcMoNsh8i/00ztSQgJ/g\nQir6toBSRfZ3+TF6nzt3aicIdR28bLb3tXtmhNPlLW/U1bOxmQkkCfpTAoGBAImS\noX0BevSbE40oVNEMp/d5alK6afaX9jyOBMUTkQ5TBS7f2nh/+7UdL+4GRA2Ts5AB\nBO2PSXtvthyxCP5/Wq+x5Jrxudk4quBUABhR4Dksaf6+KTn8sVz0NcN6s+dGFTjv\nr+ebMnKcJfp7VvNYhXXTIMyOjamivUFo/+adShTxAoGAE75DrWmazYhtg0aSbG5A\njWS7pz+SBdyUc97iB1ujOcyN2PX8b0Sb0P6YOCaUcz1rvnzfhzkTdADP/N7RyfhB\nfI3Qkm5ly4Q3zkn6epV7fKC3BVZa8H0oKnF8/tZHIeBxW74g79kCXrU2fveuQtXx\nCSXN+feYtaoFaMxD8TyDMjA=\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-l9rx8@user-form-3c193.iam.gserviceaccount.com",
//     "client_id": "102846254189213206463",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l9rx8%40user-form-3c193.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
//   }
  