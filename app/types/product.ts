export interface ProductImage {
	src: string
	alt: string
}


export interface ProductCard {
	id: string
	image: string
	title: string
	price: number
	oldPrice?: number
	discont?: number
	imgs: ProductImage[]
}