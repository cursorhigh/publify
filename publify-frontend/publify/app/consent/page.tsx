'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ConsentPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubscribe = async () => {
    if (!isChecked) return;
    
    setIsLoading(true);
    try {
      localStorage.setItem("consent", "true");

      // Optional: fake delay (remove if not needed)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // *** REDIRECT TO PUSH NOTIFICATION PAGE ***
      router.push('/push');
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-br from-[#0a0f1c] via-[#0f1525] to-[#1a0f2e]">
      {/* Animated background elements */}
      <div className="absolute top-[-100px] left-[-100px] sm:top-[-200px] sm:left-[-200px] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full border-2 border-blue-500/20 animate-pulse-slow" />
      <div className="absolute bottom-[-100px] right-[-100px] sm:bottom-[-150px] sm:right-[-150px] w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full border-2 border-purple-500/20 animate-pulse-slow-reverse" />
      
      {/* Gradient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow-reverse" />

      {/* Main container */}
      <div className="relative z-10 w-full max-w-[440px] bg-[#0d1219]/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white/10 overflow-hidden">
        {/* Gradient top border accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
        
        <div className="px-6 ">
          {/* Logo */}
          <div className="flex flex-col items-center mb-0 sm:mb-10">
            <div className="relative w-[340px] sm:w-[380px] h-auto mb-2 drop-shadow-2xl">
              <Image
                src="/publify-logo.png"
                alt="Publify Logo"
                width={380}
                height={380}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-white text-3xl sm:text-4xl font-black mb-3 tracking-tight">
              Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Publify</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg font-medium">
              Stay informed with real-time announcements
            </p>
          </div>

          {/* Consent Box */}
          <div className="bg-gradient-to-br from-[#151d2b] to-[#0f1520] rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 border border-white/10 shadow-xl">
            {/* Consent Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                📢
              </div>
              <h2 className="text-white text-xl sm:text-2xl font-bold">
                Subscribe
              </h2>
            </div>

            {/* Features list */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/80 text-sm sm:text-base font-semibold">Instant public announcements</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/80 text-sm sm:text-base font-semibold">Community updates</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white/80 text-sm sm:text-base font-semibold">Official notifications</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

            {/* Checkbox */}
            <label
              htmlFor="consentCheck"
              className="flex items-start gap-4 cursor-pointer p-4 rounded-xl transition-all duration-200 hover:bg-white/5 active:bg-white/10 border border-transparent hover:border-white/10"
            >
              <input
                type="checkbox"
                id="consentCheck"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-6 h-6 mt-0.5 cursor-pointer accent-blue-500 shrink-0 rounded"
              />
              <span className="text-white/90 text-sm sm:text-base font-semibold leading-relaxed">
                I agree to subscribe and understand I can unsubscribe anytime
              </span>
            </label>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={!isChecked || isLoading}
            className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-xl font-black text-base sm:text-lg tracking-wide transition-all duration-300 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg uppercase"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="font-black">Subscribing...</span>
              </span>
            ) : (
              'Subscribe Now'
            )}
          </button>

          {/* Footer */}
          <div className="my-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-white/50 text-xs sm:text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Your privacy is protected</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes pulse-slow-reverse {
          0%, 100% {
            transform: scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slow-reverse {
          animation: pulse-slow-reverse 10s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay-1 {
          animation: float 6s ease-in-out 1s infinite;
        }

        .animate-float-delay-2 {
          animation: float 6s ease-in-out 2s infinite;
        }

        .animate-float-delay-3 {
          animation: float 6s ease-in-out 3s infinite;
        }

        .animate-float-delay-4 {
          animation: float 6s ease-in-out 1.5s infinite;
        }
      `}</style>
    </div>
  );
}