import axios from "axios";

// The base URL for the API
const API_BASE = "http://10.0.2.2:3001/api/app";

/**
 * Fetches the complete details for a specific Hisab.
 *
 * @param {string} hisabId - The ID of the hisab to fetch.
 * @param {string} token - The authorization bearer token.
 * @returns {Promise<object>} - A promise that resolves to the parsed payload from the API response.
 */
const getHisabDetails = async (hisabId, token) => {
  try {
    const url = `${API_BASE}/hisabs/${hisabId}`;
    console.log("🚀 GET Hisab Details URL:", url);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 10000,
      // Return raw string; we'll parse manually to avoid RN JSON edge-cases
      transformResponse: [data => data],
      validateStatus: () => true,
    });

    const { status } = response;
    let { data } = response;

    // Diagnostics
    try {
      const ct = response?.headers?.['content-type'] || response?.headers?.['Content-Type'];
      const snippet = typeof data === 'string' ? data.slice(0, 240) : '[object]';
      console.log('[HisabDetails] status:', status, 'content-type:', ct, 'typeof:', typeof data, 'snippet:', snippet);
    } catch {}

    if (typeof data === 'string') {
      // Trim and remove UTF-8 BOM if present
      data = data.replace(/^\uFEFF/, '').trim();
      try {
        data = JSON.parse(data);
      } catch (e) {
        // Attempt to recover if server wrapped JSON with noise
        try {
          const s = (data || '').toString();
          const start = s.indexOf('{');
          const end = s.lastIndexOf('}');
          if (start !== -1 && end !== -1 && end > start) {
            const candidate = s.slice(start, end + 1);
            data = JSON.parse(candidate);
          } else {
            throw e;
          }
        } catch (e2) {
          const preview = (data || '').toString().slice(0, 300);
          console.warn('[HisabDetails] JSON parse failed. Preview:', preview);
          throw new Error(`Failed to parse server JSON (HTTP ${status}).`);
        }
      }
    }

    if (status < 200 || status >= 300) {
      const msg = data?.message || data?.error || `HTTP ${status}`;
      throw new Error(msg);
    }

    console.log("Hisab Details Status:", status);
    return data;

  } catch (error) {
    const status = error?.response?.status;
    const message = error?.message || error?.response?.data?.message;
    console.error("❌ Error fetching hisab details:", { status, message, hisabId });
    throw new Error(message || "An unexpected error occurred.");
  }
};

// Use a default export for better module resolution.
export default getHisabDetails;