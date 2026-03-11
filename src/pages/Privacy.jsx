// frontend/src/pages/Privacy.jsx
// CREATE THIS NEW FILE

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-lg">
        <h1 className="text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We collect information you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 mb-4">
            <li>Account information (name, email, password)</li>
            <li>Note content (titles, text, tags, metadata)</li>
            <li>Usage data (features used, timestamps)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            3. Information Sharing
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We do not share, sell, or rent your personal information to third parties. 
            Your notes are private and only accessible to you.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            4. Data Security
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We implement appropriate security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 mb-4">
            <li>Passwords are encrypted using bcrypt</li>
            <li>Secure HTTPS connections</li>
            <li>Regular security updates</li>
            <li>Limited data access</li>
          </ul>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            5. Data Retention
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We retain your information as long as your account is active or as needed to 
            provide you services. You can delete your notes at any time.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            6. Your Rights
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and data</li>
            <li>Export your notes</li>
          </ul>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            7. Cookies
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We use local storage to maintain your session and preferences. We do not use 
            tracking cookies or third-party analytics.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            8. Children's Privacy
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Our service is not directed to children under 13. We do not knowingly collect 
            information from children under 13.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            9. Changes to Privacy Policy
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We may update this privacy policy from time to time. We will notify you of any 
            changes by posting the new policy on this page.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            10. Contact Us
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            If you have questions about this Privacy Policy, please contact us.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <a 
            href="/dashboard" 
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
