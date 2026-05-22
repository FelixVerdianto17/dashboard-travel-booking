import React from 'react';

const DashboardPage = () => {
  const bookings = [
    { id: 1, destination: 'Tokyo, Japan', date: 'Oct 12 - Oct 20', status: 'Confirmed', price: '$1,200', img: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=300&q=80' },
    { id: 2, destination: 'Paris, France', date: 'Dec 05 - Dec 12', status: 'Pending', price: '$1,850', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80' },
    { id: 3, destination: 'Bali, Indonesia', date: 'Jan 18 - Jan 25', status: 'Confirmed', price: '$950', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
              Travel Dashboard
            </h1>
            <p className="text-slate-400">Welcome back, Explorer! Manage your upcoming journeys.</p>
          </div>
          <a
            href="/"
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-medium hover:bg-slate-800 transition"
          >
            Sign Out
          </a>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Booked</h3>
            <p className="text-3xl font-bold">12 Trips</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Bookings</h3>
            <p className="text-3xl font-bold text-sky-400">3 Trips</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Saved Places</h3>
            <p className="text-3xl font-bold text-indigo-400">28 Spots</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">Upcoming Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition">
                <div className="h-48 overflow-hidden relative bg-slate-800">
                  <img
                    src={booking.img}
                    alt={booking.destination}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
                    booking.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold">{booking.destination}</h3>
                    <p className="text-slate-400 text-sm">{booking.date}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                    <span className="text-slate-400 text-sm">Price paid</span>
                    <span className="font-semibold text-white">{booking.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
