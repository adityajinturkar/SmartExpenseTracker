import {
  FaWallet,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-3">
              <FaWallet className="text-3xl text-blue-500" />
              <h2 className="text-2xl font-bold text-white">SmartExpenseAI</h2>
            </div>

            <p className="mt-4 text-gray-400 leading-7">
              AI-powered expense tracking platform that helps you manage income,
              expenses and gain smart financial insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <a href="#home" className="hover:text-blue-400 transition">
                Home
              </a>

              <a href="#dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </a>

              <a href="#features" className="hover:text-blue-400 transition">
                Features
              </a>

              <a href="#about" className="hover:text-blue-400 transition">
                About
              </a>

              <a href="#contact" className="hover:text-blue-400 transition">
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>

            <div className="space-y-3">
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                adityajinturkar9699@gmail.com
              </p>

              <p>📞 +91 96996 55131</p>

              <p>📍 Pune, Maharashtra, India</p>
            </div>

            <div className="flex gap-5 mt-6 text-2xl">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SmartExpenseAI. All Rights Reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            Made with <FaHeart className="text-red-500" /> by Aditya Jinturkar
          </p>
        </div>
      </div>
    </footer>
  );
}
