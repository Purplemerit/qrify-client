import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface GenericQRFormProps {
  qrType: string
  onGenerate: (data: any) => void
}

const GenericQRForm = ({ qrType, onGenerate }: GenericQRFormProps) => {
  const [qrName, setQrName] = useState("")
  const [content, setContent] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    const data = {
      qrName,
      content,
      description,
      type: qrType
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

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>{qrType} Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Input
              id="content"
              placeholder={`Enter ${qrType.toLowerCase()} content`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description (optional)"
              rows={4}
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

export default GenericQRForm
