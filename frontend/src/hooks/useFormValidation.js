import { useState, useCallback } from "react";

const useFormValidation = (initialValues, validateFunction) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  // Validate all form fields
  const validateForm = useCallback(() => {
    const validationErrors = validateFunction(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [values, validateFunction]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validateForm,
    resetForm,
    setValues,
    setErrors,
  };
};

export default useFormValidation;
