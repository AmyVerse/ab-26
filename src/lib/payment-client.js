const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const createPaymentOrder = async ({
  userId,
  amount,
  eventId,
  teamId,
}) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        amount,
        eventId,
        teamId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create payment order");
    }

    return data;
  } catch (error) {
    console.error("Payment order creation failed:", error.message);
    throw error;
  }
};

export const completePayment = async (paymentData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/payment/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Payment verification failed: ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Payment verification error:", error.message);
    throw error;
  }
};

export const checkPaymentStatus = async (orderId, userId) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/payment/status/${orderId}?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch payment status");
    }

    return data;
  } catch (error) {
    console.error("Payment status check failed:", error.message);
    throw error;
  }
};

export const initializeRazorpay = (
  orderData,
  userDetails,
  onSuccess,
  onError,
) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "AB26 Event",
        description: "Event Registration Payment",
        handler: function (response) {
          if (onSuccess) {
            onSuccess(response);
          }
          resolve(response);
        },
        prefill: {
          name: userDetails.name || "Guest User",
          email: userDetails.email || "",
          contact: userDetails.contact || "",
        },
        theme: {
          color: "#667eea",
        },
        modal: {
          ondismiss: function () {
            if (onError) {
              onError("Payment cancelled by user");
            }
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        const errorMsg = `Payment failed: ${response.error.description}`;
        if (onError) {
          onError(errorMsg);
        }
        reject(new Error(errorMsg));
      });

      rzp.open();
    };
    script.onerror = () => {
      reject(new Error("Failed to load Razorpay script"));
    };
    document.body.appendChild(script);
  });
};
