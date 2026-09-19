import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPage() {
  return (
    <LegalPage badge="Legal" title="Privacy policy" updated="19 September 2026">
      <LegalSection title="Who we are">
        <p>
          Amoura (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates an atelier offering
          signature perfumes, custom magazines, and professional lash services.
          This policy explains how we collect and use personal information when
          you shop, book, or contact us.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>
          We may collect your name, email address, phone number, shipping
          address, payment details (processed by our payment providers), order
          history, magazine content you upload, and messages you send to
          support.
        </p>
        <p>
          When you browse our site we may also collect basic device and usage
          data (such as browser type and pages visited) to improve the
          experience.
        </p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <p>We use your information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Fulfil perfume and magazine orders</li>
          <li>Schedule and manage lash studio appointments</li>
          <li>Respond to support and contact requests</li>
          <li>Send order updates and, with your consent, brand news</li>
          <li>Improve our products, services, and website</li>
        </ul>
      </LegalSection>

      <LegalSection title="Sharing">
        <p>
          We share data only with trusted partners who help us operate — such as
          payment processors, shipping carriers, and print partners for custom
          magazines. We do not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          You may request access, correction, or deletion of your personal data
          by emailing{" "}
          <a href="mailto:hello@amoura.studio" className="text-ink underline-offset-2 hover:underline">
            hello@amoura.studio
          </a>
          . You can unsubscribe from marketing emails at any time.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For privacy questions, contact the Amoura atelier at hello@amoura.studio.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
