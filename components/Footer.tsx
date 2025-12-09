import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white border-t-8 border-brand-purple">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-brand-gold mb-4">T & R Birthing Books</h3>
            <p className="text-gray-400 mb-4">
              Helping you birth your story into the world from the heart of Texas.
            </p>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">123 Publishing Lane</p>
            <p className="text-gray-400">Lubbock, TX 79401</p>
            <p className="text-gray-400 mt-2">Phone: 806-939-1226</p>
            <p className="text-gray-400">Email: trbirthingbookspubliishing@gmail.com</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-brand-gold">Join Our Mailing List</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest author news, discounts, and event updates.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-brand-gold text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-brand-gold text-brand-purple font-bold rounded hover:bg-yellow-500 transition-colors"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;