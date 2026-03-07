export const useCopyToClipboard = () => {
	const copied = ref(false);
	const copying = ref(false);
	const error = ref<string>("");

	const copy = async (text: string): Promise<boolean> => {
		if (!text) {
			error.value = "Nothing to copy.";
			copied.value = false;
			return false;
		}

		copying.value = true;
		error.value = "";

		try {
			if (import.meta.client && navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(text);
			} else if (import.meta.client) {
				const textarea = document.createElement("textarea");
				textarea.value = text;
				textarea.setAttribute("readonly", "");
				textarea.style.position = "absolute";
				textarea.style.left = "-9999px";
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			} else {
				throw new Error("Clipboard is not available.");
			}

			copied.value = true;
			return true;
		} catch (err) {
			console.error(err);
			error.value = "Could not copy link.";
			copied.value = false;
			return false;
		} finally {
			copying.value = false;
		}
	};

	const reset = (): void => {
		copied.value = false;
		copying.value = false;
		error.value = "";
	};

	return {
		copied,
		copying,
		error,
		copy,
		reset,
	};
};
