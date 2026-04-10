import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const adminCollection = collection(db, "admins");

export async function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const adminQuery = query(adminCollection, where("email", "==", email));
  const snapshot = await getDocs(adminQuery);
  return !snapshot.empty;
}

export async function registerAdminEmail(email: string) {
  await addDoc(adminCollection, {
    email,
    createdAt: serverTimestamp(),
  });
}
