
import { useState } from 'react';

type ContactMethod = 'whatsapp' | 'email';

export const useContactMethod = () => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [email, setEmail] = useState('');
  
  return {
    contactMethod,
    setContactMethod,
    email,
    setEmail,
    isWhatsApp: contactMethod === 'whatsapp',
    isEmail: contactMethod === 'email'
  };
};
