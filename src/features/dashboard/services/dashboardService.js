export async function getDashboardSummary() {
  await new Promise((resolve) => setTimeout(resolve, 500));


  return {  
    totalBookings: 12,
    activeTrips: 3,
    pendingPayments: 2,
    completedTrips: 7,
  };
}
