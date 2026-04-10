import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const missingDbMsg =
  "Firebase is not configured. Add all VITE_FIREBASE_* variables in Vercel (or .env locally) and redeploy.";

export const getSchedules = async () => {
  if (!db) throw new Error(missingDbMsg);
  const colRef = collection(db, "bus_schedules");
  const snap = await getDocs(colRef);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addSchedule = async (data: any) => {
  if (!db) throw new Error(missingDbMsg);
  const colRef = collection(db, "bus_schedules");
  await addDoc(colRef, data);
};

export const deleteSchedule = async (id: string) => {
  if (!db) throw new Error(missingDbMsg);
  await deleteDoc(doc(db, "bus_schedules", id));
};
