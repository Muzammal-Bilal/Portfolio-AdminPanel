import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button, Input, Textarea } from '../../components/common';
import toast from 'react-hot-toast';

export const ContactPage = () => {
  const { contact, loading } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (loading) {
    return <Loading fullScreen />;
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully!');
    
    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contact?.email,
      href: `mailto:${contact?.email}`,
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contact?.phone,
      href: `tel:${contact?.phone}`,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: contact?.location,
      href: null,
      color: 'from-blue-500 to-cyan-500'
    }
  ].filter(m => m.value);

  const socialLinks = [
    { icon: Github, href: contact?.github, label: 'GitHub' },
    { icon: Linkedin, href: contact?.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: contact?.twitter, label: 'Twitter' }
  ].filter(s => s.href);

  return (
    <div className="py-16 sm:py-24">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] mb-6">
            Let's Work Together
          </h1>
          <p className="text-xl text-[var(--text-muted)]">
            Have a project in mind or want to discuss AI solutions? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {contact?.contactFormEnabled !== false ? (
              <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
                <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
                  Send a Message
                </h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-success-500)]/10 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-[var(--color-success-500)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[var(--text-muted)]">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Input
                      label="Subject"
                      name="subject"
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    <Textarea
                      label="Message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      icon={<Send size={18} />}
                      className="w-full"
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
                <p className="text-[var(--text-muted)]">
                  Contact form is currently disabled. Please reach out via email or social media.
                </p>
              </div>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--color-primary-500)]/30 hover:shadow-lg transition-all group"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--text-muted)]">{method.label}</p>
                        <p className="text-[var(--text-primary)] font-medium group-hover:text-[var(--color-primary-500)] transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--text-muted)]">{method.label}</p>
                        <p className="text-[var(--text-primary)] font-medium">{method.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
                <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">
                  Connect on Social
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-500)]/10 transition-all"
                      aria-label={link.label}
                    >
                      <link.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10 border border-[var(--color-primary-500)]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-[var(--color-success-500)] animate-pulse" />
                <span className="font-medium text-[var(--text-primary)]">Available for opportunities</span>
              </div>
              <p className="text-sm text-(--text-muted)">
                I'm currently open to full-time positions, freelance projects, and consulting opportunities in AI/ML.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
