import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MoreHorizontal, Mail, Phone } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    qrCodes: 15,
    avatar: null
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    role: "Editor",
    status: "Active",
    lastActive: "1 day ago",
    qrCodes: 8,
    avatar: null
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "1 week ago",
    qrCodes: 3,
    avatar: null
  }
]

const Users = () => {
  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-muted-foreground mt-1">Manage team members and their permissions</p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{user.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{user.qrCodes}</p>
                    <p className="text-xs text-muted-foreground">QR Codes</p>
                  </div>
                  
                  <div className="text-center">
                    <Badge 
                      variant={user.role === "Admin" ? "default" : user.role === "Editor" ? "secondary" : "outline"}
                    >
                      {user.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Role</p>
                  </div>

                  <div className="text-center">
                    <Badge 
                      variant={user.status === "Active" ? "default" : "secondary"}
                    >
                      {user.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{user.lastActive}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Edit Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        View Activity
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
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

      {/* Invite New User */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Invite New User</CardTitle>
          <CardDescription>Send an invitation to join your team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Email address" type="email" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Button>Send Invitation</Button>
          </div>
          <div className="text-xs text-muted-foreground">
            <p><strong>Admin:</strong> Full access to all features and settings</p>
            <p><strong>Editor:</strong> Can create and manage QR codes, limited settings access</p>
            <p><strong>Viewer:</strong> Read-only access to QR codes and analytics</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Users