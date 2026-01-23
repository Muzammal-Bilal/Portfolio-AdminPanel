import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../config/firebase";
import seedData from "../data/seedData";

// Collection names
const COLLECTIONS = {
  SETTINGS: "settings",
  PROFILE: "profile",
  ABOUT: "about",
  EXPERIENCE: "experience",
  PROJECTS: "projects",
  SKILLS: "skills",
  CERTIFICATIONS: "certifications",
  CONTACT: "contact",
  EDUCATION: "education",
};

// -------------------------
// Generic CRUD operations
// -------------------------
export const getData = async (collectionName, docId = "main") => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  // Standardize response: id + payload
  return { id: docSnap.id, ...docSnap.data() };
};

export const setData = async (collectionName, data, docId = "main") => {
  // Use merge so we don't accidentally blow away fields not present in payload
  const docRef = doc(db, collectionName, docId);
  await setDoc(
    docRef,
    { ...data, updatedAt: new Date().toISOString() },
    { merge: true }
  );
  return { id: docId, ...data };
};

export const updateData = async (collectionName, data, docId = "main") => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
  return { id: docId, ...data };
};

// -------------------------
// Collection operations
// -------------------------
export const getCollection = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (error) {
    console.error(`Error getting collection ${collectionName}:`, error);
    return [];
  }
};

export const addToCollection = async (collectionName, data) => {
  const docId = data.id || `${collectionName}_${Date.now()}`;
  const docRef = doc(db, collectionName, docId);

  await setDoc(docRef, {
    ...data,
    id: docId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return { id: docId, ...data };
};

export const updateInCollection = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
  return { id: docId, ...data };
};

export const deleteFromCollection = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
  return true;
};

// Batch update for reordering
export const batchUpdateOrder = async (collectionName, items) => {
  const batch = writeBatch(db);

  items.forEach((item, index) => {
    const docRef = doc(db, collectionName, item.id);
    batch.update(docRef, { order: index, updatedAt: new Date().toISOString() });
  });

  await batch.commit();
  return true;
};

// -------------------------
// File upload (hardened)
// -------------------------

// Optional: allow you to store both URL and storagePath in Firestore if you want.
// Your UI uses only URL, but for deletion/management, path is valuable.
export const uploadFile = async (file, path) => {
  if (!file) throw new Error("No file provided.");
  if (!path) throw new Error("No storage path provided.");

  try {
    const storageRef = ref(storage, path);

    // Attach content type; some browsers provide empty type for PDFs sometimes
    const metadata = {
      contentType: file.type || "application/octet-stream",
    };

    // Upload and get download URL
    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Return both (URL for UI, path for admin ops)
    return { url: downloadURL, path };
  } catch (error) {
    // This error will expose whether rules/auth are blocking you
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Deletion expects a storage path, NOT the download URL
export const deleteFile = async (path) => {
  if (!path) throw new Error("No storage path provided for delete.");

  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
  return true;
};

// -------------------------
// Specific data fetchers
// -------------------------
export const getSettings = () => getData(COLLECTIONS.SETTINGS);
export const getProfile = () => getData(COLLECTIONS.PROFILE);
export const getAbout = () => getData(COLLECTIONS.ABOUT);
export const getContact = () => getData(COLLECTIONS.CONTACT);
export const getExperience = () => getCollection(COLLECTIONS.EXPERIENCE);
export const getProjects = () => getCollection(COLLECTIONS.PROJECTS);
export const getSkills = () => getCollection(COLLECTIONS.SKILLS);
export const getCertifications = () => getCollection(COLLECTIONS.CERTIFICATIONS);
export const getEducation = () => getCollection(COLLECTIONS.EDUCATION);

// Fetch all portfolio data at once
export const getAllPortfolioData = async () => {
  const [
    settings,
    profile,
    about,
    experience,
    projects,
    skills,
    certifications,
    contact,
    education,
  ] = await Promise.all([
    getSettings(),
    getProfile(),
    getAbout(),
    getExperience(),
    getProjects(),
    getSkills(),
    getCertifications(),
    getContact(),
    getEducation(),
  ]);

  return {
    settings,
    profile,
    about,
    experience,
    projects,
    skills,
    certifications,
    contact,
    education,
  };
};

// Initialize database with seed data
export const initializeDatabase = async () => {
  const batch = writeBatch(db);

  const settingsRef = doc(db, COLLECTIONS.SETTINGS, "main");
  batch.set(settingsRef, { ...seedData.settings, updatedAt: new Date().toISOString() });

  const profileRef = doc(db, COLLECTIONS.PROFILE, "main");
  batch.set(profileRef, { ...seedData.profile, updatedAt: new Date().toISOString() });

  const aboutRef = doc(db, COLLECTIONS.ABOUT, "main");
  batch.set(aboutRef, { ...seedData.about, updatedAt: new Date().toISOString() });

  const contactRef = doc(db, COLLECTIONS.CONTACT, "main");
  batch.set(contactRef, { ...seedData.contact, updatedAt: new Date().toISOString() });

  await batch.commit();

  for (const exp of seedData.experience) await addToCollection(COLLECTIONS.EXPERIENCE, exp);
  for (const proj of seedData.projects) await addToCollection(COLLECTIONS.PROJECTS, proj);
  for (const skill of seedData.skills) await addToCollection(COLLECTIONS.SKILLS, skill);
  for (const cert of seedData.certifications) await addToCollection(COLLECTIONS.CERTIFICATIONS, cert);
  for (const edu of seedData.education) await addToCollection(COLLECTIONS.EDUCATION, edu);

  console.log("Database initialized with seed data");
  return true;
};

// Check if database is initialized
export const isDatabaseInitialized = async () => {
  try {
    const profile = await getProfile();
    return profile !== null;
  } catch {
    return false;
  }
};

export { COLLECTIONS };
