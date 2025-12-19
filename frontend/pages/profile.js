import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Cookie from "js-cookie";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import Loader from "@/components/Loader";

const USER_PROFILE_QUERY = gql`
  query GetUserProfile {
    userProfile {
      _id
      firstName
      lastName
      username
      email
      phoneNumber
      addresses {
        address
        city
        state
        zipCode
        isPrimary
      }
      role
      createdAt
      updatedAt
    }
  }
`;

export default function ProfilePage() {
  const { user: contextUser } = useAppContext();
  const router = useRouter();
  const token = Cookie.get("token");

  const { loading, error, data } = useQuery(USER_PROFILE_QUERY, {
    skip: !token, // Skip query if not logged in
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  useEffect(() => {
    if (!contextUser) {
      router.push("/login");
    }
  }, [contextUser, router]);

  if (!contextUser) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base/10 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-xl text-red-600">Error loading profile</p>
            <p className="text-gray-600 mt-2">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const user = data?.userProfile;

  if (!user) {
    return (
      <div className="min-h-screen bg-base/10 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-xl text-gray-600">Profile not found</p>
          </div>
        </div>
      </div>
    );
  }

  const primaryAddress = user.addresses?.find((addr) => addr.isPrimary) || user.addresses?.[0];

  return (
    <div className="min-h-screen bg-base/10 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <FaUserCircle className="text-primary text-7xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-lg opacity-90">{user.username}</p>
                <p className="text-sm mt-1 opacity-75 capitalize">
                  {user.role || "Customer"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                  Personal Information
                </h3>

                <div className="flex items-start gap-3">
                  <FaUser className="text-primary text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaUser className="text-primary text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {user.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-primary text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaPhone className="text-primary text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {user.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                  Address Information
                </h3>

                {user.addresses && user.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {user.addresses.map((address, index) => (
                      <div
                        key={address._id?.$oid || index}
                        className={`p-4 rounded-lg border-2 ${
                          address.isPrimary
                            ? "border-primary bg-primary/5"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                          <div className="flex-1">
                            {address.isPrimary && (
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary text-white rounded-full mb-2">
                                Primary
                              </span>
                            )}
                            <p className="text-sm text-gray-600">
                              Address {index + 1}
                            </p>
                            <p className="text-base font-semibold text-gray-800">
                              {address.address}
                            </p>
                            <p className="text-base text-gray-700">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-lg text-gray-500">No address provided</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Details */}
            {(user.createdAt || user.updatedAt) && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Account Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  {user.createdAt && (
                    <div>
                      <span className="font-semibold">Member since:</span>{" "}
                      {new Date(user.createdAt.$date || user.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  )}
                  {user.updatedAt && (
                    <div>
                      <span className="font-semibold">Last updated:</span>{" "}
                      {new Date(user.updatedAt.$date || user.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
