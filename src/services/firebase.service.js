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
  writeBatch
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';
import seedData from '../data/seedData';

// Collection names
const COLLECTIONS = {
  SETTINGS: 'settings',
  PROFILE: 'profile',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CERTIFICATIONS: 'certifications',
  CONTACT: 'contact',
  EDUCATION: 'education'
};

// Generic CRUD operations
export const getData = async (collectionName, docId = 'main') => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error getting ${collectionName}:`, error);
    throw error;
  }
};

export const setData = async (collectionName, data, docId = 'main') => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return { id: docId, ...data };
  } catch (error) {
    console.error(`Error setting ${collectionName}:`, error);
    throw error;
  }
};

export const updateData = async (collectionName, data, docId = 'main') => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
    return { id: docId, ...data };
  } catch (error) {
    console.error(`Error updating ${collectionName}:`, error);
    throw error;
  }
};

// Collection operations (for arrays like experience, projects, etc.)
export const getCollection = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting collection ${collectionName}:`, error);
    // Return empty array on error (collection might not exist yet)
    return [];
  }
};

export const addToCollection = async (collectionName, data) => {
  try {
    const docId = data.id || `${collectionName}_${Date.now()}`;
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, { 
      ...data, 
      id: docId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString() 
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error(`Error adding to ${collectionName}:`, error);
    throw error;
  }
};

export const updateInCollection = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
    return { id: docId, ...data };
  } catch (error) {
    console.error(`Error updating in ${collectionName}:`, error);
    throw error;
  }
};

export const deleteFromCollection = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting from ${collectionName}:`, error);
    throw error;
  }
};

// Batch update for reordering
export const batchUpdateOrder = async (collectionName, items) => {
  try {
    const batch = writeBatch(db);
    
    items.forEach((item, index) => {
      const docRef = doc(db, collectionName, item.id);
      batch.update(docRef, { order: index });
    });
    
    await batch.commit();
    return true;
  } catch (error) {
    console.error(`Error batch updating ${collectionName}:`, error);
    throw error;
  }
};

// File upload
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Specific data fetchers for public site
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
  try {
    const [settings, profile, about, experience, projects, skills, certifications, contact, education] = await Promise.all([
      getSettings(),
      getProfile(),
      getAbout(),
      getExperience(),
      getProjects(),
      getSkills(),
      getCertifications(),
      getContact(),
      getEducation()
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
      education
    };
  } catch (error) {
    console.error('Error fetching all portfolio data:', error);
    throw error;
  }
};

// Initialize database with seed data
export const initializeDatabase = async () => {
  try {
    const batch = writeBatch(db);
    
    // Set single documents
    const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'main');
    batch.set(settingsRef, { ...seedData.settings, updatedAt: new Date().toISOString() });
    
    const profileRef = doc(db, COLLECTIONS.PROFILE, 'main');
    batch.set(profileRef, { ...seedData.profile, updatedAt: new Date().toISOString() });
    
    const aboutRef = doc(db, COLLECTIONS.ABOUT, 'main');
    batch.set(aboutRef, { ...seedData.about, updatedAt: new Date().toISOString() });
    
    const contactRef = doc(db, COLLECTIONS.CONTACT, 'main');
    batch.set(contactRef, { ...seedData.contact, updatedAt: new Date().toISOString() });
    
    await batch.commit();
    
    // Add collection items
    for (const exp of seedData.experience) {
      await addToCollection(COLLECTIONS.EXPERIENCE, exp);
    }
    
    for (const proj of seedData.projects) {
      await addToCollection(COLLECTIONS.PROJECTS, proj);
    }
    
    for (const skill of seedData.skills) {
      await addToCollection(COLLECTIONS.SKILLS, skill);
    }
    
    for (const cert of seedData.certifications) {
      await addToCollection(COLLECTIONS.CERTIFICATIONS, cert);
    }
    
    for (const edu of seedData.education) {
      await addToCollection(COLLECTIONS.EDUCATION, edu);
    }
    
    console.log('Database initialized with seed data');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Check if database is initialized
export const isDatabaseInitialized = async () => {
  try {
    const profile = await getProfile();
    return profile !== null;
  } catch (error) {
    return false;
  }
};

export { COLLECTIONS };
