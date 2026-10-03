import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";

/**
 * Shared Open Graph card renderer — one visual system for /blog and /compare.
 *
 * Design (site v3, "Your health, finally readable."): a night graphite stage
 * lit like chrome (radial #1A2227 → #07090B), the Merios lockup (the drop mark
 * drawn from the exact Logo.tsx paths + the Newsreader wordmark), a mono
 * eyebrow on a lime dot, the title in Bricolage 800 set tight in white, and
 * the logo's heartbeat as the horizon, ending on its lime dot.
 *
 * Fonts are read from @fontsource woff files at build/request time (satori
 * accepts woff, not woff2). Every title and tag in content/ is covered by the
 * latin subsets.
 */

export const OG_SIZE = { width: 1200, height: 630 };

function loadFont(pkgPath: string): Buffer {
  return fs.readFileSync(path.join(process.cwd(), "node_modules", pkgPath));
}

interface OgCardProps {
  eyebrow: string;
  title: string;
  meta?: string;
}

// The Merios mark — same geometry as src/components/ui/Logo.tsx.
const MARK_PULSE = "M45 117 L81 117 L93 137 L109 62 L131 174 L148 117 L194 117";
const MARK_PULSE_INSIDE = "M70.16 117 L81 117 L93 137 L109 62 L131 174 L148 117 L169.84 117";
const MARK_DROP = "M120 10 L169.84 116.73 A55 55 0 1 1 70.16 116.73 Z";

const ON_NIGHT = "#F4F6F7";
const ON_NIGHT_2 = "rgba(244,246,247,0.68)";
const ON_NIGHT_3 = "rgba(244,246,247,0.46)";
const LIME = "#D6F050";
const MARK_CUT = "#11171B"; // the stage colour behind the mark (top-left)

function titleSize(title: string): number {
  if (title.length > 96) return 56;
  if (title.length > 76) return 64;
  if (title.length > 58) return 72;
  if (title.length > 38) return 84;
  return 96;
}

export function renderOgCard({ eyebrow, title, meta }: OgCardProps) {
  const bricolage = loadFont(
    "@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff",
  );
  const plexMono = loadFont(
    "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff",
  );
  const newsreader = loadFont(
    "@fontsource/newsreader/files/newsreader-latin-500-normal.woff",
  );

  const fontSize = titleSize(title);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: "60px 80px 0",
          backgroundColor: "#090C0E",
          backgroundImage:
            "radial-gradient(110% 80% at 72% 18%, #1A2227 0%, #0D1114 48%, #07090B 100%)",
        }}
      >
        {/* Steel rim light along the top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 1,
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0) 100%)",
            display: "flex",
          }}
        />

        {/* Top row — lockup + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
            <svg width="38" height="42" viewBox="40 6 170 187">
              <path
                d={MARK_PULSE}
                fill="none"
                stroke="#E3E7EB"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d={MARK_DROP} fill="#E3E7EB" />
              <path
                d={MARK_PULSE_INSIDE}
                fill="none"
                stroke={MARK_CUT}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="194" cy="117" r="11" fill={LIME} />
            </svg>
            <div
              style={{
                display: "flex",
                fontFamily: "Newsreader",
                fontSize: 40,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: ON_NIGHT,
                marginBottom: -2,
              }}
            >
              Merios
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "PlexMono",
              fontSize: 19,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ON_NIGHT_3,
            }}
          >
            merios.life
          </div>
        </div>

        {/* Eyebrow + title, centred in the stage */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
            paddingBottom: 96,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 999,
                backgroundColor: LIME,
                boxShadow: "0 0 18px rgba(214,240,80,0.85)",
                display: "flex",
              }}
            />
            <div
              style={{
                display: "flex",
                fontFamily: "PlexMono",
                fontSize: 21,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: ON_NIGHT_2,
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 1040,
              fontFamily: "Bricolage",
              fontSize,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.042em",
              color: ON_NIGHT,
              textWrap: "balance",
            }}
          >
            {title}
          </div>

          {meta ? (
            <div
              style={{
                display: "flex",
                marginTop: 30,
                fontFamily: "PlexMono",
                fontSize: 19,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ON_NIGHT_3,
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>

        {/* The logo's heartbeat as the horizon, ending on the lime dot */}
        <svg
          width="1200"
          height="120"
          viewBox="0 0 1200 120"
          style={{ position: "absolute", left: 0, bottom: 22 }}
        >
          <defs>
            <linearGradient id="og-pulse" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.24" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 H906 L920 72 L938 18 L962 108 L976 60 H1083"
            fill="none"
            stroke="url(#og-pulse)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="1083" cy="60" r="20" fill={LIME} fillOpacity="0.12" />
          <circle cx="1083" cy="60" r="12" fill={LIME} fillOpacity="0.28" />
          <circle cx="1083" cy="60" r="7.5" fill={LIME} />
        </svg>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bricolage", data: bricolage, weight: 800, style: "normal" },
        { name: "PlexMono", data: plexMono, weight: 500, style: "normal" },
        { name: "Newsreader", data: newsreader, weight: 500, style: "normal" },
      ],
    },
  );
}
