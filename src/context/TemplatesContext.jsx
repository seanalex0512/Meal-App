import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

const TemplatesContext = createContext();

export function TemplatesProvider({ children }) {
  const { currentUser } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch templates from Firestore
  useEffect(() => {
    if (!currentUser) {
      setTemplates([]);
      setLoading(false);
      return;
    }

    const fetchTemplates = async () => {
      try {
        const templatesRef = collection(db, 'users', currentUser.uid, 'templates');
        const querySnapshot = await getDocs(templatesRef);
        const templatesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTemplates(templatesData);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [currentUser]);

  const saveTemplate = async (templateName, plan) => {
    if (!currentUser) return false;

    try {
      const templatesRef = collection(db, 'users', currentUser.uid, 'templates');
      const newTemplate = {
        name: templateName,
        plan: plan,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(templatesRef, newTemplate);
      setTemplates(prev => [...prev, { id: docRef.id, ...newTemplate }]);
      return true;
    } catch (error) {
      console.error('Error saving template:', error);
      return false;
    }
  };

  const deleteTemplate = async (templateId) => {
    if (!currentUser) return false;

    try {
      const templateRef = doc(db, 'users', currentUser.uid, 'templates', templateId);
      await deleteDoc(templateRef);
      setTemplates(prev => prev.filter(t => t.id !== templateId));
      return true;
    } catch (error) {
      console.error('Error deleting template:', error);
      return false;
    }
  };

  const updateTemplate = async (templateId, templateName, plan) => {
    if (!currentUser) return false;

    try {
      const templateRef = doc(db, 'users', currentUser.uid, 'templates', templateId);
      await updateDoc(templateRef, {
        name: templateName,
        plan: plan,
        updatedAt: new Date()
      });
      setTemplates(prev =>
        prev.map(t =>
          t.id === templateId
            ? { ...t, name: templateName, plan: plan, updatedAt: new Date() }
            : t
        )
      );
      return true;
    } catch (error) {
      console.error('Error updating template:', error);
      return false;
    }
  };

  const value = {
    templates,
    loading,
    saveTemplate,
    deleteTemplate,
    updateTemplate
  };

  return (
    <TemplatesContext.Provider value={value}>
      {children}
    </TemplatesContext.Provider>
  );
}

export function useTemplates() {
  return useContext(TemplatesContext);
}
