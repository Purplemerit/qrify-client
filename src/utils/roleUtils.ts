// Role-based access control utilities

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface Permission {
  canAccessUsers: boolean;
  canAccessSettings: boolean;
  canCreateQR: boolean;
  canBulkCreateQR: boolean;
  canDeleteQR: boolean;
  canCreateTemplates: boolean;
  canViewStats: boolean;
  canViewTemplates: boolean;
  canViewMyQR: boolean;
}

// Define permissions for each role
export const rolePermissions: Record<UserRole, Permission> = {
  admin: {
    canAccessUsers: true,
    canAccessSettings: true,
    canCreateQR: true,
    canBulkCreateQR: true,
    canDeleteQR: true,
    canCreateTemplates: true,
    canViewStats: true,
    canViewTemplates: true,
    canViewMyQR: true,
  },
  editor: {
    canAccessUsers: false,
    canAccessSettings: false,
    canCreateQR: true,
    canBulkCreateQR: true,
    canDeleteQR: true,
    canCreateTemplates: true,
    canViewStats: true,
    canViewTemplates: true,
    canViewMyQR: true,
  },
  viewer: {
    canAccessUsers: false,
    canAccessSettings: false,
    canCreateQR: false,
    canBulkCreateQR: false,
    canDeleteQR: false,
    canCreateTemplates: false,
    canViewStats: true,
    canViewTemplates: true,
    canViewMyQR: true,
  },
};

/**
 * Get permissions for a user role
 */
export function getRolePermissions(role: string): Permission {
  const userRole = role as UserRole;
  return rolePermissions[userRole] || rolePermissions.viewer;
}

/**
 * Check if user has specific permission
 */
export function hasPermission(role: string, permission: keyof Permission): boolean {
  const permissions = getRolePermissions(role);
  return permissions[permission];
}

/**
 * Get accessible navigation items based on user role
 */
export function getAccessibleNavItems(role: string) {
  const permissions = getRolePermissions(role);
  
  const allItems = [
    { title: "New QR", url: "/new-qr", permission: 'canCreateQR' as keyof Permission },
    { title: "Bulk QR generation", url: "/bulk-qr", permission: 'canBulkCreateQR' as keyof Permission },
    { title: "My QR codes", url: "/my-qr-codes", permission: 'canViewMyQR' as keyof Permission },
    { title: "Stats", url: "/stats", permission: 'canViewStats' as keyof Permission },
    { title: "Templates", url: "/templates", permission: 'canViewTemplates' as keyof Permission },
    { title: "Settings", url: "/settings", permission: 'canAccessSettings' as keyof Permission },
    { title: "Users", url: "/users", permission: 'canAccessUsers' as keyof Permission },
  ];

  return allItems.filter(item => permissions[item.permission]);
}

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(role: string, path: string): boolean {
  const permissions = getRolePermissions(role);
  
  const routePermissions: Record<string, keyof Permission> = {
    '/new-qr': 'canCreateQR',
    '/bulk-qr': 'canBulkCreateQR',
    '/my-qr-codes': 'canViewMyQR',
    '/stats': 'canViewStats',
    '/templates': 'canViewTemplates',
    '/settings': 'canAccessSettings',
    '/users': 'canAccessUsers',
    '/contact': 'canViewMyQR', // Contact is accessible to everyone who can view QR codes
  };

  const requiredPermission = routePermissions[path];
  if (!requiredPermission) {
    return true; // Allow access to routes not defined in the map
  }

  return permissions[requiredPermission];
}