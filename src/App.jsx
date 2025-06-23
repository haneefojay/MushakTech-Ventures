"use client"

import { useState, useEffect } from "react"
import emailjs from "@emailjs/browser"
import Phone from "./assets/phone.png" 
import Venue from "./assets/location.png";
import Mail from "./assets/envelope-alt.png"
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
  const [paymentError, setPaymentError] = useState(null)

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
    SERVICE_ID: "service_mb5d7in",
    ADMIN_TEMPLATE_ID: "template_6mw01p7",
    USER_TEMPLATE_ID: "template_un6egl3",
    PUBLIC_KEY: "OdNncT_OleCskIa9Z",
  }

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  }, [])

  // Course data
  const courses = [
    {
      id: 1,
      icon: "⚛️",
      title: "Frontend Development",
      description:
        "Build interactive user interfaces with modern frameworks like React, Vue, and Angular. Master HTML, CSS, JavaScript, and responsive design principles.",
      level: "Beginner to Advanced",
      duration: "16 weeks",
      features: ["React & Vue.js", "Responsive Design", "JavaScript ES6+", "Modern CSS"],
      instructor: "Sarah Johnson",
      students: 2847,
      rating: 4.9,
      category: "Frontend",
    },
    {
      id: 2,
      icon: "🔧",
      title: "Backend Development",
      description:
        "Create robust APIs and server-side applications with Node.js, Python, or Java. Learn database design, authentication, and cloud deployment.",
      level: "Intermediate",
      duration: "14 weeks",
      features: ["Node.js & Python", "Database Design", "API Development", "Cloud Services"],
      instructor: "Michael Chen",
      students: 1923,
      rating: 4.8,
      category: "Backend",
    },
    {
      id: 3,
      icon: "📱",
      title: "Mobile App Development",
      description:
        "Develop cross-platform mobile applications using React Native or Flutter. Learn to build and deploy apps for iOS and Android platforms.",
      level: "Beginner",
      duration: "12 weeks",
      features: ["React Native", "Flutter", "Native Features", "App Store Deployment"],
      instructor: "Lisa Park",
      students: 3241,
      rating: 4.8,
      category: "Mobile",
    },
    {
      id: 4,
      icon: "🤖",
      title: "AI & Machine Learning",
      description:
        "Dive deep into artificial intelligence and machine learning with Python, TensorFlow, and real-world project experience.",
      level: "Advanced",
      duration: "20 weeks",
      features: ["Python for AI", "TensorFlow & PyTorch", "Neural Networks", "Industry Projects"],
      instructor: "Dr. Emily Rodriguez",
      students: 1456,
      rating: 4.9,
      category: "AI/ML",
    },
    {
      id: 5,
      icon: "☁️",
      title: "Cloud Architecture",
      description:
        "Master cloud infrastructure and DevOps practices with hands-on AWS, Docker, and Kubernetes training from industry experts.",
      level: "Intermediate",
      duration: "12 weeks",
      features: ["AWS Certification", "Docker & Kubernetes", "CI/CD Pipelines", "Infrastructure"],
      instructor: "Michael Chen",
      students: 1923,
      rating: 4.8,
      category: "Cloud",
    },
    {
      id: 6,
      icon: "🔒",
      title: "Cybersecurity",
      description:
        "Comprehensive cybersecurity training covering ethical hacking, incident response, and security architecture principles.",
      level: "Intermediate",
      duration: "14 weeks",
      features: ["Ethical Hacking", "Security Architecture", "Incident Response", "Compliance"],
      instructor: "James Wilson",
      students: 2134,
      rating: 4.7,
      category: "Security",
    },
  ]

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What are the requirements to apply for the program?",
      answer:
        "To be eligible for this program, you must be a tech talent with 2-3 years of experience and come from either Nigeria, or Ghana. There is no age requirement, and all genders are welcome to apply. You should have demonstrable skills in your chosen track and a passion for continuous learning.",
    },
    {
      id: 2,
      question: "When does the application open and close?",
      answer:
        "Applications typically open twice a year - in January and July. Each application window remains open for 6 weeks. We recommend applying early as we review applications on a rolling basis and may close early if we receive sufficient qualified candidates.",
    },
    {
      id: 3,
      question: "How many fellows will be accepted?",
      answer:
        "We accept a limited cohort of 50-100 fellows per intake to ensure personalized attention and quality mentorship. The exact number depends on the track and the quality of applications received.",
    },
    {
      id: 4,
      question: "What tracks can I participate in?",
      answer:
        "We offer six specialized tracks: Frontend Development, Backend Development, Mobile App Development, AI & Machine Learning, Cloud Architecture, and Cybersecurity. Each track is designed to take you from intermediate to advanced level in your chosen field.",
    },
    {
      id: 5,
      question: "Is the Program online or physical?",
      answer:
        "The program is hybrid - combining online learning modules with in-person workshops and networking events. Online sessions include live lectures, coding sessions, and mentorship meetings. Physical events include hackathons, company visits, and graduation ceremonies.",
    },
    {
      id: 6,
      question: "Can I participate in more than one track?",
      answer:
        "While we encourage specialization for maximum impact, exceptional candidates may be considered for a dual-track program. This requires demonstrating strong foundational skills in both areas and committing to additional time requirements.",
    },
    {
      id: 7,
      question: "What is the time commitment required?",
      answer:
        "The program requires 15-20 hours per week including live sessions, project work, and self-study. Live sessions are typically scheduled in the evenings (6-9 PM WAT) to accommodate working professionals.",
    },
    {
      id: 8,
      question: "Is there any cost to participate?",
      answer:
        "No, the fellowship is completely free for accepted participants. This includes all training materials, mentorship, project resources, and networking events. We believe in removing financial barriers to quality tech education.",
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
        to_email: "admin@mushaktech.com",
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

      console.log("Admin notification sent successfully:", result)
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
        support_email: "hello@mushaktech.com",
      }

      const result = await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.USER_TEMPLATE_ID, userTemplateParams)

      console.log("User confirmation sent successfully:", result)
      return { success: true, result }
    } catch (error) {
      console.error("Error sending user confirmation:", error)
      throw error
    }
  }

  const sendContactFormEmail = async (formData) => {
    try {
      const contactTemplateParams = {
        to_email: "hello@mushaktech.com",
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        message: formData.message,
        contact_date: new Date().toLocaleDateString(),
        contact_time: new Date().toLocaleTimeString(),
      }

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.ADMIN_TEMPLATE_ID,
        contactTemplateParams,
      )

      console.log("Contact form email sent successfully:", result)
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
    } else if (context === "payment") {
      setPaymentError({
        type: "payment",
        title: "Payment Failed",
        message:
          error.message || "Your payment could not be processed. Please check your payment details and try again.",
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
    setPaymentError(null)
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

      console.log("Contact form submitted:", formData)
      alert("Thank you for your message! We'll get back to you soon.")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("Contact form email error:", error)
      handleError(error, "email")
      alert(
        "Sorry, there was an error sending your message. Please try again or contact us directly at hello@mushaktech.com",
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
      // Send both admin notification and user confirmation emails
      const results = await Promise.allSettled([
        sendAdminNotification(applicationData),
        sendUserConfirmation(applicationData),
      ])

      // Check if at least one email was sent successfully
      const adminResult = results[0]
      const userResult = results[1]

      if (adminResult.status === "fulfilled") {
        console.log("Application submitted successfully:", applicationData)
        setApplicationSuccess(true)

        // Show success message even if user email failed
        if (userResult.status === "rejected") {
          console.warn("User confirmation email failed, but application was received:", userResult.reason)
        }

        // Auto close after success
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
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")

          const animateElements = entry.target.querySelectorAll(".animate-on-scroll")
          animateElements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add("animate-in")
            }, index * 100)
          })
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("section")
    const animateElements = document.querySelectorAll(".animate-on-scroll")

    sections.forEach((section) => observer.observe(section))
    animateElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  // Initial page loading with error handling
  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (retryCount > 0 && Math.random() < 0.3) {
          throw new Error("Failed to load application data")
        }

        const timer = setTimeout(() => {
          setIsLoading(false)
          setTimeout(() => setSectionsLoading((prev) => ({ ...prev, hero: false })), 200)
          setTimeout(() => setSectionsLoading((prev) => ({ ...prev, about: false })), 400)
          setTimeout(() => setSectionsLoading((prev) => ({ ...prev, services: false })), 600)
          setTimeout(() => setSectionsLoading((prev) => ({ ...prev, courses: false })), 800)
          setTimeout(() => setSectionsLoading((prev) => ({ ...prev, contact: false })), 1000)
        }, 1500)

        return () => clearTimeout(timer)
      } catch (error) {
        handleError(error, "initialization")
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [retryCount])

  // Global error boundary effect
  useEffect(() => {
    const handleUnhandledError = (event) => {
      handleError(new Error(event.error?.message || "An unexpected error occurred"), "global")
    }

    const handleUnhandledRejection = (event) => {
      handleError(new Error(event.reason?.message || "An unexpected error occurred"), "global")
    }

    window.addEventListener("error", handleUnhandledError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleUnhandledError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

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
              <div className="logo-icon loading-pulse">🚀</div>
              <span className="logo-text">MushakTech Ventures</span>
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
                  src="/images/team-collaboration.jpg"
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
                <div className="feature-icon">🎓</div>
                <h3>Expert-Led Training</h3>
                <p>Learn from industry professionals with years of experience in leading tech companies.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h3>Industry Mentorship</h3>
                <p>Get paired with experienced mentors who will guide your career development.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💼</div>
                <h3>Real Projects</h3>
                <p>Work on actual industry projects to build your portfolio and gain practical experience.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
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
                  <div className="track-meta">
                    <span className="track-level">📊 {course.level}</span>
                  </div>                  
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
                We're committed to bridging the gap between academic learning and industry requirements through
                practical, hands-on training programs.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="feature-number">01</div>
                  <div className="feature-content">
                    <h4>Industry-Relevant Curriculum</h4>
                    <p>Our programs are designed with input from leading tech companies to ensure relevance.</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="feature-number">02</div>
                  <div className="feature-content">
                    <h4>Experienced Instructors</h4>
                    <p>Learn from professionals who have built and scaled products at top tech companies.</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="feature-number">03</div>
                  <div className="feature-content">
                    <h4>Career Support</h4>
                    <p>From resume building to interview prep, we support you throughout your career journey.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-right">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Graduates Placed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Job Placement Rate</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Partner Companies</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">$75k</div>
                  <div className="stat-label">Average Starting Salary</div>
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
              your application and will review it within 5-7 business days.
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
          <h2>Apply for {selectedTrack ? selectedTrack.title : "Fellowship Program"}</h2>
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
              <label className="form-label">Country *</label>
              <select
                name="country"
                className={`form-input ${applicationErrors.country ? "error" : ""}`}
                value={applicationData.country}
                onChange={onInputChange}
                required
              >
                <option value="">Select your country</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
              </select>
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
                <option value="">Select experience level</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-3 years">2-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
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
                placeholder="Tell us about your goals, what you hope to achieve, and why you're interested in this fellowship program... (minimum 50 characters)"
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
          <a href="mailto:support@mushaktech.com" className="error-contact">
            support@mushaktech.com
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

  return (
    <div className={`error-toast ${error.type}`}>
      <div className="toast-content">
        <div className="toast-icon">{error.type === "info" ? "ℹ️" : error.type === "warning" ? "⚠️" : "❌"}</div>
        <div className="toast-message">
          <h4>{error.title}</h4>
          <p>{error.message}</p>
        </div>
        <button className="toast-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  )
}

export default App
