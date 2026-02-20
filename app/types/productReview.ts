export interface ProductReview {
  id: number;
  name: string;
  created_at: Date;
  stars: number;
  pros?: string;
  cons?: string;
  comment_text: string;
  purchased_from_us: boolean;
}

export interface ProductReviewTot {
	stars: number;
	cnt: number;
}

export interface ProductReviewAgg {
	tot_count?: number;
	stars?: ProductReviewTot[];
}


export interface ProductReviewCollection {
	data: ProductReview[];
	agg: ProductReviewAgg;
}
