/**
 * API Configuration Module with Vite Environment Variables
 * 
 * Uses VITE_CODESPACE_NAME for Codespaces deployments:
 *   https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/...
 * 
 * Fallback for localhost development:
 *   http://localhost:8000/api/...
 * 
 * Configuration:
 * 1. For Codespaces: Create .env.local and set VITE_CODESPACE_NAME
 * 2. For localhost: Omit VITE_CODESPACE_NAME, app will use localhost
 * 3. Never use import.meta.env.VITE_CODESPACE_NAME without checking undefined
 */

/**
 * Get the API base URL with safe fallback handling
 * @returns {string} API base URL
 */
export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName.trim()) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

/**
 * Get the full API endpoint URL
 * @param {string} endpoint - API path (e.g., '/api/users')
 * @returns {string} Full URL
 */
export function getApiUrl(endpoint) {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${endpoint}`;
}

/**
 * Create standardized fetch options
 * @param {Object} options - Request options
 * @returns {Object} Fetch options with proper headers
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
 * @returns {Promise<any>} JSON response
 * @throws {Error} If request fails
 */
export async function apiRequest(endpoint, options = {}) {
  const url = getApiUrl(endpoint);
  const fetchOptions = createFetchOptions(options);

  try {
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText} at ${endpoint}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint} from ${url}:`, error.message);
    throw error;
  }
}

/**
 * Helper methods for common REST operations
 */
export const api = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<any>} Response data
   */
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {any} data - Request body
   * @returns {Promise<any>} Response data
   */
  post: (endpoint, data) =>
    apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data) }),

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {any} data - Request body
   * @returns {Promise<any>} Response data
   */
  put: (endpoint, data) =>
    apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) }),

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<any>} Response data
   */
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
};

/**
 * Normalize API response to handle both paginated and array responses
 * @param {any} data - API response data
 * @returns {any[]} Array of items
 */
export function normalizeResponse(data) {
  // If data is an array, return as-is
  if (Array.isArray(data)) {
    return data;
  }

  // If data has a data property with array, return that
  if (data?.data && Array.isArray(data.data)) {
    return data.data;
  }

  // If data has an items property with array, return that
  if (data?.items && Array.isArray(data.items)) {
    return data.items;
  }

  // If data has a results property with array, return that
  if (data?.results && Array.isArray(data.results)) {
    return data.results;
  }

  // Fallback: return empty array
  console.warn('Unable to normalize API response:', data);
  return [];
}

export default {
  getApiBaseUrl,
  getApiUrl,
  createFetchOptions,
  apiRequest,
  api,
  normalizeResponse,
};
