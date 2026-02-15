const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUserRegData = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/reg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user registration data: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user registration data:", error);
    throw error;
  }
};

export const getUserPassesAndAccommodations = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/pass-acc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user passes and accommodations: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user passes and accommodations:", error);
    throw error;
  }
};

export const getUserBySerialId = async (serialId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/user/serial/${serialId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      return {
        success: false,
        exists: false,
        error: `User not found: ${response.statusText}`,
        user: null,
      };
    }

    const data = await response.json();
    return {
      success: true,
      exists: true,
      message: "User found successfully",
      user: data.user || data,
    };
  } catch (error) {
    console.error("Error searching user by serial ID:", error);
    return {
      success: false,
      exists: false,
      error: error.message || "An error occurred while searching for user",
      user: null,
    };
  }
};

export default {
  getUserProfile,
  getUserRegData,
  getUserPassesAndAccommodations,
  getUserBySerialId,
};
