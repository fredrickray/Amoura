import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & conditions",
};

export default function TermsPage() {
  return (
    <LegalPage badge="Legal" title="Terms & conditions" updated="19 September 2026">
      <LegalSection title="Agreement">
        <p>
          By using the Amoura website, placing an order, or booking a lash
          service, you agree to these terms. If you do not agree, please do not
          use our services.
        </p>
      </LegalSection>

      <LegalSection title="Our catalogues">
        <p>
          Amoura offers three catalogues: signature perfumes (goods), custom
          magazines (made-to-order print), and lash studio services
          (appointments). Descriptions, pricing in Nigerian Naira (₦), and
          availability may change without notice.
        </p>
      </LegalSection>

      <LegalSection title="Orders & payments">
        <p>
          Orders are confirmed once payment is received or authorised. Custom
          magazines begin production after you approve the digital proof. We
          reserve the right to cancel orders that cannot be fulfilled and will
          refund eligible payments.
        </p>
      </LegalSection>

      <LegalSection title="Appointments">
        <p>
          Lash bookings require confirmed availability. Please arrive on time.
          Late arrivals may shorten your appointment. Cancellations with less
          than 24 hours&apos; notice may be non-refundable.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          Amoura branding, site content, and product imagery are owned by us or
          our licensors. Magazine content you supply remains yours; you grant us
          a licence to reproduce it for your print order.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Amoura is not liable for
          indirect or consequential losses arising from use of the site or
          services. Nothing in these terms limits rights you have under
          applicable consumer law.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
