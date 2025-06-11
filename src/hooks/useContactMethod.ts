
import { useState, useCallback, useEffect } from 'react';

type ContactMethod = 'whatsapp' | 'email';

export const useContactMethod = () => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Changed default to US
  const [formInitialized, setFormInitialized] = useState(false);
  
  // Enhanced validation helpers with better logging and simpler logic
  const validateWhatsApp = useCallback(() => {
    // Don't validate empty phone numbers until the form has been interacted with
    if (!formInitialized) return true;
    
    // Consider validation successful if phone number meets minimum length
    const isValid = phoneNumber.length >= 10;
    console.log(`WhatsApp validation: ${isValid ? 'PASSED' : 'FAILED'} - Phone number length: ${phoneNumber.length}`);
    return isValid;
  }, [phoneNumber, formInitialized]);
  
  const validateEmail = useCallback(() => {
    // Don't validate empty emails until the form has been interacted with
    if (!formInitialized) return true;
    
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log(`Email validation: ${isValid ? 'PASSED' : 'FAILED'} - Email: ${email}`);
    return isValid;
  }, [email, formInitialized]);
  
  // Add a function to reset fields when switching contact methods
  const resetFields = useCallback(() => {
    if (contactMethod === 'whatsapp') {
      setEmail('');
    } else {
      setPhoneNumber('');
    }
  }, [contactMethod]);

  // Mark form as initialized once user interacts with it
  const initializeForm = useCallback(() => {
    if (!formInitialized) {
      console.log("Form initialized - validation will start applying");
      setFormInitialized(true);
    }
  }, [formInitialized]);

  // New function to check if the current form is valid based on selected contact method
  const isCurrentContactMethodValid = useCallback(() => {
    // If form isn't initialized yet, don't apply validation
    if (!formInitialized) return true;
    
    // Apply the appropriate validation based on contact method
    if (contactMethod === 'whatsapp') {
      return validateWhatsApp();
    } else {
      return validateEmail();
    }
  }, [contactMethod, validateWhatsApp, validateEmail, formInitialized]);
  
  return {
    contactMethod,
    setContactMethod,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    countryCode,
    setCountryCode,
    isWhatsApp: contactMethod === 'whatsapp',
    isEmail: contactMethod === 'email',
    validateWhatsApp,
    validateEmail,
    resetFields,
    isCurrentContactMethodValid,
    initializeForm,
    formInitialized
  };
};
