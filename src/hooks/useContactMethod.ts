
import { useState, useCallback } from 'react';

type ContactMethod = 'whatsapp' | 'email';

export const useContactMethod = () => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  
  // Add validation helpers
  const validateWhatsApp = useCallback(() => {
    return phoneNumber.length >= 10;
  }, [phoneNumber]);
  
  const validateEmail = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);
  
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
    validateEmail
  };
};
