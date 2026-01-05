import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:text-blue-700 mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow p-8 prose max-w-none">
          <p className="text-gray-600 mb-4">Last updated: January 2026</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">We collect the following information:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Email address and password (for account creation)</li>
            <li>Race fueling plan inputs (distance, time, weight, etc.)</li>
            <li>Payment information (processed securely by Stripe)</li>
            <li>Usage data and analytics</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Provide and improve our service</li>
            <li>Generate and save your fueling plans</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send transactional emails (receipts, password resets)</li>
            <li>Analyze usage patterns to improve the app</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Storage and Security</h2>
          <p className="text-gray-700 mb-4">
            Your data is stored securely in our database. We use industry-standard encryption and
            security practices to protect your information. Payment processing is handled by Stripe
            and we never store your full credit card information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Sharing</h2>
          <p className="text-gray-700 mb-4">
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Stripe (for payment processing)</li>
            <li>Email service providers (for transactional emails)</li>
            <li>Analytics providers (anonymized data only)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Access your personal data</li>
            <li>Request deletion of your data</li>
            <li>Export your fueling plans</li>
            <li>Opt out of marketing emails (we don't send them anyway)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookies</h2>
          <p className="text-gray-700 mb-4">
            We use cookies for authentication and to improve user experience. You can disable
            cookies in your browser, but this may affect functionality.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Children's Privacy</h2>
          <p className="text-gray-700 mb-4">
            Our service is not intended for users under 13 years of age. We do not knowingly
            collect information from children.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Changes to Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes
            by posting the new policy on this page.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions about this privacy policy, please contact us at
            privacy@racefuelplan.com
          </p>
        </div>
      </div>
    </div>
  );
}
