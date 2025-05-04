
import { useState, useCallback } from 'react';

type ContactMethod = 'whatsapp' | 'email';

export const useContactMethod = () => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  
  // Enhanced validation helpers with better logging
  const validateWhatsApp = useCallback(() => {
    const isValid = phoneNumber.length >= 10;
    console.log(`WhatsApp validation: ${isValid ? 'PASSED' : 'FAILED'} - Phone number length: ${phoneNumber.length}`);
    return isValid;
  }, [phoneNumber]);
  
  const validateEmail = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log(`Email validation: ${isValid ? 'PASSED' : 'FAILED'} - Email: ${email}`);
    return isValid;
  }, [email]);
  
  // Add a function to reset fields when switching contact methods
  const resetFields = useCallback(() => {
    if (contactMethod === 'whatsapp') {
      setEmail('');
    } else {
      setPhoneNumber('');
    }
  }, [contactMethod]);

  // New function to check if the current form is valid based on selected contact method
  const isCurrentContactMethodValid = useCallback(() => {
    if (contactMethod === 'whatsapp') {
      return validateWhatsApp();
    } else {
      return validateEmail();
    }
  }, [contactMethod, validateWhatsApp, validateEmail]);
  
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
    isCurrentContactMethodValid
  };
};
