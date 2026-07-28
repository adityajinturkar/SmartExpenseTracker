import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="mt-16 sm:mt-20 lg:mt-24 mb-16 sm:mb-20 px-4 sm:px-6"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Email */}
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8
          text-center transition-all duration-300
          hover:-translate-y-2 hover:shadow-2xl
          flex flex-col items-center justify-center min-h-[220px]"
        >
          <FaEnvelope className="text-4xl sm:text-5xl text-blue-600 mb-5" />

          <h3 className="font-semibold text-xl dark:text-white">Email</h3>

          <p className="text-gray-500 dark:text-gray-400 mt-3 break-all">
            adityajinturkar9699@gmail.com
          </p>
        </div>

        {/* Phone */}
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8
          text-center transition-all duration-300
          hover:-translate-y-2 hover:shadow-2xl
          flex flex-col items-center justify-center min-h-[220px]"
        >
          <FaPhoneAlt className="text-4xl sm:text-5xl text-green-600 mb-5" />

          <h3 className="font-semibold text-xl dark:text-white">Phone</h3>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            +91 96996 55131
          </p>
        </div>

        {/* Location */}
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8
          text-center transition-all duration-300
          hover:-translate-y-2 hover:shadow-2xl
          flex flex-col items-center justify-center min-h-[220px]"
        >
          <FaMapMarkerAlt className="text-4xl sm:text-5xl text-red-500 mb-5" />

          <h3 className="font-semibold text-xl dark:text-white">Location</h3>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Pune, Maharashtra, India
          </p>
        </div>
      </div>
    </section>
  );
}
