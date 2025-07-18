"use client"

import { useState, useEffect } from "react"
import emailjs from "@emailjs/browser"
import { GraduationCap, Handshake, Briefcase, Rocket } from "lucide-react"
import Phone from "./assets/phone.png" 
import Venue from "./assets/location.png";
import Mail from "./assets/envelope-alt.png";
import View from "./assets/h.PNG";

import "./App.css"

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sectionsLoading, setSectionsLoading] = useState({
    hero: true,
    about: true,
    services: true,
    courses: true,
    contact: true,
  })

  // Error States
  const [error, setError] = useState(null)
  const [networkError, setNetworkError] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [retryCount, setRetryCount] = useState(0)

  // Application State
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [applicationData, setApplicationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    experience: "",
    track: "",
    portfolio: "",
    motivation: "",
    availability: "",
  })
  const [applicationErrors, setApplicationErrors] = useState({})
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false)
  const [applicationSuccess, setApplicationSuccess] = useState(false)

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    ADMIN_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID,
    USER_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID,
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  }


  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  }, [])

  // Course data
  const courses = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M13 16.5a11 11 0 0 0 4.041 3.93l1.459.82v.25h-13v-.25l1.459-.82A11 11 0 0 0 11 16.5m-9.5-3h21m0-11h-21v14h21z" strokeWidth="1"/></svg>
      ),
      title: "Basic Computer Literacy",
      description:
        "Learn essential computer skills, from navigating operating systems to using basic productivity tools and the internet.",
      level: "Beginner",
      duration: "6 weeks",
      features: [
        "Computer Basics",
        "File & Folder Management",
        "Email & Internet Use",
        "Microsoft Office Tools"
      ],
      category: "Basic Computer Literacy"
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 13.146c-1.573 0-2.854 1.281-2.854 2.854s1.281 2.854 2.854 2.854s2.854-1.281 2.854-2.854s-1.281-2.854-2.854-2.854m-7.99 8.526l-.63-.156C2.692 20.328 0 18.318 0 15.995s2.693-4.333 7.38-5.521l.63-.156l.177.625a31.4 31.4 0 0 0 1.818 4.771l.135.281l-.135.286a31 31 0 0 0-1.818 4.771zm-.921-9.74c-3.563 1-5.75 2.536-5.75 4.063s2.188 3.057 5.75 4.063a33 33 0 0 1 1.578-4.063a33 33 0 0 1-1.578-4.063m16.901 9.74l-.177-.625a31 31 0 0 0-1.818-4.766l-.135-.286l.135-.286a31 31 0 0 0 1.818-4.771l.177-.62l.63.156c4.688 1.188 7.38 3.198 7.38 5.521s-2.693 4.333-7.38 5.521zm-.657-5.677a32.5 32.5 0 0 1 1.578 4.063c3.568-1.005 5.75-2.536 5.75-4.063s-2.188-3.057-5.75-4.063a34 34 0 0 1-1.578 4.063M7.078 11.927l-.177-.625C5.583 6.656 5.984 3.323 8 2.161c1.979-1.141 5.151.208 8.479 3.625l.453.464l-.453.464a31.5 31.5 0 0 0-3.229 3.958l-.182.255l-.313.026a31.6 31.6 0 0 0-5.047.813zm2.531-8.838c-.359 0-.677.073-.943.229c-1.323.766-1.557 3.422-.646 7.005a33 33 0 0 1 4.313-.672a33 33 0 0 1 2.734-3.391c-2.078-2.026-4.047-3.172-5.458-3.172zm12.787 27.145q-.008 0 0 0c-1.901 0-4.344-1.427-6.875-4.031l-.453-.464l.453-.464a31.5 31.5 0 0 0 3.229-3.958l.177-.255l.313-.031a30.7 30.7 0 0 0 5.052-.813l.63-.156l.177.625c1.318 4.646.917 7.974-1.099 9.135a3.1 3.1 0 0 1-1.604.411zm-5.464-4.505c2.078 2.026 4.047 3.172 5.458 3.172h.005c.354 0 .672-.078.938-.229c1.323-.766 1.563-3.422.646-7.005a33 33 0 0 1-4.313.667a33 33 0 0 1-2.734 3.396zm7.99-13.802l-.63-.161a32 32 0 0 0-5.052-.813l-.313-.026l-.177-.255a31.5 31.5 0 0 0-3.229-3.958l-.453-.464l.453-.464c3.328-3.417 6.5-4.766 8.479-3.625c2.016 1.161 2.417 4.495 1.099 9.141zm-5.255-2.276a33 33 0 0 1 4.313.672c.917-3.583.677-6.24-.646-7.005c-1.318-.76-3.797.406-6.401 2.943a34 34 0 0 1 2.734 3.391zM9.609 30.234c-.563.01-1.12-.13-1.609-.411c-2.016-1.161-2.417-4.49-1.099-9.135l.177-.625l.63.156c1.542.391 3.24.661 5.047.813l.313.031l.177.255a31.5 31.5 0 0 0 3.229 3.958l.453.464l-.453.464c-2.526 2.604-4.969 4.031-6.865 4.031zm-1.588-8.567c-.917 3.583-.677 6.24.646 7.005c1.318.75 3.792-.406 6.401-2.943a33 33 0 0 1-2.734-3.396a32.5 32.5 0 0 1-4.313-.667zm7.979.838c-1.099 0-2.224-.047-3.354-.141l-.313-.026l-.182-.26a40 40 0 0 1-1.797-2.828a40 40 0 0 1-1.557-2.969l-.135-.286l.135-.286a40.5 40.5 0 0 1 3.354-5.797l.182-.26l.313-.026a40 40 0 0 1 6.708 0l.313.026l.182.26a40 40 0 0 1 3.354 5.797l.135.286l-.135.286a39.6 39.6 0 0 1-3.354 5.797l-.182.26l-.313.026a41 41 0 0 1-3.354.141m-2.927-1.448c1.969.151 3.885.151 5.859 0a39 39 0 0 0 2.927-5.063a37.5 37.5 0 0 0-2.932-5.063a38 38 0 0 0-5.854 0a37 37 0 0 0-2.932 5.063a38.6 38.6 0 0 0 2.932 5.063"/></svg>
      ),
      title: "Frontend Development",
      description:
        "Build responsive, interactive user interfaces using modern frameworks. Learn HTML, CSS, JavaScript, and real-world design practices.",
      level: "Beginner to Advanced",
      duration: "16 weeks",
      features: ["React & Vue.js", "Responsive Design", "JavaScript ES6+", "Modern CSS"],
      instructor: "Sarah Johnson",
      students: 2847,
      rating: 4.9,
      category: "Frontend Development",
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 32 32"><defs><radialGradient id="vscodeIconsFileTypeBat0" cx="22.737" cy="22.737" r="3.628" gradientTransform="rotate(-81.5 21.8 23.545)scale(1 1.071)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#bedcdc"/><stop offset=".5" stopColor="#8e9e9e" stop-opacity="0.74"/><stop offset="1" stopColor="#404f5c" stop-opacity="0.84"/></radialGradient><radialGradient id="vscodeIconsFileTypeBat1" cx="11.336" cy="11.336" r="5.201" gradientTransform="rotate(-81.5 10.869 11.738)scale(1 1.071)" href="#vscodeIconsFileTypeBat0"/></defs><path fill="#ffff" d="m24.811 27.318l2.404-2.404l1.202 2.404l-1.202 1.202zm-3.847.125h3.401l-.85 2.55h-1.7zm-2.807-2.632l2.404 2.404l-2.404 1.202l-1.203-1.202zm-.125-3.847v3.401l-2.55-.85v-1.7zm2.632-2.807l-2.404 2.404l-1.202-2.404l1.202-1.203zm3.846-.125h-3.4l.85-2.55h1.7zm2.808 2.632l-2.404-2.404l2.404-1.202l1.202 1.202zm.125 3.846v-3.4l2.55.85v1.7z"/><path fill="#ffff" d="M27.776 22.737a5.039 5.039 0 1 1-1.476-3.562a5.02 5.02 0 0 1 1.476 3.562m-5.039-1.9a1.9 1.9 0 1 0 1.344.557a1.9 1.9 0 0 0-1.344-.557"/><path fill="#ffff" d="M22.656 18.074a4.664 4.664 0 1 0 4.744 4.582a4.664 4.664 0 0 0-4.744-4.582m.15 8.61a3.947 3.947 0 1 1 3.877-4.015a3.947 3.947 0 0 1-3.877 4.015"/><path fill="url(#vscodeIconsFileTypeBat0)" d="M22.674 19.11a3.628 3.628 0 1 0 3.69 3.564a3.63 3.63 0 0 0-3.69-3.564m.1 5.7a2.073 2.073 0 1 1 2.037-2.11a2.073 2.073 0 0 1-2.037 2.11"/><path fill="#ffff" d="M22.7 20.665a2.073 2.073 0 1 0 2.11 2.035a2.073 2.073 0 0 0-2.11-2.035m.067 3.826a1.754 1.754 0 1 1 1.723-1.784a1.754 1.754 0 0 1-1.722 1.784Z"/><path fill="#ffff" d="m6.563 16.976l2.275 1.262l-1.464 1.568l-1.365-.757zm-2.181-3.142l1.34 2.23l-2.052.626l-.804-1.338zm-.317-3.811l.045 2.601l-2.09-.484l-.027-1.561zm1.631-3.46L4.434 8.838L2.866 7.374l.757-1.365zm3.142-2.181l-2.23 1.34l-.626-2.052l1.338-.804zm3.812-.317l-2.602.045l.484-2.09l1.561-.027zm3.459 1.631l-2.275-1.262l1.464-1.568l1.365.757zm2.181 3.142l-1.34-2.23l2.052-.626l.804 1.338zm.317 3.812l-.045-2.602l2.09.484l.027 1.561zm-1.631 3.459l1.262-2.275l1.568 1.464l-.757 1.365zm-3.142 2.181l2.23-1.34l.626 2.052l-1.338.804zm-3.811.317l2.601-.045l-.484 2.09l-1.561.027z"/><path fill="#ffff" d="M11.467 18.831a7.5 7.5 0 1 1 5.261-2.288a7.47 7.47 0 0 1-5.261 2.288m2.682-7.544a2.814 2.814 0 1 0-.789 2a2.8 2.8 0 0 0 .789-2"/><path fill="#ffff" d="M11.218 4.6a6.737 6.737 0 1 0 6.854 6.619A6.737 6.737 0 0 0 11.218 4.6m.217 12.436a5.7 5.7 0 1 1 5.6-5.8a5.7 5.7 0 0 1-5.599 5.8Z"/><path fill="url(#vscodeIconsFileTypeBat1)" d="M11.245 6.136a5.2 5.2 0 1 0 5.29 5.109a5.2 5.2 0 0 0-5.29-5.109m.14 8.036a2.837 2.837 0 1 1 2.787-2.886a2.837 2.837 0 0 1-2.786 2.886Z"/><path fill="#ffff" d="M11.282 8.227a3.109 3.109 0 1 0 3.163 3.055a3.11 3.11 0 0 0-3.163-3.055m.1 5.74a2.631 2.631 0 1 1 2.585-2.677a2.63 2.63 0 0 1-2.585 2.677"/></svg>
      ),
      title: "Backend Development",
      description:
        "Create robust APIs and server-side applications. Learn database design, authentication, and cloud deployment.",
      level: "Intermediate",
      duration: "14 weeks",
      features: ["Node.js & Python", "Database Design", "API Development", "Cloud Services"],
      category: "Backend Development",
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16"><path fill="currentColor" d="M14.25 2.1a1.25 1.25 0 0 0-1.17-.1L6.91 4.43a1.2 1.2 0 0 1-.46.09H2.5a1.25 1.25 0 0 0-1.25 1.25v.1H0v3h1.25V9a1.25 1.25 0 0 0 1.25 1.22L4 13.4a1.26 1.26 0 0 0 1.13.72h.63A1.25 1.25 0 0 0 7 12.87v-2.53l6.08 2.43a1.3 1.3 0 0 0 .47.09a1.3 1.3 0 0 0 .7-.22a1.25 1.25 0 0 0 .55-1V3.13a1.25 1.25 0 0 0-.55-1.03m-8.5 3.67V9H2.5V5.77zm0 7.1h-.63l-1.23-2.65h1.86zm1.62-3.72A2.3 2.3 0 0 0 7 9V5.7a2.3 2.3 0 0 0 .37-.11l6.18-2.46v8.48zm7.46-3.03v2.5a1.25 1.25 0 0 0 0-2.5"/></svg>
      ),
      title: "Digital Marketing",
      description:
        "Learn to run effective ad campaigns and manage client strategies on platforms like Facebook and Instagram.",
      level: "Beginner",
      duration: "12 weeks",
      features: ["Paid Ad Campaigns", "Audience Targeting", "Content Strategy", "Performance Analytics"],
      instructor: "Lisa Park",
      students: 3241,
      rating: 4.8,
      category: "Digital Marketing"
    },

    {
      id: 5,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M19 32c-7.732 0-14-6.268-14-14S11.268 4 19 4s14 6.268 14 14"/><path d="M44 18H18v26h26z"/></g></svg>
      ),
      title: "Graphic Design",
      description:
        "Learn the fundamentals of visual design and create compelling graphics using modern tools and techniques.",
      level: "Beginner to Intermediate",
      duration: "10 weeks",
      features: [
        "Design Principles",
        "Typography & Color",
        "Adobe Tools",
        "Real-world Projects"
      ],
      category: "Graphic Design"
    },

    {
      id: 6,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="M.5.5v13h13"/><path d="M3.5 6.5L6 9l4-6l3.5 2.5"/></g></svg>
      ),
      title: "Data Analysis",
      description:
        "Learn to collect, clean, and analyze data using tools like Excel and Python. Gain insights through visualization and basic statistics.",
      level: "Beginner to Intermediate",
      duration: "10 weeks",
      features: [
        "Data Cleaning",
        "Excel & Python",
        "Data Visualization",
        "Statistical Analysis"
      ],
      category: "Data & Analytics"
    }

  ]

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "Who is eligible to join the training?",
      answer:
        "Our programs are open to beginners who are passionate about starting a career in tech. You don’t need prior experience — just a laptop, internet access, and the commitment to learn.",
    },
    {
      id: 2,
      question: "Is the program online or physical?",
      answer:
        "It’s a hybrid program — combining virtual classes with occasional physical workshops and events.",
    },
    {
      id: 3,
      question: "Will I receive a certificate after completing the program?",
      answer:
        "Yes, participants who successfully complete the program will receive a certificate of completion, recognizing their skills and readiness for entry-level tech roles.",
    },
    {
      id: 4,
      question: "What tracks can I participate in?",
      answer:
        "We offer six specialized tracks: Frontend Development, Backend Development, Graphic Design, Data Analysis, Digital Marketing, and Basic Computer Literacy. Each track is designed to take beginners through practical, skill-based training that prepares them for entry-level roles in the tech industry.",
    },
    {
      id: 5,
      question: "Do I need prior experience in tech to apply?",
      answer:
        "No prior experience is required. Our training is designed for complete beginners, so as long as you're willing to learn and can commit to the program, you're eligible to apply.",
    },
    {
      id: 6,
      question: "Can I participate in more than one track?",
      answer:
        "While we encourage specialization for maximum impact, exceptional candidates may be considered for a dual-track program. This requires demonstrating strong foundational skills in both areas and committing to additional time requirements.",
    },
    {
      id: 7,
      question: "Is the training program free?",
      answer:
        "No, the program is paid. We offer affordable pricing with flexible payment plans to make the training accessible.",
    },
  ]

  // FAQ State
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (faqId) => {
    setOpenFaq(openFaq === faqId ? null : faqId)
  }

