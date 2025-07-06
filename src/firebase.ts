import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length) {
  const credenciales = process.env.FIREBASE_CREDENCIALES || "No";

  if (credenciales === "No") throw new Error("FIREBASE_CREDENCIALES no está definida en el entorno.");

  const serviceAccount = JSON.parse(credenciales);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
