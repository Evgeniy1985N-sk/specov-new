export const categoryLink = (cat: {id: number, name_lat: string}): string => {
	return `/category/${cat.id}`;
}