// EmailJS Functions
const sendAdminNotification = async (applicationData) => {
  try {
    const adminTemplateParams = {
      to_email: "mushaktechventures@gmail.com",
      company_name: "Mushak Tech Ventures",
      applicant_name: `${applicationData.firstName} ${applicationData.lastName}`,
      applicant_email: applicationData.email,
      applicant_phone: applicationData.phone,
      applicant_country: applicationData.country,
      experience_level: applicationData.experience,
      selected_track: applicationData.track,
      portfolio_url: applicationData.portfolio || "Not provided",
      motivation: applicationData.motivation,
      availability: applicationData.availability,
      application_date: new Date().toLocaleDateString(),
      application_time: new Date().toLocaleTimeString(),
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.ADMIN_TEMPLATE_ID,
      adminTemplateParams,
    )

    return { success: true, result }
  } catch (error) {
    console.error("Error sending admin notification:", error)
    throw error
  }
}

const sendUserConfirmation = async (applicationData) => {
  try {
    const userTemplateParams = {
      to_email: applicationData.email,
      user_name: applicationData.firstName,
      selected_track: applicationData.track,
      application_date: new Date().toLocaleDateString(),
      company_name: "Mushak Tech Ventures",
      support_email: "mushaktechventures@gmail.com",
      full_name: `${applicationData.firstName} ${applicationData.lastName}`,
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.USER_TEMPLATE_ID,
      userTemplateParams
    )

    return { success: true, result }
  } catch (error) {
    console.error("Error sending user confirmation:", error)
    throw error
  }
}

