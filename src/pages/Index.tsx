
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import WorkExperience from '@/components/WorkExperience';
import Education from '@/components/Education';
import BlogPreview from '@/components/BlogPreview';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <WorkExperience />
      <Education />
      <BlogPreview />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
