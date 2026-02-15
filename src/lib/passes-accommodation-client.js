const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URL;

export const getAccommodationTypes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/accomodations/types`, {
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
        error: data.error || "Failed to fetch accommodation types",
        accommodations: [],
      };
    }

    return {
      success: true,
      data: data.accommodationTypes || [],
      message: "Accommodation types fetched successfully",
    };
  } catch (error) {
    console.error("Get accommodation types error:", error);
    return {
      success: false,
      error:
        error.message || "An error occurred while fetching accommodation types",
      accommodations: [],
    };
  }
};

export const getPassesTypes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/passes/types`, {
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
        error: data.error || "Failed to fetch pass types",
        passes: [],
      };
    }

    return {
      success: true,
      data: data.passesTypes || [],
      message: "Pass types fetched successfully",
    };
  } catch (error) {
    console.error("Get passes types error:", error);
    return {
      success: false,
      error: error.message || "An error occurred while fetching pass types",
      passes: [],
    };
  }
};

export default {
  getAccommodationTypes,
  getPassesTypes,
};