const sendContactFormEmail = async (formData) => {
  try {
    const contactTemplateParams = {
      to_email: "mushaktechventures@gmail.com",
      applicant_name: `${formData.firstName} ${formData.lastName}`,
      applicant_email: formData.email,
      motivation: formData.message,
      contact_date: new Date().toLocaleDateString(),
      contact_time: new Date().toLocaleTimeString(),
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.ADMIN_TEMPLATE_ID,
      contactTemplateParams,
    )

    return { success: true, result }
  } catch (error) {
    console.error("Error sending contact form email:", error)
    throw error
  }
}

  // Error Handling Functions
  const handleError = (error, context = "general") => {
    console.error(`Error in ${context}:`, error)

    if (error.name === "NetworkError" || error.message.includes("fetch")) {
      setNetworkError(true)
      setError({
        type: "network",
        title: "Connection Problem",
        message: "Unable to connect to our servers. Please check your internet connection and try again.",
        action: "retry",
      })
    } else if (error.status === 404) {
      setError({
        type: "notFound",
        title: "Page Not Found",
        message: "The page you're looking for doesn't exist or has been moved.",
        action: "home",
      })
    } else if (error.status === 500) {
      setError({
        type: "server",
        title: "Server Error",
        message: "Something went wrong on our end. Our team has been notified and is working on a fix.",
        action: "retry",
      })
    } else if (context === "email") {
      setError({
        type: "email",
        title: "Email Service Error",
        message: "There was an issue sending the email. Please try again or contact us directly.",
        action: "retry",
      })
    } else {
      setError({
        type: "general",
        title: "Something Went Wrong",
        message: error.message || "An unexpected error occurred. Please try again.",
        action: "retry",
      })
    }
  }

  const clearError = () => {
    setError(null)
    setNetworkError(false)
    setFormErrors({})
  }

  const retryOperation = async () => {
    clearError()
    setRetryCount((prev) => prev + 1)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(true)
    } catch (error) {
      handleError(error, "retry")
    }
  }

  // Form Validation
  const validateForm = (data, type = "contact") => {
    const errors = {}

    if (type === "contact") {
      if (!data.firstName?.trim()) {
        errors.firstName = "First name is required"
      }
      if (!data.lastName?.trim()) {
        errors.lastName = "Last name is required"
      }
      if (!data.email?.trim()) {
        errors.email = "Email is required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Please enter a valid email address"
      }
      if (!data.message?.trim()) {
        errors.message = "Message is required"
      } else if (data.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters long"
      }
    }

    return errors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    clearError()

    const errors = validateForm(formData, "contact")
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    try {
      await sendContactFormEmail(formData)
      alert("Thank you for your message! We'll get back to you soon.")
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      })
    } catch (error) {
      handleError(error, "email")
      alert(
        "Sorry, there was an error sending your message. Please try again or contact us directly at mushaktechventures@gmail.com",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Application Functions
  const openApplicationModal = (track = null) => {
    setSelectedTrack(track)
    setApplicationData((prev) => ({
      ...prev,
      track: track ? track.category : "",
    }))
    setShowApplicationModal(true)
    setApplicationSuccess(false)
    setApplicationErrors({})
  }

  const closeApplicationModal = () => {
    setShowApplicationModal(false)
    setSelectedTrack(null)
    setApplicationData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      experience: "",
      track: "",
      portfolio: "",
      motivation: "",
      availability: "",
    })
    setApplicationErrors({})
    setApplicationSuccess(false)
  }

  const validateApplicationForm = (data) => {
    const errors = {}

    if (!data.firstName?.trim()) {
      errors.firstName = "First name is required"
    }
    if (!data.lastName?.trim()) {
      errors.lastName = "Last name is required"
    }
    if (!data.email?.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email address"
    }
    if (!data.phone?.trim()) {
      errors.phone = "Phone number is required"
    }
    if (!data.country?.trim()) {
      errors.country = "Country is required"
    }
    if (!data.experience?.trim()) {
      errors.experience = "Experience level is required"
    }
    if (!data.track?.trim()) {
      errors.track = "Please select a track"
    }
    if (!data.motivation?.trim()) {
      errors.motivation = "Please tell us about your motivation"
    } else if (data.motivation.trim().length < 50) {
      errors.motivation = "Please provide at least 50 characters about your motivation"
    }
    if (!data.availability?.trim()) {
      errors.availability = "Please select your availability"
    }

    return errors
  }
