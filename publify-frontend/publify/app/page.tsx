'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Announcement {
  title: string;
  body: string;
  timestamp?: string;
  category?: string;
}

export default function Home() {
  const router = useRouter();
  const [ann, setAnn] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const consent = localStorage.getItem('consent');

    if (consent !== 'true') {
      router.replace('/consent');
      return;
    }

    fetch('/api/announcements')
      .then((r) => r.json())
      .then((data) => {
        setAnn(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching announcements:', error);
        setIsLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('consent');
    router.push('/consent');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0f1525] to-[#1a0f2e] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-[-100px] left-[-100px] sm:top-[-200px] sm:left-[-200px] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full border-2 border-blue-500/20 animate-pulse-slow" />
      <div className="absolute bottom-[-100px] right-[-100px] sm:bottom-[-150px] sm:right-[-150px] w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full border-2 border-purple-500/20 animate-pulse-slow-reverse" />
      
      {/* Gradient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow-reverse" />

      {/* Header */}
      <header className="relative z-10 border-b-2 border-white/10 bg-[#0d1219]/95 backdrop-blur-2xl sticky top-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src="/publify-logo.png"
              alt="Publify Logo"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg"
            />
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Publify</span>
              </h1>
              <p className="text-white/60 text-xs sm:text-sm font-semibold hidden sm:block">Public Announcements</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-3 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-lg sm:rounded-xl transition-all duration-300 border-2 border-red-400/30 font-bold text-sm sm:text-base shadow-lg hover:shadow-red-500/50 hover:scale-105 active:scale-95"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-10 bg-gradient-to-br from-[#151d2b] to-[#0f1520] rounded-2xl p-6 sm:p-8 border-2 border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg">
              📢
            </div>
            <div>
              <h2 className="text-white text-2xl sm:text-4xl font-black tracking-tight">Latest Updates</h2>
              <p className="text-white/60 text-sm sm:text-base font-semibold mt-1">Stay informed in real-time</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <svg className="animate-spin h-14 w-14 sm:h-16 sm:w-16 text-blue-400 mb-4" viewBox="0 0 24 24">
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
            <p className="text-white/60 font-bold text-base sm:text-lg">Loading announcements...</p>
          </div>
        ) : ann.length === 0 ? (
          <div className="bg-gradient-to-br from-[#151d2b] to-[#0f1520] backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-10 sm:p-16 border-2 border-white/10 text-center shadow-2xl">
            <div className="text-6xl sm:text-7xl mb-6">📢</div>
            <h3 className="text-white text-2xl sm:text-3xl font-black mb-3">No Announcements Yet</h3>
            <p className="text-white/60 font-semibold text-base sm:text-lg">Check back soon for updates</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {ann.map((a, i) => (
              <article
                key={i}
                className="bg-gradient-to-br from-[#151d2b] to-[#0f1520] backdrop-blur-2xl rounded-xl sm:rounded-2xl p-5 sm:p-8 border-2 border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-4">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg shrink-0">
                      📢
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-lg sm:text-2xl font-black group-hover:text-blue-300 transition-colors leading-tight break-words">
                        {a.title}
                      </h3>
                      {a.category && (
                        <span className="inline-block mt-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs sm:text-sm font-bold rounded-full border border-blue-400/30">
                          {a.category}
                        </span>
                      )}
                    </div>
                  </div>
                  {a.timestamp && (
                    <span className="text-white/50 text-xs sm:text-sm font-semibold shrink-0">
                      {new Date(a.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                
                <p className="text-white/80 leading-relaxed text-sm sm:text-base font-medium pl-0 sm:pl-[4.5rem]">
                  {a.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-white/10 bg-[#0d1219]/95 backdrop-blur-2xl mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm font-bold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>© 2024 Publify</span>
            </div>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="text-white/50 text-xs sm:text-sm font-bold">Your privacy is protected</span>
          </div>
        </div>
      </footer>

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