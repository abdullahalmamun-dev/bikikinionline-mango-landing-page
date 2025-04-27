// frontend/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchMangoes() {
  const response = await fetch(`${API_BASE_URL}/mangoes`);
  if (!response.ok) {
    throw new Error('Failed to fetch mangoes');
  }
  return response.json();
}

export async function createOrder(orderData: unknown) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  
  return response.json();
}
