import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
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
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt:
        data.createdAt && typeof data.createdAt.toDate === 'function'
          ? data.createdAt.toDate().toISOString()
          : data.createdAt || null,
    };
  });
}

export async function updateApplicationInDb(id, updatedData) {
  const docRef = doc(db, APPLICATIONS_COLLECTION, id);
  await updateDoc(docRef, updatedData);
}

export async function deleteApplicationFromDb(id) {
  const docRef = doc(db, APPLICATIONS_COLLECTION, id);
  await deleteDoc(docRef);
}

export async function saveUserProfile(userId, profileData) {
  await setDoc(doc(db, 'users', userId), profileData, { merge: true });
}

export async function getUserProfile(userId) {
  const docSnap = await getDoc(doc(db, 'users', userId));
  return docSnap.exists() ? docSnap.data() : null;
}

