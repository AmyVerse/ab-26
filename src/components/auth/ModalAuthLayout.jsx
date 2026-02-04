import { useEffect, useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { ForgotPassword, SignIn, SignUp } from "./";

const ModalAuthLayout = () => {
  const { mode, step, isOpen, closeAuth, switchAuthMode } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // escape key
  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && closeAuth();
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeAuth]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeAuth}
    >
      <div
        className={`relative bg-white rounded-lg shadow-xl w-7xl overflow-y-auto transform transition-all duration-300 ease-out ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors bg-white rounded-full p-1"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="bg-white rounded-lg">
          <div className="w-full">
            {mode === "signin" && (
              <SignIn
                onSwitchToSignUp={() => switchAuthMode("signup")}
                onSwitchToForgotPassword={() =>
                  switchAuthMode("forgot-password")
                }
                currentStep={step}
              />
            )}
            {mode === "signup" && (
              <SignUp
                onSwitchToSignIn={() => switchAuthMode("signin")}
                currentStep={step}
              />
            )}
            {mode === "forgot-password" && (
              <ForgotPassword
                onSwitchToSignIn={() => switchAuthMode("signin")}
                currentStep={step}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAuthLayout;
