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
import { Plus, Eye, Trash2, Edit, X, ChevronRight } from "lucide-react";
import {
  type QRDesignOptions,
  renderQRWithDesign,
} from "@/lib/qr-design-utils";
import { QRCodeSVG } from "qrcode.react";
import QRDesignSelector from "@/components/QRDesignSelector";
import templateStorage, { type QRTemplate } from "@/lib/template-storage";
import { authService, User } from "@/services/auth";
import { hasPermission } from "@/utils/roleUtils";

// Enhanced QR Preview Component with Design Applied
const QRPreview: React.FC<{
  designOptions: QRDesignOptions;
  size?: number;
}> = ({ designOptions, size = 120 }) => {
  return (
    <div className="flex justify-center p-4 border border-black rounded-lg">
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
  const [user, setUser] = useState<User | null>(null);
  const [isTemplateNameCollapsed, setIsTemplateNameCollapsed] = useState(true);

  // Load user data and templates on component mount
  useEffect(() => {
    const loadUserAndTemplates = async () => {
      try {
        const response = await authService.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUserAndTemplates();
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
    <div className="max-w-[1600px] mx-auto py-4 md:py-8 px-3 md:px-6">
      <PreviewModal />
      {!showCreateForm ? (
        // Templates List View
        <>
          <div className="mb-4 md:mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 md:mb-2">
                QR Code Templates
              </h1>
            </div>
            {user && hasPermission(user.role, "canCreateTemplates") && (
              <Button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center justify-center bg-[rgb(29,89,249)] hover:bg-[rgb(29,89,249)]/90 text-white font-bold text-lg rounded-[28px] whitespace-nowrap transition-all duration-200 ease-in-out shadow-none border-0"
                style={{ lineHeight: '1.75', padding: '4px 10px' }}
                disabled={loading}
              >
                <Plus className="w-4 h-4 mr-1" />
                Create Template
              </Button>
            )}
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
                <CardContent className="flex items-center justify-center py-8 md:py-12 px-4 gap-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {user && hasPermission(user.role, "canCreateTemplates")
                      ? "Here you can manage your templates"
                      : "QR code templates allow you to save time when generating QR codes with consistent designs"}
                  </p>
                  {user && hasPermission(user.role, "canCreateTemplates") && (
                    <Button
                      variant="outline"
                      className="text-xs h-7 px-2.5 whitespace-nowrap flex-shrink-0 rounded-full text-[rgb(29,89,249)]"
                      onClick={() => setShowCreateForm(true)}
                    >
                      Create template
                    </Button>
                  )}
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
                          {template.owner && (
                            <p className="text-xs text-gray-500 mt-1">
                              Created by: {template.owner}
                            </p>
                          )}
                        </div>
                        {user &&
                          hasPermission(user.role, "canCreateTemplates") &&
                          template.owner === user.email && (
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
                          )}
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
        <div className="min-h-screen flex flex-col lg:flex-row bg-white -m-3 md:-m-6">
          {/* Left Sidebar - Scrollable Selection Panel */}
          <div className="w-full lg:w-1/2 overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
            <div className="p-8 max-w-xl mx-auto">
              <div className="mb-8">
                <h1 className="text-xl font-bold text-gray-900">
                  Create template
                </h1>
              </div>

              {/* Mobile Preview - Visible only on small screens */}
              <div className="lg:hidden mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col items-center">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
                  <QRPreview designOptions={designOptions} size={160} />
                </div>
                <Button
                  onClick={handleCreateTemplate}
                  disabled={!newTemplateName.trim() || saving}
                  className="w-full bg-[#1D59F9] hover:bg-blue-700 text-white h-10 rounded-full font-semibold text-sm shadow-none"
                >
                  {saving ? "Saving..." : "Save Template"}
                </Button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Template Info Form - Collapsible */}
              <div className="mb-3 bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-sm">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer h-[60px]"
                  onClick={() =>
                    setIsTemplateNameCollapsed(!isTemplateNameCollapsed)
                  }
                >
                  <h4 className="text-sm font-semibold text-gray-900">
                    Template Name
                  </h4>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      !isTemplateNameCollapsed ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </div>
                {!isTemplateNameCollapsed && (
                  <div className="p-4 pt-0 border-t border-gray-100 mt-2 space-y-4">
                    <div>
                      <Label
                        htmlFor="template-name"
                        className="text-sm font-medium text-gray-700 mb-1 block"
                      >
                        Template Name
                      </Label>
                      <Input
                        id="template-name"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        placeholder="Enter template name..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="template-description"
                        className="text-sm font-medium text-gray-700 mb-1 block"
                      >
                        Description (Optional)
                      </Label>
                      <Input
                        id="template-description"
                        value={newTemplateDescription}
                        onChange={(e) =>
                          setNewTemplateDescription(e.target.value)
                        }
                        placeholder="Enter template description..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Design Options */}
              <QRDesignSelector
                designOptions={designOptions}
                onDesignChange={setDesignOptions}
                compact
              />

              <div className="mt-8">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-900"
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
                  Cancel / Back to Templates
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Fixed Preview Area */}
          <div className="hidden lg:flex lg:w-1/2 bg-white">
            <div className="h-full w-full flex flex-col p-12 items-center">
              <div className="w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Preview
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center shadow-sm">
                  <div className="mb-8">
                    <QRPreview designOptions={designOptions} size={200} />
                  </div>

                  <Button
                    onClick={handleCreateTemplate}
                    disabled={!newTemplateName.trim() || saving}
                    className="w-full bg-[#1D59F9] hover:bg-blue-700 text-white h-12 rounded-full font-semibold text-base shadow-none"
                  >
                    {saving ? "Saving..." : "Save"}
                  </Button>
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
