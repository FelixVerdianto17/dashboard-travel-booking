import { z } from 'zod';

export const bookingSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  destination: z.string().min(1, 'Destination is required'),
  date: z.string().min(1, 'Travel dates are required'),
  status: z.enum(['Confirmed', 'Pending', 'Cancelled'], {
    errorMap: () => ({ message: 'Invalid booking status selected' }),
  }).default('Pending'),
  totalPrice: z.coerce
    .number({ invalid_type_error: 'Total price must be a valid number' })
    .positive('Total price must be greater than 0'),
  travelers: z.coerce
    .number({ invalid_type_error: 'Travelers count must be a valid number' })
    .int('Travelers count must be an integer')
    .positive('Travelers count must be greater than 0'),
  paymentStatus: z.enum(['Paid', 'Pending', 'Unpaid'], {
    errorMap: () => ({ message: 'Invalid payment status selected' }),
  }).default('Pending'),
  notes: z.string().optional().or(z.literal('')),
});
