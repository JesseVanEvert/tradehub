export interface SoldProduct {
    id: number;
    category_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    price: number;
    buyer_id: number;
    buyer_name: string;
    quantity_bought: number;
}
