import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Filter, MapPin } from 'lucide-react';
import { getBookings, deleteBooking } from '../services/bookingService';
import { bookingKeys } from '../queries/bookingKeys';
import Card from '../../../components/common/Card';
import Alert from '../../../components/common/Alert';
import Skeleton from '../../../components/common/Skeleton';
import BookingCard from '../components/BookingCard';

const BookingListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Read search & status filter values from URL params
  const searchTerm = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'All';

  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: bookingKeys.lists(),
    queryFn: getBookings,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
    },
    onError: (err) => {
      console.error('Delete failed:', err);
      alert(err.message || 'Failed to delete the booking. Please try again.');
    },
  });

  // Handler helpers to update query parameters in URL
  const handleSearchChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleStatusChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All') {
      newParams.set('status', value);
    } else {
      newParams.delete('status');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to permanently delete this booking?');
    if (!isConfirmed) return;

    deleteMutation.mutate(id);
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ||
      booking.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const containerStyle = {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '16px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '24px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--text-h)',
    margin: '0 0 6px 0',
  };

  const subtitleStyle = {
    fontSize: '15px',
    color: 'var(--text)',
    margin: 0,
  };

  const countBadgeStyle = {
    padding: '6px 14px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: '600',
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
    border: '1px solid var(--accent-border)',
  };

  const toolbarStyle = {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
    background: 'var(--social-bg)',
    padding: '16px 20px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
  };

  const searchContainerStyle = {
    flexGrow: 1,
    position: 'relative',
    minWidth: '260px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 16px 10px 40px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text-h)',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text)',
    fontSize: '16px',
    pointerEvents: 'none',
    opacity: 0.7,
  };

  const selectStyle = {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text-h)',
    fontSize: '15px',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '160px',
    transition: 'border-color 0.2s',
  };

  const clearButtonStyle = {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '28px',
  };

  // Loading skeleton screen
  if (isLoading) {
    return (
      <div style={containerStyle}>
        <header style={headerStyle}>
          <div>
            <div style={{ height: '32px', width: '220px', background: 'var(--border)', borderRadius: '6px', marginBottom: '8px' }}></div>
            <div style={{ height: '18px', width: '340px', background: 'var(--border)', borderRadius: '4px' }}></div>
          </div>
          <div style={{ height: '34px', width: '130px', background: 'var(--border)', borderRadius: '20px' }}></div>
        </header>

        <div style={gridStyle}>
          <Skeleton type="card" count={3} />
        </div>
      </div>
    );
  }

  // Error state screen
  if (error) {
    return (
      <div style={containerStyle}>
        <header style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Bookings List</h1>
            <p style={subtitleStyle}>Manage customer reservations.</p>
          </div>
        </header>
        <Alert 
          message={error.message || 'Failed to load bookings list.'}
          description="There was an issue fetching the reservations database. Please check your network connection or try refreshing the dashboard."
          onRetry={() => queryClient.invalidateQueries({ queryKey: bookingKeys.lists() })}
        />
      </div>
    );
  }

  // Empty state screen
  if (bookings.length === 0) {
    return (
      <div style={containerStyle}>
        <header style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Bookings List</h1>
            <p style={subtitleStyle}>Manage customer reservations.</p>
          </div>
        </header>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '64px 32px', 
          borderRadius: '16px',
          border: '2px dashed var(--border)',
          background: 'var(--social-bg)',
          textAlign: 'center',
          gap: '20px'
        }}>
          <MapPin className="h-12 w-12" style={{ color: 'var(--text)', opacity: 0.4 }} />
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-h)', margin: '0 0 8px 0' }}>No Reservations Found</h3>
            <p style={{ fontSize: '15px', color: 'var(--text)', maxWidth: '400px', margin: '0 auto' }}>
              We couldn't find any active or past travel bookings in the database. Start by creating a new customer trip.
            </p>
          </div>
          <Link 
            to="/bookings/new" 
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            style={{ textDecoration: 'none' }}
          >
            <Plus className="h-4 w-4" /> Create First Booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Bookings Directory</h1>
          <p style={subtitleStyle}>Oversee all current, pending, and completed traveler reservations.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={countBadgeStyle}>
            {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'} Total
          </span>
          <Link 
            to="/bookings/new"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            style={{ textDecoration: 'none', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus className="h-4 w-4" /> New Booking
          </Link>
        </div>
      </header>

      {/* Filters Toolbar */}
      <div style={toolbarStyle}>
        <div style={searchContainerStyle}>
          <Search style={searchIconStyle} className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search by destination or customer..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={inputStyle}
            className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter className="h-4 w-4" style={{ color: 'var(--text)', opacity: 0.6, flexShrink: 0 }} />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            style={selectStyle}
            className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          >
          <option value="All">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {(searchTerm || statusFilter !== 'All') && (
          <button
            onClick={handleResetFilters}
            style={clearButtonStyle}
            className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {filteredBookings.length === 0 ? (
        <Card 
          padding="48px 24px"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '16px',
          }}
        >
          <Search className="h-12 w-12" style={{ color: 'var(--text)', opacity: 0.4 }} />
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-h)', margin: '0 0 4px 0' }}>No Matching Bookings</h3>
            <p style={{ fontSize: '14px', color: 'var(--text)', maxWidth: '360px', margin: '0 auto' }}>
              We couldn't find any bookings matching your active search filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/25 hover:border-indigo-500/40 rounded-lg transition-all duration-200 cursor-pointer"
          >
            Clear All Filters
          </button>
        </Card>
      ) : (
        <div style={gridStyle}>
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingListPage;
