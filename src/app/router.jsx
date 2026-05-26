import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import HomePage from '../features/home/pages/HomePage.jsx';
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import DashboardPage from '../features/dashboard/pages/DashboardPage.jsx';
import BookingListPage from '../features/bookings/pages/BookingListPage.jsx';
import CreateBookingPage from '../features/bookings/pages/CreateBookingPage.jsx';
import BookingDetailPage from '../features/bookings/pages/BookingDetailPage.jsx';
import EditBookingPage from '../features/bookings/pages/EditBookingPage.jsx';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/bookings',
            children: [
              {
                index: true,
                element: <BookingListPage />,
              },
              {
                path: 'new',
                element: <CreateBookingPage />,
              },
              {
                path: ':bookingId',
                element: <BookingDetailPage />,
              },
              {
                path: ':bookingId/edit',
                element: <EditBookingPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
