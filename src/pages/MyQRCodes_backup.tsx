"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  QrCode,
  MoreHorizontal,
  Search,
  Eye,
  Download,
  Edit,
  Trash2,
  Plus,
  Folder,
  Check,
  X,
  List,
  Grid3x3,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { QRCodeSVG } from "qrcode.react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type QRDesignOptions,
  renderQRWithDesign,
} from "@/lib/qr-design-utils";
import { authService, User } from "@/services/auth";
import { hasPermission } from "@/utils/roleUtils";

interface QRCodeData {
  id: string;
  title: string;
  name?: string;
  type: string;
  status: "Active" | "Inactive";
  data: string;
  scans: number;
  created_at: string;
  slug: string;
  owner?: string; // Email of the owner
  isOwner?: boolean; // Whether current user owns this QR code
  dynamic: boolean;
  designOptions?: QRDesignOptions | null;
  bulk?: boolean; // Add bulk property
}

const MyQRCodes = () => {
  const navigate = useNavigate();
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [viewedQRId, setViewedQRId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [selectedQRCodes, setSelectedQRCodes] = useState<Set<string>>(
    new Set()
  );
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [user, setUser] = useState<User | null>(null);
  const qrRefs = useRef<{ [key: string]: SVGSVGElement | null }>({});

  // Filter QR codes based on search query
  const filteredQRCodes = qrCodes.filter((qr) => {
    const query = searchQuery.toLowerCase();
    return (
      qr.title.toLowerCase().includes(query) ||
      qr.data.toLowerCase().includes(query) ||
      qr.type.toLowerCase().includes(query)
    );
  });

  // Filter by tab type
  const getFilteredByTab = (codes: QRCodeData[]) => {
    switch (activeTab) {
      case "dynamic":
        return codes.filter((qr) => qr.dynamic && !qr.bulk);
      case "static":
        return codes.filter((qr) => !qr.dynamic && !qr.bulk);
      case "bulk":
        return codes.filter((qr) => qr.bulk);
      case "all":
      default:
        return codes;
    }
  };

  const displayedQRCodes = getFilteredByTab(filteredQRCodes);

  useEffect(() => {
    const fetchUserAndQRCodes = async () => {
      try {
        // Load user data
        const userResponse = await authService.getCurrentUser();
        setUser(userResponse.user);

        // Load QR codes
        const res = await api.get("/qr/my-codes");
        setQrCodes(res.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchUserAndQRCodes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this QR code?")) return;

    try {
      await api.delete(`/qr/${id}`);
      setQrCodes(qrCodes.filter((qr) => qr.id !== id));
    } catch (err) {
      console.error("Failed to delete QR code:", err);
      alert("Failed to delete QR code");
    }
  };

  const handleEditName = (qr: QRCodeData) => {
    setEditingId(qr.id);
    setEditingName(qr.title);
  };

  const handleSaveName = async (id: string) => {
    try {
      await api.put(`/qr/${id}`, { name: editingName });
      setQrCodes(
        qrCodes.map((qr) =>
          qr.id === id ? { ...qr, title: editingName, name: editingName } : qr
        )
      );
      setEditingId(null);
      setEditingName("");
    } catch (err) {
      console.error("Failed to update QR name:", err);
      alert("Failed to update QR name");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleQRClick = (qr: QRCodeData) => {
    navigate(`/qr/${qr.id}`, { state: { qrData: qr } });
  };

  const handleDownload = (id: string, title: string) => {
    const svg = qrRefs.current[id];
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || "qr-code"}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedQRCodes(new Set());
  };

  const toggleQRSelection = (id: string) => {
    const newSelected = new Set(selectedQRCodes);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedQRCodes(newSelected);
  };

  const selectAllQRCodes = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(displayedQRCodes.map((qr) => qr.id));
      setSelectedQRCodes(allIds);
    } else {
      setSelectedQRCodes(new Set());
    }
  };

  const handleBulkDelete = async () => {
    if (selectedQRCodes.size === 0) return;

    // Filter selected QR codes to only include those owned by the current user
    const ownedSelectedQRs = qrCodes.filter(
      (qr) => selectedQRCodes.has(qr.id) && qr.isOwner
    );

    if (ownedSelectedQRs.length === 0) {
      alert("You can only delete QR codes that you created.");
      return;
    }

    const message = `Are you sure you want to delete ${
      ownedSelectedQRs.length
    } QR code${ownedSelectedQRs.length > 1 ? "s" : ""}?`;
    if (!confirm(message)) return;

    try {
      // Delete only owned QR codes
      const deletePromises = ownedSelectedQRs.map((qr) =>
        api.delete(`/qr/${qr.id}`)
      );

      await Promise.all(deletePromises);

      // Update state - remove only the successfully deleted QR codes
      const deletedIds = new Set(ownedSelectedQRs.map((qr) => qr.id));
      setQrCodes(qrCodes.filter((qr) => !deletedIds.has(qr.id)));
      setSelectedQRCodes(new Set());
      setIsSelectionMode(false);

      if (ownedSelectedQRs.length < selectedQRCodes.size) {
        alert(
          `Deleted ${ownedSelectedQRs.length} QR codes. Some items were not deleted because you don't own them.`
        );
      }
    } catch (err) {
      console.error("Failed to delete QR codes:", err);
      alert("Failed to delete some QR codes");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          My QR codes
        </h1>
        <div className="flex items-center gap-3">
          {isSelectionMode ? (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs md:text-sm text-gray-600">
                {selectedQRCodes.size} selected
              </span>
              {user && hasPermission(user.role, "canDeleteQR") && (
                <Button
                  onClick={handleBulkDelete}
                  variant="destructive"
                  size="sm"
                  disabled={selectedQRCodes.size === 0}
                >
                  <Trash2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Delete Selected</span>
                  <span className="sm:hidden">Delete</span>
                </Button>
              )}
              <Button onClick={toggleSelectionMode} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {user &&
                hasPermission(user.role, "canDeleteQR") &&
                qrCodes.some((qr) => qr.isOwner) && (
                  <Button
                    onClick={toggleSelectionMode}
                    variant="outline"
                    size="sm"
                  >
                    Select
                  </Button>
                )}
              {user &&
                (hasPermission(user.role, "canCreateQR") ||
                  hasPermission(user.role, "canBulkCreateQR")) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Create New
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user && hasPermission(user.role, "canCreateQR") && (
                        <DropdownMenuItem onClick={() => navigate("/new-qr")}>
                          <QrCode className="w-4 h-4 mr-2" />
                          Single QR Code
                        </DropdownMenuItem>
                      )}
                      {user && hasPermission(user.role, "canBulkCreateQR") && (
                        <DropdownMenuItem onClick={() => navigate("/bulk-qr")}>
                          <Folder className="w-4 h-4 mr-2" />
                          Bulk QR Codes
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-full">
        <div className="p-4 md:p-6 border-b border-gray-200 overflow-hidden">
          {/* Search and View Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search QR codes..."
                className="pl-10 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 px-3"
              >
                <List className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">List</span>
              </Button>
              <Button
                variant={viewMode === "card" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("card")}
                className="h-8 px-3"
              >
                <Grid3x3 className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Card</span>
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <TabsList className="inline-flex w-auto h-auto gap-1 min-w-full sm:min-w-0">
                <TabsTrigger
                  value="all"
                  className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap data-[state=active]:bg-blue-600 data-[state=active]:text-white flex-1 sm:flex-none"
                >
                  All ({filteredQRCodes.length})
                </TabsTrigger>
                <TabsTrigger
                  value="dynamic"
                  className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap data-[state=active]:bg-blue-600 data-[state=active]:text-white flex-1 sm:flex-none"
                >
                  Dynamic (
                  {
                    filteredQRCodes.filter((qr) => qr.dynamic && !qr.bulk)
                      .length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger
                  value="static"
                  className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap data-[state=active]:bg-blue-600 data-[state=active]:text-white flex-1 sm:flex-none"
                >
                  Static (
                  {
                    filteredQRCodes.filter((qr) => !qr.dynamic && !qr.bulk)
                      .length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger
                  value="bulk"
                  className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap data-[state=active]:bg-blue-600 data-[state=active]:text-white flex-1 sm:flex-none"
                >
                  Bulk ({filteredQRCodes.filter((qr) => qr.bulk).length})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Select All Checkbox */}
            {isSelectionMode && displayedQRCodes.length > 0 && (
              <div className="flex items-center gap-2 mt-4 mb-4 pt-4 border-t border-gray-200">
                <Checkbox
                  checked={displayedQRCodes.every((qr) =>
                    selectedQRCodes.has(qr.id)
                  )}
                  onCheckedChange={(checked) => selectAllQRCodes(!!checked)}
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            )}

            <TabsContent value="all" className="mt-6">
              {viewMode === "list" ? (
                <QRListView
                  qrCodes={displayedQRCodes}
                  isSelectionMode={isSelectionMode}
                  selectedQRCodes={selectedQRCodes}
                  toggleQRSelection={toggleQRSelection}
                  handleQRClick={handleQRClick}
                  editingId={editingId}
                  editingName={editingName}
                  setEditingName={setEditingName}
                  handleSaveName={handleSaveName}
                  handleCancelEdit={handleCancelEdit}
                  handleDownload={handleDownload}
                  handleEditName={handleEditName}
                  handleDelete={handleDelete}
                  qrRefs={qrRefs}
                  user={user}
                />
              ) : (
                <QRCardView
                  qrCodes={displayedQRCodes}
                  isSelectionMode={isSelectionMode}
                  selectedQRCodes={selectedQRCodes}
                  toggleQRSelection={toggleQRSelection}
                  handleQRClick={handleQRClick}
                  handleDownload={handleDownload}
                  handleEditName={handleEditName}
                  handleDelete={handleDelete}
                  qrRefs={qrRefs}
                  user={user}
                />
              )}
            </TabsContent>

            <TabsContent value="dynamic" className="mt-6">
              {viewMode === "list" ? (
                <QRListView
                  qrCodes={displayedQRCodes}
                  isSelectionMode={isSelectionMode}
                  selectedQRCodes={selectedQRCodes}
                  toggleQRSelection={toggleQRSelection}
                  handleQRClick={handleQRClick}
                  editingId={editingId}
                  editingName={editingName}
                  setEditingName={setEditingName}
                  handleSaveName={handleSaveName}
                  handleCancelEdit={handleCancelEdit}
                  handleDownload={handleDownload}
                  handleEditName={handleEditName}
                  handleDelete={handleDelete}
                  qrRefs={qrRefs}
                  user={user}
                />
              ) : (
                <QRCardView
                  qrCodes={displayedQRCodes}
                  isSelectionMode={isSelectionMode}
                  selectedQRCodes={selectedQRCodes}
                  toggleQRSelection={toggleQRSelection}
                  handleQRClick={handleQRClick}
                  handleDownload={handleDownload}
                  handleEditName={handleEditName}
                  handleDelete={handleDelete}
                  qrRefs={qrRefs}
                  user={user}
                />
              )}
            </TabsContent>

            <TabsContent value="static" className="mt-6">
              {viewMode === "list" ? (
                <QRListView
                  qrCodes={displayedQRCodes}
                  isSelectionMode={isSelectionMode}
                  selectedQRCodes={selectedQRCodes}
                  toggleQRSelection={toggleQRSelection}
                  handleQRClick={handleQRClick}
                  editingId={editingId}
                  editingName={editingName}
                  setEditingName={setEditingName}
                  handleSaveName={handleSaveName}
                  handleCancelEdit={handleCancelEdit}
                  handleDownload={handleDownload}
                  handleEditName={handleEditName}
                  handleDelete={handleDelete}
                  qrRefs={qrRefs}
                  user={user}
                />
              ) : (
                <QRCardView
                  qrCodes={displayedQRCodes}
                  isSelectionMode={isSelectionMode}
                  selectedQRCodes={selectedQRCodes}
                  toggleQRSelection={toggleQRSelection}
                  handleQRClick={handleQRClick}
                  handleDownload={handleDownload}
                  handleEditName={handleEditName}
                  handleDelete={handleDelete}
                  qrRefs={qrRefs}
                  user={user}
                />
              )}
            </TabsContent>

            <TabsContent value="bulk" className="mt-6">
              {viewMode === "list" ? (
                <QRListView
                  qrCodes={displayedQRCodes}
                  isSelectionMode={isSelectionMode}
                  selectedQRCodes={selectedQRCodes}
                  toggleQRSelection={toggleQRSelection}
                  handleQRClick={handleQRClick}
                  editingId={editingId}
                  editingName={editingName}
                  setEditingName={setEditingName}
                  handleSaveName={handleSaveName}
                  handleCancelEdit={handleCancelEdit}
                  handleDownload={handleDownload}
                  handleEditName={handleEditName}
                  handleDelete={handleDelete}
                  qrRefs={qrRefs}
                  user={user}
                />
              ) : (
                <QRCardView
                  qrCodes={displayedQRCodes}
                  isSelectionMode={isSelectionMode}
                  selectedQRCodes={selectedQRCodes}
                  toggleQRSelection={toggleQRSelection}
                  handleQRClick={handleQRClick}
                  handleDownload={handleDownload}
                  handleEditName={handleEditName}
                  handleDelete={handleDelete}
                  qrRefs={qrRefs}
                  user={user}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Empty State */}
        {displayedQRCodes.length === 0 && (
          <div className="p-12 text-center">
            <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No QR codes found" : "No QR codes yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Try a different search term"
                : "Create your first QR code to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate("/new-qr")}>
                <Plus className="w-4 h-4 mr-2" />
                Create New QR Code
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// List View Component
const QRListView: React.FC<{
  qrCodes: QRCodeData[];
  isSelectionMode: boolean;
  selectedQRCodes: Set<string>;
  toggleQRSelection: (id: string) => void;
  handleQRClick: (qr: QRCodeData) => void;
  editingId: string | null;
  editingName: string;
  setEditingName: (name: string) => void;
  handleSaveName: (id: string) => void;
  handleCancelEdit: () => void;
  handleDownload: (id: string, title: string) => void;
  handleEditName: (qr: QRCodeData) => void;
  handleDelete: (id: string) => void;
  qrRefs: React.MutableRefObject<{ [key: string]: SVGSVGElement | null }>;
  user: User | null;
}> = ({
  qrCodes,
  isSelectionMode,
  selectedQRCodes,
  toggleQRSelection,
  handleQRClick,
  editingId,
  editingName,
  setEditingName,
  handleSaveName,
  handleCancelEdit,
  handleDownload,
  handleEditName,
  handleDelete,
  qrRefs,
  user,
}) => {
  return (
    <div className="divide-y divide-gray-200">
      {qrCodes.map((qr) => (
        <div
          key={qr.id}
          className={`flex items-center p-3 md:p-4 hover:bg-gray-50 transition-colors gap-1 sm:gap-2 ${
            selectedQRCodes.has(qr.id)
              ? "bg-blue-50 border-l-4 border-blue-500"
              : ""
          }`}
        >
          {/* Left Section */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-1 min-w-0 overflow-hidden">
            {isSelectionMode && (
              <Checkbox
                checked={selectedQRCodes.has(qr.id)}
                onCheckedChange={() => toggleQRSelection(qr.id)}
                className="flex-shrink-0"
              />
            )}
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border border-gray-200 rounded flex items-center justify-center bg-gray-50 cursor-pointer flex-shrink-0 overflow-hidden"
              onClick={() =>
                isSelectionMode ? toggleQRSelection(qr.id) : handleQRClick(qr)
              }
            >
              {qr.designOptions ? (
                <div className="scale-[0.35] sm:scale-[0.45] md:scale-50 origin-center flex items-center justify-center">
                  <div className="w-20 h-20">
                    {renderQRWithDesign(qr.data, qr.designOptions, {
                      width: 80,
                      height: 80,
                    })}
                  </div>
                </div>
              ) : (
                <QRCodeSVG
                  value={qr.data}
                  size={32}
                  ref={(el) => (qrRefs.current[qr.id] = el)}
                  level="M"
                  className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px]"
                />
              )}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              {editingId === qr.id ? (
                <div className="flex items-center space-x-2">
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="h-8 w-24 sm:w-32 md:w-48 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveName(qr.id);
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSaveName(qr.id)}
                    className="h-8 w-8 p-0 flex-shrink-0"
                  >
                    <Check className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelEdit}
                    className="h-8 w-8 p-0 flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ) : (
                <div className="min-w-0 overflow-hidden max-w-[120px] sm:max-w-[180px] md:max-w-xs lg:max-w-md">
                  <h3
                    className="font-medium text-sm md:text-base text-gray-900 cursor-pointer truncate"
                    onClick={() =>
                      isSelectionMode
                        ? toggleQRSelection(qr.id)
                        : handleQRClick(qr)
                    }
                  >
                    {qr.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 truncate">
                    {qr.data}
                  </p>
                  {qr.owner && !qr.isOwner && (
                    <p className="text-xs text-blue-600">
                      Created by: {qr.owner}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-auto">
            {/* Status Badge - Hidden on smallest mobile */}
            <Badge
              variant={qr.status === "Active" ? "default" : "secondary"}
              className="hidden xs:inline-flex text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 whitespace-nowrap"
            >
              {qr.status}
            </Badge>

            {/* Actions Menu */}
            {!isSelectionMode && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 flex-shrink-0"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleQRClick(qr)}>
                    <Eye className="w-4 h-4 mr-2" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDownload(qr.id, qr.title)}
                  >
                    <Download className="w-4 h-4 mr-2" /> Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEditName(qr)}>
                    <Edit className="w-4 h-4 mr-2" /> Edit Name
                  </DropdownMenuItem>
                  {user &&
                    hasPermission(user.role, "canDeleteQR") &&
                    qr.isOwner && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(qr.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </>
                    )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Card View Component
const QRCardView: React.FC<{
  qrCodes: QRCodeData[];
  isSelectionMode: boolean;
  selectedQRCodes: Set<string>;
  toggleQRSelection: (id: string) => void;
  handleQRClick: (qr: QRCodeData) => void;
  handleDownload: (id: string, title: string) => void;
  handleEditName: (qr: QRCodeData) => void;
  handleDelete: (id: string) => void;
  qrRefs: React.MutableRefObject<{ [key: string]: SVGSVGElement | null }>;
  user: User | null;
}> = ({
  qrCodes,
  isSelectionMode,
  selectedQRCodes,
  toggleQRSelection,
  handleQRClick,
  handleDownload,
  handleEditName,
  handleDelete,
  qrRefs,
  user,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
      {qrCodes.map((qr) => (
        <div
          key={qr.id}
          className={`group relative bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer ${
            selectedQRCodes.has(qr.id)
              ? "ring-2 ring-blue-500 bg-blue-50 border-blue-500"
              : ""
          }`}
          onClick={() =>
            isSelectionMode ? toggleQRSelection(qr.id) : handleQRClick(qr)
          }
        >
          {isSelectionMode && (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox
                checked={selectedQRCodes.has(qr.id)}
                onCheckedChange={() => toggleQRSelection(qr.id)}
                className="bg-white"
              />
            </div>
          )}

          {/* QR Code Preview */}
          <div className="w-full aspect-square border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center mb-2 sm:mb-3">
            {qr.designOptions ? (
              <div className="scale-[0.6] sm:scale-75 md:scale-90 origin-center">
                {renderQRWithDesign(qr.data, qr.designOptions, {
                  width: 100,
                  height: 100,
                })}
              </div>
            ) : (
              <QRCodeSVG
                value={qr.data}
                size={60}
                ref={(el) => (qrRefs.current[qr.id] = el)}
                level="M"
                className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"
              />
            )}
          </div>

          {/* QR Info */}
          <div className="space-y-1 sm:space-y-2">
            <h3
              className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 truncate"
              title={qr.title}
            >
              {qr.title}
            </h3>
            <p
              className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate"
              title={qr.data}
            >
              {qr.data}
            </p>
            {qr.owner && !qr.isOwner && (
              <p className="text-[10px] sm:text-xs text-blue-600 truncate">
                Created by: {qr.owner}
              </p>
            )}
            <div className="flex items-center justify-between gap-1 sm:gap-2 pt-0.5 sm:pt-1">
              <Badge
                variant={qr.status === "Active" ? "default" : "secondary"}
                className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5"
              >
                {qr.status}
              </Badge>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium">
                {qr.dynamic ? `${qr.scans?.toLocaleString() || 0}` : "Static"}
              </span>
            </div>
          </div>

          {/* Actions Menu */}
          {!isSelectionMode && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleQRClick(qr)}>
                    <Eye className="w-4 h-4 mr-2" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(qr.id, qr.title);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" /> Download
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditName(qr);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" /> Edit Name
                  </DropdownMenuItem>
                  {user &&
                    hasPermission(user.role, "canDeleteQR") &&
                    qr.isOwner && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(qr.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </>
                    )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyQRCodes;
