import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export const EmailCaptureForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    // Insert into the correct table for email capture
    // Insert with all required fields for trial_bookings
    const { error: dbError } = await supabase.from('trial_bookings').insert([
      { email, created_at: new Date().toISOString(), grade: 0, has_laptop: false }
    ]);
    setLoading(false);
    if (dbError) {
      setError('Something went wrong. Please try again.');
    } else {
      setSuccess(true);
      setEmail('');
      toast({ title: 'Thank you!', description: 'You will receive free resources and updates soon.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 items-center">
      <Input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1"
        required
      />
      <Button
        type="submit"
        className="bg-codersbee-vivid text-white"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Get Free Resources'}
      </Button>
      {error && <span className="text-red-500 text-sm mt-2 md:mt-0">{error}</span>}
      {success && <span className="text-green-600 text-sm mt-2 md:mt-0">Thank you! Check your inbox soon.</span>}
    </form>
  );
};

export const NotReadyToEnroll = () => {
  const resources = [
    {
      title: 'AI Lab',
      color: 'bg-purple-500 hover:bg-purple-600',
      desc: 'Interactive AI lessons & coding fun.',
      link: '/ai-lab',
    },
    {
      title: 'Coding Lab',
      color: 'bg-orange-500 hover:bg-orange-600',
      desc: 'Creative coding puzzles & logic games.',
      link: '/coding-lab',
    },
    {
      title: 'Quizzes',
      color: 'bg-blue-500 hover:bg-blue-600',
      desc: 'Test your knowledge with fun quizzes.',
      link: '/quizzes',
    },
    {
      title: 'Learning Resources',
      color: 'bg-green-500 hover:bg-green-600',
      desc: 'Quick tutorials on coding & AI basics.',
      link: '/resources',
    },
  ];
  return (
    <section className="py-16 bg-gradient-to-b from-codersbee-purple/5 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-codersbee-dark mb-2">
                Not ready for a trial class? Discover free resources you can use with your child today!
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
                Explore hands-on labs, quizzes, and tutorials—no signup needed. Start learning and having fun together!
              </p>
              <div className="w-full mb-10">
                <img
                  src="/lovable-uploads/CodersBee.png"
                  alt="Parent and child learning together"
                  className="w-full object-cover rounded-2xl shadow-2xl h-[220px] md:h-[320px] lg:h-[380px] xl:h-[420px]"
                  style={{ aspectRatio: '21/7', minHeight: 120 }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {resources.map((res, idx) => (
                <div key={idx} className="flex flex-col items-center text-center h-full">
                  <a
                    href={res.link}
                    className={`${res.color} w-full block text-white font-bold text-lg px-4 py-5 rounded-2xl shadow-lg transition mb-2 min-h-[64px] flex items-center justify-center h-20`}
                    style={{ minWidth: 0 }}
                  >
                    {res.title}
                  </a>
                  <p className="text-gray-700 text-sm mb-0 max-w-xs mx-auto min-h-[40px] flex items-center justify-center">{res.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-codersbee-vivid/10 rounded-xl border border-codersbee-vivid/20 p-6 text-center max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-2 text-codersbee-dark">Want access to advanced lessons and premium resources?</h3>
              <p className="mb-4 text-gray-700">Some advanced training and resources are locked. Enter your email to unlock exclusive content and updates for your child.</p>
              <EmailCaptureForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotReadyToEnroll;
