import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Calendar,
  BarChart3,
  Globe,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
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
  designOptions?: {
    frame: number;
    shape: number;
    logo: number;
    level: number;
  } | null;
}

const QRDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [qrData, setQrData] = useState<QRCodeData | null>(
    location.state?.qrData || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/qr/${id}`);
        const data = response.data;
        const formattedData: QRCodeData = {
          id: data.id,
          title: data.name || "Unnamed QR Code",
          name: data.name,
          type: data.dynamic ? "Dynamic" : "Static",
          status:
            data.expiresAt && new Date(data.expiresAt) < new Date()
              ? "Inactive"
              : "Active",
          data: data.originalUrl,
          scans: 0,
          created_at: data.createdAt,
          slug: data.slug,
          dynamic: data.dynamic,
          designOptions: {
            frame: data.designFrame || 1,
            shape: data.designShape || 1,
            logo: data.designLogo || 0,
            level: data.designLevel || 2,
          },
        };
        setQrData(formattedData);
        setEditedName(formattedData.title);
      } catch (err) {
        console.error("Failed to fetch QR data:", err);
        navigate("/my-qr-codes");
      }
    };

    if (!qrData && id) {
      fetchData();
    } else if (qrData) {
      setEditedName(qrData.title);
    }
  }, [id, qrData, navigate]);

  const fetchQRData = async () => {
    // This function is kept for backward compatibility but not used in useEffect
  };

  const handleSaveName = async () => {
    if (!qrData || !editedName.trim()) return;

    try {
      setLoading(true);
      await api.put(`/qr/${qrData.id}`, { name: editedName });
      setQrData({ ...qrData, title: editedName, name: editedName });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update QR name:", err);
      alert("Failed to update QR name");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!qrData || !confirm("Are you sure you want to delete this QR code?"))
      return;

    try {
      await api.delete(`/qr/${qrData.id}`);
      navigate("/my-qr-codes");
    } catch (err) {
      console.error("Failed to delete QR code:", err);
      alert("Failed to delete QR code");
    }
  };

  const handleDownload = () => {
    if (!qrData) return;

    // Create a temporary canvas to render the QR code for download
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 512;
    canvas.height = 512;

    // For now, we'll use a simple QR code download
    // In a real implementation, you'd render the styled QR code to canvas
    const link = document.createElement("a");
    link.download = `${qrData.title || "qr-code"}.png`;

    // This would need to be implemented properly with canvas rendering
    // For now, we'll just trigger the download with a placeholder
    alert("Download functionality would be implemented here");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const getScanUrl = () => {
    if (!qrData) return "";
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000";
    return `${apiBase.replace(/\/$/, "")}/scan/${qrData.slug}`;
  };

  if (!qrData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading QR code details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-4 md:py-8 px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/my-qr-codes")}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Back to My QR Codes</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1 sm:flex-none"
            >
              <Download className="w-4 h-4 mr-1 md:mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 flex-1 sm:flex-none"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-1 md:mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* QR Code Preview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="w-64 h-64 flex items-center justify-center border border-gray-200 rounded-lg bg-white">
                  {qrData.designOptions &&
                  Object.values(qrData.designOptions).some((val, i) =>
                    i === 2 ? val !== 0 : val !== (i === 3 ? 2 : 1)
                  ) ? (
                    <div className="scale-75 origin-center">
                      {renderQRWithDesign(qrData.data, qrData.designOptions, {
                        width: 240,
                        height: 240,
                      })}
                    </div>
                  ) : (
                    <QRCodeSVG value={qrData.data} size={240} level="M" />
                  )}
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Scan URL:</p>
                  <div className="flex items-center space-x-2">
                    <Input value={getScanUrl()} readOnly className="text-xs" />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(getScanUrl())}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(getScanUrl(), "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* QR Code Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    QR Code Name
                  </label>
                  {isEditing ? (
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveName();
                          if (e.key === "Escape") setIsEditing(false);
                        }}
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={handleSaveName}
                        disabled={loading}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-lg font-semibold">{qrData.title}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <p className="mt-1">{qrData.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          qrData.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {qrData.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Destination URL
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input value={qrData.data} readOnly />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(qrData.data)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(qrData.data, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Created Date
                  </label>
                  <p className="mt-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(qrData.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {qrData.scans?.toLocaleString() || 0}
                    </p>
                    <p className="text-sm text-gray-600">Total Scans</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">0</p>
                    <p className="text-sm text-gray-600">This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">0</p>
                    <p className="text-sm text-gray-600">This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Options */}
            {qrData.designOptions && (
              <Card>
                <CardHeader>
                  <CardTitle>Design Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Frame Style
                      </label>
                      <p className="mt-1">Style {qrData.designOptions.frame}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Shape Style
                      </label>
                      <p className="mt-1">Style {qrData.designOptions.shape}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Logo
                      </label>
                      <p className="mt-1">
                        {qrData.designOptions.logo === 0
                          ? "None"
                          : `Logo ${qrData.designOptions.logo}`}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Error Correction
                      </label>
                      <p className="mt-1">Level {qrData.designOptions.level}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRDetail;
