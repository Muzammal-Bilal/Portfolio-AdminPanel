import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as firebaseService from '../services/firebase.service';
import seedData from '../data/seedData';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState({
    settings: null,
    profile: null,
    about: null,
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
    contact: null,
    education: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load all data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if database is initialized
      const initialized = await firebaseService.isDatabaseInitialized();
      
      if (!initialized) {
        // Use seed data as fallback
        setData({
          settings: seedData.settings,
          profile: seedData.profile,
          about: seedData.about,
          experience: seedData.experience,
          projects: seedData.projects,
          skills: seedData.skills,
          certifications: seedData.certifications,
          contact: seedData.contact,
          education: seedData.education
        });
        setIsInitialized(false);
      } else {
        const portfolioData = await firebaseService.getAllPortfolioData();
        setData({
          settings: portfolioData.settings || seedData.settings,
          profile: portfolioData.profile || seedData.profile,
          about: portfolioData.about || seedData.about,
          experience: portfolioData.experience?.length ? portfolioData.experience : seedData.experience,
          projects: portfolioData.projects?.length ? portfolioData.projects : seedData.projects,
          skills: portfolioData.skills?.length ? portfolioData.skills : seedData.skills,
          certifications: portfolioData.certifications?.length ? portfolioData.certifications : seedData.certifications,
          contact: portfolioData.contact || seedData.contact,
          education: portfolioData.education?.length ? portfolioData.education : seedData.education
        });
        setIsInitialized(true);
      }
    } catch (err) {
      console.error('Error loading portfolio data:', err);
      setError(err.message);
      // Fall back to seed data on error
      setData({
        settings: seedData.settings,
        profile: seedData.profile,
        about: seedData.about,
        experience: seedData.experience,
        projects: seedData.projects,
        skills: seedData.skills,
        certifications: seedData.certifications,
        contact: seedData.contact,
        education: seedData.education
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Initialize database with seed data
  const initializeDatabase = async () => {
    try {
      setLoading(true);
      await firebaseService.initializeDatabase();
      await loadData();
      setIsInitialized(true);
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update functions for admin
  const updateSettings = async (newSettings) => {
    try {
      await firebaseService.setData('settings', newSettings);
      setData(prev => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProfile = async (newProfile) => {
    try {
      await firebaseService.setData('profile', newProfile);
      setData(prev => ({ ...prev, profile: { ...prev.profile, ...newProfile } }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateAbout = async (newAbout) => {
    try {
      await firebaseService.setData('about', newAbout);
      setData(prev => ({ ...prev, about: { ...prev.about, ...newAbout } }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateContact = async (newContact) => {
    try {
      await firebaseService.setData('contact', newContact);
      setData(prev => ({ ...prev, contact: { ...prev.contact, ...newContact } }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Experience CRUD
  const addExperience = async (experience) => {
    try {
      const newExp = await firebaseService.addToCollection('experience', {
        ...experience,
        order: data.experience.length
      });
      setData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
      return newExp;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateExperience = async (id, experience) => {
    try {
      await firebaseService.updateInCollection('experience', id, experience);
      setData(prev => ({
        ...prev,
        experience: prev.experience.map(exp => 
          exp.id === id ? { ...exp, ...experience } : exp
        )
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteExperience = async (id) => {
    try {
      await firebaseService.deleteFromCollection('experience', id);
      setData(prev => ({
        ...prev,
        experience: prev.experience.filter(exp => exp.id !== id)
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const reorderExperience = async (newOrder) => {
    try {
      await firebaseService.batchUpdateOrder('experience', newOrder);
      setData(prev => ({ ...prev, experience: newOrder }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Projects CRUD
  const addProject = async (project) => {
    try {
      const newProj = await firebaseService.addToCollection('projects', {
        ...project,
        order: data.projects.length
      });
      setData(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
      return newProj;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProject = async (id, project) => {
    try {
      await firebaseService.updateInCollection('projects', id, project);
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(proj => 
          proj.id === id ? { ...proj, ...project } : proj
        )
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      await firebaseService.deleteFromCollection('projects', id);
      setData(prev => ({
        ...prev,
        projects: prev.projects.filter(proj => proj.id !== id)
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const reorderProjects = async (newOrder) => {
    try {
      await firebaseService.batchUpdateOrder('projects', newOrder);
      setData(prev => ({ ...prev, projects: newOrder }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Skills CRUD
  const addSkillCategory = async (category) => {
    try {
      const newCat = await firebaseService.addToCollection('skills', {
        ...category,
        order: data.skills.length
      });
      setData(prev => ({ ...prev, skills: [...prev.skills, newCat] }));
      return newCat;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateSkillCategory = async (id, category) => {
    try {
      await firebaseService.updateInCollection('skills', id, category);
      setData(prev => ({
        ...prev,
        skills: prev.skills.map(cat => 
          cat.id === id ? { ...cat, ...category } : cat
        )
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteSkillCategory = async (id) => {
    try {
      await firebaseService.deleteFromCollection('skills', id);
      setData(prev => ({
        ...prev,
        skills: prev.skills.filter(cat => cat.id !== id)
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Certifications CRUD
  const addCertification = async (certification) => {
    try {
      const newCert = await firebaseService.addToCollection('certifications', {
        ...certification,
        order: data.certifications.length
      });
      setData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
      return newCert;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateCertification = async (id, certification) => {
    try {
      await firebaseService.updateInCollection('certifications', id, certification);
      setData(prev => ({
        ...prev,
        certifications: prev.certifications.map(cert => 
          cert.id === id ? { ...cert, ...certification } : cert
        )
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCertification = async (id) => {
    try {
      await firebaseService.deleteFromCollection('certifications', id);
      setData(prev => ({
        ...prev,
        certifications: prev.certifications.filter(cert => cert.id !== id)
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Education CRUD
  const addEducation = async (education) => {
    try {
      const newEdu = await firebaseService.addToCollection('education', {
        ...education,
        order: data.education.length
      });
      setData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
      return newEdu;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateEducation = async (id, education) => {
    try {
      await firebaseService.updateInCollection('education', id, education);
      setData(prev => ({
        ...prev,
        education: prev.education.map(edu => 
          edu.id === id ? { ...edu, ...education } : edu
        )
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteEducation = async (id) => {
    try {
      await firebaseService.deleteFromCollection('education', id);
      setData(prev => ({
        ...prev,
        education: prev.education.filter(edu => edu.id !== id)
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // File upload
  const uploadFile = async (file, path) => {
    try {
      return await firebaseService.uploadFile(file, path);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    ...data,
    loading,
    error,
    isInitialized,
    loadData,
    initializeDatabase,
    updateSettings,
    updateProfile,
    updateAbout,
    updateContact,
    addExperience,
    updateExperience,
    deleteExperience,
    reorderExperience,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    addCertification,
    updateCertification,
    deleteCertification,
    addEducation,
    updateEducation,
    deleteEducation,
    uploadFile
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
