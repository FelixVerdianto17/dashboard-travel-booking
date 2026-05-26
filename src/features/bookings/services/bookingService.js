const mockBookings = {
  '1': {
    id: '1',
    customerName: 'Jane Doe',
    destination: 'Tokyo, Japan',
    date: 'Oct 12 - Oct 20',
    status: 'Confirmed',
    totalPrice: '$1,200',
    travelers: 2,
    paymentStatus: 'Paid',
    notes: 'Requires vegetarian meals on flight. High-floor hotel room preferred.',
  },
  '2': {
    id: '2',
    customerName: 'John Smith',
    destination: 'Paris, France',
    date: 'Dec 05 - Dec 12',
    status: 'Pending',
    totalPrice: '$1,850',
    travelers: 1,
    paymentStatus: 'Pending',
    notes: 'Needs airport transfer assistance upon arrival.',
  },
  '3': {
    id: '3',
    customerName: 'Alice Johnson',
    destination: 'Bali, Indonesia',
    date: 'Jan 18 - Jan 25',
    status: 'Confirmed',
    totalPrice: '$950',
    travelers: 3,
    paymentStatus: 'Paid',
    notes: 'Celebrating wedding anniversary. Request honeymoon setup if possible.',
  },
};

const LOCAL_STORAGE_KEY = 'travel-booking-created-bookings';

// Helper to safely fetch local storage custom bookings map
function getLocalBookings() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('Failed to parse locally created bookings:', e);
    return {};
  }
}

// Helper to safely write custom bookings map to local storage
function saveLocalBookings(bookingsMap) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookingsMap));
  } catch (e) {
    console.error('Failed to save bookings to localStorage:', e);
  }
}

export async function getBookingById(bookingId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Search static seed data first
  let booking = mockBookings[bookingId];

  // If not found in seed, inspect local storage map
  if (!booking) {
    const local = getLocalBookings();
    booking = local[bookingId];
  }

  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
}

export async function getBookings() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const local = getLocalBookings();

  // Combine static mock data and dynamic local storage items
  return [...Object.values(mockBookings), ...Object.values(local)];
}

export async function createBooking(payload) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const local = getLocalBookings();

  // Calculate safe next sequential ID from both mock and local keys to prevent collisions
  const allIds = [...Object.keys(mockBookings), ...Object.keys(local)].map(Number);
  const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
  const newId = String(maxId + 1);

  // Format currency with standard thousands separators
  const totalPriceStr = String(payload.totalPrice);
  const formattedPrice = totalPriceStr.startsWith('$')
    ? totalPriceStr
    : `$${Number(payload.totalPrice).toLocaleString()}`;

  const newBooking = {
    id: newId,
    customerName: payload.customerName,
    destination: payload.destination,
    date: payload.date,
    status: payload.status || 'Pending',
    totalPrice: formattedPrice,
    travelers: Number(payload.travelers),
    paymentStatus: payload.paymentStatus || 'Pending',
    notes: payload.notes || '',
    isUserCreated: true,
  };

  // Persist locally
  local[newId] = newBooking;
  saveLocalBookings(local);

  return newBooking;
}

export async function deleteBooking(bookingId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const local = getLocalBookings();

  if (!local[bookingId]) {
    if (mockBookings[bookingId]) {
      throw new Error('Default seed bookings cannot be deleted.');
    }
    throw new Error('Booking not found in custom database.');
  }

  delete local[bookingId];
  saveLocalBookings(local);

  return { success: true };
}

export async function updateBooking(bookingId, payload) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const local = getLocalBookings();

  if (!local[bookingId]) {
    if (mockBookings[bookingId]) {
      throw new Error('Default seed bookings cannot be modified.');
    }
    throw new Error('Booking not found in custom database.');
  }

  // Format currency with standard thousands separators
  const totalPriceStr = String(payload.totalPrice);
  const formattedPrice = totalPriceStr.startsWith('$')
    ? totalPriceStr
    : `$${Number(payload.totalPrice).toLocaleString()}`;

  const updatedBooking = {
    ...local[bookingId],
    customerName: payload.customerName,
    destination: payload.destination,
    date: payload.date,
    status: payload.status || 'Pending',
    totalPrice: formattedPrice,
    travelers: Number(payload.travelers),
    paymentStatus: payload.paymentStatus || 'Pending',
    notes: payload.notes || '',
  };

  local[bookingId] = updatedBooking;
  saveLocalBookings(local);

  return updatedBooking;
}
