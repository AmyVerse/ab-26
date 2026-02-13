import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useToast } from "../../contexts/ToastContext";
import {
  completePayment,
  createPaymentOrder,
  initializeRazorpay,
} from "../../lib/payment-client";
import { useAuthModal } from "../auth/ModalAuthLayout";
import PaymentFailureModal from "./PaymentFailureModal";
import PaymentSuccessModal from "./PaymentSuccessModal";

const MinimalPayButton = ({
  amount = 500,
  eventId = null,
  teamId = null,
  contact = null,
  title = "AB26 Payment",
  description = "Event Registration",
  className = "",
  children = "Pay Now",
}) => {
  const { user, isAuthenticated } = useAuth();
  const { openAuth } = useAuthModal();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [paymentError, setPaymentError] = useState("");

  const handlePayment = async () => {
    if (!isAuthenticated) {
      showToast("Please login to make payment", "error");
      openAuth("signin");
      return;
    }

    if (isProcessing) return;

    try {
      setIsProcessing(true);

      // create payment order
      const orderData = await createPaymentOrder({
        userId: user.id,
        amount,
        eventId,
        teamId,
      });

      // initialize razorpay
      await initializeRazorpay(
        orderData,
        {
          name: user.name || user.firstName + " " + user.lastName,
          email: user.email,
          contact: contact || user.contact || "",
        },
        async (response) => {
          try {
            // verify payment
            const verificationResult = await completePayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.id,
            });

            // Set payment result for success modal
            setPaymentResult({
              ...response,
              amount: orderData.amount,
              verificationResult,
            });
            setShowSuccessModal(true);
          } catch (error) {
            setPaymentError(error.message || "Payment verification failed");
            setShowFailureModal(true);
          }
        },
        (error) => {
          setPaymentError(error || "Payment was cancelled or failed");
          setShowFailureModal(true);
        },
      );
    } catch (error) {
      setPaymentError(error.message || "Payment failed");
      setShowFailureModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetryPayment = () => {
    handlePayment();
  };

  const handleViewDashboard = () => {
    // Navigate to dashboard - you can customize this
    window.location.href = "/";
  };

  const handleContactSupport = () => {
    // Open support contact - you can customize this
    window.open("mailto:abhivyakti@iiitn.ac.in", "_blank");
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`
          px-6 py-3 
          bg-linear-to-r from-purple-600 to-blue-600 
          hover:from-purple-700 hover:to-blue-700 
          text-white font-medium rounded-lg 
          transition-all duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {isProcessing ? "Processing..." : children}
      </button>

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        paymentData={paymentResult}
        onViewDashboard={handleViewDashboard}
      />

      {/* Failure Modal */}
      <PaymentFailureModal
        isOpen={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        error={paymentError}
        onRetry={handleRetryPayment}
        onSupportContact={handleContactSupport}
      />
    </>
  );
};

export default MinimalPayButton;
