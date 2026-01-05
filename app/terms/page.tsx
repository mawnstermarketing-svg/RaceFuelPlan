import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:text-blue-700 mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow p-8 prose max-w-none">
          <p className="text-gray-600 mb-4">Last updated: January 2026</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using RaceFuelPlan, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Use of Service</h2>
          <p className="text-gray-700 mb-4">
            RaceFuelPlan provides fueling plan calculations for endurance athletes. You may use the
            service for personal, non-commercial purposes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Medical Disclaimer</h2>
          <p className="text-gray-700 mb-4">
            <strong>IMPORTANT:</strong> RaceFuelPlan does not provide medical advice. The
            information provided is for educational and informational purposes only. Always consult
            your physician or qualified healthcare provider before making any changes to your
            nutrition or training regimen.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. User Accounts</h2>
          <p className="text-gray-700 mb-4">
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Payments and Refunds</h2>
          <p className="text-gray-700 mb-4">
            All purchases are processed securely through Stripe. One-time purchases are
            non-refundable. Annual subscriptions may be canceled at any time, with access
            continuing until the end of the billing period.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            6. Intellectual Property
          </h2>
          <p className="text-gray-700 mb-4">
            All content and materials on RaceFuelPlan are owned by us or our licensors and are
            protected by copyright and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            RaceFuelPlan is provided "as is" without warranties of any kind. We are not liable for
            any damages arising from your use of the service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify these terms at any time. Continued use of the service
            after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Contact</h2>
          <p className="text-gray-700 mb-4">
            For questions about these terms, please contact us at support@racefuelplan.com
          </p>
        </div>
      </div>
    </div>
  );
}
