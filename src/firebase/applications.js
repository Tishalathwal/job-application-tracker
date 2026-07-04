import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

const APPLICATIONS_COLLECTION = 'applications';

export async function addApplicationToDb(userId, applicationData) {
  const docRef = await addDoc(collection(db, APPLICATIONS_COLLECTION), {
    ...applicationData,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getApplicationsFromDb(userId) {
  const q = query(
    collection(db, APPLICATIONS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function updateApplicationInDb(id, updatedData) {
  const docRef = doc(db, APPLICATIONS_COLLECTION, id);
  await updateDoc(docRef, updatedData);
}

export async function deleteApplicationFromDb(id) {
  const docRef = doc(db, APPLICATIONS_COLLECTION, id);
  await deleteDoc(docRef);
}