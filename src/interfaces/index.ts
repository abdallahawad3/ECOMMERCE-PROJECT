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
  category: [
    {
      id: number;
      documentId: string;
      title: string;
    }
  ];
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
