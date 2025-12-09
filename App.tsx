import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookAssistant from './components/BookAssistant';
import { BOOKS, AUTHORS, PACKAGES, TESTIMONIALS, INTERVIEWS } from './constants';
import { Book, Author, ServicePackage, Interview, Testimonial } from './types';

// Sub-components defined here to simplify file structure while keeping separation
// In a larger project, these would be in 'pages/'

const Hero: React.FC<{ setPage: (p: string) => void }> = ({ setPage }) => (
  <div className="relative bg-brand-purple text-white overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1519681393798-3828fb4090bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
        alt="Texas Landscape" 
        className="w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-transparent"></div>
    </div>
    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[600px]">
      <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-4">
        Where Stories are <span className="text-brand-gold">Birthed</span>
      </h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-2xl font-light">
        Bringing West Texas voices to the world. Professional publishing services in the heart of Lubbock.
      </p>
      <div className="mt-10 flex gap-4">
        <button 
          onClick={() => setPage('services')}
          className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-purple bg-brand-gold hover:bg-white md:py-4 md:text-lg transition-colors shadow-lg"
        >
          Start Your Journey
        </button>
        <button 
          onClick={() => setPage('books')}
          className="px-8 py-3 border-2 border-brand-gold text-base font-medium rounded-md text-brand-gold hover:bg-brand-gold hover:text-brand-purple md:py-4 md:text-lg transition-colors"
        >
          Browse Bookstore
        </button>
      </div>
    </div>
  </div>
);

