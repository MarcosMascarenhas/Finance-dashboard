const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (err) {
    console.error('Login error:', err);
  }
};

export const getTransactions = async (token) => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    });
    return await response.json();
  } catch (err) {
    console.error('Get transactions error:', err);
  }
};
