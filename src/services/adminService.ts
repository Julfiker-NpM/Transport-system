import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export async function isAdminEmail(email: string | null | undefined) {
  if (!email || !db) return false;
  const adminCollection = collection(db, "admins");
  const adminQuery = query(adminCollection, where("email", "==", email));
  const snapshot = await getDocs(adminQuery);
  return !snapshot.empty;
}

export async function registerAdminEmail(email: string) {
  if (!db) {
    throw new Error(
      "Firebase is not configured. Add VITE_FIREBASE_* variables and redeploy."
    );
  }
  const adminCollection = collection(db, "admins");
  await addDoc(adminCollection, {
    email,
    createdAt: serverTimestamp(),
  });
}
