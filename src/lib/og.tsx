import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";

/**
 * Shared Open Graph card renderer — one visual system for every page.
 *
 * Design (site v2, "Open Sky"): a dawn (lavender and sky from the top left,
 * peach from the top right, haze below), the Merios wordmark (the name
 * "merios" in Figtree 600, ink: the provisional logo since the drop + pulse
 * mark was retired on 21/11/2026), an eyebrow on a hairline, the title in
 * Figtree 600 set tight in ink, and a calm horizon that ends on the apricot
 * sun.
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

const INK = "#18213F";
const INK_2 = "#434B69";
const INK_3 = "#5B627A";
const ZENITH = "#6E8FE8";
const APRICOT = "#FFA472";

function titleSize(title: string): number {
  if (title.length > 96) return 56;
  if (title.length > 76) return 64;
  if (title.length > 58) return 72;
  if (title.length > 38) return 84;
  return 96;
}

export function renderOgCard({ eyebrow, title, meta }: OgCardProps) {
  const figtree600 = loadFont("@fontsource/figtree/files/figtree-latin-600-normal.woff");
  const figtree700 = loadFont("@fontsource/figtree/files/figtree-latin-700-normal.woff");

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
          backgroundColor: "#EEF0FB",
          backgroundImage:
            "radial-gradient(120% 70% at 0% 0%, #AFC6F6 0%, rgba(175,198,246,0) 60%), radial-gradient(90% 60% at 100% 0%, #FBD5C3 0%, rgba(251,213,195,0) 65%), linear-gradient(180deg, #DCD8F6 0%, #EEF0FB 80%, #EEF0FB 100%)",
        }}
      >
        {/* Top row — wordmark + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Figtree",
              fontWeight: 600,
              fontSize: 44,
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: INK,
            }}
          >
            merios
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Figtree",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: INK_3,
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
                width: 34,
                height: 2,
                backgroundColor: INK,
                display: "flex",
              }}
            />
            <div
              style={{
                display: "flex",
                fontFamily: "Figtree",
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: INK_2,
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
              fontFamily: "Figtree",
              fontSize,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.045em",
              color: INK,
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
                fontFamily: "Figtree",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: INK_3,
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>

        {/* A calm horizon, ending on the apricot sun */}
        <svg
          width="1200"
          height="120"
          viewBox="0 0 1200 120"
          style={{ position: "absolute", left: 0, bottom: 22 }}
        >
          <defs>
            {/* user-space units: a level line has a zero-height box, which
                would leave an objectBoundingBox gradient unpainted */}
            <linearGradient id="og-horizon" gradientUnits="userSpaceOnUse" x1="0" x2="1083" y1="60" y2="60">
              <stop offset="0" stopColor={ZENITH} stopOpacity="0" />
              <stop offset="0.45" stopColor={ZENITH} stopOpacity="0.35" />
              <stop offset="1" stopColor={ZENITH} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 H1083"
            fill="none"
            stroke="url(#og-horizon)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="1083" cy="60" r="20" fill={APRICOT} fillOpacity="0.18" />
          <circle cx="1083" cy="60" r="12" fill={APRICOT} fillOpacity="0.35" />
          <circle cx="1083" cy="60" r="7.5" fill={APRICOT} />
        </svg>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Figtree", data: figtree600, weight: 600, style: "normal" },
        { name: "Figtree", data: figtree700, weight: 700, style: "normal" },
      ],
    },
  );
}
