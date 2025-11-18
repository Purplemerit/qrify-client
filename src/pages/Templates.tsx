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
import { Plus, Eye, Trash2, Edit, X } from "lucide-react";
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
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<QRTemplate | null>(
    null
  );
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
  const [designOptions, setDesignOptions] = useState<QRDesignOptions>({
    frame: 1,
    shape: 1,
    logo: 0,
    level: 2,
    dotStyle: 1,
    bgColor: "#ffffff",
    outerBorder: 1,
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
        dotStyle: 1,
        bgColor: "#ffffff",
        outerBorder: 1,
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

  const handlePreviewTemplate = (template: QRTemplate) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewTemplate(null);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Preview Modal Component
  const PreviewModal = () => {
    if (!showPreview || !previewTemplate) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closePreview();
      }
    };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-3 md:p-4 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] md:max-h-[85vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-4 md:px-8 md:py-6 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-2">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">
                  {previewTemplate.name}
                </h2>
                {previewTemplate.description && (
                  <p className="text-gray-600 text-xs md:text-sm">
                    {previewTemplate.description}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closePreview}
                className="p-1.5 md:p-2 hover:bg-white/50 rounded-full flex-shrink-0"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8 overflow-y-auto max-h-[calc(90vh-80px)] md:max-h-[calc(85vh-100px)]">
            {/* QR Code Preview */}
            <div className="text-center mb-6 md:mb-8">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl md:rounded-2xl p-6 md:p-10 inline-block shadow-inner">
                <QRPreview
                  designOptions={previewTemplate.designOptions}
                  size={200}
                />
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
                Template Preview • Sample QR Code
              </p>
            </div>

            {/* Design Options */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg">
                  Design Configuration
                </h4>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <Badge
                    variant="secondary"
                    className="justify-center py-2 text-sm"
                  >
                    Frame {previewTemplate.designOptions.frame}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="justify-center py-2 text-sm"
                  >
                    Shape {previewTemplate.designOptions.shape}
                  </Badge>
                  {previewTemplate.designOptions.logo > 0 && (
                    <Badge
                      variant="secondary"
                      className="justify-center py-2 text-sm"
                    >
                      Logo {previewTemplate.designOptions.logo}
                    </Badge>
                  )}
                  {previewTemplate.designOptions.dotStyle &&
                    previewTemplate.designOptions.dotStyle > 1 && (
                      <Badge
                        variant="secondary"
                        className="justify-center py-2 text-sm"
                      >
                        Dot Style {previewTemplate.designOptions.dotStyle}
                      </Badge>
                    )}
                  {previewTemplate.designOptions.outerBorder &&
                    previewTemplate.designOptions.outerBorder > 1 && (
                      <Badge
                        variant="secondary"
                        className="justify-center py-2 text-sm"
                      >
                        Border {previewTemplate.designOptions.outerBorder}
                      </Badge>
                    )}
                  <Badge
                    variant="outline"
                    className="justify-center py-2 text-sm"
                  >
                    Level {previewTemplate.designOptions.level}
                  </Badge>
                </div>
              </div>

              {/* Template Info */}
              <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6">
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">
                  Template Information
                </h4>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm font-medium text-gray-600">
                      Created
                    </span>
                    <span className="text-xs md:text-sm text-gray-900 font-medium">
                      {formatDate(previewTemplate.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm font-medium text-gray-600">
                      Background
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-gray-300"
                        style={{
                          backgroundColor:
                            previewTemplate.designOptions.bgColor,
                        }}
                      />
                      <span className="text-xs md:text-sm text-gray-900 font-mono">
                        {previewTemplate.designOptions.bgColor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-8 px-3 md:px-6">
      <PreviewModal />
      {!showCreateForm ? (
        // Templates List View
        <>
          <div className="mb-4 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 md:mb-2">
              QR Code Templates
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm lg:text-base">
              Create and manage your custom QR code design templates
            </p>
          </div>

          {/* Create New Template Button */}
          <div className="mb-4 md:mb-6 lg:mb-8">
            <Button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto text-sm md:text-base"
              disabled={loading}
            >
              <Plus className="h-4 w-4" />
              Create New Template
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 md:mb-6 bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
              <p className="text-red-600 text-xs md:text-sm">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={loadTemplates}
                className="mt-2 text-xs md:text-sm"
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

          {/* Templates Grid */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
              Your Templates
            </h2>
            {templates.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 md:py-12 px-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-lg flex items-center justify-center mb-3 md:mb-4">
                    <Plus className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-base md:text-lg font-medium mb-2">
                    No templates yet
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md text-xs md:text-sm px-2">
                    Create your first QR code template to save time when
                    generating QR codes with consistent designs
                  </p>
                  <Button
                    className="mt-3 md:mt-4 text-sm md:text-base"
                    onClick={() => setShowCreateForm(true)}
                  >
                    Create Your First Template
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => handlePreviewTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <QRPreview
                            designOptions={template.designOptions}
                            size={100}
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-1">
                            {template.name}
                          </h3>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTemplate(template.id);
                            }}
                            className="text-red-600 hover:text-red-700 text-xs w-full"
                          >
                            <Trash2 className="h-3 w-3 mr-1.5" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        // Create Template Editor View - Two Column Layout
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 -m-3 md:-m-6">
          {/* Left Sidebar - Scrollable Selection Panel */}
          <div className="w-full lg:w-1/2 overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
            <div className="p-4 md:p-6">
              <div className="mb-4 md:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-1 md:mb-2">
                      Create Template
                    </h1>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      Design your custom QR code template
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm w-full sm:w-auto"
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
                        dotStyle: 1,
                        bgColor: "#ffffff",
                        outerBorder: 1,
                      });
                    }}
                    disabled={saving}
                  >
                    Back to Templates
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 md:mb-6 bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
                  <p className="text-red-600 text-xs md:text-sm">{error}</p>
                </div>
              )}

              {/* Mobile Preview Area */}
              <div className="lg:hidden mb-4 md:mb-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 md:p-6">
                <div className="text-center">
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-3">
                    Preview
                  </h3>
                  <div className="bg-white rounded-xl shadow-lg p-4 inline-block">
                    <QRPreview designOptions={designOptions} size={150} />
                  </div>
                  <div className="mt-3">
                    <p className="font-medium text-gray-800 text-sm mb-1">
                      {newTemplateName || "Untitled Template"}
                    </p>
                    {newTemplateDescription && (
                      <p className="text-gray-600 text-xs">
                        {newTemplateDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Template Info Form */}
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div>
                  <Label htmlFor="template-name" className="text-xs md:text-sm">
                    Template Name
                  </Label>
                  <Input
                    id="template-name"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="Enter template name..."
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="template-description"
                    className="text-xs md:text-sm"
                  >
                    Description (Optional)
                  </Label>
                  <Input
                    id="template-description"
                    value={newTemplateDescription}
                    onChange={(e) => setNewTemplateDescription(e.target.value)}
                    placeholder="Enter template description..."
                    className="mt-1 text-sm"
                  />
                </div>
              </div>

              {/* Design Options */}
              <QRDesignSelector
                designOptions={designOptions}
                onDesignChange={setDesignOptions}
                compact
              />

              {/* Save/Cancel Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 border-t mt-4 md:mt-6">
                <Button
                  onClick={handleCreateTemplate}
                  disabled={!newTemplateName.trim() || saving}
                  className="flex-1 text-sm md:text-base"
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
                  className="text-sm md:text-base"
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
                      dotStyle: 1,
                      bgColor: "#ffffff",
                      outerBorder: 1,
                    });
                  }}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Fixed Preview Area */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="h-full w-full flex flex-col justify-center items-center p-6 lg:p-8">
              <div className="text-center mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                  Live Preview
                </h2>
                <p className="text-gray-600 text-sm lg:text-base">
                  See how your template will look
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 max-w-md">
                <QRPreview designOptions={designOptions} size={240} />
              </div>

              <div className="mt-6 lg:mt-8 text-center">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm lg:text-base">
                  {newTemplateName || "Untitled Template"}
                </h3>
                {newTemplateDescription && (
                  <p className="text-gray-600 text-xs lg:text-sm">
                    {newTemplateDescription}
                  </p>
                )}
                <div className="flex gap-1.5 lg:gap-2 mt-3 lg:mt-4 justify-center flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    Frame {designOptions.frame}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Shape {designOptions.shape}
                  </Badge>
                  {designOptions.logo > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      Logo {designOptions.logo}
                    </Badge>
                  )}
                  {designOptions.dotStyle && designOptions.dotStyle > 1 && (
                    <Badge variant="secondary" className="text-xs">
                      Dot Style {designOptions.dotStyle}
                    </Badge>
                  )}
                  {designOptions.outerBorder &&
                    designOptions.outerBorder > 1 && (
                      <Badge variant="secondary" className="text-xs">
                        Border {designOptions.outerBorder}
                      </Badge>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
