import { useLikeStore } from "~/stores/likes";

export default defineNuxtPlugin(async () => {
	const likeStore = useLikeStore();
	await likeStore.ensureInitialized();
});
