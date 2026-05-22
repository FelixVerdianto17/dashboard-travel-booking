import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          Wanderlust
        </h1>
        <p className="text-slate-400">
          Discover and book extraordinary travel experiences around the world.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="/login"
            className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg transition duration-200"
          >
            Get Started
          </a>
          <a
            href="/dashboard"
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition duration-200"
          >
            View Dashboard Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
