export interface Order {
    orderID: number;
    items: OrderItem[];
    customerId: number;
    customerName: string;
  }
  
  export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
  }
  
  