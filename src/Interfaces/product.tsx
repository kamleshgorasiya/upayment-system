
export interface GetProductResponse {
    id: string;
    createdAt: Date;
    name: string;
    description: string;
    avatar: string;
    category: string;
    price?: string;
    developerEmail: string;
  }
  export interface getProductCategoryResponse {
    id: string;
    createdAt: Date;
    name: string;
  }
  export interface AddProductRequest {
    name: string;
    description: string;
    developerEmail: string;
    avatar: string;
    category: string;
    price?: string;
  }
