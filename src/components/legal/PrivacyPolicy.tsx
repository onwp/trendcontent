import React from "react";
import LegalLayout from "../LegalLayout";

const PrivacyPolicy = () => {
  return (
    <LegalLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            At TrendContent, we respect your privacy and are committed to
            protecting your personal data. This Privacy Policy explains how we
            collect, use, and safeguard your information when you use our
            service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Information We Collect
          </h2>
          <p className="mb-4">
            We collect several types of information from and about users of our
            website, including:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              Personal identifiers such as name, email address, and billing
              information.
            </li>
            <li>
              Usage data including how you interact with our website and
              services.
            </li>
            <li>Content you generate, submit, or store using our services.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and send related information.</li>
            <li>Send you technical notices, updates, and support messages.</li>
            <li>
              Respond to your comments, questions, and customer service
              requests.
            </li>
            <li>
              Communicate with you about products, services, and events offered
              by TrendContent.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p className="mb-4">
            We have implemented measures designed to secure your personal
            information from accidental loss and from unauthorized access, use,
            alteration, and disclosure. However, we cannot guarantee that
            unauthorized third parties will never be able to defeat those
            measures or use your personal information for improper purposes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Third-Party Services
          </h2>
          <p className="mb-4">
            Our service may contain links to third-party websites, plugins, and
            applications. Clicking on those links or enabling those connections
            may allow third parties to collect or share data about you. We do
            not control these third-party websites and are not responsible for
            their privacy statements.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Your Data Protection Rights
          </h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding
            your personal information, such as the right to access, correct, or
            delete your personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Children's Privacy
          </h2>
          <p className="mb-4">
            Our service is not intended for children under 16 years of age. We
            do not knowingly collect personal information from children under
            16.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. Changes to Our Privacy Policy
          </h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at privacy@trendcontent.com.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
