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
  ChevronLeft,
  ChevronRight,
  List,
  Grid3x3,
  Filter,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type QRDesignOptions,
  renderQRWithDesign,
} from "@/lib/qr-design-utils";
import { authService, User } from "@/services/auth";
import { hasPermission } from "@/utils/roleUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface QRCodeData {
  id: string;
  title: string;
  name?: string;
  type: string;
  status: "Active" | "Inactive";
  data: string;
  scans: number;
  created_at: string;
  updated_at?: string;
  slug: string;
  owner?: string;
  isOwner?: boolean;
  dynamic: boolean;
  designOptions?: QRDesignOptions | null;
  bulk?: boolean;
}

const MyQRCodes = () => {
  const navigate = useNavigate();
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [user, setUser] = useState<User | null>(null);
  const qrRefs = useRef<{ [key: string]: SVGSVGElement | null }>({});
  const [showVisits, setShowVisits] = useState(false);

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
      case "favorites":
        return []; // TODO: Implement favorites
      case "scheduled":
        return []; // TODO: Implement scheduled
      case "all":
      default:
        return codes;
    }
  };

  const displayedQRCodes = getFilteredByTab(filteredQRCodes);

  useEffect(() => {
    const fetchUserAndQRCodes = async () => {
      try {
        const userResponse = await authService.getCurrentUser();
        setUser(userResponse.user);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My QR codes</h1>
        <div className="flex items-center gap-3">
          {user && hasPermission(user.role, "canCreateQR") && (
            <Button
              onClick={() => navigate("/new-qr")}
              className="inline-flex items-center justify-center bg-[rgb(29,89,249)] hover:bg-[rgb(29,89,249)]/90 text-white font-bold text-lg rounded-[28px] whitespace-nowrap transition-all duration-200 ease-in-out shadow-none border-0"
              style={{ lineHeight: '1.75', padding: '4px 10px' }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Create New
            </Button>
          )}
        </div>
      </div>

      {/* Folders Section */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          My folders
        </h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search..." className="pl-10 border-gray-300" style={{ width: '226px' }} />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Folder className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              Here you can manage your folders
            </p>
          </div>
          <Button
            variant="link"
            className="text-blue-600 text-sm p-0 h-auto hover:underline"
          >
            Create folder
          </Button>
        </div>
      </div>

      {/* My QR codes Section */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          My QR codes
        </h2>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent w-full justify-start rounded-none h-auto p-0 gap-6 mb-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#f3f5fe] data-[state=active]:text-[#1d59f9] rounded-none bg-transparent px-0 pb-3 text-sm font-medium text-gray-600"
              style={{ minWidth: '89px', height: '32px' }}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="static"
              className="data-[state=active]:bg-[#f3f5fe] data-[state=active]:text-[#1d59f9] rounded-none bg-transparent px-0 pb-3 text-sm font-medium text-gray-600"
              style={{ minWidth: '89px', height: '32px' }}
            >
              Static
            </TabsTrigger>
            <TabsTrigger
              value="dynamic"
              className="data-[state=active]:bg-[#f3f5fe] data-[state=active]:text-[#1d59f9] rounded-none bg-transparent px-0 pb-3 text-sm font-medium text-gray-600"
              style={{ minWidth: '89px', height: '32px' }}
            >
              Dynamic
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-[#f3f5fe] data-[state=active]:text-[#1d59f9] rounded-none bg-transparent px-0 pb-3 text-sm font-medium text-gray-600"
              style={{ minWidth: '89px', height: '32px' }}
            >
              Favorites
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className="data-[state=active]:bg-[#f3f5fe] data-[state=active]:text-[#1d59f9] rounded-none bg-transparent px-0 pb-3 text-sm font-medium text-gray-600"
              style={{ minWidth: '89px', height: '32px' }}
            >
              Scheduled
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-white">

          {/* Filters and Controls */}
          <div className="p-4 border-b border-gray-200">
            {/* Yellow Warning Banner */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-sm text-yellow-800">
                  You are using QRFYi's free trial. 6 days remaining
                </span>
              </div>
              <Button
                size="sm"
                className="inline-flex items-center justify-center bg-[rgb(29,89,249)] hover:bg-[rgb(29,89,249)]/90 text-white font-bold text-lg rounded-[28px] px-[10px] whitespace-nowrap transition-all duration-200 ease-in-out shadow-none border-0"
                style={{ lineHeight: '1.75' }}
              >
                Update
              </Button>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                    1
                  </span>
                  <span className="text-gray-700">QR code status</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="link"
                  className="text-blue-600 text-sm p-0 h-auto hover:underline"
                >
                  Clean filters
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 border-gray-300"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 border-gray-300"
                >
                  Sort by: Most recent
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-64 h-9 border-gray-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={showVisits}
                      onChange={(e) => setShowVisits(e.target.checked)}
                    />
                    Visits
                  </label>
                  <span className="text-sm text-gray-500">
                    1 of {displayedQRCodes.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1 h-9">
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      viewMode === "list" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      viewMode === "grid" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          {displayedQRCodes.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-gray-50">
                    <TableHead className="w-12">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      QR Type
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Created
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Edited
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      State
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700">
                      Scans
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedQRCodes.map((qr) => (
                    <TableRow
                      key={qr.id}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          className="rounded"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell onClick={() => handleQRClick(qr)}>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center bg-white flex-shrink-0">
                            {qr.designOptions ? (
                              <div className="scale-50 origin-center">
                                {renderQRWithDesign(qr.data, qr.designOptions, {
                                  width: 40,
                                  height: 40,
                                })}
                              </div>
                            ) : (
                              <QRCodeSVG
                                value={qr.data}
                                size={36}
                                ref={(el) => (qrRefs.current[qr.id] = el)}
                                level="M"
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {qr.title}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0"
                            >
                              <svg
                                className="w-3 h-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell onClick={() => handleQRClick(qr)}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                            <QrCode className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm text-blue-600">
                            Website
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        className="text-sm text-gray-600"
                        onClick={() => handleQRClick(qr)}
                      >
                        {formatDate(qr.created_at)}
                      </TableCell>
                      <TableCell
                        className="text-sm text-gray-600"
                        onClick={() => handleQRClick(qr)}
                      >
                        {qr.updated_at ? formatDate(qr.updated_at) : "-"}
                      </TableCell>
                      <TableCell onClick={() => handleQRClick(qr)}>
                        <Badge
                          className={`${
                            qr.status === "Active"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                          } font-medium`}
                        >
                          {qr.status}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className="text-sm text-gray-900 font-medium"
                        onClick={() => handleQRClick(qr)}
                      >
                        {qr.dynamic ? qr.scans?.toLocaleString() || 0 : "-"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
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
                            <DropdownMenuItem onClick={() => handleQRClick(qr)}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
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
    </div>
  );
};

export default MyQRCodes;
