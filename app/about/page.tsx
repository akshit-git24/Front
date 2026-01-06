'use client'
import React from 'react';
import Header from '@/components/Header';
import SplitText from '@/components/SplitText';
import TextType from '@/components/TextType';
import Footer from '@/components/footer';

// --- React Bits Library Simulation (Consistent with HomePage) ---


type TitleProps = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const Title = ({ as = "h2", children, className = "", ...props }: TitleProps) => {
  const Component = as;
  return (
    <Component
      className={`font-extrabold font-serif tracking-tight ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// --- End of Simulation --

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="relative text-center bg-gradient-to-br from-lime-100 via-white to-sky-100 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title as="h2" className="text-5xl md:text-7xl text-slate-900">
            <SplitText
            text="About HostelNET"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            />
            </Title>
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-sans">
            We❛re a passionate team dedicated to simplifying the hostel experience, fostering connections, and building communities for travelers and students worldwide.
          </p>
          <div className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-sans">
            <TextType
            text={["Welcome to HostelNET!","Book Your Hostel Room Virtually", "Don❛t worry , no any first come first serve"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            />
          </div>
        </div>
      </section>

      {/* Our Story (Timeline Section) */}
      <section id="our-story" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title as="h3" className="text-4xl text-slate-900">Our Journey</Title>
            <p className="text-slate-600 mt-4 text-lg font-sans">From a simple idea to a thriving platform.</p>
          </div>
          <div className="relative timeline-container">
            {/* Timeline Item 1 */}
            <div className="timeline-item">
              <div className="timeline-content bg-lime-50 border-l-4 border-lime-400">
                <time className="font-semibold text-lime-800">July 2024</time>
                <h4 className="text-xl font-serif font-bold my-1 text-slate-800">The Spark</h4>
                <p className="text-slate-600 font-sans">HostelNET was born from a shared frustration: finding good Room, reliable hostel accommodation was harder than it needed to be.</p>
              </div>
            </div>
            {/* Timeline Item 2 */}
            <div className="timeline-item">
              <div className="timeline-content bg-sky-50 border-l-4 border-sky-400">
                <time className="font-semibold text-sky-800">June 2025</time>
                <h4 className="text-xl font-serif font-bold my-1 text-slate-800">Platform Launch</h4>
                <p className="text-slate-600 font-sans">After months of development, we launched the first version of our platform.</p>
              </div>
            </div>
            {/* Timeline Item 3 */}
            <div className="timeline-item">
              <div className="timeline-content bg-lime-50 border-l-4 border-lime-400">
                <time className="font-semibold text-lime-800">2025</time>
                <h4 className="text-xl font-serif font-bold my-1 text-slate-800">Ideation Community Features</h4>
                <p className="text-slate-600 font-sans">We introduced roommate matching and event management tools to help build a true sense of community among users.</p>
              </div>
            </div>
             {/* Timeline Item 4 */}
            <div className="timeline-item">
              <div className="timeline-content bg-sky-50 border-l-4 border-sky-400">
                <time className="font-semibold text-sky-800">Today</time>
                <h4 className="text-xl font-serif font-bold my-1 text-slate-800">Looking Ahead</h4>
                <p className="text-slate-600 font-sans">We❛re continuously innovating, expanding our network, and building new tools to make hostel life better than ever.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title as="h3" className="text-4xl text-slate-900">Meet The Team</Title>
            <p className="text-slate-600 mt-4 text-lg font-sans">The minds behind the mission.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <img className="w-40 h-40 rounded-full mx-auto shadow-lg ring-4 ring-lime-200" src="https://placehold.co/200x200/a7f3d0/14532d?text=AS" alt="Alex Smith"/>
              <h4 className="text-xl font-serif font-bold mt-4 text-slate-900">Akshit sahore</h4>
              <p className="text-slate-500 font-sans">Co-Founder & CEO</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600&display=swap');

        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        /* Timeline Styles */
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: #e2e8f0;
          transform: translateX(-50%);
        }
        .timeline-item {
          position: relative;
          width: 50%;
          padding: 20px 40px;
          box-sizing: border-box;
        }
        .timeline-item:nth-child(odd) {
          left: 0;
          padding-left: 0;
        }
        .timeline-item:nth-child(even) {
          left: 50%;
          padding-right: 0;
        }
        .timeline-item::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          right: -10px;
          background-color: white;
          border: 4px solid #a7f3d0;
          top: 25px;
          border-radius: 50%;
          z-index: 1;
        }
        .timeline-item:nth-child(even)::after {
          left: -10px;
          border-color: #bae6fd;
        }
        .timeline-content {
          padding: 20px 30px;
          position: relative;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
