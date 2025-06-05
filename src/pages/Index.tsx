
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WorkExperience from '@/components/WorkExperience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import GitHubStats from '@/components/GitHubStats';

const Index = () => {  return (
    <div className="min-h-screen">      <Navbar />
      <Hero />
      <About />
      <WorkExperience />
      <GitHubStats />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
