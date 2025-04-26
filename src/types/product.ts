export type Product = {
	id: number;
	name: string;
	price: number;
};

export type OrderProduct = {
	product: Product;
	quantity: number;
	coast: number;
};
