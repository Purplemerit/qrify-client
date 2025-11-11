"use client"

import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MyQRCodes = () => {
  const [qrCodes, setQrCodes] = useState([])
  const [viewedQRId, setViewedQRId] = useState<string | null>(null)
  const qrRefs = useRef<{ [key: string]: SVGSVGElement | null }>({})

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/qr/my-codes")
        setQrCodes(res.data)
      } catch (err) {
        console.error("Failed to fetch QR codes:", err)
      }
    }
    fetchQRCodes()
  }, [])

  const handleDownload = (id: string, title: string) => {
    const svg = qrRefs.current[id]
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${title || "qr-code"}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50/50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My QR codes</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">My folders</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map((qr) => (
          <div
            key={qr.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-800">{qr.title}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {qr.type}
                  </Badge>
                  <Badge
                    variant={qr.status === "Active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {qr.status}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setViewedQRId(qr.id)}>
                    <Eye className="w-4 h-4 mr-2" /> View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload(qr.id, qr.title)}>
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

            <div className="flex justify-center">
              <div className="w-24 h-24 border border-muted rounded flex items-center justify-center bg-muted/50">
                {viewedQRId === qr.id ? (
                  <QRCodeSVG
                    value={qr.data}
                    size={80}
                    ref={(el) => (qrRefs.current[qr.id] = el)}
                  />
                ) : (
                  <QrCode className="w-16 h-16 text-muted-foreground" />
                )}
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <p className="text-sm text-muted-foreground truncate">{qr.data}</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Scans: {qr.scans?.toLocaleString() || 0}</span>
                <span>Created: {new Date(qr.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => setViewedQRId(qr.id)}
              >
                <Eye className="w-4 h-4 mr-1" /> View
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => handleDownload(qr.id, qr.title)}
              >
                <Download className="w-4 h-4 mr-1" /> Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyQRCodes
