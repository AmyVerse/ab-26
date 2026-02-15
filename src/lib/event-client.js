const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL;

export const getEventById = async (eventId) => {
  if (!eventId) {
    return {
      success: false,
      error: "Missing required parameter: eventId",
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/api/event/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to fetch event",
      };
    }

    return {
      success: true,
      event: data.event,
      message: data.message || "Event fetched successfully",
    };
  } catch (error) {
    console.error("Event fetch error:", error);
    return {
      success: false,
      error: error.message || "An error occurred while fetching event",
    };
  }
};
