import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/contact", data);
      setIsSuccess(true);
      reset();
      toast.success("Message sent successfully! I'll get back to you soon.");
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validation = {
    name: {
      required: "Name is required",
      minLength: { value: 2, message: "Name must be at least 2 characters" },
      maxLength: { value: 50, message: "Name is too long" },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email",
      },
    },
    subject: {
      required: "Subject is required",
      minLength: { value: 3, message: "Subject is too short" },
      maxLength: { value: 100, message: "Subject is too long" },
    },
    message: {
      required: "Message is required",
      minLength: {
        value: 20,
        message: "Message must be at least 20 characters",
      },
      maxLength: {
        value: 1000,
        message: "Message is too long (max 1000 chars)",
      },
    },
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isSuccess,
    validation,
  };
}
