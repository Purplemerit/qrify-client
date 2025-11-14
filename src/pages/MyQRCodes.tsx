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
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  designOptions?: {
    frame: number;
    shape: number;
    logo: number;
    level: number;
  };
}

const MyQRCodes = () => {
  const navigate = useNavigate();
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [viewedQRId, setViewedQRId] = useState<string | null>(null);
  const qrRefs = useRef<{ [key: string]: SVGSVGElement | null }>({});

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
        <Button onClick={() => navigate("/new-qr")}>
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>

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
          {qrCodes.map((qr) => (
            <div
              key={qr.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              {/* Left Section: QR Name and Preview */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center bg-gray-50">
                  {viewedQRId === qr.id ? (
                    <QRCodeSVG
                      value={qr.data}
                      size={40}
                      ref={(el) => (qrRefs.current[qr.id] = el)}
                    />
                  ) : (
                    <QrCode className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{qr.title}</h3>
                  <p className="text-sm text-gray-500 truncate max-w-xs">
                    {qr.data}
                  </p>
                </div>
              </div>

              {/* Right Section: Metadata and Actions */}
              <div className="flex items-center space-x-8">
                {/* Created Date */}
                <div className="text-sm text-gray-500">
                  {new Date(qr.created_at).toLocaleDateString()}
                </div>

                {/* Status */}
                <Badge
                  variant={qr.status === "Active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {qr.status}
                </Badge>

                {/* Scan Count */}
                <div className="text-sm text-gray-500 min-w-[80px] text-center">
                  {qr.scans?.toLocaleString() || 0} scans
                </div>

                {/* Actions Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setViewedQRId(qr.id)}>
                      <Eye className="w-4 h-4 mr-2" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDownload(qr.id, qr.title)}
                    >
                      <Download className="w-4 h-4 mr-2" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {qrCodes.length === 0 && (
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
