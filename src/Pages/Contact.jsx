import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(""); // error state

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // Validation: check for empty fields
    if (!formData.name || !formData.email || !formData.message) {
      setError("⚠ Please fill all fields before sending!");
      setTimeout(() => setError(""), 4000); // hide error after 4 seconds
      return;
    }

    setError(""); // clear any previous error
    console.log("Form Data:", formData); // optional: see data in console
    setSubmitted(true); // show success message
    setFormData({ name: "", email: "", message: "" }); // reset form

    setTimeout(() => setSubmitted(false), 5000); // hide success after 5 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-10">
          Get in Touch with <span className="text-red-400">Axiora</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Info Section */}
          <div className="text-white space-y-5 sm:space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold">
                Contact Info
              </h3>
              <p className="text-gray-300 mt-2 sm:mt-3 text-sm sm:text-base">
                Have a question or need support? We're here to help you with
                phones, smart gadgets, mobile accessories, shoes, watches, and
                sports gear.
              </p>
            </div>
            <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <p>
                <strong>📍 Address:</strong> 123 Tech Lane, Rajkot, India
              </p>
              <p>
                <strong>📧 Email:</strong> support@axiora.com
              </p>
              <p>
                <strong>📞 Phone:</strong> +91 99041 43421
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white mb-1 text-sm sm:text-base">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 sm:py-3 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-white mb-1 text-sm sm:text-base">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 sm:py-3 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-white mb-1 text-sm sm:text-base">
                Your Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="w-full px-4 py-2 sm:py-3 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-2 sm:py-3 rounded-xl hover:opacity-90 transition-all duration-300"
            >
              Send Message
            </button>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-center mt-2 font-medium">
                {error}
              </p>
            )}

            {/* Success Message */}
            {submitted && (
              <p className="text-green-400 text-center mt-2 font-medium">
                ✅ Your message has been sent!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
