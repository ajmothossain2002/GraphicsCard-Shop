"use client";

import { Client, Databases, ID, Permission, Role, Query } from "appwrite";
import type { Models } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID!;
const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID!;

if (!endpoint || !projectId || !databaseId || !collectionId) {
  throw new Error(
    "Missing required Appwrite configuration. Please check your env variables."
  );
}

const client = new Client().setEndpoint(endpoint).setProject(projectId);
const databases = new Databases(client);

export interface GPUProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  inStock?: boolean;
  specifications?: Record<string, unknown>;
}

export interface GPUProductDocument extends GPUProduct, Models.Document {}

export interface ListProductsOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  search?: string;
  category?: string;
  priceRange?: { min?: number; max?: number };
}

export interface DatabaseResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

export const dbService = {
  async createProduct(
    product: GPUProduct
  ): Promise<DatabaseResponse<GPUProductDocument>> {
    try {
      if (!product.name || !product.price || !product.description) {
        throw new DatabaseError(
          "Missing required fields: name, price, description"
        );
      }

      const document = (await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        product,
        [Permission.read(Role.any()), Permission.write(Role.any())]
      )) as unknown as GPUProductDocument;

      return { success: true, data: document };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create product";
      return { success: false, error: message };
    }
  },

  async getProduct(id: string): Promise<DatabaseResponse<GPUProductDocument>> {
    try {
      const document = (await databases.getDocument(
        databaseId,
        collectionId,
        id
      )) as unknown as GPUProductDocument;
      return { success: true, data: document };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch product";
      return { success: false, error: message };
    }
  },

  async updateProduct(
    id: string,
    updates: Partial<GPUProduct>
  ): Promise<DatabaseResponse<GPUProductDocument>> {
    try {
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([, v]) => v !== undefined)
      );
      const document = (await databases.updateDocument(
        databaseId,
        collectionId,
        id,
        cleanUpdates
      )) as unknown as GPUProductDocument;
      return { success: true, data: document };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update product";
      return { success: false, error: message };
    }
  },

  async deleteProduct(id: string): Promise<DatabaseResponse<void>> {
    try {
      await databases.deleteDocument(databaseId, collectionId, id);
      return { success: true };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete product";
      return { success: false, error: message };
    }
  },

  async listProducts(
    options: ListProductsOptions = {}
  ): Promise<
    DatabaseResponse<{ documents: GPUProductDocument[]; total: number }>
  > {
    try {
      const {
        limit = 25,
        offset = 0,
        orderBy = "$createdAt",
        orderDirection = "desc",
        search,
        category,
        priceRange,
      } = options;

      const queries: string[] = [
        Query.limit(limit),
        Query.offset(offset),
        orderDirection === "desc"
          ? Query.orderDesc(orderBy)
          : Query.orderAsc(orderBy),
      ];

      if (search) queries.push(Query.search("name", search));
      if (category) queries.push(Query.equal("category", category));
      if (priceRange?.min !== undefined)
        queries.push(Query.greaterThanEqual("price", priceRange.min));
      if (priceRange?.max !== undefined)
        queries.push(Query.lessThanEqual("price", priceRange.max));

      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        queries
      );

      return {
        success: true,
        data: {
          documents: response.documents as GPUProductDocument[],
          total: response.total,
        },
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to list products";
      return { success: false, error: message };
    }
  },
};

export const dbUtils = {
  formatPrice(price: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);
  },

  validateProduct(product: Partial<GPUProduct>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    if (!product.name?.trim()) errors.push("Product name is required");
    if (typeof product.price !== "number" || product.price <= 0)
      errors.push("Valid price is required");
    if (!product.description?.trim())
      errors.push("Product description is required");
    if (!product.image?.trim()) errors.push("Product image URL is required");
    return { isValid: errors.length === 0, errors };
  },
};
