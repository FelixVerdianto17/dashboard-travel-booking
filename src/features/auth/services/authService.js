/**
 * Mock Authentication Service
 */
export const loginUser = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password123') {
        resolve({
          user: {
            id: '1',
            email: email,
            name: 'User',
          },
          token: 'mock-jwt-token-12345',
        });
      } else {
        reject(new Error('Invalid email or password. Hint: demo@example.com / password123'));
      }
    }, 1000); // 1-second delay to mock network request
  });
};
