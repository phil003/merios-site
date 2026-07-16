import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";

/**
 * Shared Open Graph card renderer — one visual system for /blog and /compare.
 *
 * Design: editorial biotech, matching the site (canvas #F7F5EF, ink #0E1412,
 * deep green #1E3D2A, pulse #9FBF00, Fraunces light display + mono eyebrow).
 * Fonts are read from @fontsource woff files at build/request time (satori
 * accepts woff, not woff2).
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

export function renderOgCard({ eyebrow, title, meta }: OgCardProps) {
  const fraunces = loadFont(
    "@fontsource/fraunces/files/fraunces-latin-300-normal.woff",
  );
  const interTight = loadFont(
    "@fontsource/inter-tight/files/inter-tight-latin-500-normal.woff",
  );

  // Scale the display size down for long titles so nothing clips.
  const fontSize =
    title.length > 90 ? 52 : title.length > 60 ? 62 : title.length > 40 ? 72 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F5EF",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Right-edge deep green spine */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 14,
            height: 630,
            background: "#1E3D2A",
            display: "flex",
          }}
        />
        {/* Baseline grid hint */}
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            bottom: 150,
            height: 1,
            background: "#E8E3D6",
            display: "flex",
          }}
        />

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#9FBF00",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "InterTight",
              fontSize: 22,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#1E3D2A",
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "Fraunces",
            fontSize,
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: "#0E1412",
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 30,
              color: "#0E1412",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            Merios
            <div
              style={{
                fontFamily: "InterTight",
                fontSize: 19,
                color: "#60655D",
                letterSpacing: "0.08em",
                display: "flex",
                paddingTop: 6,
              }}
            >
              merios.life
            </div>
          </div>
          {meta ? (
            <div
              style={{
                fontFamily: "InterTight",
                fontSize: 19,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#60655D",
                display: "flex",
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 300, style: "normal" },
        { name: "InterTight", data: interTight, weight: 500, style: "normal" },
      ],
    },
  );
}