const handleApplicationInputChange = (e) => {
  const { name, value } = e.target
  setApplicationData((prev) => ({
    ...prev,
    [name]: value,
  }))

  if (applicationErrors[name]) {
    setApplicationErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }
}

const handleApplicationSubmit = async (e) => {
  e.preventDefault()
  setIsSubmittingApplication(true)
  clearError()

  const errors = validateApplicationForm(applicationData)
  if (Object.keys(errors).length > 0) {
    setApplicationErrors(errors)
    setIsSubmittingApplication(false)
    return
  }

  try {
    const results = await Promise.allSettled([
      sendAdminNotification(applicationData),
      sendUserConfirmation(applicationData),
    ])

    const adminResult = results[0]
    const userResult = results[1]

    if (adminResult.status === "fulfilled") {
      setApplicationSuccess(true)

      // Optional: show notification if user email fails silently
      if (userResult.status === "rejected") {
        // Optional: You could set a flag to display a message to user/admin
      }

      setTimeout(() => {
        closeApplicationModal()
      }, 4000)
    } else {
      throw new Error("Failed to submit application")
    }
  } catch (error) {
    console.error("Application submission error:", error)
    handleError(error, "email")
  } finally {
    setIsSubmittingApplication(false)
  }
}


  useEffect(() => {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target) {
        entry.target.classList.add("animate-in")

        const animateElements = entry.target.querySelectorAll(".animate-on-scroll")
        animateElements?.forEach((element, index) => {
          setTimeout(() => {
            element?.classList?.add("animate-in")
          }, index * 100)
        })
      }
    })
  }, observerOptions)

  const targets = document.querySelectorAll("section, .animate-on-scroll")

  targets.forEach((el) => observer.observe(el))

  return () => observer.disconnect()
}, [])


