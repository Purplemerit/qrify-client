import { Header } from "../home/Header";
import { FooterCta } from "../home/FooterCta";

export default function TeamUsers() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Team Collaboration</h1>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/features/team-users.webp"
              alt="Team Collaboration illustration"
              className="max-w-4xl w-full rounded-lg"
            />
          </div>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Manage QR codes as a team with limited contributing users.
          </p>

          <div className="text-center mb-12">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Modern marketing and operations demand seamless collaboration across teams and departments. Our team
              collaboration features transform QR code management from a solo task into a coordinated team effort.
              Invite colleagues, assign specific roles, and maintain complete visibility over who creates and modifies
              each QR code. Whether you're a marketing agency managing multiple client campaigns, a large enterprise
              coordinating across departments, or a growing startup scaling your operations, our team features provide
              the structure and control you need. Set granular permissions to protect sensitive campaigns while enabling
              team members to contribute effectively. Track all changes, maintain brand consistency with shared templates,
              and streamline workflows with centralized management - all while keeping costs under control with our
              flexible user limits.
            </p>
          </div>

          <section className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Core Collaboration Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Add multiple team members to your account with individual login credentials</li>
                  <li>Set role-based permissions (Admin, Editor, Viewer) for precise access control</li>
                  <li>Track who created and modified each QR code with complete audit trails</li>
                  <li>Share templates and brand resources across the entire team</li>
                  <li>Comprehensive team activity logs for accountability and oversight</li>
                  <li>Centralized billing and management - one account, multiple users</li>
                  <li>Team-wide search and filter capabilities for finding QR codes quickly</li>
                  <li>Collaborative folders and organizational structures</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">User Roles Explained</h3>
                <div className="space-y-4 ml-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Administrator</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Full access to all features including user management, billing, and account settings.
                      Can create, edit, and delete QR codes, manage team members, and configure integrations.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Editor</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Can create, edit, and delete QR codes, but cannot manage users or access billing.
                      Perfect for team members actively working on campaigns.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Viewer</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Read-only access to view QR codes and analytics. Cannot make changes but can export data
                      and generate reports. Ideal for stakeholders and clients.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Perfect for These Teams</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Marketing Teams:</strong> Run multiple campaigns simultaneously with team coordination</li>
                  <li><strong>Agencies:</strong> Manage client QR codes with proper separation and access controls</li>
                  <li><strong>Large Organizations:</strong> Enable multiple departments to create QR codes independently</li>
                  <li><strong>Event Teams:</strong> Coordinate promotional activities across staff and volunteers</li>
                  <li><strong>Franchises:</strong> Allow location managers to create codes while maintaining brand standards</li>
                  <li><strong>Educational Institutions:</strong> Enable different departments to manage their own QR initiatives</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Workflow Advantages</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Eliminate bottlenecks - multiple team members can work simultaneously</li>
                  <li>Maintain brand consistency through shared templates and approval workflows</li>
                  <li>Reduce errors with clear ownership and accountability</li>
                  <li>Faster campaign launches with parallel workflows</li>
                  <li>Better knowledge retention - work history remains even when team members change</li>
                  <li>Improved training - new team members can learn from existing QR codes and templates</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterCta />
    </div>
  );
}
