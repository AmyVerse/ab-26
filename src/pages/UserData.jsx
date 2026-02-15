import { useEffect, useState } from "react";
import TeamModal from "../components/ui/TeamModal";
import { useAuth } from "../contexts/AuthProvider";
import {
  getUserPassesAndAccommodations,
  getUserProfile,
  getUserRegData,
} from "../lib/user-client";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="bg-gray-800 animate-pulse h-12 rounded-lg"></div>
);

const SkeletonTable = () => (
  <div className="space-y-2">
    <SkeletonLoader />
    <SkeletonLoader />
    <SkeletonLoader />
  </div>
);

const UserData = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [regData, setRegData] = useState(null);
  const [passesAccData, setPassesAccData] = useState(null);
  const [error, setError] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      try {
        setError(null);

        const [profile, reg, passesAcc] = await Promise.all([
          getUserProfile(user.id),
          getUserRegData(user.id),
          getUserPassesAndAccommodations(user.id),
        ]);

        setProfileData(profile);
        setRegData(reg);
        setPassesAccData(passesAcc);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [user?.id]);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setShowTeamModal(true);
  };

  const handleCloseTeamModal = () => {
    setShowTeamModal(false);
    setSelectedTeam(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      </div>
    );
  }

  const profileUser = profileData?.user;
  const regUser = regData?.user;
  const passesData = passesAccData?.passes;
  const accommodationsData = passesAccData?.accommodations;

  return (
    <div className="min-h-screen pt-32 md:pt-32 bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header with Red Line */}
        <div className="mb-12">
          {/* Title Row with Red Line */}
          <div className="relative w-full flex justify-center mb-8">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4/5 h-0.5"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(220, 38, 38, 0.9) 20%, rgba(220, 38, 38, 1) 50%, rgba(220, 38, 38, 0.9) 80%, transparent 100%)",
                boxShadow: "0 0 6px rgba(220, 38, 38, 0.6)",
              }}
            ></div>
            <h1
              className="text-xl md:text-2xl font-bold text-white px-8 bg-black relative z-10"
              style={{ fontFamily: "var(--font-besta-baru)" }}
            >
              PROFILE
            </h1>
          </div>

          {/* User Name and Details */}
          <div className="text-center pt-4 space-y-4">
            <h2
              className="text-3xl md:text-4xl font-semibold text-yellow-500"
              style={{ fontFamily: "var(--font-aquila)" }}
            >
              {profileUser?.name || <SkeletonLoader />}
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="inline-flex items-center px-2 rounded-lg bg-black border border-red-600">
                <span className="text-gray-400 text-sm mr-2">AB ID:</span>
                <span className="text-red-500 font-bold text-lg">
                  {profileUser?.serialId ? (
                    `AB${String(profileUser.serialId).padStart(5, "0")}`
                  ) : (
                    <SkeletonLoader />
                  )}
                </span>
              </div>
            </div>
            <p className="text-gray-400">
              {profileUser?.email || <SkeletonLoader />}
            </p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Profile Information
            </h2>
            <div className="space-y-3">
              {!profileUser ? (
                <SkeletonTable />
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-medium">
                      {profileUser?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white font-medium">
                      {profileUser?.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white font-medium">
                      {profileUser?.phoneNumber || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">College:</span>
                    <span className="text-white font-medium">
                      {profileUser?.collegeName || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date of Birth:</span>
                    <span className="text-white font-medium">
                      {profileUser?.date_of_birth || "Not provided"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Teams Card */}
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Teams
            </h2>
            {!regUser ? (
              <SkeletonTable />
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Teams Leading</h3>
                  {regUser?.teamsLeading?.length > 0 ? (
                    <div className="space-y-2">
                      {regUser.teamsLeading.map((team) => (
                        <div
                          key={team.id}
                          className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded px-3 py-2 hover:bg-gray-800 transition-all"
                        >
                          <span className="text-white text-sm font-medium">
                            {team.name}
                          </span>
                          <button
                            onClick={() => handleTeamClick(team)}
                            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-all cursor-pointer"
                          >
                            View Team
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      No teams leading
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Teams Member</h3>
                  {regUser?.teamsMember?.length > 0 ? (
                    <div className="space-y-2">
                      {regUser.teamsMember.map((team) => (
                        <div
                          key={team.id}
                          className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded px-3 py-2 hover:bg-gray-800 transition-all"
                        >
                          <span className="text-white text-sm font-medium">
                            {team.name}
                          </span>
                          <button
                            onClick={() => handleTeamClick(team)}
                            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-all cursor-pointer"
                          >
                            View Team
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      Not in any teams
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Registrations */}
        <div className="mb-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Registrations
            </h2>
            {!regUser ? (
              <SkeletonTable />
            ) : regUser?.registrations?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Event ID
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Status
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Registered At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {regUser.registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td className="px-4 py-3 text-white">
                          {reg.eventId || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-red-400 border border-red-600">
                            {reg.status || "Active"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {reg.created_at
                            ? new Date(reg.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No registrations yet</p>
            )}
          </div>
        </div>

        {/* Passes */}
        <div className="mb-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Passes
            </h2>
            {!passesData ? (
              <SkeletonTable />
            ) : passesData?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-sm text-gray-400">Sr No</th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Pass Name
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Status
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {passesData.map((pass, idx) => (
                      <tr key={pass.id}>
                        <td className="px-4 py-3 text-white font-medium">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 text-white">
                          {pass.passType?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-red-400 border border-red-600 capitalize">
                            {pass.transaction?.status || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {pass.transaction?.created_at
                            ? new Date(
                                pass.transaction.created_at,
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No passes purchased</p>
            )}
          </div>
        </div>

        {/* Accommodations */}
        <div className="mb-8">
          <div className="bg-black border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-700 pb-3">
              Accommodation Bookings
            </h2>
            {!accommodationsData ? (
              <SkeletonTable />
            ) : accommodationsData?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-sm text-gray-400">Sr No</th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Accommodation Name
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">
                        Status
                      </th>
                      <th className="px-4 py-3 text-sm text-gray-400">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {accommodationsData.map((booking, idx) => (
                      <tr key={booking.id}>
                        <td className="px-4 py-3 text-white font-medium">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3 text-white">
                          {booking.accommodationType?.name || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-red-400 border border-red-600 capitalize">
                            {booking.transaction?.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">
                          {booking.transaction?.created_at
                            ? new Date(
                                booking.transaction.created_at,
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No accommodation bookings</p>
            )}
          </div>
        </div>
      </div>

      {/* Team Modal */}
      {showTeamModal && selectedTeam && (
        <TeamModal
          teamId={selectedTeam.id}
          eventId={selectedTeam.eventId}
          onClose={handleCloseTeamModal}
          onSuccess={handleCloseTeamModal}
        />
      )}
    </div>
  );
};

export default UserData;
