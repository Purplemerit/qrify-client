import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PDFQRFormProps {
  onGenerate: (data: any) => void
}

const PDFQRForm = ({ onGenerate }: PDFQRFormProps) => {
  const [qrName, setQrName] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    const data = {
      qrName,
      pdfFile,
      title,
      description
    }
    onGenerate(data)
  }

  return (
    <div className="space-y-6">
      {/* QR Name */}
      <Card>
        <CardHeader>
          <CardTitle>QR Code Name</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="qr-name">Name *</Label>
            <Input
              id="qr-name"
              placeholder="Enter QR code name"
              value={qrName}
              onChange={(e) => setQrName(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* PDF Upload */}
      <Card>
        <CardHeader>
          <CardTitle>PDF Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pdf-file">Upload PDF *</Label>
            <Input
              id="pdf-file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="PDF title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="PDF description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        className="w-full rounded-2xl px-8 py-6 text-lg"
      >
        Generate QR Code
      </Button>
    </div>
  )
}

export default PDFQRForm
