export interface Product {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
    skuCode: string;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface CreateProductRequest {
    name: string;
    price: number;
    stockQuantity: number;
    skuCode: string;
}