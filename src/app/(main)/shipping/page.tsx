import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Shipping",
};

export default function ShippingPage() {
  return (
    <LegalPage badge="Legal" title="Shipping details" updated="19 September 2026">
      <LegalSection title="Processing times">
        <p>
          Perfumes and ready products usually ship within 2–4 business days.
          Custom magazines ship after you approve the digital proof — typically
          5–10 business days for print and dispatch.
        </p>
      </LegalSection>

      <LegalSection title="Delivery">
        <p>
          We ship across Nigeria and internationally for goods. Delivery
          estimates:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Nigeria major cities: 2–5 business days after dispatch</li>
          <li>Other Nigerian regions: 3–7 business days</li>
          <li>International: 5–12 business days, subject to customs</li>
        </ul>
      </LegalSection>

      <LegalSection title="Lash appointments">
        <p>
          Lash services are fulfilled in-studio and are not shipped. Travel or
          aftercare kits, when purchased, follow standard goods shipping.
        </p>
      </LegalSection>

      <LegalSection title="Tracking & duties">
        <p>
          Tracking details are emailed when your order ships. International
          customers are responsible for any customs duties or import taxes
          charged by their country.
        </p>
      </LegalSection>

      <LegalSection title="Need help?">
        <p>
          If a parcel is delayed or missing, contact support with your order
          number and we&apos;ll investigate with the carrier.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
