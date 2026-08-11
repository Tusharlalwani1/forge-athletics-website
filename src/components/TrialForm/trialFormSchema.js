// Validation schema and helper functions for Free Trial Signup Form

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase().trim());
};

export const validatePhone = (phone) => {
  // Strip non-digit characters for basic length check
  const digitsOnly = String(phone).replace(/\D/g, '');
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'fullName':
      if (!value || !String(value).trim()) {
        return 'Full name is required.';
      }
      if (String(value).trim().length < 2) {
        return 'Please enter your full name.';
      }
      return '';

    case 'email':
      if (!value || !String(value).trim()) {
        return 'Email address is required.';
      }
      if (!validateEmail(value)) {
        return 'Please enter a valid email address (e.g. name@example.com).';
      }
      return '';

    case 'phone':
      if (!value || !String(value).trim()) {
        return 'Phone number is required.';
      }
      if (!validatePhone(value)) {
        return 'Please enter a valid phone number (at least 10 digits).';
      }
      return '';

    case 'consent':
      if (!value) {
        return 'You must agree to the contact terms to continue.';
      }
      return '';

    default:
      return '';
  }
};

export const validateForm = (formData) => {
  const errors = {};
  
  const nameError = validateField('fullName', formData.fullName);
  if (nameError) errors.fullName = nameError;

  const emailError = validateField('email', formData.email);
  if (emailError) errors.email = emailError;

  const phoneError = validateField('phone', formData.phone);
  if (phoneError) errors.phone = phoneError;

  const consentError = validateField('consent', formData.consent);
  if (consentError) errors.consent = consentError;

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
};
