export const bookingKeys = {
  all: ['bookings'],
  lists: () => [...bookingKeys.all, 'list'],
  details: () => [...bookingKeys.all, 'detail'],
  detail: (bookingId) => [...bookingKeys.details(), bookingId],
};
