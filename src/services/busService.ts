import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase/config";

const colRef = collection(db, "bus_schedules");

export const getSchedules = async () => {
  const snap = await getDocs(colRef);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addSchedule = async (data: any) => {
  await addDoc(colRef, data);
};

export const deleteSchedule = async (id: string) => {
  await deleteDoc(doc(db, "bus_schedules", id));
};
