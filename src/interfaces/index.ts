export interface IProduct {
  id: number;
  quantity: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: {
    id: 12;
    documentId: string;
    name: string;
    url: string;
  };
  categories: [
    {
      id: number;
      documentId: string;
      title: string;
    }
  ];
}

export interface IHeroCards {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: {
    id: number;
    documentId: string;
    name: string;
    formats: {
      large: {
        name: string;
        has: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
    };
  };
}
export interface ICategory {
  id: number;
  documentId: string;
  title: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput {
  email: string;
  password: string;
  firstname: string;
  lastname?: string;
  username: string;
}

export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface CookieOptions {
  maxAge?: number;
  signed?: boolean;
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
}
