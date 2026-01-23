import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import * as firebaseService from "../services/firebase.service";
import seedData from "../data/seedData";

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within a PortfolioProvider");
  return context;
};

const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getExt = (name) => {
  const parts = String(name || "").split(".");
  const ext = parts.length > 1 ? parts.pop() : "";
  return (ext || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
};

const buildSafePath = (baseFolder, file) => {
  // Unique + safe key; do NOT use raw file.name (spaces/collisions)
  const ext = getExt(file?.name);
  return `${baseFolder}/${makeId()}.${ext}`;
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
    education: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load all data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const initialized = await firebaseService.isDatabaseInitialized();

      if (!initialized) {
        setData({
          settings: seedData.settings,
          profile: seedData.profile,
          about: seedData.about,
          experience: seedData.experience,
          projects: seedData.projects,
          skills: seedData.skills,
          certifications: seedData.certifications,
          contact: seedData.contact,
          education: seedData.education,
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
          education: portfolioData.education?.length ? portfolioData.education : seedData.education,
        });
        setIsInitialized(true);
      }
    } catch (err) {
      console.error("Error loading portfolio data:", err);
      setError(err?.message || String(err));

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
        education: seedData.education,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Initialize database with seed data
  const initializeDatabase = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await firebaseService.initializeDatabase();
      await loadData();
      setIsInitialized(true);
      return true;
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadData]);

  // Update functions for admin
  const updateSettings = useCallback(async (newSettings) => {
    try {
      await firebaseService.setData("settings", newSettings);
      setData((prev) => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const updateProfile = useCallback(async (newProfile) => {
    try {
      // Important: write the entire newProfile, not just partial fields
      await firebaseService.setData("profile", newProfile);
      setData((prev) => ({ ...prev, profile: { ...prev.profile, ...newProfile } }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const updateAbout = useCallback(async (newAbout) => {
    try {
      await firebaseService.setData("about", newAbout);
      setData((prev) => ({ ...prev, about: { ...prev.about, ...newAbout } }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const updateContact = useCallback(async (newContact) => {
    try {
      await firebaseService.setData("contact", newContact);
      setData((prev) => ({ ...prev, contact: { ...prev.contact, ...newContact } }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  // Experience CRUD
  const addExperience = useCallback(async (experience) => {
    try {
      const newExp = await firebaseService.addToCollection("experience", {
        ...experience,
        order: data.experience.length,
      });
      setData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
      return newExp;
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, [data.experience.length]);

  const updateExperience = useCallback(async (id, experience) => {
    try {
      await firebaseService.updateInCollection("experience", id, experience);
      setData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, ...experience } : exp)),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const deleteExperience = useCallback(async (id) => {
    try {
      await firebaseService.deleteFromCollection("experience", id);
      setData((prev) => ({
        ...prev,
        experience: prev.experience.filter((exp) => exp.id !== id),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const reorderExperience = useCallback(async (newOrder) => {
    try {
      await firebaseService.batchUpdateOrder("experience", newOrder);
      setData((prev) => ({ ...prev, experience: newOrder }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  // Projects CRUD
  const addProject = useCallback(async (project) => {
    try {
      const newProj = await firebaseService.addToCollection("projects", {
        ...project,
        order: data.projects.length,
      });
      setData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
      return newProj;
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, [data.projects.length]);

  const updateProject = useCallback(async (id, project) => {
    try {
      await firebaseService.updateInCollection("projects", id, project);
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const deleteProject = useCallback(async (id) => {
    try {
      await firebaseService.deleteFromCollection("projects", id);
      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p.id !== id),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const reorderProjects = useCallback(async (newOrder) => {
    try {
      await firebaseService.batchUpdateOrder("projects", newOrder);
      setData((prev) => ({ ...prev, projects: newOrder }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  // Skills CRUD
  const addSkillCategory = useCallback(async (category) => {
    try {
      const newCat = await firebaseService.addToCollection("skills", {
        ...category,
        order: data.skills.length,
      });
      setData((prev) => ({ ...prev, skills: [...prev.skills, newCat] }));
      return newCat;
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, [data.skills.length]);

  const updateSkillCategory = useCallback(async (id, category) => {
    try {
      await firebaseService.updateInCollection("skills", id, category);
      setData((prev) => ({
        ...prev,
        skills: prev.skills.map((cat) => (cat.id === id ? { ...cat, ...category } : cat)),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const deleteSkillCategory = useCallback(async (id) => {
    try {
      await firebaseService.deleteFromCollection("skills", id);
      setData((prev) => ({
        ...prev,
        skills: prev.skills.filter((cat) => cat.id !== id),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  // Certifications CRUD
  const addCertification = useCallback(async (certification) => {
    try {
      const newCert = await firebaseService.addToCollection("certifications", {
        ...certification,
        order: data.certifications.length,
      });
      setData((prev) => ({ ...prev, certifications: [...prev.certifications, newCert] }));
      return newCert;
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, [data.certifications.length]);

  const updateCertification = useCallback(async (id, certification) => {
    try {
      await firebaseService.updateInCollection("certifications", id, certification);
      setData((prev) => ({
        ...prev,
        certifications: prev.certifications.map((c) => (c.id === id ? { ...c, ...certification } : c)),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const deleteCertification = useCallback(async (id) => {
    try {
      await firebaseService.deleteFromCollection("certifications", id);
      setData((prev) => ({
        ...prev,
        certifications: prev.certifications.filter((c) => c.id !== id),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  // Education CRUD
  const addEducation = useCallback(async (education) => {
    try {
      const newEdu = await firebaseService.addToCollection("education", {
        ...education,
        order: data.education.length,
      });
      setData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
      return newEdu;
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, [data.education.length]);

  const updateEducation = useCallback(async (id, education) => {
    try {
      await firebaseService.updateInCollection("education", id, education);
      setData((prev) => ({
        ...prev,
        education: prev.education.map((e) => (e.id === id ? { ...e, ...education } : e)),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  const deleteEducation = useCallback(async (id) => {
    try {
      await firebaseService.deleteFromCollection("education", id);
      setData((prev) => ({
        ...prev,
        education: prev.education.filter((e) => e.id !== id),
      }));
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  /**
   * File upload (critical fix)
   * - Ensures we pass a safe unique key if caller gives a "folder-like" path.
   * - Ensures the return value is a *download URL* usable by <img src> and PDF link.
   */
    const uploadFile = useCallback(async (file, pathOrFolder) => {
    try {
      // If caller passes "profile/uuid.png" keep it; if caller passes "profile" generate the filename.
      const raw = String(pathOrFolder || "uploads");
      const looksLikeFullPath = raw.includes("/") && raw.split("/").pop()?.includes(".");
      const path = looksLikeFullPath ? raw : buildSafePath(raw, file);

      const result = await firebaseService.uploadFile(file, path);

      // Your current firebase.service returns string URL, but support object too.
      const url =
        typeof result === "string"
          ? result
          : result?.url || result?.downloadURL;

      if (!url || !/^https?:\/\//i.test(url)) {
        throw new Error(
          "Upload succeeded but no public download URL was returned. Check Firebase Storage rules and ensure uploadFile returns getDownloadURL()."
        );
      }

      return url;
    } catch (err) {
      console.error("uploadFile failed:", err);
      setError(err?.message || String(err));
      throw err;
    }
  }, []);

  // Provide BOTH shapes: top-level + nested, so existing components don't break
  const value = useMemo(
    () => ({
      ...data,              // settings, profile, etc. as top-level props
      data,                 // also expose the whole object if any component expects data.profile
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

      uploadFile,
    }),
    [
      data,
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
      uploadFile,
    ]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};
