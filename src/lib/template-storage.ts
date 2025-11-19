import { type QRDesignOptions } from "@/lib/qr-design-utils";
import api from "@/lib/api";

export interface QRTemplate {
  id: string;
  name: string;
  description?: string;
  designOptions: QRDesignOptions;
  owner?: string; // Email of the owner
  createdAt: Date;
  updatedAt?: Date;
}

interface CreateTemplateData {
  name: string;
  description?: string;
  designOptions: QRDesignOptions;
}

interface UpdateTemplateData {
  name?: string;
  description?: string;
  designOptions?: QRDesignOptions;
}

interface ApiTemplate {
  id: string;
  name: string;
  description?: string;
  designOptions: QRDesignOptions;
  owner?: string;
  createdAt: string;
  updatedAt?: string;
}

export const templateStorage = {
  getTemplates: async (): Promise<QRTemplate[]> => {
    try {
      const response = await api.get("/templates");
      return response.data.map((template: ApiTemplate) => ({
        ...template,
        createdAt: new Date(template.createdAt),
        updatedAt: template.updatedAt ? new Date(template.updatedAt) : undefined,
      }));
    } catch (error) {
      console.error("Failed to load templates:", error);
      throw new Error("Failed to load templates");
    }
  },

  saveTemplate: async (template: CreateTemplateData): Promise<QRTemplate> => {
    try {
      const response = await api.post("/templates", template);
      const apiTemplate: ApiTemplate = response.data;
      return {
        ...apiTemplate,
        createdAt: new Date(apiTemplate.createdAt),
        updatedAt: apiTemplate.updatedAt ? new Date(apiTemplate.updatedAt) : undefined,
      };
    } catch (error) {
      console.error("Failed to save template:", error);
      throw new Error("Failed to save template");
    }
  },

  updateTemplate: async (id: string, updates: UpdateTemplateData): Promise<QRTemplate> => {
    try {
      const response = await api.put(`/templates/${id}`, updates);
      const apiTemplate: ApiTemplate = response.data;
      return {
        ...apiTemplate,
        createdAt: new Date(apiTemplate.createdAt),
        updatedAt: apiTemplate.updatedAt ? new Date(apiTemplate.updatedAt) : undefined,
      };
    } catch (error) {
      console.error("Failed to update template:", error);
      throw new Error("Failed to update template");
    }
  },

  deleteTemplate: async (id: string): Promise<void> => {
    try {
      await api.delete(`/templates/${id}`);
    } catch (error) {
      console.error("Failed to delete template:", error);
      throw new Error("Failed to delete template");
    }
  },

  getTemplate: async (id: string): Promise<QRTemplate> => {
    try {
      const response = await api.get(`/templates/${id}`);
      const apiTemplate: ApiTemplate = response.data;
      return {
        ...apiTemplate,
        createdAt: new Date(apiTemplate.createdAt),
        updatedAt: apiTemplate.updatedAt ? new Date(apiTemplate.updatedAt) : undefined,
      };
    } catch (error) {
      console.error("Failed to get template:", error);
      throw new Error("Failed to get template");
    }
  },

  clearAllTemplates: async (): Promise<void> => {
    // This could be implemented as a bulk delete if needed
    // For now, it's just a placeholder that doesn't do anything
    console.warn("clearAllTemplates is not implemented for API storage");
  },
};

export default templateStorage;