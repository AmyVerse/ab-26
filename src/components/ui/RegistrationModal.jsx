import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthProvider";
import { useToast } from "../../contexts/ToastContext";
import { getEventById } from "../../lib/event-client";
import {
  isUserRegisteredForEvent,
  registerForIndividualEvent,
} from "../../lib/registration-client";
import { createTeam } from "../../lib/team-client";
import { useAuthModal } from "../auth/ModalAuthLayout";

const styles = {
  overlay:
    "fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-999 p-4",
  modal:
    "bg-[#0f0f0f] rounded-2xl border border-yellow-500/20 shadow-2xl w-[90vw] md:w-full md:max-w-2xl max-h-[80vh] overflow-y-auto",
  header:
    "sticky top-0 flex justify-between items-center px-6 py-5 border-b border-white/10 bg-gradient-to-r from-yellow-900/20 to-transparent",
  title: "text-2xl font-bold text-white",
  closeBtn:
    "text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer",
  section: "p-6 space-y-4",
  sectionTitle: "text-lg font-semibold text-white mb-2",
  label: "block text-sm font-medium text-gray-300 mb-2",
  input:
    "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition",
  textarea:
    "w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition resize-none",
  button:
    "w-full px-4 py-2.5 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  secondaryBtn:
    "w-full px-4 py-2.5 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 border border-white/20 transition-all duration-200",
  infoText: "text-sm text-gray-400",
};

export default function RegistrationModal({ eventId, onClose, onSuccess }) {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const { openAuth } = useAuthModal();

  // State management
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  // Individual registration state
  const [submissionString, setSubmissionString] = useState("");

  // Team registration state
  const [teamName, setTeamName] = useState("");
  const [isTeamLeader, setIsTeamLeader] = useState(false);

  // Load event data on mount
  useEffect(() => {
    if (!eventId) return;

    const loadEvent = async () => {
      try {
        setLoading(true);
        const result = await getEventById(eventId);

        if (result.success) {
          setEvent(result.event);
        } else {
          showToast(result.error || "Failed to load event", "error");
        }
      } catch (err) {
        console.error("Error loading event:", err);
        showToast("Failed to load event", "error");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId, showToast]);

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      showToast("Please login to register", "error");
      openAuth("signin");
      onClose();
    }
  }, [isAuthenticated, showToast, openAuth, onClose]);

  // Check if user is team leader (has participated as leader before)
  useEffect(() => {
    if (!user || !eventId || !event?.isTeamEvent) return;

    const checkTeamLeader = async () => {
      const isRegistered = await isUserRegisteredForEvent(user.id, eventId);
      setIsTeamLeader(isRegistered); // If they're registered, they can be leader
    };

    checkTeamLeader();
  }, [user, eventId, event]);

  // Handle individual registration
  const handleIndividualRegister = async () => {
    try {
      setRegistering(true);

      // Check if already registered
      const alreadyRegistered = await isUserRegisteredForEvent(
        user.id,
        eventId,
      );
      if (alreadyRegistered) {
        showToast("Already registered for this event", "error");
        setRegistering(false);
        return;
      }

      // Register (submission string is optional)
      const result = await registerForIndividualEvent(
        user.id,
        eventId,
        submissionString || "",
      );

      if (result.success) {
        showToast("Successfully registered!", "success");
        if (onSuccess) onSuccess();
        setTimeout(() => onClose(), 800);
      } else {
        showToast(result.error || "Registration failed", "error");
      }
    } catch (err) {
      console.error("Registration error:", err);
      showToast("Registration error", "error");
    } finally {
      setRegistering(false);
    }
  };

  // Handle team registration
  const handleTeamRegister = async () => {
    try {
      if (!teamName.trim()) {
        showToast("Please enter a team name", "error");
        return;
      }

      setRegistering(true);

      // Check if already registered
      const alreadyRegistered = await isUserRegisteredForEvent(
        user.id,
        eventId,
      );
      if (alreadyRegistered) {
        showToast("Already registered for this event", "error");
        setRegistering(false);
        return;
      }

      // Create team
      const result = await createTeam({
        userId: user.id,
        eventId,
        teamName: teamName.trim(),
      });

      if (result.success) {
        showToast("Team created successfully!", "success");
        if (onSuccess) onSuccess();
        setTimeout(() => onClose(), 800);
      } else {
        showToast(result.error || "Team creation failed", "error");
      }
    } catch (err) {
      console.error("Team creation error:", err);
      showToast("Team creation error", "error");
    } finally {
      setRegistering(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.overlay}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>Loading...</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
          <div className={styles.section}>
            <p className="text-gray-400">Loading event details...</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Event not found
  if (!event) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.overlay}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>Event Not Found</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
          <div className={styles.section}>
            <p className="text-red-400">Could not load event details</p>
            <button onClick={onClose} className={styles.secondaryBtn}>
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Individual Event Registration
  if (!event.isTeamEvent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.overlay}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>{event.name}</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className={styles.section}>
            {/* Event info */}
            <div>
              <p className={styles.infoText}>
                <span className="text-gray-300 font-medium">Club:</span>{" "}
                {event.club}
              </p>
              <p className={styles.infoText + " mt-2"}>
                Register for this event now.
              </p>
            </div>

            {/* Submission input */}
            <div>
              <label className="block text-base font-medium text-gray-300 mb-2">
                Submission Link{" "}
                <span className="text-gray-400 text-sm font-normal">
                  (Optional)
                </span>
              </label>
              <textarea
                rows="4"
                placeholder="Paste your submission link (Google Drive, GitHub, etc.)"
                value={submissionString}
                onChange={(e) => setSubmissionString(e.target.value)}
                disabled={registering}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-base placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition resize-none disabled:opacity-50"
              />
              <p className="text-sm text-gray-400 mt-1">
                You can add submission details after registration if needed
              </p>
            </div>

            {/* Register button */}
            <button
              onClick={handleIndividualRegister}
              disabled={registering}
              className={styles.button}
            >
              {registering ? "Registering..." : "Register Now"}
            </button>

            {/* Close button */}
            <button onClick={onClose} className={styles.secondaryBtn}>
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Team Event Registration
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.overlay}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{event.name}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <div className={styles.section}>
          {/* Event info */}
          <div>
            <p className={styles.infoText}>
              <span className="text-gray-300 font-medium">Club:</span>{" "}
              {event.club}
            </p>
            <p className={styles.infoText + " mt-2"}>
              <span className="text-gray-300 font-medium">Team Size:</span>{" "}
              {event.minTeamSize}-{event.maxTeamSize} members
            </p>
            {isTeamLeader && (
              <p className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-sm">
                You are registered as a team leader for this event
              </p>
            )}
          </div>

          {/* Team name input */}
          <div>
            <label className={styles.label}>Team Name</label>
            <input
              type="text"
              placeholder="Enter your team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              disabled={registering}
              className={styles.input + " disabled:opacity-50"}
            />
            <p className={styles.infoText + " mt-1"}>
              Choose a unique name for your team
            </p>
          </div>

          {/* Register button */}
          <button
            onClick={handleTeamRegister}
            disabled={registering}
            className={styles.button}
          >
            {registering ? "Creating Team..." : "Create Team"}
          </button>

          {/* Close button */}
          <button onClick={onClose} className={styles.secondaryBtn}>
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
