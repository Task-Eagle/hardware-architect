import React, { useState } from 'react';
import { useAuth, DEMO_PROFILES } from '../../context/AuthContext';
import { ShieldCheck, Building2, User, Key, CheckCircle2, ChevronRight, X } from 'lucide-react';

export const SignInModal: React.FC = () => {
  const { currentUser, login, loginCustom, showSignInModal, setShowSignInModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'demo' | 'custom'>('demo');
  const [email, setEmail] = useState('j.doe@enterprise.corp');
  const [company, setCompany] = useState('Global Dynamics Corp');
  const [roleTitle, setRoleTitle] = useState('Hardware Procurement Lead');
  const [ssoCode, setSsoCode] = useState('MS-9821-ENT');

  if (!showSignInModal) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginCustom(email, company, roleTitle);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-2xl rounded-[6px] overflow-hidden text-neutral-900 dark:text-neutral-100">
        {/* Office-style Title Bar */}
        <div className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 px-4 py-2.5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="bg-neutral-400" />
              <div className="bg-neutral-200" />
              <div className="bg-neutral-300" />
              <div className="bg-neutral-500" />
            </div>
            <span className="text-xs font-semibold tracking-wide">
              Microsoft 365 Enterprise Identity · Hardware Architect
            </span>
          </div>
          {currentUser && (
            <button
              onClick={() => setShowSignInModal(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-[4px]"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Corporate Single Sign-On (SSO)
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              Select an authorized business directory identity or authenticate with your corporate domain.
            </p>
          </div>

          {/* Segmented Auth Selector */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-5">
            <button
              onClick={() => setActiveTab('demo')}
              className={`pb-2 px-3 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'demo'
                  ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              Pre-Configured Enterprise Roles
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`pb-2 px-3 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'custom'
                  ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              Manual Domain Sign-In
            </button>
          </div>

          {activeTab === 'demo' ? (
            <div className="space-y-2.5">
              {DEMO_PROFILES.map((profile) => {
                const isSelected = currentUser?.id === profile.id;
                return (
                  <button
                    key={profile.id}
                    onClick={() => login(profile)}
                    className={`w-full text-left p-3 border transition-colors rounded-[4px] flex items-center justify-between group ${
                      isSelected
                        ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[4px] bg-neutral-800 text-neutral-100 flex items-center justify-center font-bold text-xs tracking-wider">
                        {profile.avatarInitials}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                          {profile.name}
                          {isSelected && <span className="text-[10px] text-neutral-500 font-normal">(Active)</span>}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {profile.roleTitle} · {profile.companyName}
                        </div>
                        <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                          {profile.email}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Corporate Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@enterprise.com"
                    className="w-full text-xs px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Organization / Tenant
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Financial Corp"
                  className="w-full text-xs px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Procurement Job Title
                </label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="Senior Hardware Engineer / Procurement"
                  className="w-full text-xs px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  SSO Token / Security Key
                </label>
                <input
                  type="text"
                  value={ssoCode}
                  onChange={(e) => setSsoCode(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-[4px] focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-200"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold text-xs rounded-[4px] transition-colors"
              >
                Authenticate with Corporate Credentials
              </button>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> FIPS 140-3 Compliant SSO
            </span>
            <span className="font-mono">v4.1.0-ENT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
