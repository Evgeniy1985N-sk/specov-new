import { ref, onMounted, onUnmounted } from "vue";

export const useMousePosition = () => {
	const x = ref(0);
	const y = ref(0);

	const update = (event: MouseEvent) => {
		x.value = event.clientX
		y.value = event.clientY
	}

	onMounted(() => window.addEventListener('mousemove', update));
	onUnmounted(() => window.removeEventListener('mousemove', update));

	return { x, y }
}
