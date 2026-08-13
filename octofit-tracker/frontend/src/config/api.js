/**
 * API Configuration Module
 * 
 * Dynamically determines the API base URL based on the environment:
 * - Codespaces: https://{CODESPACE_NAME}-8000.app.github.dev
 * - Local development: http://localhost:8000
 */

export function getApiBaseUrl() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export const API_BASE_URL = getApiBaseUrl();

/**
 * Create fetch options for API requests
 * @param {Object} options - Request options (method, body, headers, etc.)
 * @returns {Object} Fetch options with default headers
 */
export function createFetchOptions(options = {}) {
  return {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };
}

/**
 * Generic API request utility
 * @param {string} endpoint - API endpoint (e.g., '/api/users')
 * @param {Object} options - Fetch options
 * @returns {Promise} JSON response or error
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const fetchOptions = createFetchOptions(options);

  try {
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error at ${endpoint}:`, error);
    throw error;
  }
}

// Helper methods for common operations
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, data) => 
    apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) =>
    apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};

export default {
  API_BASE_URL,
  getApiBaseUrl,
  createFetchOptions,
  apiRequest,
  api,
};