const BookStore: React.FC = () => (
  <div className="py-16 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl">Our Catalog</h2>
        <p className="mt-4 text-lg text-gray-500">Discover the latest works from T & R authors.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {BOOKS.map((book) => (
          <div key={book.id} className="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="aspect-w-2 aspect-h-3 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75">
              <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover object-center" />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {book.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{book.genre}</p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{book.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-medium text-brand-purple">${book.price.toFixed(2)}</p>
                <span className="text-xs font-bold text-brand-darkGold uppercase tracking-wide">Buy Now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProfileCard: React.FC<{ person: Author }> = ({ person }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-brand-gold transform hover:-translate-y-1 transition-transform">
    <div className="h-48 w-full bg-gray-200 overflow-hidden">
      <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
      <p className="text-sm text-brand-purple font-semibold mb-2">{person.role}</p>
      <p className="text-gray-600">{person.bio}</p>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
         <button className="text-brand-darkGold hover:text-brand-purple text-sm font-bold">View Full Profile &rarr;</button>
      </div>
    </div>
  </div>
);

const AuthorsAndTeam: React.FC = () => {
  const team = AUTHORS.filter(a => a.role !== 'Author');
  const authors = AUTHORS.filter(a => a.role === 'Author');

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-l-8 border-brand-purple pl-4">Our Dedicated Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map(member => <ProfileCard key={member.id} person={member} />)}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-l-8 border-brand-gold pl-4">Featured Authors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map(author => <ProfileCard key={author.id} person={author} />)}
          </div>
        </div>

      </div>
    </div>
  );
};

const ServicesAndBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Generate next 7 days for calendar demo
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      fullDate: d.toISOString().split('T')[0]
    };
  });

  const times = ['09:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'];

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      setShowConfirm(true);
      setTimeout(() => {
        setShowConfirm(false);
        setSelectedDate(null);
        setSelectedTime(null);
      }, 4000);
    }
  };

  return (
    <div className="py-16 bg-brand-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Packages Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Publishing Packages</h2>
          <p className="mt-4 text-gray-500">Choose the path that fits your journey.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={`relative rounded-2xl shadow-xl bg-white p-8 flex flex-col ${pkg.isPopular ? 'border-4 border-brand-gold transform scale-105 z-10' : 'border border-gray-200'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 right-0 -mt-4 mr-4 bg-brand-gold text-brand-purple text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900">{pkg.title}</h3>
              <p className="mt-4 text-4xl font-extrabold text-brand-purple">{pkg.price}</p>
              <ul className="mt-6 space-y-4 flex-1">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full py-3 px-6 rounded-md font-bold text-white transition-colors ${pkg.isPopular ? 'bg-brand-purple hover:bg-purple-800' : 'bg-gray-800 hover:bg-gray-900'}`}>
                Select Package
              </button>
            </div>
          ))}
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 bg-purple-900 text-white">
            <h3 className="text-2xl font-serif font-bold mb-4">Book a Consultation</h3>
            <p className="text-purple-200 mb-6">
              Ready to discuss your manuscript? Schedule a 30-minute free discovery call with our Lubbock team.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                 <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-purple-900 font-bold mr-3">1</div>
                 <p>Select a date from the calendar</p>
              </div>
              <div className="flex items-center">
                 <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-purple-900 font-bold mr-3">2</div>
                 <p>Choose an available time slot</p>
              </div>
              <div className="flex items-center">
                 <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-purple-900 font-bold mr-3">3</div>
                 <p>Confirm your appointment</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            {showConfirm ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-green-600 animate-pulse">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h4 className="text-2xl font-bold">Booking Confirmed!</h4>
                <p className="text-gray-600 mt-2">Check your email for details.</p>
              </div>
            ) : (
              <>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Select Date</h4>
                <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
                  {dates.map((d) => (
                    <button
                      key={d.fullDate}
                      onClick={() => { setSelectedDate(d.fullDate); setSelectedTime(null); }}
                      className={`flex-shrink-0 w-16 h-20 rounded-lg flex flex-col items-center justify-center border-2 transition-all ${
                        selectedDate === d.fullDate 
                          ? 'border-brand-purple bg-brand-purple text-white' 
                          : 'border-gray-200 text-gray-600 hover:border-brand-gold'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase">{d.day}</span>
                      <span className="text-xl font-bold">{d.date}</span>
                    </button>
                  ))}
                </div>

                {selectedDate && (
                  <div className="mt-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Select Time</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {times.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2 px-4 rounded-md text-sm font-medium border transition-colors ${
                            selectedTime === t
                              ? 'bg-brand-gold text-purple-900 border-brand-gold'
                              : 'text-gray-700 border-gray-300 hover:border-brand-purple'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBook}
                  disabled={!selectedDate || !selectedTime}
                  className="mt-8 w-full bg-brand-purple text-white py-3 rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-800"
                >
                  Confirm Booking
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MediaSection: React.FC = () => (
  <div className="py-16 bg-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Interviews */}
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Interviews & Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {INTERVIEWS.map((interview) => (
          <div key={interview.id} className="group cursor-pointer">
            <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={interview.thumbnailUrl} 
                alt={interview.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-xl group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-brand-purple" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-brand-gold text-sm font-bold">{interview.date}</p>
                <h3 className="text-white text-xl font-bold">{interview.title}</h3>
                <p className="text-gray-300 text-sm">ft. {interview.interviewee}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="bg-brand-ivory rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">What Our Authors Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div key={test.id} className="bg-white p-6 rounded-xl shadow-md border-b-4 border-brand-gold">
              <div className="flex text-brand-gold mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < test.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{test.text}"</p>
              <div>
                <p className="font-bold text-gray-900">{test.name}</p>
                <p className="text-sm text-gray-500">{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate SMTP / EmailJS delay
    setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // In a real app with client-side only reqs, we might open mailto
        window.location.href = `mailto:trbirthingbookspubliishing@gmail.com?subject=New Inquiry from ${formData.name}&body=${formData.message}`;
    }, 1500);
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-brand-purple p-10 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Get in Touch</h2>
            <p className="text-purple-200 mb-8">
              We'd love to hear from you. Whether you have a manuscript ready or just a spark of an idea.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-brand-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Lubbock, Texas</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-brand-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>806-939-1226</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-brand-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>trbirthingbookspubliishing@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
             <div className="w-full h-32 bg-purple-800 rounded-lg flex items-center justify-center text-sm text-purple-300">
               [Map Placeholder - Lubbock, TX]
             </div>
          </div>
        </div>
        
        <div className="md:w-1/2 p-10">
          {status === 'success' ? (
             <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 mt-2">Opening your email client...</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-brand-purple font-bold hover:underline">Send another</button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-purple focus:border-brand-purple"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-purple focus:border-brand-purple"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  rows={4}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-purple focus:border-brand-purple"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-purple hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple disabled:opacity-70"
              >
                {status === 'sending' ? 'Sending...' : 'Send to Author/Team'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setPage={setCurrentPage} />
            <BookStore />
            <ServicesAndBooking />
          </>
        );
      case 'books':
        return <BookStore />;
      case 'authors':
        return <AuthorsAndTeam />;
      case 'services':
        return <ServicesAndBooking />;
      case 'media':
        return <MediaSection />;
      case 'contact':
        return <ContactPage />;
      default:
        return <Hero setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-ivory font-sans text-gray-900">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <BookAssistant />
    </div>
  );
};

export default App;