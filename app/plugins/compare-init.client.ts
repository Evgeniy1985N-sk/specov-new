import { useCompareStore } from "~/stores/compare";

export default defineNuxtPlugin(async () => {
	const compareStore = useCompareStore();
	await compareStore.ensureInitialized();
});

