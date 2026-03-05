import { type ProductReviewAgg, type ProductReviewTot } from "@/types/productReview";
import { type Picture } from "@/types/picture";
// import type { ProductCard } from "~/types/product";

export const useProduct = () => {

	const config = useRuntimeConfig();

	const declineProductWord = (count: number): string => {
		if (isNaN(count) || !isFinite(count)) {
			return `нет товаров`;
		}

		const lastDigit = Math.abs(count) % 10;
		const lastTwoDigits = Math.abs(count) % 100;

		if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
			return `${count} товаров`;
		}

		switch (lastDigit) {
			case 1:
				return `${count} товар`;
			case 2:
			case 3:
			case 4:
				return `${count} товара`;
			default:
				return `${count} товаров`;
		}
	};

	const declineReviewWord = (count?: number): string => {
		if (!count || isNaN(count) || !isFinite(count)) {
			return `нет отзывов`;
		}

		const lastDigit = Math.abs(count) % 10;
		const lastTwoDigits = Math.abs(count) % 100;

		if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
			return `${count} отзывов`;
		}

		switch (lastDigit) {
			case 1:
				return `${count} отзыв`;
			case 2:
			case 3:
			case 4:
				return `${count} отзыва`;
			default:
				return `${count} отзывов`;
		}
	};

	const calcRating = (reviewAgg: ProductReviewAgg): number => {
		if (!reviewAgg.tot_count) {
			return 0;
		}
		const stars = reviewAgg.stars?.reduce((sum: number, item: ProductReviewTot) => sum + item.cnt, 0);
		const average = !stars ? 0 : stars / reviewAgg.tot_count;
		return parseFloat(average.toFixed(1));
	}

	const picturePreview = (img: Picture): string => {
		return `${config.public.imgPreviewCDN}/${img.ref_1c}.${img.preview_ext ?? 'png'}`;
	}

	const pictureDetail = (img: Picture): string => {
		return `${config.public.imgCDN}/${img.ref_1c}.${img.ext ?? 'png'}`;
	}

	const link = (item: { name_lat: string, char?: { id?: number, name_lat: string } }) => {
		if (!item.char || !item.char.id) {
			return `/products/${encodeURIComponent(item.name_lat)}`;
		}
		return `/products/${encodeURIComponent(item.name_lat)}/${encodeURIComponent(item.char.name_lat)}`;
	}

	return {
		calcRating,
		declineReviewWord,
		declineProductWord,
		picturePreview,
		pictureDetail,
		link,
	}
}


