// type/product.ts
export interface ProductCreatePayload {
  title: string;
  description: string;
  image?: File;
}

export interface ProductUpdatePayload {
  id: string;
  title: string;
  description: string;
  image?: File;
}

// types/product.ts
export interface Product {
  _id: string;
  title: string;
  user_id: string;
  description: string;
  image: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  status: number;
  data: Product[];
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalRecords: number;
  message: string;
}
