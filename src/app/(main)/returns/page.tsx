import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Return policy",
};

export default function ReturnsPage() {
  return (
    <LegalPage badge="Legal" title="Return policy" updated="19 September 2026">
      <LegalSection title="Perfumes">
        <p>
          Unopened, unused perfumes and body mists may be returned within 30
          days of delivery for a refund or exchange. Opened fragrance products
          cannot be returned for hygiene reasons, unless faulty on arrival.
        </p>
      </LegalSection>

      <LegalSection title="Custom magazines">
        <p>
          Because magazines are personalized, approved and printed editions are
          final sale. If your print arrives damaged or with a production error,
          contact us within 7 days with photos and we will reprint or refund.
        </p>
      </LegalSection>

      <LegalSection title="Lash services">
        <p>
          Completed lash sets are final sale. If you experience an issue within
          48 hours of your appointment, contact the studio — complimentary
          adjustments may be offered at our discretion.
        </p>
      </LegalSection>

      <LegalSection title="How to start a return">
        <p>
          Email{" "}
          <a href="mailto:hello@amoura.studio" className="text-ink underline-offset-2 hover:underline">
            hello@amoura.studio
          </a>{" "}
          with your order number and reason. We&apos;ll share return
          instructions. Refunds are issued to the original payment method once
          we receive and inspect the item.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
