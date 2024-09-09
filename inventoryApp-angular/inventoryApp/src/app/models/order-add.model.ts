export interface OrderAddModel{
   items: OrderItemModel[];
   customerId: number; 
}
export interface OrderItemModel{
    productId: number;
    quantity: number;
    unitPrice: number;
}