import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImagesQRFormProps {
  onGenerate: (data: any) => void
}

const ImagesQRForm = ({ onGenerate }: ImagesQRFormProps) => {
  const [qrName, setQrName] = useState("")
  const [images, setImages] = useState<FileList | null>(null)
  const [galleryTitle, setGalleryTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files)
    }
  }

  const handleSubmit = () => {
    const data = {
      qrName,
      images,
      galleryTitle,
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

      {/* Images Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Image Gallery Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="images">Upload Images *</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
            />
            <p className="text-sm text-muted-foreground">You can select multiple images</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gallery-title">Gallery Title</Label>
            <Input
              id="gallery-title"
              placeholder="Gallery title"
              value={galleryTitle}
              onChange={(e) => setGalleryTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Gallery description"
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

export default ImagesQRForm
