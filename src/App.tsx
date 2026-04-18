import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowDownToLine,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Sun,
  Moon,
} from 'lucide-react'
import { portfolio } from './data/portfolioData'
import SectionHeading from './components/SectionHeading'
import SkillCard from './components/SkillCard'
import ProjectCard from './components/ProjectCard'
import Timeline from './components/Timeline'
import ContactForm from './components/ContactForm'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Persist theme
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Custom Cursor Logic
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('.project-card') || target.closest('.skill-card')
      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <>
      {/* Background Orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)', transformOrigin: '0%', zIndex: 999 }}
      />

      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`} 
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      <div className="page">
        {/* THEME BUTTON */}
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* HERO SECTION */}
        <section className="hero">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeIn}>
              Hi, I'm <span>{portfolio.name}</span>
            </motion.h1>
            <motion.h2 variants={fadeIn}>{portfolio.role}</motion.h2>

            <motion.p variants={fadeIn}>{portfolio.bio}</motion.p>

            <motion.div className="hero-info" variants={fadeIn}>
              <span><MapPin size={16} /> {portfolio.location}</span>
              {portfolio.stats.map(stat => (
                <span key={stat.label}>{stat.label}: {stat.value}</span>
              ))}
            </motion.div>

            <motion.div className="buttons" variants={fadeIn}>
              <a href="/resume.pdf" download className="btn">
                <ArrowDownToLine size={18} /> Download Resume
              </a>
            </motion.div>

            <motion.div className="socials" variants={fadeIn}>
              <a href={portfolio.socialLinks[0]?.href} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={portfolio.socialLinks[1]?.href} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={portfolio.socialLinks[2]?.href} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="profile-container"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="/profile.jpg"
              alt={portfolio.name}
              className="profile"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
              }}
            />
          </motion.div>
        </section>

        {/* JOURNEY / TIMELINE */}
        <motion.section
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <SectionHeading
            eyebrow="My Journey"
            title="Education & Preparation"
            description="The path I've taken from my BCA graduation to my dedicated UPSC preparation."
          />
          <Timeline items={portfolio.journey} />
        </motion.section>

        {/* SKILLS */}
        <motion.section
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <SectionHeading
            eyebrow="Expertise"
            title="My Skills"
            description="The technical foundation and analytical skills I bring to the table."
          />
          <div className="skills">
            {portfolio.skills.map((skill, index) => (
              <SkillCard key={skill} skill={skill} index={index} />
            ))}
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Projects"
            description="Some of my recent work showcasing my abilities in frontend development and UI design."
          />
          <div className="projects-grid">
            {portfolio.projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <SectionHeading
            eyebrow="Get In Touch"
            title="Contact Me"
            description="Feel free to reach out for collaborations or just a friendly hello!"
          />
          <div className="contact-wrapper">
            <div className="contact-info-panel">
              <motion.a
                href={`mailto:${portfolio.email}`}
                className="contact-card"
                variants={fadeIn}
              >
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <h3>Email</h3>
                  <p>{portfolio.email}</p>
                </div>
              </motion.a>

              <motion.a
                href={`tel:${portfolio.phone.replace(/\s+/g, '')}`}
                className="contact-card"
                variants={fadeIn}
              >
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <h3>Phone</h3>
                  <p>{portfolio.phone}</p>
                </div>
              </motion.a>
            </div>
            
            <ContactForm />
          </div>
        </motion.section>
      </div>
    </>
  )
}