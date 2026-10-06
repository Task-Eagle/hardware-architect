import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ThemeMode } from '../types/hardware';

export const DEMO_PROFILES: UserProfile[] = [
  {
    id: 'user-cto',
    name: 'Eleanor Vance',
    email: 'e.vance@vanguard-tech.corp',
    companyName: 'Vanguard Technologies',
    roleTitle: 'Chief Technology Officer',
    department: 'Engineering & Architecture',
    avatarInitials: 'EV'
  },
  {
    id: 'user-procurement',
    name: 'Marcus Thorne',
    email: 'm.thorne@apexlogistics.com',
    companyName: 'Apex Logistics Global',
    roleTitle: 'IT Procurement Director',
    department: 'Global Infrastructure Sourcing',
    avatarInitials: 'MT'
  },
  {
    id: 'user-devops',
    name: 'Sarah Chen',
    email: 's.chen@nordicdata.io',
    companyName: 'Nordic Data Systems',
    roleTitle: 'Lead Systems Architect',
    department: 'Cloud Infrastructure & SRE',
    avatarInitials: 'SC'
  }
];

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  login: (profile: UserProfile) => void;
  loginCustom: (email: string, company: string, roleTitle: string) => void;
  logout: () => void;
  showSignInModal: boolean;
  setShowSignInModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('eha_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_PROFILES[0];
      }
    }
    return DEMO_PROFILES[0]; // Default authenticated to CTO profile for immediate productivity
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('eha_theme') as ThemeMode) || 'light';
  });

  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'high-contrast');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'high-contrast') {
      root.classList.add('high-contrast');
    }
    localStorage.setItem('eha_theme', theme);
  }, [theme]);

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
  };

  const login = (profile: UserProfile) => {
    setCurrentUser(profile);
    localStorage.setItem('eha_current_user', JSON.stringify(profile));
    setShowSignInModal(false);
  };

  const loginCustom = (email: string, company: string, roleTitle: string) => {
    const namePart = email.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = namePart
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || 'Enterprise User';

    const initials = formattedName
      .split(' ')
      .map(w => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'EU';

    const profile: UserProfile = {
      id: 'custom-' + Date.now(),
      name: formattedName,
      email,
      companyName: company || 'Enterprise Client',
      roleTitle: roleTitle || 'IT Evaluator',
      department: 'Corporate Technology',
      avatarInitials: initials
    };

    login(profile);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eha_current_user');
    setShowSignInModal(true);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        theme,
        setTheme,
        login,
        loginCustom,
        logout,
        showSignInModal,
        setShowSignInModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
