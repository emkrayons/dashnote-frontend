// frontend/src/pages/Terms.jsx
// CREATE THIS NEW FILE

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-12 shadow-lg">
        <h1 className="text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-8">
          Terms of Service
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            By accessing and using Dashnote, you accept and agree to be bound by the terms and 
            provision of this agreement.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            2. Use License
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Permission is granted to use Dashnote for personal, non-commercial purposes. 
            You may not:
          </p>
          <ul className="list-disc pl-6 text-neutral-600 dark:text-neutral-400 mb-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to reverse engineer any software</li>
            <li>Remove any copyright or proprietary notations</li>
          </ul>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            3. User Account
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            You are responsible for maintaining the confidentiality of your account and password. 
            You agree to accept responsibility for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            4. User Content
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            You retain all rights to the content you create and store in Dashnote. We do not claim 
            ownership of your notes, but you grant us the right to store and display them to you.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            5. Service Limits
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Free accounts are limited to 100 notes. We reserve the right to modify these limits 
            at any time.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            6. Disclaimer
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            The service is provided "as is". We make no warranties, expressed or implied, and 
            hereby disclaim all warranties including implied warranties of merchantability or 
            fitness for a particular purpose.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            7. Limitations
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            In no event shall Dashnote be liable for any damages arising out of the use or 
            inability to use the service.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            8. Changes to Terms
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            We reserve the right to modify these terms at any time. Continued use of the service 
            after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
            9. Contact
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            If you have any questions about these Terms, please contact us.
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

export default Terms;
