import type { Picture } from '@/types/picture';

export const useCategory = () => {
	const config = useRuntimeConfig();

	const picturePreview = (img: Picture): string => {
		return `${config.public.imgCatPreviewCDN}/${img.ref_1c}.${img.preview_ext ?? 'png'}`;
	}

	const pictureDetail = (img: Picture): string => {
		return `${config.public.imgCatCDN}/${img.ref_1c}.${img.ext ?? 'png'}`;
	}

	const link = (item: {name_lat: string, id: number}) => {
		return `/category/${item.id}`;
	}

	const imgSrc = (item: {picture?: Picture}) => {
		if(!item.picture){
			return undefined;
		}
		return picturePreview(item.picture);
	}

	return {
		picturePreview,
		pictureDetail,
		link,
		imgSrc,
	}
}


