// Role-based access control utilities
export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  emailVerified?: boolean;
}

export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  manage: boolean;
}

// Define permissions for each role
export const rolePermissions: Record<UserRole, Permission> = {
  admin: {
    view: true,
    create: true,
    edit: true,
    delete: true,
    manage: true,
  },
  editor: {
    view: true,
    create: true,
    edit: true,
    delete: false,
    manage: false,
  },
  viewer: {
    view: true,
    create: false,
    edit: false,
    delete: false,
    manage: false,
  },
};

// Role descriptions
export const roleDescriptions: Record<UserRole, string> = {
  admin: 'Full access to all features and settings',
  editor: 'Can create and manage QR codes, limited settings access',
  viewer: 'Read-only access to QR codes and analytics',
};

// Check if user has specific permission
export function hasPermission(user: User | null, permission: keyof Permission): boolean {
  if (!user) return false;
  
  const userPermissions = rolePermissions[user.role];
  return userPermissions ? userPermissions[permission] : false;
}

// Check if user can perform action on a resource
export function canUserAccess(user: User | null, requiredRole: UserRole): boolean {
  if (!user) return false;
  
  const roleHierarchy: Record<UserRole, number> = {
    viewer: 1,
    editor: 2,
    admin: 3,
  };
  
  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

// Check if user is admin
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}

// Check if user is editor or above
export function isEditor(user: User | null): boolean {
  return canUserAccess(user, 'editor');
}

// Get role badge color for UI
export function getRoleBadgeColor(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800';
    case 'editor':
      return 'bg-blue-100 text-blue-800';
    case 'viewer':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Get available roles for assignment (admin can assign all roles, editors cannot assign admin)
export function getAssignableRoles(currentUserRole: UserRole): UserRole[] {
  switch (currentUserRole) {
    case 'admin':
      return ['admin', 'editor', 'viewer'];
    case 'editor':
      return ['editor', 'viewer'];
    case 'viewer':
      return [];
    default:
      return [];
  }
}

// Validate role
export function isValidRole(role: string): role is UserRole {
  return ['admin', 'editor', 'viewer'].includes(role);
}