useEffect(() => {
  let timer = null;

  const initializeApp = async () => {
    try {
      // Simulate a loading error on retry (30% chance)
      if (retryCount > 0 && Math.random() < 0.3) {
        throw new Error("Failed to load application data");
      }

      timer = setTimeout(() => {
        setIsLoading(false);

        // Staggered section loading
        const delays = [200, 400, 600, 800, 1000];
        const keys = ["hero", "about", "services", "courses", "contact"];

        keys.forEach((key, index) => {
          setTimeout(() => {
            setSectionsLoading((prev) => ({ ...prev, [key]: false }));
          }, delays[index]);
        });
      }, 1500);
    } catch (error) {
      handleError(error, "initialization");
      setIsLoading(false);
    }
  };

  initializeApp();

  return () => {
    if (timer) clearTimeout(timer);
  };
}, [retryCount]);


  // Global error boundary effect
useEffect(() => {
  const handleUnhandledError = (event) => {
    const message = event?.error?.message || "An unexpected error occurred";
    handleError(new Error(message), "global");
  };

  const handleUnhandledRejection = (event) => {
    const message = event?.reason?.message || "An unexpected promise rejection";
    handleError(new Error(message), "global");
  };

  window.addEventListener("error", handleUnhandledError);
  window.addEventListener("unhandledrejection", handleUnhandledRejection);

  return () => {
    window.removeEventListener("error", handleUnhandledError);
    window.removeEventListener("unhandledrejection", handleUnhandledRejection);
  };
}, []);


  // Render error page if there's a critical error
  if (error && (error.type === "network" || error.type === "server")) {
    return <ErrorPage error={error} onRetry={retryOperation} onClear={clearError} />
  }

  return (
    <div className="app">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <div className="loading-logo">
              <div className="logo">
                <div className="logo-badge">
                  <span className="logo-main">MushakTech</span>
                  <span className="logo-sub">Ventures</span>
                </div>
              </div>
            </div>
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <div className="loading-text">Loading amazing experiences...</div>
            <div className="loading-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && error.type !== "network" && error.type !== "server" && (
        <ErrorToast error={error} onClose={clearError} />
      )}

      {/* Application Modal */}
      {showApplicationModal && (
        <ApplicationModal
          isOpen={showApplicationModal}
          onClose={closeApplicationModal}
          selectedTrack={selectedTrack}
          applicationData={applicationData}
          applicationErrors={applicationErrors}
          isSubmitting={isSubmittingApplication}
          success={applicationSuccess}
          onInputChange={handleApplicationInputChange}
          onSubmit={handleApplicationSubmit}
          courses={courses}
        />
      )}

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-badge">
                <span className="logo-main">MushakTech</span>
                <span className="logo-sub">Ventures</span>
              </div>
            </div>
            <nav className="nav">
              <a href="#home" className="nav-link">
                Home
              </a>
              <a href="#programs" className="nav-link">
                Programs
              </a>
              <a href="#about" className="nav-link">
                About Us
              </a>
              <a href="#faq" className="nav-link">
                FAQs
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </nav>
            <div className="header-actions">
              <button className="btn btn-primary" onClick={() => openApplicationModal()}>
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="badge-icon">⚡</span>
                <span>Innovation Driven</span>
              </div>
              <h1 className="hero-title">
                Building the Next Generation of <span className="hero-highlight">Tech Professionals</span>
              </h1>
              <p className="hero-description">
                A hands-on, result-driven fellowship designed to support tech talents to develop real-world skills,
                connect with industry mentors, and thrive in today's competitive tech landscape.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary btn-large" onClick={() => openApplicationModal()}>
                  Apply Now
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-image-container">
                <img
                  src={View}
                  alt="Team collaboration and learning"
                  className="hero-image"
                />
                <div className="hero-image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fellowship Section */}
      <section className="fellowship">
        <div className="container">
          <div className="fellowship-content">
            <div className="fellowship-header">
              <h2 className="section-title">A hands-on training program for aspiring tech professionals</h2>
              <p className="section-description">
                Our comprehensive program combines intensive training, real-world projects, and industry mentorship to
                prepare you for success in the tech industry.
              </p>
            </div>
            <div className="fellowship-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <GraduationCap size={40} strokeWidth={2} />
                </div>
                <h3>Expert-Led Training</h3>
                <p>Learn from industry professionals with years of experience in leading tech companies.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Handshake size={38} strokeWidth={2} />
                </div>
                <h3>Industry Mentorship</h3>
                <p>Get paired with experienced mentors who will guide your career development.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Briefcase size={35} strokeWidth={2} />
                </div>
                <h3>Real Projects</h3>
                <p>Work on actual industry projects to build your portfolio and gain practical experience.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Rocket size={32} strokeWidth={2} />
                </div>
                <h3>Career Placement</h3>
                <p>Access to our network of partner companies for internships and full-time opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="programs">
        <div className="container">
          <div className="programs-header">
            <div className="programs-badge">
              <span className="badge-icon">✨</span>
              <span>Learning Tracks</span>
            </div>
            <h2 className="programs-title">Who is the training for?</h2>
            <p className="programs-description">
              Mushak Tech Ventures training program is for beginners in tech who are looking to gain experience in any of the following fields
            </p>
          </div>
          <div className="programs-grid">
            {courses.map((course) => (
              <div key={course.id} className="program-track-card">
                <div className="track-icon-container">
                  <div className="track-icon">{course.icon}</div>
                </div>
                <h3 className="track-title">{course.title}</h3>
                <p className="track-description">{course.description}</p>
                <div className="track-details">
                  {/*<div className="track-meta">
                    <span className="track-level">📊 {course.level}</span>
                  </div>*/}                  
                </div>
                <div className="track-features">
                  {course.features.map((feature, index) => (
                    <span key={index} className="track-feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="track-footer">
                  <button className="btn btn-track-apply" onClick={() => openApplicationModal(course)}>
                    Apply for {course.category}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-left">
              <h2 className="section-title">Why Choose Mushak Tech Ventures?</h2>
              <p className="section-description">
                We bridge the gap between learning and employment by offering beginner-focused, industry-backed training that prepares you for real-world tech careers.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="feature-number">01</div>
                  <div className="feature-content">
                    <h4>Beginner-Focused Curriculum</h4>
                    <p>Our courses are tailored for aspiring tech talents, with practical lessons designed to build job-ready skills from day one.</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="feature-number">02</div>
                  <div className="feature-content">
                    <h4>Expert Mentorship</h4>
                    <p>Learn from mentors actively working in the tech industry, offering guidance, feedback, and real-world insights throughout your training.</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="feature-number">03</div>
                  <div className="feature-content">
                    <h4>Active Learning Community</h4>
                    <p>Collaborate with fellow learners, share ideas, and grow through peer support in a vibrant tech ecosystem.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-right">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">6+</div>
                  <div className="stat-label">Specialized Learning Tracks</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Project-Based Learning</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">90%</div>
                  <div className="stat-label">Completion Rate</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">4.8★</div>
                  <div className="stat-label">Average Learner Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="faq-content">
            <div className="faq-left">
              <h2 className="faq-title">FAQs</h2>
            </div>
            <div className="faq-right">
              <div className="faq-list">
                {faqs.map((faq) => (
                  <div key={faq.id} className={`faq-item ${openFaq === faq.id ? "active" : ""}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={openFaq === faq.id}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-icon">{openFaq === faq.id ? "−" : "+"}</span>
                    </button>
                    <div className={`faq-answer ${openFaq === faq.id ? "open" : ""}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-left">
              <h2 className="section-title">Ready to Start Your Tech Journey?</h2>
              <p className="section-description">
                Get in touch with us to learn more about our programs and how we can help you launch your tech career.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={Mail} />
                  </div>
                  <div>
                    <h4>Email Us</h4>
                    <p>mushaktechventures@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={Phone} />
                  </div>
                  <div>
                    <h4>Call Us</h4>
                    <p>+2348151017391</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <img src={Venue} />
                  </div>
                  <div>
                    <h4>Visit Us</h4>
                    <p>29 Ojutalayo Street, Logudu Bembo, Apata Ibadan, Oyo State</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-right">
              <div className="contact-form-container">
                <h3 className="form-title">Send us a message</h3>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        className={`form-input ${formErrors.firstName ? "error" : ""}`}
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className={`form-input ${formErrors.lastName ? "error" : ""}`}
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-input ${formErrors.email ? "error" : ""}`}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      className={`form-textarea ${formErrors.message ? "error" : ""}`}
                      placeholder="Tell us about your goals and interests..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                  </div>
                  <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="btn-spinner"></div>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-badge">
                  <span className="logo-main">MushakTech</span>
                  <span className="logo-sub">Ventures</span>
                </div>
              </div>
              <p className="footer-description">
                Empowering the next generation of tech professionals through comprehensive training and mentorship
                programs.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Programs</h4>
              <ul className="footer-links">
                <li>Full-Stack Development</li>
                <li>Cloud Architecture</li>
                <li>AI & Machine Learning</li>
                <li>Cybersecurity</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Mushak Tech Ventures. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Application Modal Component
function ApplicationModal({
  isOpen,
  onClose,
  selectedTrack,
  applicationData,
  applicationErrors,
  isSubmitting,
  success,
  onInputChange,
  onSubmit,
  courses,
}) {
  if (!isOpen) return null

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="application-modal success-modal" onClick={(e) => e.stopPropagation()}>
          <div className="success-content">
            <div className="success-icon">🎉</div>
            <h2>Application Submitted Successfully!</h2>
            <p>
              Thank you for applying to {selectedTrack ? selectedTrack.title : "Mushak Tech Ventures"}! We've received
              your application and will review it shortly.
            </p>
            <p>You'll receive an email confirmation shortly with next steps.</p>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="application-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Apply for {selectedTrack ? selectedTrack.title : "Training Program"}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="application-form" onSubmit={onSubmit}>
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  className={`form-input ${applicationErrors.firstName ? "error" : ""}`}
                  placeholder="John"
                  value={applicationData.firstName}
                  onChange={onInputChange}
                  required
                />
                {applicationErrors.firstName && <span className="error-message">{applicationErrors.firstName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  className={`form-input ${applicationErrors.lastName ? "error" : ""}`}
                  placeholder="Doe"
                  value={applicationData.lastName}
                  onChange={onInputChange}
                  required
                />
                {applicationErrors.lastName && <span className="error-message">{applicationErrors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${applicationErrors.email ? "error" : ""}`}
                  placeholder="john@example.com"
                  value={applicationData.email}
                  onChange={onInputChange}
                  required
                />
                {applicationErrors.email && <span className="error-message">{applicationErrors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className={`form-input ${applicationErrors.phone ? "error" : ""}`}
                  placeholder="+234 xxx xxx xxxx"
                  value={applicationData.phone}
                  onChange={onInputChange}
                  required
                />
                {applicationErrors.phone && <span className="error-message">{applicationErrors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Country of residence *</label>
              <input
                name="country"
                className={`form-input ${applicationErrors.country ? "error" : ""}`}
                placeholder="Enter your country"
                value={applicationData.country}
                onChange={onInputChange}
                required
              />              
              {applicationErrors.country && <span className="error-message">{applicationErrors.country}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Professional Background</h3>
            <div className="form-group">
              <label className="form-label">Years of Experience *</label>
              <select
                name="experience"
                className={`form-input ${applicationErrors.experience ? "error" : ""}`}
                value={applicationData.experience}
                onChange={onInputChange}
                required
              >
                <option value="">Select your experience level</option>
                <option value="Beginner">Beginner</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-3 years">2+ years</option>
              </select>
              {applicationErrors.experience && <span className="error-message">{applicationErrors.experience}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Track *</label>
              <select
                name="track"
                className={`form-input ${applicationErrors.track ? "error" : ""}`}
                value={applicationData.track}
                onChange={onInputChange}
                required
              >
                <option value="">Select a track</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.category}>
                    {course.title}
                  </option>
                ))}
              </select>
              {applicationErrors.track && <span className="error-message">{applicationErrors.track}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Portfolio/LinkedIn URL</label>
              <input
                type="url"
                name="portfolio"
                className="form-input"
                placeholder="https://github.com/yourusername or https://linkedin.com/in/yourprofile"
                value={applicationData.portfolio}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Program Details</h3>
            <div className="form-group">
              <label className="form-label">Why do you want to join this program? *</label>
              <textarea
                name="motivation"
                rows="4"
                className={`form-textarea ${applicationErrors.motivation ? "error" : ""}`}
                placeholder="Tell us about your goals, what you hope to achieve, and why you're interested in this training program... (minimum 50 characters)"
                value={applicationData.motivation}
                onChange={onInputChange}
                required
              />
              {applicationErrors.motivation && <span className="error-message">{applicationErrors.motivation}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Time Availability *</label>
              <select
                name="availability"
                className={`form-input ${applicationErrors.availability ? "error" : ""}`}
                value={applicationData.availability}
                onChange={onInputChange}
                required
              >
                <option value="">Select your availability</option>
                <option value="15-20 hours/week">15-20 hours per week (Recommended)</option>
                <option value="20-25 hours/week">20-25 hours per week</option>
                <option value="25+ hours/week">25+ hours per week</option>
              </select>
              {applicationErrors.availability && (
                <span className="error-message">{applicationErrors.availability}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="btn-spinner"></div>
                  Submitting Application...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Error Page Component
function ErrorPage({ error, onRetry, onClear }) {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-illustration">
          {error.type === "network" ? "🌐" : error.type === "server" ? "🔧" : "❌"}
        </div>
        <h1 className="error-title">{error.title}</h1>
        <p className="error-message">{error.message}</p>
        <div className="error-actions">
          {error.action === "retry" && (
            <button className="btn btn-primary" onClick={onRetry}>
              Try Again
            </button>
          )}
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
        <div className="error-help">
          <p>If the problem persists, please contact our support team:</p>
          <a href="mushaktechventures@gmail.com" className="error-contact">
            mushaktechventures@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

function ErrorToast({ error, onClose }) {
  useEffect(() => {
    if (error.type === "info") {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [error, onClose])

  return null;
}

export default App
