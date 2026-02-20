import type { Picture } from '@/types/picture';

export const useProductPicture = () => {
  const config = useRuntimeConfig();

  const picturePreview = (img: Picture): string => {
    return `${config.public.imgPreviewCDN}/${img.ref_1c}.${img.preview_ext ?? 'png'}`;
  }

  const pictureDetail = (img: Picture): string => {
    return `${config.public.imgCDN}/${img.ref_1c}.${img.ext ?? 'png'}`;
  }

  return {
    picturePreview,
    pictureDetail
  }
}

