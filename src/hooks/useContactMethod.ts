
import { useState } from 'react';

type ContactMethod = 'whatsapp' | 'email';

export const useContactMethod = () => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  
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
    isEmail: contactMethod === 'email'
  };
};
