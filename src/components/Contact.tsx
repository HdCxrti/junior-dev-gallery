import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Send, Linkedin, Github } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    opportunity: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Your EmailJS credentials from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_z8x7azu'; 
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ryryy8c';
    
    console.log('Sending email with:', {
      serviceId,
      templateId,
      formData
    });
    
    // Log the form data before sending
    const formElement = formRef.current as HTMLFormElement;
    console.log('Form data being sent:', {
      name: formElement.name?.valueOf,
      email: formElement.email?.value,
      message: formElement.message?.value,
      formElements: Array.from(formElement.elements).map(el => ({ 
        name: (el as any).name, 
        value: (el as any).value 
      }))
    });
    
    // Try with explicit public key
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '0911nTIj_nbg-aH7i';
    console.log('Using public key:', publicKey);
      // Send with parameters that match the template variables
    emailjs.send(
      serviceId,
      templateId,
      {
        name: formData.name,                    // Match {{name}} in template
        email: formData.email,                  // Match {{email}} in template
        company: formData.company || "N/A",     // Match {{company}} in template
        subject: formData.subject || "Contact Form Submission",  // Match {{subject}} in template
        message: formData.message,              // Match {{message}} in template
        opportunity_type: formData.opportunity, // Match {{opportunity_type}} in template
        reply_to: formData.email
      },
      publicKey
    )
      .then((result) => {        console.log('Email success:', result.text);
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          opportunity: 'general',
          message: ''
        });
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error("Email error:", error);
        console.error("Error details:", JSON.stringify(error)); // More detailed error logging
        toast({
          title: "Error sending message",
          description: "There was a problem sending your message. Please try again later.",
          variant: "destructive"
        });
        setIsSubmitting(false);
      });
  };
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-portfolio-purple/10 text-portfolio-purple border-portfolio-purple/20 mb-4 dark:bg-portfolio-purple/20">Contact</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Feel free to reach out if you're looking to collaborate, have a project idea, or just want to connect.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-700 p-8 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-portfolio-purple/10 p-3 rounded-md dark:bg-portfolio-purple/20">
                    <Mail className="h-6 w-6 text-portfolio-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                    <a href="mailto:Jacobdaviddutra@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-portfolio-purple">
                      Jacobdaviddutra@gmail.com
                    </a>
                  </div>
                </div>                <div className="flex items-start gap-4">
                  <div className="bg-portfolio-purple/10 p-3 rounded-md dark:bg-portfolio-purple/20">
                    <Phone className="h-6 w-6 text-portfolio-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                    <a href="tel:+13045797899" className="text-gray-600 dark:text-gray-400 hover:text-portfolio-purple">
                      +1 (304) 579-7899
                    </a>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Social Media</h4>
                  <div className="flex gap-4">
                    <a 
                      href="https://www.linkedin.com/in/jacob-david-dutra/" 
                      className="bg-portfolio-purple/10 p-3 rounded-md hover:bg-portfolio-purple/20 transition-colors"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-6 w-6 text-portfolio-purple" />
                    </a>
                    <a 
                      href="https://github.com/HdCxrti" 
                      className="bg-portfolio-purple/10 p-3 rounded-md hover:bg-portfolio-purple/20 transition-colors"
                      aria-label="GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-6 w-6 text-portfolio-purple" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>          <div className="w-full lg:w-2/3">
            <form ref={formRef} onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 dark:border dark:border-gray-700 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Send me a message</h3>                <div className="mb-6 bg-portfolio-purple/5 border border-portfolio-purple/20 p-4 rounded-lg dark:bg-gray-800/50">
                <h4 className="text-sm font-semibold text-portfolio-purple mb-2">🚀 Open to Work!</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">After leaving Massey Hyundai in early 2025, I've dedicated myself to learning web development full-time. I'm now actively seeking entry-level software development opportunities where I can contribute my mechanical troubleshooting background and newly acquired coding skills. If you're a recruiter or hiring manager, please select "Job Opportunity" below.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company (Optional)</label>
                  <Input 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Message subject"
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message Type</label>
                <div className="flex flex-wrap gap-3">
                  {['general', 'job opportunity', 'project collaboration', 'question'].map(type => (
                    <div 
                      key={type}
                      onClick={() => setFormData(prev => ({ ...prev, opportunity: type }))}
                      className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all ${
                        formData.opportunity === type 
                          ? 'bg-portfolio-purple text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={formData.opportunity === 'job opportunity' ? "Please describe the position, requirements, and how my skills match what you're looking for..." : "Your message here..."}
                  className="min-h-[150px] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="bg-portfolio-purple hover:bg-portfolio-indigo w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
