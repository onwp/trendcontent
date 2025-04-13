import React from "react";
import LegalLayout from "../LegalLayout";

const TermsOfService = () => {
  return (
    <LegalLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to TrendContent. These Terms of Service govern your use of
            our website and services. By accessing or using TrendContent, you
            agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Definitions</h2>
          <p className="mb-4">
            <strong>"Service"</strong> refers to the TrendContent application,
            website, and all content, services, and products available at or
            through the website.
          </p>
          <p className="mb-4">
            <strong>"User"</strong> refers to individuals who access or use our
            Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Terms</h2>
          <p className="mb-4">
            You are responsible for maintaining the security of your account and
            password. The company cannot and will not be liable for any loss or
            damage from your failure to comply with this security obligation.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Payment Terms</h2>
          <p className="mb-4">
            By selecting a paid plan, you agree to pay TrendContent the monthly
            or annual subscription fees indicated for that service. Payments
            will be charged on the day you sign up for a paid plan and will
            cover the use of that service for the period as indicated.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Cancellation and Termination
          </h2>
          <p className="mb-4">
            You are solely responsible for properly canceling your account. You
            can cancel your account at any time by going to account settings.
            All of your content will be immediately deleted from the Service
            upon cancellation.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Modifications to the Service and Prices
          </h2>
          <p className="mb-4">
            TrendContent reserves the right at any time and from time to time to
            modify or discontinue, temporarily or permanently, the Service (or
            any part thereof) with or without notice. Prices of all Services,
            including but not limited to monthly subscription plan fees, are
            subject to change upon 30 days notice from us.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Content Ownership
          </h2>
          <p className="mb-4">
            You retain your rights to any content you submit, post or display on
            or through the Service. By submitting, posting or displaying content
            on or through the Service, you grant us a worldwide, non-exclusive,
            royalty-free license to use, copy, reproduce, process, adapt,
            modify, publish, transmit, display and distribute such content.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. General Conditions
          </h2>
          <p className="mb-4">
            Your use of the Service is at your sole risk. The service is
            provided on an "as is" and "as available" basis. We do not warrant
            that the service will meet your specific requirements, or that the
            service will be uninterrupted, timely, secure, or error-free.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at
            support@trendcontent.com.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;
