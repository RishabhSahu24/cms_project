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
  applyFilters: (color: string, category: string) => void;
}

// DashboardHeader.tsx
export interface DashboardHeaderProps {
  handleSearch: (value: string) => void;
  isRest: boolean;
  fetchProducts: () => void;
}

export interface ProductTableProps {
  products: any[];
  handleDelete: (productId: string) => void;
}

//DashboardHeader (Add Button)
export interface AddButtonProps {
  handleClick: () => void;
}
export interface ResetButtonProps {
  handleResetClick: () => void;
}
