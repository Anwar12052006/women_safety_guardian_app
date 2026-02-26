import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import illustration from "../assets/illustration.jpg";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-white">
        {/*  HERO SECTION */}
        <section className="container mx-auto px-6 py-24 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
              Empowering Women & Children with Smart Safety Solutions
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl">
              A trusted digital platform designed to protect women, girls, and children.
              Access quick emergency support, report incidents, and stay connected
              with safety tools built for real-world situations.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                to="/report"
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl
                shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
              >
                Report Incident
              </Link>

              <Link
                to="/how-it-works"
                className="px-8 py-4 border-2 border-slate-700 text-slate-300 rounded-xl
                hover:bg-slate-800 hover:text-white hover:border-slate-600 hover:scale-105
                transition-all duration-300"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300">
              <img
                src={illustration}
                alt="Women Safety Illustration"
                className="w-80 h-80 object-contain rounded-2xl opacity-90"
              />
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER  */}
        <div className="h-24 bg-[#0f172a] rounded-t-[3rem] -mt-12 border-t border-gray-800/50"></div>

        {/*  FEATURES SECTION =*/}
        <section className="bg-[#0f172a] text-gray-200 py-20 pb-32">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
              Key Safety Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

              <div className="p-8 rounded-2xl bg-[#111827] border border-gray-800 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-white">🚨 Quick SOS Alerts</h3>
                <p className="text-gray-400">
                  Instantly send emergency alerts with your live location to
                  trusted contacts and authorities.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#111827] border border-gray-800 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-white">📝 Incident Reporting</h3>
                <p className="text-gray-400">
                  Report incidents securely with location, images, and detailed
                  descriptions.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#111827] border border-gray-800 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-white">🏠 Leave Home Alert</h3>
                <p className="text-gray-400">
                  Inform your trusted contacts when you step out and get alerts if
                  you don’t return on time.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 text-center bg-slate-950 border-t border-[#111827]">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            Your Safety Matters
          </h2>

          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl">
            Our vision is to build a society where women and children can live,
            move, and grow without fear — supported by technology and community.
          </p>

          <Link
            to="/signup"
            className="inline-block px-10 py-5 bg-indigo-600 text-white
            font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105
            transition-all duration-300"
          >
            Get Started
          </Link>
        </section>
      </main>
    </>
  );
};

export default HomePage;
