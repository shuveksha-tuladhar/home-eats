import React from "react";

export default function Register({
  title,
  buttonText,
  formData,
  setFormData,
  callback,
  error,
  demoClick,
}) {
  return (
    <div className="container px-4 mx-auto">
      <div className="max-w-sm mx-auto">
        <div className="mb-6 text-center">
          <h3 className="mb-4 text-2xl md:text-3xl font-bold">{title}</h3>
        </div>
        <form onSubmit={callback}>
          <div className="mb-6 flex gap-4">
            <div className="w-1/2">
              <label
                className="block mb-2 text-coolGray-800 font-medium"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                id="firstName"
                className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="w-1/2">
              <label
                className="block mb-2 text-coolGray-800 font-medium"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-coolGray-800 font-medium">
              Address
            </label>
            <div className="mb-2">
              <input
                id="street"
                className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                name="street"
                placeholder="Street"
                value={formData.addresses.address || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addresses: {
                      ...formData.addresses,
                      address: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <input
                id="city"
                className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                name="city"
                placeholder="City"
                value={formData.addresses.city || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addresses: { ...formData.addresses, city: e.target.value },
                  })
                }
              />
            </div>
            <div className="mb-2 flex gap-2">
              <input
                id="state"
                className="appearance-none block w-1/2 p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                name="state"
                placeholder="State"
                value={formData.addresses.state || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addresses: { ...formData.addresses, state: e.target.value },
                  })
                }
              />
              <input
                id="zipcode"
                className="appearance-none block w-1/2 p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                value={formData.addresses.zipCode || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    addresses: {
                      ...formData.addresses,
                      zipCode: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-coolGray-800 font-medium"
              htmlFor="phoneNumber"
            >
              Phone
            </label>
            <input
              id="phoneNumber"
              className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-coolGray-800 font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-coolGray-800 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="password"
              name="password"
              placeholder="************"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          {error && (
            <div className="text-center my-4 text-red-600">
              Error: {error.message}
            </div>
          )}
          <button
            className="inline-block py-3 px-7 mb-6 w-full text-base font-medium text-center leading-6 bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
            type="submit"
          >
            {buttonText}
          </button>
          <button
            className="inline-block py-3 px-7 mb-6 w-full text-base font-medium text-center leading-6 bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
            onClick={demoClick}
          >
            Demo Login
          </button>
        </form>
      </div>
    </div>
  );
}
