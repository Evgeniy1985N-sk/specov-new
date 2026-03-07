import { useNuxtApp } from "nuxt/app";
import { cartEndpoints } from "@/api/endpoints/cart";
import type { CartItem, Cart } from "~/types/cart";
import type { ProductForCart } from "~/types/product";

const getCartFileNameFromDisposition = (disposition: string | null): string => {
	if (!disposition) {
		return "cart.pdf";
	}

	const utf8Match = disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
	if (utf8Match?.[1]) {
		return decodeURIComponent(utf8Match[1]);
	}

	const asciiMatch =
		disposition.match(/filename\s*=\s*"([^"]+)"/i) ??
		disposition.match(/filename\s*=\s*([^;]+)/i);

	if (asciiMatch?.[1]) {
		return asciiMatch[1].trim();
	}

	return "cart.pdf";
};

const printPdf = async (cartName: string): Promise<void> => {
	if (!import.meta.client) {
		return;
	}

	const api = useNuxtApp().$backendAPI;

	const response = await api.raw<unknown, "arrayBuffer">(cartEndpoints.printPdf(cartName), {
		method: "GET",
		responseType: "arrayBuffer",
	});

	const data: unknown = response._data;

	if (!(data instanceof ArrayBuffer)) {
		console.error("Unexpected PDF response", {
			status: response.status,
			contentType: response.headers.get("content-type"),
			data,
		});
		throw new Error("PDF response is not an ArrayBuffer.");
	}

	const blob = new Blob([data], {
		type: response.headers.get("content-type") ?? "application/pdf",
	});

	const fileName = getCartFileNameFromDisposition(
		response.headers.get("content-disposition"),
	);

	const url = window.URL.createObjectURL(blob);

	try {
		const link = document.createElement("a");
		link.href = url;
		link.download = fileName;
		link.style.display = "none";

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} finally {
		window.URL.revokeObjectURL(url);
	}
};

export function useCartApi() {
	const api = useNuxtApp().$backendAPI;

	return {
		add(item: CartItem): Promise<void> {
			return api<void>(
				cartEndpoints.add(),
				{ method: "POST", body: item },
			);
		},
		import(token: string): Promise<void> {
			return api<void>(
				cartEndpoints.importShared(token),
				{ method: "POST" },
			);
		},
		async restoreShared(token: string): Promise<Cart> {
			const products = await api<ProductForCart[]>(
				cartEndpoints.restoreShared(token),
				{ method: "GET" },
			);
			return <Cart>{name: "Импортировано", created_at: new Date(), products};
		},

		//share returns a ready url
		async share(products: ProductForCart[]): Promise<string> {
			type Resp = {token: string};
			const resp = await api<Resp>(
				cartEndpoints.share(),
				{ method: "POST", body: { products } },
			);
			const config = useRuntimeConfig();
			return `${config.public.siteUrl}/cart/${resp.token}`;
		},
		remove(item: CartItem): Promise<void> {
			return api<void>(
				cartEndpoints.remove(),
				{ method: "POST", body: item },
			);
		},
		clear(cartName: string): Promise<void> {
			return api<void>(
				cartEndpoints.clear(),
				{ method: "POST", body: { cart_name: cartName } },
			);
		},
		fetchAll(): Promise<Cart[]> {
			return api<Cart[]>(cartEndpoints.fetchAll());
		},
		printPdf,
	};
}
