"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { BILLING, BILLING_ORDER, PLAN_SHEET, type BillingId } from "./content";
import s from "./pricing.module.css";

/**
 * The plan sheet: the billing toggle and the three plans.
 *
 * Still the page's price table (caption, column headers, one row per plan),
 * drawn as three cards: Free (glass, Today screen), Plus (the ink card, blood
 * panel screen) and Blood work (dashed). Explicit table roles keep the
 * semantics when CSS turns rows into cards. The server render is the annual
 * plan, so the static HTML reads "Merios Plus · $44 / year".
 */

/** Cents → "$44" or "$12.99". */
function usd(cents: number): string {
  return cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`;
}

/** What the selected billing period comes to, computed from the prices. */
function equivalent(id: BillingId): string {
  const annual = BILLING.annual.cents;
  if (id === "annual") {
    return `That is ${usd(Math.round(annual / 12))} a month, or ${usd(Math.round(annual / 52))} a week.`;
  }
  if (id === "monthly") {
    const year = BILLING.monthly.cents * 12;
    return `${usd(year)} over twelve months, ${usd(year - annual)} more than the annual plan.`;
  }
  const year = BILLING.weekly.cents * 52;
  return `${usd(year)} over a year, ${usd(year - annual)} more than the annual plan.`;
}

const delay = (seconds: number) => ({ "--rv-delay": `${seconds}s` }) as CSSProperties;

export default function PlanSheet() {
  const [period, setPeriod] = useState<BillingId>("annual");
  const billing = BILLING[period];
  const { free, plus, lab } = PLAN_SHEET;

  return (
    <section aria-labelledby="plans-title" className={s.plans}>
      <div className={s.wrap}>
        <div className={s.plansHead}>
          <h2 id="plans-title" className={s.plansTitle}>
            {PLAN_SHEET.heading}
          </h2>
          <div role="group" aria-label={PLAN_SHEET.toggleLabel} className={s.toggle}>
            {BILLING_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === period}
                onClick={() => setPeriod(id)}
                className={s.toggleBtn}
              >
                {BILLING[id].label}
              </button>
            ))}
          </div>
        </div>

        <table role="table" className={s.sheet}>
          <caption className={s.caption}>{PLAN_SHEET.caption}</caption>
          <thead role="rowgroup" className={s.sheetHead}>
            <tr role="row">
              {PLAN_SHEET.columns.map((column) => (
                <th key={column} role="columnheader" scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className={s.cards}>
            {/* Free — glass, with the Today screen */}
            <tr role="row" className={`${s.card} ${s.cardFree}`} data-rv="">
              <th role="rowheader" scope="row" className={s.plan}>
                {free.name}
              </th>
              <td role="cell" className={s.priceCell}>
                <p className={s.price}>
                  <span className={s.amount}>{free.price}</span>{" "}
                  <span className={s.per}>{free.note}</span>
                </p>
              </td>
              <td role="cell" className={s.what}>
                <p className={s.lead}>{free.lead}</p>
                <ul className={s.features}>
                  {free.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className={s.screen}>
                  <span aria-hidden className={s.screenTag}>
                    {PLAN_SHEET.screenTag}
                  </span>
                  <Image
                    src={free.screen.src}
                    alt={free.screen.alt}
                    width={780}
                    height={1688}
                    sizes="210px"
                    className={s.screenImg}
                  />
                </div>
              </td>
            </tr>

            {/* Plus — the ink card, with the blood panel screen */}
            <tr
              role="row"
              className={`${s.card} ${s.cardPlus}`}
              data-rv=""
              data-nav="dark"
              style={delay(0.08)}
            >
              <th role="rowheader" scope="row" className={s.plan}>
                {plus.name}
              </th>
              <td role="cell" className={s.priceCell}>
                <div aria-live="polite">
                  <span className={s.trial}>
                    {period === "annual" ? plus.trial : plus.trialElsewhere}
                  </span>
                  <p className={s.price}>
                    <span className={s.amount}>{usd(billing.cents)}</span>{" "}
                    <span className={s.per}>{billing.per}</span>
                  </p>
                  <p className={s.equiv}>{equivalent(period)}</p>
                  {period === "annual" ? (
                    <p className={s.also}>
                      Also sold at {usd(BILLING.monthly.cents)} a month or{" "}
                      {usd(BILLING.weekly.cents)} a week.
                    </p>
                  ) : null}
                </div>
              </td>
              <td role="cell" className={s.what}>
                <ul className={s.features}>
                  <li data-accent="">{plus.includes}</li>
                  {plus.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className={s.screen}>
                  <span aria-hidden className={s.screenTag}>
                    {PLAN_SHEET.screenTag}
                  </span>
                  <Image
                    src={plus.screen.src}
                    alt={plus.screen.alt}
                    width={780}
                    height={1688}
                    sizes="210px"
                    className={s.screenImg}
                  />
                </div>
              </td>
            </tr>

            {/* Blood work — not included, dashed */}
            <tr role="row" className={`${s.card} ${s.cardLab}`} data-rv="" style={delay(0.16)}>
              <th role="rowheader" scope="row" className={s.plan}>
                {lab.name}
              </th>
              <td role="cell" className={s.priceCell}>
                <p className={`${s.price} ${s.priceWord}`}>{lab.price}</p>
              </td>
              <td role="cell" className={s.what}>
                <p className={s.lead}>{lab.lead}</p>
                <ul className={s.costs}>
                  {lab.costs.map((cost) => (
                    <li key={cost.amount} className={s.cost}>
                      <span className={s.costAmount}>{cost.amount}</span>
                      <span className={s.costNote}>{cost.note}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
