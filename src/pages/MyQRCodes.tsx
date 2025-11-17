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
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type QRDesignOptions,
  renderQRWithDesign,
} from "@/lib/qr-design-utils";

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
  const qrRefs = useRef<{ [key: string]: SVGSVGElement | null }>({});

  // Separate regular and bulk QR codes
  const regularQRCodes = qrCodes.filter((qr) => !qr.bulk);
  const bulkQRCodes = qrCodes.filter((qr) => qr.bulk);

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const res = await api.get("/qr/my-codes");
        setQrCodes(res.data);
      } catch (err) {
        console.error("Failed to fetch QR codes:", err);
      }
    };
    fetchQRCodes();
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

  return (
    <div className="p-4 md:p-6 bg-gray-50/50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My QR codes</h1>
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate("/bulk-qr")} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Bulk QR
          </Button>
          <Button onClick={() => navigate("/new-qr")}>
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      {/* Bulk QR Codes Section */}
      {bulkQRCodes.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-700">
                  Bulk QR Codes
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  {bulkQRCodes.length} codes
                </Badge>
              </div>
            </div>
          </div>

          {/* Bulk QR Codes Grid */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {bulkQRCodes.map((qr) => (
                <div
                  key={qr.id}
                  className="group relative bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleQRClick(qr)}
                >
                  {/* QR Code Preview */}
                  <div className="w-full aspect-square border border-gray-200 rounded bg-white flex items-center justify-center mb-3">
                    {qr.designOptions ? (
                      <div className="scale-75 origin-center">
                        {renderQRWithDesign(qr.data, qr.designOptions, {
                          width: 80,
                          height: 80,
                        })}
                      </div>
                    ) : (
                      <QRCodeSVG
                        value={qr.data}
                        size={60}
                        ref={(el) => (qrRefs.current[qr.id] = el)}
                        level="M"
                      />
                    )}
                  </div>

                  {/* QR Info */}
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm text-gray-900 truncate">
                      {qr.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{qr.data}</p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="text-xs border-blue-200 text-blue-800 bg-blue-50"
                      >
                        Bulk
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {qr.scans?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>

                  {/* Actions Menu - appears on hover */}
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular QR Codes Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            My folders
          </h2>
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search..." className="pl-10" />
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Folder className="w-5 h-5 mr-3 text-gray-400" />
              <span>Here you can manage your section</span>
              <Button variant="link" className="text-blue-600 pl-2">
                Create folder
              </Button>
            </div>
          </div>
        </div>

        {/* QR Codes List */}
        <div className="divide-y divide-gray-200">
          {regularQRCodes.map((qr) => (
            <div
              key={qr.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              {/* Left Section: QR Name and Preview */}
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center bg-gray-50 cursor-pointer"
                  onClick={() => handleQRClick(qr)}
                >
                  {qr.designOptions ? (
                    <div className="scale-50 origin-center w-[80px] h-[80px] flex items-center justify-center">
                      {renderQRWithDesign(qr.data, qr.designOptions, {
                        width: 80,
                        height: 80,
                      })}
                    </div>
                  ) : (
                    <QRCodeSVG
                      value={qr.data}
                      size={40}
                      ref={(el) => (qrRefs.current[qr.id] = el)}
                      level="M"
                    />
                  )}
                </div>
                <div>
                  {editingId === qr.id ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="h-8 w-48"
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
                        className="h-8 w-8 p-0"
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCancelEdit}
                        className="h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h3
                        className="font-medium text-gray-900 cursor-pointer"
                        onClick={() => handleQRClick(qr)}
                      >
                        {qr.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {qr.data}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section: Metadata and Actions */}
              <div className="flex items-center space-x-8">
                {/* Created Date */}
                <div className="text-sm text-gray-500">
                  {new Date(qr.created_at).toLocaleDateString()}
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1">
                  <Badge
                    variant={qr.status === "Active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {qr.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      qr.dynamic
                        ? "border-green-200 text-green-800 bg-green-50"
                        : "border-orange-200 text-orange-800 bg-orange-50"
                    }`}
                  >
                    {qr.dynamic ? "Dynamic" : "Static"}
                  </Badge>
                </div>

                {/* Scan Count */}
                <div className="text-sm text-gray-500 min-w-[80px] text-center">
                  {qr.dynamic
                    ? `${qr.scans?.toLocaleString() || 0} scans`
                    : "No tracking"}
                </div>

                {/* Actions Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(qr.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {regularQRCodes.length === 0 && bulkQRCodes.length === 0 && (
          <div className="p-12 text-center">
            <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No QR codes yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first QR code to get started
            </p>
            <Button onClick={() => navigate("/new-qr")}>
              <Plus className="w-4 h-4 mr-2" />
              Create New QR Code
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQRCodes;
