import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '../services/bookingService';
import { bookingSchema } from '../schemas/bookingSchema';
import { bookingKeys } from '../queries/bookingKeys';
import Card from '../../../components/common/Card';
import Alert from '../../../components/common/Alert';

const CreateBookingPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      navigate('/bookings');
    },
    onError: (err) => {
      console.error('Error creating booking:', err);
      setSubmitError(err.message || 'Failed to save booking. Please try again.');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: '',
      destination: '',
      date: '',
      status: 'Pending',
      totalPrice: '',
      travelers: '1',
      paymentStatus: 'Pending',
      notes: '',
    },
  });

  const isSubmitting = createMutation.isPending;

  const onSubmit = (data) => {
    setSubmitError(null);
    createMutation.mutate(data);
  };

  const containerStyle = {
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const headerStyle = {
    marginBottom: '8px',
    textAlign: 'left',
  };

  const backLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--accent)',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'opacity 0.2s',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--text-h)',
    margin: '12px 0 6px 0',
  };

  const subtitleStyle = {
    fontSize: '15px',
    color: 'var(--text)',
    margin: 0,
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'var(--text)',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    display: 'block',
    textAlign: 'left',
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: hasError ? '1px solid #ef4444' : '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text-h)',
    fontSize: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'all 0.2s',
  });

  const errorStyle = {
    color: '#ef4444',
    fontSize: '12px',
    fontWeight: '600',
    marginTop: '4px',
    textAlign: 'left',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <Link to="/bookings" style={backLinkStyle}>
          &larr; Back to Directory
        </Link>
        <h1 style={titleStyle}>New Travel Reservation</h1>
        <p style={subtitleStyle}>Create a manual booking record for a customer journey.</p>
      </header>

      {submitError && (
        <Alert 
          message="Submission Error" 
          description={submitError} 
        />
      )}

      <Card padding="32px">
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={formGridStyle}>
            {/* Customer Name */}
            <div>
              <label htmlFor="customerName" style={labelStyle}>Customer Name *</label>
              <input
                type="text"
                id="customerName"
                disabled={isSubmitting}
                style={inputStyle(!!errors.customerName)}
                placeholder="e.g. Jane Doe"
                className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                {...register('customerName')}
              />
              {errors.customerName && (
                <div style={errorStyle}>⚠️ {errors.customerName.message}</div>
              )}
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="destination" style={labelStyle}>Destination *</label>
              <input
                type="text"
                id="destination"
                disabled={isSubmitting}
                style={inputStyle(!!errors.destination)}
                placeholder="e.g. Tokyo, Japan"
                className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                {...register('destination')}
              />
              {errors.destination && (
                <div style={errorStyle}>⚠️ {errors.destination.message}</div>
              )}
            </div>

            {/* Travel Dates */}
            <div>
              <label htmlFor="date" style={labelStyle}>Travel Dates *</label>
              <input
                type="text"
                id="date"
                disabled={isSubmitting}
                style={inputStyle(!!errors.date)}
                placeholder="e.g. Oct 12 - Oct 20"
                className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                {...register('date')}
              />
              {errors.date && (
                <div style={errorStyle}>⚠️ {errors.date.message}</div>
              )}
            </div>

            {/* Total Price */}
            <div>
              <label htmlFor="totalPrice" style={labelStyle}>Total Price (USD) *</label>
              <input
                type="number"
                id="totalPrice"
                min="1"
                step="any"
                disabled={isSubmitting}
                style={inputStyle(!!errors.totalPrice)}
                placeholder="e.g. 1200"
                className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                {...register('totalPrice')}
              />
              {errors.totalPrice && (
                <div style={errorStyle}>⚠️ {errors.totalPrice.message}</div>
              )}
            </div>

            {/* Travelers Count */}
            <div>
              <label htmlFor="travelers" style={labelStyle}>Number of Travelers *</label>
              <input
                type="number"
                id="travelers"
                min="1"
                disabled={isSubmitting}
                style={inputStyle(!!errors.travelers)}
                placeholder="e.g. 2"
                className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                {...register('travelers')}
              />
              {errors.travelers && (
                <div style={errorStyle}>⚠️ {errors.travelers.message}</div>
              )}
            </div>

            {/* Booking Status */}
            <div>
              <label htmlFor="status" style={labelStyle}>Booking Status *</label>
              <select
                id="status"
                disabled={isSubmitting}
                style={inputStyle(false)}
                className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
                {...register('status')}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
              </select>
            </div>

            {/* Payment Status */}
            <div>
              <label htmlFor="paymentStatus" style={labelStyle}>Payment Status *</label>
              <select
                id="paymentStatus"
                disabled={isSubmitting}
                style={inputStyle(false)}
                className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
                {...register('paymentStatus')}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" style={labelStyle}>Special Notes & Requests</label>
            <textarea
              id="notes"
              rows="4"
              disabled={isSubmitting}
              style={{
                ...inputStyle(false),
                resize: 'vertical',
                minHeight: '100px',
                fontFamily: 'inherit',
              }}
              placeholder="e.g. Vegetarian meals requested, prefer high floor..."
              className="focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
              {...register('notes')}
            />
          </div>

          {/* Form Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '16px',
            borderTop: '1px solid var(--border)',
            paddingTop: '24px',
            marginTop: '8px',
          }}>
            <Link
              to="/bookings"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
              className="px-6 py-2.5 bg-transparent hover:bg-gray-500/10 border border-[var(--border)] hover:border-gray-500/30 text-[var(--text)] font-semibold rounded-lg transition-all duration-200 cursor-pointer text-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-sm flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin" aria-hidden="true">🔄</span>
                  Saving Booking...
                </>
              ) : (
                'Create Reservation'
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateBookingPage;
