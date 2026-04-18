import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate network request
    setTimeout(() => {
      setStatus('success')
      // Reset form after 3 seconds
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {status === 'success' ? (
        <motion.div 
          className="form-success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle size={48} className="success-icon" />
          <h3>Message Sent!</h3>
          <p>Thank you for reaching out. I'll get back to you soon.</p>
        </motion.div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required placeholder="John Doe" disabled={status === 'submitting'} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required placeholder="john@example.com" disabled={status === 'submitting'} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" required rows={4} placeholder="How can I help you?" disabled={status === 'submitting'}></textarea>
          </div>
          <button type="submit" className="btn submit-btn" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : (
              <>
                Send Message <Send size={16} />
              </>
            )}
          </button>
        </>
      )}
    </form>
  )
}
