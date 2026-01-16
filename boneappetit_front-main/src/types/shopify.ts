export interface OrderDto {
    id: string;
    confirmationNumber: string;
    createdAt: Date | undefined;
    totalAmount: number;
    currency: string;
    items: LineItemDto[];
    canMarkAsPaid: boolean;
    name: string;
}

export interface LineItemDto {
    name: string;
    quantity: number;
}

export interface handleFindOrder {
    orderName: string;
}

export interface FindOrderResponse {
    success: boolean;
    data: OrderDto;
}
