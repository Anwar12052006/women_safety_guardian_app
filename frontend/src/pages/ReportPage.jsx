import Navbar from "../components/layout/Navbar";
import { useState, useEffect } from "react";

const ReportPage = () => {
  const [user, setUser] = useState(null);

  const [location, setLocation] = useState(null);

  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchTemplates = async () => {

      try {

        const res =
          await fetch("https://new-women-safety-app.onrender.com/api/templates");

        const data =
          await res.json();

        if (data.success) {

          setTemplates(data.data);

        }

      } catch (error) {

        console.error("Template fetch error:", error);

      }

    };

    fetchTemplates();

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(JSON.parse(storedUser));

    }

  }, []);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Location error:", err);
      }
    );

  }, []);

  const generatePreview = () => {

    const template = templates.find(
      t => t.key === selected
    );

    if (!template) return;

    const now = new Date();

    const description =
      template.descriptionTemplate
        .replace("{name}", name)
        .replace("{reportedBy}", user?.name || "Anonymous")
        .replace("{date}", now.toLocaleDateString())
        .replace("{time}", now.toLocaleTimeString())
        .replace("{location}", "User current location");

    setPreview({
      ...template,
      description,
    });

  };



  const submitReport = async () => {

    console.log("Sending location:", location);

    if (!preview) {
      alert("Generate report first");
      return;
    }

    if (!location || !location.lat || !location.lng) {
      alert("Waiting for location... Please allow location access.");
      return;
    }

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "https://new-women-safety-app.onrender.com/api/incidents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            type:
              preview.category?.toLowerCase().includes("theft")
                ? "theft"
                : preview.category?.toLowerCase().includes("assault")
                  ? "assault"
                  : preview.category?.toLowerCase().includes("stalking")
                    ? "harassment"
                    : preview.category?.toLowerCase().includes("suspicious")
                      ? "suspicious"
                      : "other",

            suspectName: name,
            description: preview.description,
            severity: preview.priority === "CRITICAL" ? 5 : 3,

            location: {
              type: "Point",
              coordinates: [
                Number(location.lng),
                Number(location.lat)
              ]
            },
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + data.message);
        return;
      }

      alert("Report submitted successfully");

      setName("");
      setPreview(null);
      setSelected(null);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const Card = ({ type, label }) => (

    <button
      onClick={() => {
        setSelected(type);
        setPreview(null);
      }}
      className={`
      p-4 sm:p-5 rounded-xl
      border text-left
      transition-all duration-200

      ${selected === type
          ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
          : "bg-slate-900/50 hover:bg-slate-800 border-gray-800 text-gray-300 hover:border-gray-600"
        }
      `}
    >

      <div className="font-semibold">
        {label}
      </div>

      <div className="text-xs opacity-70">
        Click to select template
      </div>

    </button>

  );

  return (
    <>
      <Navbar />

      <div className="
      min-h-[calc(100vh-64px)]
      bg-slate-950
      p-4 sm:p-6 lg:p-10
      ">

        <div className="
        max-w-5xl mx-auto
        bg-[#111827]
        border border-gray-800
        rounded-2xl
        shadow-2xl
        p-4 sm:p-6 lg:p-8
        ">

          <h1 className="
          text-xl sm:text-2xl
          font-bold mb-6 text-white
          ">
            Report Incident
          </h1>

          {/* TEMPLATE GRID */}

          <div className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
          ">



            {templates.map((template) => (

              <Card
                key={template._id}
                type={template.key}
                label={template.title}
              />

            ))}


          </div>

          {/* NAME INPUT */}

          <div className="mt-6">

            <input
              type="text"
              placeholder="Enter suspect name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }

              className="
              w-full p-3
              bg-slate-900/50
              border border-gray-800 rounded-lg
              text-white placeholder-gray-500
              focus:outline-none focus:border-indigo-500
              focus:ring-1 focus:ring-indigo-500
              transition-all
              "
            />

          </div>

          {/* GENERATE BUTTON */}

          <button
            onClick={generatePreview}

            className="
            mt-4
            w-full sm:w-auto
            bg-indigo-600
            text-white font-semibold
            px-6 py-3
            rounded-lg shadow-lg shadow-indigo-500/20
            hover:shadow-indigo-500/40 hover:-translate-y-0.5
            transition-all duration-300
            "
          >

            Generate Report

          </button>

          {/* PREVIEW */}

          {preview && (

            <div className="
            mt-6
            bg-slate-900/50
            border border-gray-800
            p-5
            rounded-xl
            ">

              <h2 className="
              font-bold mb-3 text-indigo-400 text-lg
              ">
                {preview.title}
              </h2>

              <pre className="
              text-sm whitespace-pre-wrap text-gray-300 font-sans leading-relaxed
              ">
                {preview.description}
              </pre>

              <button
                onClick={submitReport}

                disabled={loading || !location}

                className={`
                mt-6
                ${loading || !location ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-0.5'}
                font-semibold
                px-6 py-3
                rounded-lg
                w-full sm:w-auto
                transition-all duration-300
                `}
              >

                {loading
                  ? "Submitting..."
                  : "Submit Report"}

              </button>

            </div>

          )}

        </div>

      </div>

    </>
  );

};

export default ReportPage;

