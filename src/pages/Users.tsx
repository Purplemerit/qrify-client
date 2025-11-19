import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "../services/auth";
import { userApi } from "../lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  isAdmin,
  roleDescriptions,
  getRoleBadgeColor,
  type UserRole,
} from "../lib/rbac";
import type { User } from "../lib/rbac";

interface UserWithStats {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  qrCodes: number;
  invitedBy: string | null;
  createdAt: string;
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  expiresAt: string;
}

const Users = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("editor");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);

      // Get current user
      if (authService.isAuthenticated()) {
        const userResponse = await authService.getCurrentUser();
        setCurrentUser({
          id: userResponse.user.id,
          email: userResponse.user.email,
          role: userResponse.user.role as UserRole,
          emailVerified: userResponse.user.emailVerified,
        });

        // Only fetch users and invitations if user is admin
        if (userResponse.user.role === "admin") {
          const [usersResponse, invitationsResponse] = await Promise.all([
            userApi.getUsers(),
            userApi.getInvitations(),
          ]);

          setUsers(usersResponse.users || []);
          setInvitations(invitationsResponse.invitations || []);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle invite user
  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteEmail || !inviteRole) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setInviteLoading(true);
    try {
      await userApi.inviteUser(inviteEmail, inviteRole);

      toast({
        title: "Success",
        description: `Invitation sent to ${inviteEmail}`,
      });

      // Reset form and refresh data
      setInviteEmail("");
      setInviteRole("editor");
      await fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setInviteLoading(false);
    }
  };

  // Handle role update
  const handleUpdateRole = async (userId: string, newRole: UserRole) => {
    try {
      await userApi.updateUserRole(userId, newRole);
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      await fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update role",
        variant: "destructive",
      });
    }
  };

  // Handle remove user
  const handleRemoveUser = async (userId: string) => {
    if (!confirm("Are you sure you want to remove this user?")) return;

    try {
      await userApi.removeUser(userId);
      toast({
        title: "Success",
        description: "User removed successfully",
      });
      await fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to remove user",
        variant: "destructive",
      });
    }
  };

  // Handle resend invitation
  const handleResendInvitation = async (invitationId: string) => {
    try {
      await userApi.resendInvitation(invitationId);
      toast({
        title: "Success",
        description: "Invitation resent successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.error || "Failed to resend invitation",
        variant: "destructive",
      });
    }
  };

  // Handle cancel invitation
  const handleCancelInvitation = async (invitationId: string) => {
    if (!confirm("Are you sure you want to cancel this invitation?")) return;

    try {
      await userApi.cancelInvitation(invitationId);
      toast({
        title: "Success",
        description: "Invitation cancelled successfully",
      });
      await fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.error || "Failed to cancel invitation",
        variant: "destructive",
      });
    }
  };

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "all" ||
      user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  // Check if current user is admin
  const canManageUsers = isAdmin(currentUser);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members and their permissions
          </p>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!canManageUsers) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members and their permissions
          </p>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Access Restricted</h3>
            <p className="text-muted-foreground">
              You need admin privileges to manage users.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Users</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Manage team members and their permissions
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-3 md:space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4 md:pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                  <Avatar className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                    <AvatarImage src={undefined} />
                    <AvatarFallback className="text-sm md:text-base">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="font-medium text-sm md:text-base">
                      {user.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-center">
                    <p className="text-sm font-medium">{user.qrCodes}</p>
                    <p className="text-xs text-muted-foreground">QR Codes</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`text-xs ${getRoleBadgeColor(
                          user.role as UserRole
                        )}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      {currentUser?.role === "admin" &&
                        user.id !== currentUser.id && (
                          <Select
                            value={user.role}
                            onValueChange={(newRole: UserRole) =>
                              handleUpdateRole(user.id, newRole)
                            }
                          >
                            <SelectTrigger className="w-[100px] h-6 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Role</p>
                  </div>

                  <div className="text-center hidden md:block">
                    <Badge
                      variant={
                        user.status === "Active" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {user.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.lastActive}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Activity</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleRemoveUser(user.id)}
                        disabled={user.id === currentUser?.id}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">Pending Invitations</h2>
          <div className="space-y-2">
            {invitations.map((invitation) => (
              <Card key={invitation.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{invitation.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Role: {invitation.role} • Expires:{" "}
                        {new Date(invitation.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResendInvitation(invitation.id)}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Resend
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelInvitation(invitation.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Invite New User */}
      <Card className="mt-4 md:mt-6">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg">
            Invite New User
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Send an invitation to join your team
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <form onSubmit={handleInviteUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <Input
                placeholder="Email address"
                type="email"
                className="text-sm"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
              <Select
                value={inviteRole}
                onValueChange={(value: UserRole) => setInviteRole(value)}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="text-sm"
                type="submit"
                disabled={inviteLoading}
              >
                {inviteLoading && (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                )}
                Send Invitation
              </Button>
            </div>
          </form>
          <div className="text-xs text-muted-foreground space-y-1 mt-4">
            <p>
              <strong>Admin:</strong> {roleDescriptions.admin}
            </p>
            <p>
              <strong>Editor:</strong> {roleDescriptions.editor}
            </p>
            <p>
              <strong>Viewer:</strong> {roleDescriptions.viewer}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
