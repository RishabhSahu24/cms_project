// DashboardPage.tsx
export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
}

// NavBar.tsx
export interface NavBarProps {
  userDetails: UserData | null;
}

// Sidebar.tsx
export interface SidebarProps {
  handleLogout: () => Promise<void>;
}

// DashboardHeader.tsx
export interface DashboardHeaderProps {
  toggleDropdown: () => void;
}
