import { useState, useEffect, useRef } from "react";

// ─── Design tokens ──────────────────────────────────────────────────────────
const COLORS = {
  teal: "#0F6E56",
  tealLight: "#E1F5EE",
  tealMid: "#1D9E75",
  coral: "#D85A30",
  coralLight: "#FAECE7",
  amber: "#BA7517",
  amberLight: "#FAEEDA",
  green: "#3B6D11",
  greenLight: "#EAF3DE",
  red: "#A32D2D",
  redLight: "#FCEBEB",
  gray: "#5F5E5A",
  grayLight: "#F1EFE8",
  grayMid: "#D3D1C7",
  purple: "#534AB7",
  purpleLight: "#EEEDFE",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #f5f3ef;
    min-height: 100vh;
    color: #2C2C2A;
  }

  .app-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;

  background: 
    linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),
    url("https://images.unsplash.com/photo-1580281658629-2bff1d3c66c7");

  background-size: cover;
  background-position: center;
 }

  .card {
    background: #fff;
    border-radius: 20px;
    border: 1px solid rgba(0,0,0,0.07);
    width: 100%;
    max-width: 440px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  .card-header {
    padding: 28px 28px 20px;
    border-bottom: 1px solid #f0ece6;
  }

  .card-body { padding: 24px 28px; }
  .card-footer { padding: 16px 28px 24px; border-top: 1px solid #f0ece6; }

  .clinic-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #E1F5EE;
    color: #0F6E56;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 10px;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    color: #1a1a18;
    line-height: 1.25;
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 500;
    color: #1a1a18;
    margin-bottom: 4px;
  }

  .sub {
    font-size: 13px;
    color: #888780;
    line-height: 1.6;
    margin-top: 6px;
  }

  .btn {
    display: block;
    width: 100%;
    padding: 13px 20px;
    border-radius: 12px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
    text-align: center;
  }

  .btn:active { transform: scale(0.98); }

  .btn-primary {
    background: #0F6E56;
    color: #fff;
  }
  .btn-primary:hover { background: #085041; }

  .btn-secondary {
    background: #F1EFE8;
    color: #444441;
  }
  .btn-secondary:hover { background: #D3D1C7; }

  .btn-outline {
    background: transparent;
    color: #0F6E56;
    border: 1px solid #0F6E56;
  }
  .btn-outline:hover { background: #E1F5EE; }

  .btn-ghost {
    background: transparent;
    color: #888780;
    border: 1px solid #D3D1C7;
  }
  .btn-ghost:hover { background: #F1EFE8; color: #444441; }

  .btn-danger {
    background: #FCEBEB;
    color: #A32D2D;
    border: 1px solid #F7C1C1;
  }
  .btn-danger:hover { background: #F7C1C1; }

  .btn-sm {
    padding: 8px 14px;
    font-size: 13px;
    border-radius: 9px;
  }

  .input-group { margin-bottom: 16px; }

  .input-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #888780;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }

  .input-field {
    width: 100%;
    padding: 11px 14px;
    border: 1px solid #D3D1C7;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: #2C2C2A;
    background: #fff;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .input-field:focus {
    border-color: #1D9E75;
    box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
  }
  .input-field::placeholder { color: #B4B2A9; }

  .mobile-prefix {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .prefix-tag {
    padding: 11px 12px;
    background: #F1EFE8;
    border: 1px solid #D3D1C7;
    border-right: none;
    border-radius: 10px 0 0 10px;
    font-size: 14px;
    color: #888780;
    font-weight: 500;
    white-space: nowrap;
  }
  .prefix-input {
    flex: 1;
    border-radius: 0 10px 10px 0 !important;
  }

  .otp-row {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 20px 0;
  }
  .otp-box {
    width: 48px;
    height: 56px;
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    border: 1.5px solid #D3D1C7;
    border-radius: 10px;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a18;
    background: #fff;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .otp-box:focus {
    border-color: #1D9E75;
    box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
  }
  .otp-box.filled { border-color: #1D9E75; background: #E1F5EE; }

  .timer {
    font-size: 13px;
    color: #888780;
    text-align: center;
    margin-bottom: 8px;
  }
  .timer span { color: #D85A30; font-weight: 500; }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 18px 0;
    color: #B4B2A9;
    font-size: 12px;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #D3D1C7;
  }

  .path-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 20px;
  }

  .path-card {
    border: 1.5px solid #D3D1C7;
    border-radius: 14px;
    padding: 18px 14px;
    text-align: center;
    cursor: pointer;
    transition: all 0.18s;
    background: #fff;
  }
  .path-card:hover { border-color: #1D9E75; background: #E1F5EE; transform: translateY(-2px); }
  .path-card:active { transform: translateY(0); }

  .path-icon {
    font-size: 26px;
    margin-bottom: 8px;
  }
  .path-title {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a18;
    margin-bottom: 4px;
  }
  .path-desc {
    font-size: 11px;
    color: #888780;
    line-height: 1.5;
  }

  .services-row {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 14px;
  }

  .service-pill {
    padding: 5px 12px;
    background: #F1EFE8;
    color: #5F5E5A;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 400;
  }

  .slot-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-top: 4px;
  }

  .slot-card {
    border: 1.5px solid #D3D1C7;
    border-radius: 11px;
    padding: 10px 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.16s;
    background: #fff;
    position: relative;
  }
  .slot-card:hover:not(.slot-booked) { border-color: #1D9E75; background: #E1F5EE; transform: translateY(-1px); }
  .slot-card.slot-selected { border-color: #0F6E56; background: #E1F5EE; border-width: 2px; }
  .slot-card.slot-booked { background: #F1EFE8; cursor: not-allowed; opacity: 0.6; }

  .slot-time { font-size: 13px; font-weight: 500; color: #1a1a18; }
  .slot-doctor { font-size: 10px; color: #888780; margin-top: 2px; }
  .slot-status {
    font-size: 9px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 4px;
  }
  .slot-status.avail { color: #3B6D11; }
  .slot-status.booked { color: #A32D2D; }

  .slot-check {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 18px;
    height: 18px;
    background: #0F6E56;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #fff;
  }

  .date-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  .date-tab {
    flex-shrink: 0;
    padding: 7px 14px;
    border-radius: 20px;
    border: 1px solid #D3D1C7;
    font-size: 12px;
    font-weight: 500;
    color: #888780;
    cursor: pointer;
    transition: all 0.15s;
    background: #fff;
  }
  .date-tab.active {
    background: #0F6E56;
    color: #fff;
    border-color: #0F6E56;
  }

  .user-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    background: #0F6E56;
    color: #fff;
  }
  .user-bar-name { font-size: 14px; font-weight: 500; }
  .user-bar-sub { font-size: 11px; opacity: 0.7; margin-top: 1px; }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 500;
    color: #fff;
    letter-spacing: 0.04em;
  }

  .confirm-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 100;
  }
  .confirm-modal {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 360px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }
  .modal-header {
    background: #0F6E56;
    color: #fff;
    padding: 20px 22px;
  }
  .modal-header h3 {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 500;
  }
  .modal-body { padding: 20px 22px; }
  .modal-footer { padding: 12px 22px 20px; display: flex; gap: 10px; }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 0;
    border-bottom: 1px solid #f0ece6;
    font-size: 13px;
  }
  .detail-row:last-child { border-bottom: none; }
  .detail-label { color: #888780; }
  .detail-value { font-weight: 500; color: #1a1a18; }

  .success-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #EAF3DE;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    font-size: 26px;
  }

  .alert {
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 13px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .alert-info { background: #E1F5EE; color: #085041; }
  .alert-error { background: #FCEBEB; color: #791F1F; }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #888780;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
    margin-bottom: 16px;
    transition: color 0.15s;
  }
  .back-btn:hover { color: #0F6E56; }

  .step-dots {
    display: flex;
    gap: 6px;
    justify-content: center;
    margin-top: 16px;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #D3D1C7;
    transition: all 0.2s;
  }
  .dot.active { background: #0F6E56; width: 18px; border-radius: 3px; }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  .anim { animation: fadeIn 0.28s ease; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner {
    width: 20px; height: 20px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
  }
  .tag-green { background: #EAF3DE; color: #27500A; }
  .tag-red   { background: #FCEBEB; color: #791F1F; }
`;

// ─── Data ────────────────────────────────────────────────────────────────────
const DOCTORS = ["Dr. Meera Nair", "Dr. Suresh Babu", "Dr. Priya Arjun"];
const SERVICES = ["General Consultation", "Cardiology", "Dermatology", "Paediatrics", "Orthopedics", "Dental"];

function buildSlots(dateLabel) {
  const times = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM"];
  return times.map((t, i) => ({
    id: `${dateLabel}-${i}`,
    time: t,
    doctor: DOCTORS[i % DOCTORS.length],
    booked: [1, 4, 7].includes(i),
  }));
}

const SLIDES = [
  "https://images.unsplash.com/photo-1584515933487-779824d29309",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54"
];

const DATES = [
  { label: "Today", key: "today" },
  { label: "Tomorrow", key: "tmrw" },
  { label: "Wed 26", key: "wed" },
  { label: "Thu 27", key: "thu" },
];

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [flow, setFlow] = useState(null); // "revisit" | "new"
  const [user, setUser] = useState(null);
  const [slotStore, setSlotStore] = useState(() => {
    const s = {};
    DATES.forEach(d => { s[d.key] = buildSlots(d.key); });
    return s;
  });
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingDone, setBookingDone] = useState(null);

  const slots = slotStore[selectedDate];

  const confirmBooking = () => {
    if (!selectedSlot) return;
    setSlotStore(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate].map(s =>
        s.id === selectedSlot.id ? { ...s, booked: true } : s
      ),
    }));
    setBookingDone({ slot: selectedSlot, date: DATES.find(d => d.key === selectedDate).label });
    setSelectedSlot(null);
    setShowConfirm(false);
    setScreen("success");
  };

  const goToDashboard = () => { setScreen("dashboard"); setBookingDone(null); };

  return (
    <>
      <style>{css}</style>
      <div className="app-shell">
        <div className="card">
          {screen === "welcome" && <WelcomeScreen onPath={(p) => { setFlow(p); setScreen("auth"); }} />}
          {screen === "auth" && <AuthScreen flow={flow} onDone={(u) => { setUser(u); setScreen("dashboard"); }} onBack={() => setScreen("welcome")} />}
          {screen === "dashboard" && (
            <DashboardScreen
              user={user}
              slots={slots}
              dates={DATES}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onSelectDate={(d) => { setSelectedDate(d); setSelectedSlot(null); }}
              onSelectSlot={(s) => { if (!s.booked) setSelectedSlot(s); }}
              onBook={() => { if (selectedSlot) setShowConfirm(true); }}
              onLogout={() => { setUser(null); setScreen("welcome"); setSelectedSlot(null); }}
            />
          )}
          {screen === "success" && bookingDone && (
            <SuccessScreen booking={bookingDone} user={user} onBack={goToDashboard} />
          )}
        </div>
      </div>

      {showConfirm && selectedSlot && (
        <ConfirmModal
          slot={selectedSlot}
          date={DATES.find(d => d.key === selectedDate).label}
          onConfirm={confirmBooking}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}

// ─── Welcome ─────────────────────────────────────────────────────────────────
function WelcomeScreen({ onPath }) {
  const [slideIndex, setSlideIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setSlideIndex((prev) => (prev + 1) % SLIDES.length);
  }, 3000);
  return () => clearInterval(interval);
}, []);
  return (
    <div className="anim">
      <div style={{
        padding: "32px 28px 24px",
        background: `
          linear-gradient(rgba(15,110,86,0.85), rgba(15,110,86,0.85)),
          url("https://images.unsplash.com/photo-1579684385127-1ef15d508118")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center"
       }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          Est. 2008 · Chennai
        </div>
        <h1 style={{ color: "#fff", fontSize: 28, lineHeight: 1.2 }}>
          Sree Lakshmi<br />Clinic
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
          Compassionate care for every stage of life. Book your appointment in under a minute.
        </p>
      </div>

      <div className="card-body">
        <div style={{ marginBottom: 6 }}>
          <div style={{
  height: 140,
  borderRadius: 14,
  overflow: "hidden",
  marginBottom: 16,
  position: "relative"
}}>
  <img
    src={SLIDES[slideIndex]}
    alt="clinic"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "0.5s"
    }}
  />

  {/* dots */}
  <div style={{
    position: "absolute",
    bottom: 8,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 6
  }}>
    {SLIDES.map((_, i) => (
      <div key={i} style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: i === slideIndex ? "#fff" : "rgba(255,255,255,0.5)"
      }} />
    ))}
  </div>
</div>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#888780", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
            Our specialities
          </div>
          <div className="services-row">
            {SERVICES.map(s => <span key={s} className="service-pill">{s}</span>)}
          </div>
        </div>

        <div style={{ marginTop: 22, marginBottom: 6, fontSize: 13, fontWeight: 500, color: "#444441" }}>
          Book an appointment
        </div>
        <div className="path-grid">
          <div className="path-card" onClick={() => onPath("revisit")}>
            <div className="path-icon">👋</div>
            <div className="path-title">Re-visit</div>
            <div className="path-desc">Already registered? Login with your mobile number.</div>
          </div>
          <div className="path-card" onClick={() => onPath("new")}>
            <div className="path-icon">✨</div>
            <div className="path-title">New Patient</div>
            <div className="path-desc">First time here? Register in seconds.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function AuthScreen({ flow, onDone, onBack }) {
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mockOtp] = useState(() => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(""));
  const refs = Array.from({ length: 6 }, () => useRef());

  useEffect(() => {
    let id;
    if (step === "otp" && timer > 0) {
      id = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(id);
  }, [step, timer]);

  const sendOtp = () => {
    if (!mobile || mobile.length < 10) { setError("Enter a valid 10-digit mobile number."); return; }
    if (flow === "new" && !name.trim()) { setError("Please enter your full name."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setTimer(60);
    }, 1200);
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setError("");
    if (val && i < 5) refs[i + 1].current?.focus();
  };

  const handleOtpKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
  };

  const verifyOtp = () => {
    const entered = otp.join("");
    if (entered.length < 6) { setError("Enter the 6-digit OTP."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (entered === mockOtp) {
        onDone({ name: flow === "new" ? name : "Returning Patient", mobile });
      } else {
        setError("Incorrect OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        refs[0].current?.focus();
      }
    }, 900);
  };

  const resend = () => { setOtp(["", "", "", "", "", ""]); setTimer(60); setError(""); };

  const isNew = flow === "new";

  return (
    <div className="anim">
      <div className="card-header">
        <button className="back-btn" onClick={step === "otp" ? () => setStep("form") : onBack}>
          ← Back
        </button>
        <h2>{step === "form" ? (isNew ? "Create account" : "Welcome back") : "Verify OTP"}</h2>
        <p className="sub">
          {step === "form"
            ? isNew ? "Fill in your details to get started." : "Enter your registered mobile number."
            : `We sent a 6-digit code to +91 ${mobile}`}
        </p>
        {step === "otp" && (
          <div className="alert alert-info" style={{ marginTop: 12 }}>
            🔑 Demo OTP: <strong>{mockOtp}</strong>
          </div>
        )}
      </div>

      <div className="card-body">
        {error && <div className="alert alert-error">⚠ {error}</div>}

        {step === "form" ? (
          <>
            {isNew && (
              <div className="input-group">
                <label className="input-label">Full name</label>
                <input className="input-field" placeholder="e.g. Priya Krishnan" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="input-group">
              <label className="input-label">Mobile number</label>
              <div className="mobile-prefix">
                <span className="prefix-tag">🇮🇳 +91</span>
                <input
                  className="input-field prefix-input"
                  placeholder="98765 43210"
                  value={mobile}
                  maxLength={10}
                  inputMode="numeric"
                  onChange={e => setMobile(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={sendOtp} disabled={loading}>
              {loading ? <span className="spinner" /> : "Send OTP →"}
            </button>
          </>
        ) : (
          <>
            <div className="otp-row">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  className={`otp-box${v ? " filled" : ""}`}
                  maxLength={1}
                  inputMode="numeric"
                  value={v}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKey(i, e)}
                />
              ))}
            </div>
            <div className="timer">
              {timer > 0 ? <>Resend OTP in <span>{timer}s</span></> : <span style={{ cursor: "pointer" }} onClick={resend}>Resend OTP</span>}
            </div>
            <button className="btn btn-primary" onClick={verifyOtp} disabled={loading}>
              {loading ? <span className="spinner" /> : "Verify & Continue →"}
            </button>
          </>
        )}
      </div>

      <div className="card-footer">
        <div className="step-dots">
          <div className={`dot${step === "form" ? " active" : ""}`} />
          <div className={`dot${step === "otp" ? " active" : ""}`} />
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function DashboardScreen({ user, slots, dates, selectedDate, selectedSlot, onSelectDate, onSelectSlot, onBook, onLogout }) {
  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "??";
  const available = slots.filter(s => !s.booked).length;

  return (
    <div className="anim">
      <div className="user-bar">
        <div>
          <div className="user-bar-name">Hello, {user?.name?.split(" ")[0]} 👋</div>
          <div className="user-bar-sub">+91 {user?.mobile}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="avatar">{initials}</div>
          <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 10px", fontSize: 12, cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>

      <div className="card-body" style={{ paddingTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a18" }}>Available slots</div>
            <div style={{ fontSize: 11, color: "#888780", marginTop: 2 }}>{available} slots open today</div>
          </div>
          <span className="tag tag-green">● Sree Lakshmi Clinic</span>
        </div>

        <div className="date-tabs">
          {dates.map(d => (
            <button key={d.key} className={`date-tab${selectedDate === d.key ? " active" : ""}`} onClick={() => onSelectDate(d.key)}>
              {d.label}
            </button>
          ))}
        </div>

        <div className="slot-grid">
          {slots.map(slot => (
            <div
              key={slot.id}
              className={`slot-card${slot.booked ? " slot-booked" : ""}${selectedSlot?.id === slot.id ? " slot-selected" : ""}`}
              onClick={() => onSelectSlot(slot)}
            >
              {selectedSlot?.id === slot.id && <div className="slot-check">✓</div>}
              <div className="slot-time">{slot.time}</div>
              <div className="slot-doctor">{slot.doctor.split(" ").slice(-1)[0]}</div>
              <div className={`slot-status${slot.booked ? " booked" : " avail"}`}>
                {slot.booked ? "Booked" : "Available"}
              </div>
            </div>
          ))}
        </div>

        {selectedSlot && (
          <div style={{ marginTop: 16, padding: "12px 14px", background: "#E1F5EE", borderRadius: 12, fontSize: 13 }}>
            <div style={{ fontWeight: 500, color: "#085041" }}>Selected: {selectedSlot.time}</div>
            <div style={{ color: "#0F6E56", marginTop: 2 }}>{selectedSlot.doctor}</div>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button
          className={`btn${selectedSlot ? " btn-primary" : " btn-ghost"}`}
          onClick={onBook}
          disabled={!selectedSlot}
        >
          {selectedSlot ? `Confirm slot — ${selectedSlot.time} →` : "Select a slot to continue"}
        </button>
      </div>
    </div>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────
function ConfirmModal({ slot, date, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Confirm appointment</h3>
          <p style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Please review the details before confirming.</p>
        </div>
        <div className="modal-body">
          <div className="detail-row"><span className="detail-label">Date</span><span className="detail-value">{date}</span></div>
          <div className="detail-row"><span className="detail-label">Time</span><span className="detail-value">{slot.time}</span></div>
          <div className="detail-row"><span className="detail-label">Doctor</span><span className="detail-value">{slot.doctor}</span></div>
          <div className="detail-row"><span className="detail-label">Clinic</span><span className="detail-value">Sree Lakshmi Clinic</span></div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={onConfirm}>Confirm →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Success ──────────────────────────────────────────────────────────────────
function SuccessScreen({ booking, user, onBack }) {
  return (
    <div className="anim">
      <div className="card-body" style={{ textAlign: "center", paddingTop: 32 }}>
        <div className="success-icon">✅</div>
        <h2 style={{ marginBottom: 6 }}>Booking Confirmed!</h2>
        <p className="sub" style={{ marginBottom: 22 }}>
          Your appointment has been successfully booked. See you soon!
        </p>

        <div style={{ background: "#F1EFE8", borderRadius: 14, padding: "16px 18px", textAlign: "left" }}>
          <div className="detail-row"><span className="detail-label">Patient</span><span className="detail-value">{user?.name}</span></div>
          <div className="detail-row"><span className="detail-label">Date</span><span className="detail-value">{booking.date}</span></div>
          <div className="detail-row"><span className="detail-label">Time</span><span className="detail-value">{booking.slot.time}</span></div>
          <div className="detail-row"><span className="detail-label">Doctor</span><span className="detail-value">{booking.slot.doctor}</span></div>
          <div className="detail-row"><span className="detail-label">Clinic</span><span className="detail-value">Sree Lakshmi Clinic</span></div>
          <div className="detail-row" style={{ borderBottom: "none" }}>
            <span className="detail-label">Status</span>
            <span className="tag tag-green">● Confirmed</span>
          </div>
        </div>

        <div style={{ marginTop: 16, padding: "10px 14px", background: "#E1F5EE", borderRadius: 10, fontSize: 12, color: "#085041", textAlign: "left" }}>
          📱 A confirmation SMS will be sent to +91 {user?.mobile}
        </div>
      </div>

      <div className="card-footer">
        <button className="btn btn-outline" onClick={onBack}>← Book another slot</button>
      </div>
    </div>
  );
}
