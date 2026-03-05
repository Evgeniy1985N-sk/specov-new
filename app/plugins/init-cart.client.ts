import { useCartsStore } from "~/stores/carts";

export default defineNuxtPlugin(async () => {
	const cartsStore = useCartsStore();
	await cartsStore.ensureInitialized();
});
