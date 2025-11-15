import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Trash2, Edit } from "lucide-react";
import {
  type QRDesignOptions,
  renderQRWithDesign,
} from "@/lib/qr-design-utils";
import { QRCodeSVG } from "qrcode.react";
import QRDesignSelector from "@/components/QRDesignSelector";
import templateStorage, { type QRTemplate } from "@/lib/template-storage";

// Enhanced QR Preview Component with Design Applied
const QRPreview: React.FC<{
  designOptions: QRDesignOptions;
  size?: number;
}> = ({ designOptions, size = 120 }) => {
  return (
    <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
      {renderQRWithDesign(
        "https://example.com/template-preview",
        designOptions,
        { width: size, height: size }
      )}
    </div>
  );
};

const Templates = () => {
  const [templates, setTemplates] = useState<QRTemplate[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
  const [designOptions, setDesignOptions] = useState<QRDesignOptions>({
    frame: 1,
    shape: 1,
    logo: 0,
    level: 2,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Load templates from API on component mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError("");
      const savedTemplates = await templateStorage.getTemplates();
      setTemplates(savedTemplates);
    } catch (err) {
      setError("Failed to load templates. Please try again.");
      console.error("Failed to load templates:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!newTemplateName.trim()) {
      setError("Please enter a template name");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const newTemplate = await templateStorage.saveTemplate({
        name: newTemplateName.trim(),
        description: newTemplateDescription.trim() || undefined,
        designOptions: { ...designOptions },
      });

      setTemplates((prev) => [newTemplate, ...prev]);
      setNewTemplateName("");
      setNewTemplateDescription("");
      setDesignOptions({
        frame: 1,
        shape: 1,
        logo: 0,
        level: 2,
      });
      setShowCreateForm(false);
    } catch (err) {
      setError("Failed to create template. Please try again.");
      console.error("Failed to create template:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      setError("");
      await templateStorage.deleteTemplate(id);
      setTemplates((prev) => prev.filter((template) => template.id !== id));
    } catch (err) {
      setError("Failed to delete template. Please try again.");
      console.error("Failed to delete template:", err);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">QR Code Templates</h1>
        <p className="text-muted-foreground">
          Create and manage your custom QR code design templates
        </p>
      </div>

      {/* Create New Template Button */}
      <div className="mb-8">
        <Button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2"
          disabled={loading}
        >
          <Plus className="h-4 w-4" />
          Create New Template
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={loadTemplates}
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Create Template Form */}
      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create Custom Template</CardTitle>
            <CardDescription>
              Design your QR code template with custom frames, shapes, logos,
              and quality settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="Enter template name..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="template-description">
                    Description (Optional)
                  </Label>
                  <Input
                    id="template-description"
                    value={newTemplateDescription}
                    onChange={(e) => setNewTemplateDescription(e.target.value)}
                    placeholder="Enter template description..."
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <QRPreview designOptions={designOptions} size={180} />
              </div>
            </div>

            {/* Design Options */}
            <QRDesignSelector
              designOptions={designOptions}
              onDesignChange={setDesignOptions}
            />

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleCreateTemplate}
                disabled={!newTemplateName.trim() || saving}
              >
                {saving ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Template"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewTemplateName("");
                  setNewTemplateDescription("");
                  setError("");
                  setDesignOptions({
                    frame: 1,
                    shape: 1,
                    logo: 0,
                    level: 2,
                  });
                }}
                disabled={saving}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Templates</h2>
        {templates.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No templates yet</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Create your first QR code template to save time when generating
                QR codes with consistent designs
              </p>
              <Button className="mt-4" onClick={() => setShowCreateForm(true)}>
                Create Your First Template
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {template.description && (
                        <CardDescription className="mt-1">
                          {template.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">
                      Frame {template.designOptions.frame}
                    </Badge>
                    <Badge variant="secondary">
                      Shape {template.designOptions.shape}
                    </Badge>
                    {template.designOptions.logo > 0 && (
                      <Badge variant="secondary">
                        Logo {template.designOptions.logo}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <QRPreview
                        designOptions={template.designOptions}
                        size={96}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      Created {formatDate(template.createdAt)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
