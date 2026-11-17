import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../NewNavbar/Navbar";
import NewFooter from "../Footer/footer";
import speakersData from "../../components/speaker images/speakersData.json";
import heroImg from "../Landingpage/Heroimage.png";
import "./speakers.css";

const formatNameFromFilename = (filename = "") => {
  const base = filename.replace(/\.(jpe?g|png|webp)$/i, "").trim();
  if (/^regspeaker\d*$/i.test(base)) {
    return "WYNx Featured Speaker";
  }
  return base;
};

export const createSpeakerSlug = (filename = "") =>
  filename
    .replace(/\.(jpe?g|png|webp)$/i, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const SPEAKERS = speakersData.map((item) => {
  const imageFile = typeof item === "string" ? item : item.image;
  const speakerName =
    typeof item === "object" && item.name
      ? item.name
      : formatNameFromFilename(imageFile);

  return {
    name: speakerName,
    imageFile,
    slug: createSpeakerSlug(imageFile),
    src: require(`../../components/speaker images/${imageFile}`),
  };
});

export function SpeakerDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentIndex = SPEAKERS.findIndex((spk) => spk.slug === slug);
  const speaker = currentIndex !== -1 ? SPEAKERS[currentIndex] : null;

  const prevSpeaker =
    currentIndex !== -1
      ? SPEAKERS[(currentIndex - 1 + SPEAKERS.length) % SPEAKERS.length]
      : null;
  const nextSpeaker =
    currentIndex !== -1
      ? SPEAKERS[(currentIndex + 1) % SPEAKERS.length]
      : null;

  useEffect(() => {
    if (!prevSpeaker || !nextSpeaker) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") navigate(`/speakers/${prevSpeaker.slug}`);
      if (e.key === "ArrowRight") navigate(`/speakers/${nextSpeaker.slug}`);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSpeaker, nextSpeaker, navigate]);

  if (!speaker) {
    return (
      <div className="spk-page-root">
        <Navbar />
        <div style={{ height: 68 }} />
        <div className="spk-detail-section">
          <div className="spk-detail-box">
            <h2 className="spk-detail-name">Speaker Not Found</h2>
            <button
              className="spk-btn-outline"
              onClick={() => navigate("/speakers")}
            >
              ← Back to Speakers
            </button>
          </div>
        </div>
        <NewFooter />
      </div>
    );
  }

  return (
    <div className="spk-page-root">
      <Navbar />
      <div style={{ height: 68 }} />

      <section className="spk-detail-section">
        <div className="spk-glow spk-glow-1" />
        <div className="spk-glow spk-glow-3" />

        <div className="spk-container">
          <div className="spk-detail-stage">
            <button
              className="spk-nav-arrow spk-nav-arrow--left"
              onClick={() => navigate(`/speakers/${prevSpeaker.slug}`)}
              aria-label={`Previous speaker: ${prevSpeaker.name}`}
              title={prevSpeaker.name}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="spk-detail-card spk-anim spk-a1" key={speaker.slug}>
              <div className="spk-detail-img-col">
                <div className="spk-detail-img-frame">
                  <img
                    src={speaker.src}
                    alt={speaker.name}
                    className="spk-detail-img"
                  />
                </div>
              </div>

              <div className="spk-detail-info-col">
                <div className="spk-detail-top-bar">
                  <button
                    className="spk-back-btn"
                    onClick={() => navigate("/speakers")}
                  >
                    ← Back to All Speakers
                  </button>
                  <span className="spk-counter">
                    {currentIndex + 1} / {SPEAKERS.length}
                  </span>
                </div>

                <div className="spk-eyebrow">WYNX GLOBAL STAGE</div>
                <h1 className="spk-detail-name">{speaker.name}</h1>
                <div className="spk-detail-divider" />

                <p className="spk-detail-about-wynx">
                  WYNx Award Winning Talks is a premier global platform uniting
                  visionary leaders, innovators, and changemakers to share
                  transformative ideas and inspire meaningful impact across the
                  world.
                </p>

                <div className="spk-detail-actions">
                  <button
                    className="spk-btn-primary"
                    onClick={() => navigate("/conferences")}
                  >
                    Explore Conclaves
                  </button>
                  <button
                    className="spk-btn-outline"
                    onClick={() => navigate("/awardsnomination")}
                  >
                    Nominate / Register
                  </button>
                </div>
              </div>
            </div>

            <button
              className="spk-nav-arrow spk-nav-arrow--right"
              onClick={() => navigate(`/speakers/${nextSpeaker.slug}`)}
              aria-label={`Next speaker: ${nextSpeaker.name}`}
              title={nextSpeaker.name}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}

export default function SpeakersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredSpeakers = SPEAKERS.filter((spk) =>
    spk.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="spk-page-root">
      <Navbar />
      <div style={{ height: 68 }} />

      {/* ════ HERO ════ */}
      <section className="spk-hero">
        <div className="spk-glow spk-glow-1" />
        <div className="spk-glow spk-glow-2" />
        <div className="spk-glow spk-glow-3" />

        <div className="spk-hero-left">
          <div className="spk-badge spk-anim spk-a1">
            <span className="spk-badge-dot" />
            GLOBAL THOUGHT LEADERS
          </div>
          <h1 className="spk-hero-title spk-anim spk-a2">
            Our Distinguished <span className="spk-accent">Speakers</span>
          </h1>
          <p className="spk-hero-sub spk-anim spk-a3">
            Discover the award-winning voices, industry pioneers, and visionary
            changemakers shaping global conversations on the WYNx stage.
          </p>

          <div className="spk-hero-actions spk-anim spk-a4">
            <button
              className="spk-btn-primary"
              onClick={() => navigate("/awardsnomination")}
            >
              Apply as a Speaker
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              className="spk-btn-outline"
              onClick={() => navigate("/conferences")}
            >
              Explore Conclaves
            </button>
          </div>

          <div className="spk-stats spk-anim spk-a4">
            {[
              ["200+", "Global Speakers"],
              ["30+", "Countries"],
              ["120+", "Awards Honored"],
              ["50K+", "Audience Reached"],
            ].map(([val, lbl], i, arr) => (
              <div
                key={lbl}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="spk-stat">
                  <span className="spk-stat-val">{val}</span>
                  <span className="spk-stat-lbl">{lbl}</span>
                </div>
                {i < arr.length - 1 && <div className="spk-stat-div" />}
              </div>
            ))}
          </div>
        </div>

        <div className="spk-hero-right">
          <div className="spk-orbit-wrap">
            <div className="spk-ring spk-ring-1" />
            <div className="spk-ring spk-ring-2" />
            <div className="spk-ground-glow" />
            <img
              src={heroImg}
              alt="WYNx Award Trophy"
              className="spk-hero-img"
            />
          </div>
        </div>
      </section>

      {/* ════ SPEAKERS DIRECTORY ════ */}
      <section className="spk-directory-section">
        <div className="spk-container">
          <div className="spk-dir-header">
            <div>
              <div className="spk-eyebrow">VOICES THAT MOVE THE WORLD</div>
              <h2 className="spk-section-title">
                WYNx <span className="spk-accent">Speaker Lineup</span>
              </h2>
            </div>

            <div className="spk-search-wrap">
              <svg
                className="spk-search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="spk-search-input"
                placeholder="Search speaker by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="spk-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="spk-divider" />

          {filteredSpeakers.length === 0 ? (
            <div className="spk-empty">
              <p>No speakers found matching "{searchQuery}".</p>
              <button
                className="spk-btn-outline"
                onClick={() => setSearchQuery("")}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="spk-grid">
              {filteredSpeakers.map((spk, idx) => (
                <div
                  className="spk-card spk-card--clickable"
                  key={`${spk.imageFile}-${idx}`}
                  onClick={() => navigate(`/speakers/${spk.slug}`)}
                >
                  <div className="spk-card-img-wrap">
                    <img
                      src={spk.src}
                      alt={spk.name}
                      className="spk-card-img"
                      loading="lazy"
                    />
                    <div className="spk-card-gradient" />
                  </div>
                  <div className="spk-card-body">
                    <h3 className="spk-card-name">{spk.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════ BOTTOM CTA ════ */}
      <section className="spk-cta-banner">
        <div className="spk-container">
          <div className="spk-cta-box">
            <div className="spk-eyebrow">TAKE THE GLOBAL STAGE</div>
            <h2 className="spk-cta-title">
              Ready to Share Your Story at{" "}
              <span className="spk-accent">WYNx Talks?</span>
            </h2>
            <p className="spk-cta-desc">
              Join our global roster of award-winning speakers, thought leaders,
              and researchers at upcoming WYNx Conclaves.
            </p>
            <button
              className="spk-btn-primary"
              onClick={() => navigate("/awardsnomination")}
            >
              Nominate / Apply Now
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
