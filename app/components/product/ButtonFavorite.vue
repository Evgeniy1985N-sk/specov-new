<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

interface Props {
	class?: string;
	date?: string;
	isActive: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "handleClick"): void;
}>();

const authStore = useAuthStore();
const isModalOpen = ref(false);

const LS_COUNT_KEY = "favorite_login_modal_clicks:v1";
const SHOW_EVERY = 5;

const shouldShowLoginModal = (): boolean => {
	const raw = localStorage.getItem(LS_COUNT_KEY);
	const prev = raw ? Number.parseInt(raw, 10) : 0;
	const next = Number.isFinite(prev) ? prev + 1 : 1;

	localStorage.setItem(LS_COUNT_KEY, String(next));

	// Show on clicks #1, #11, #21, ...
	return (next - 1) % SHOW_EVERY === 0;
};

const onClick = (): void => {
	emit("handleClick");

	const willBeActive = !props.isActive;

	// Always allow uncheck without modal
	if (!willBeActive || authStore.isAuthenticated) {
		return;
	}


	// Not authenticated + checking: show 1 in 10, otherwise just proceed (or block - up to you)
	if (shouldShowLoginModal()) {
		isModalOpen.value = true;
		return;
	}
};
</script>

<template>
	<button
		:class="props.class"
		@click="onClick"
		class="flex justify-center hover:text-(--Brand-700) items-center bg-white text-(--Brand-950) transition shadow-[0_1px_3px_0_rgba(10,13,18,0.10),0_1px_2px_-1px_rgba(10,13,18,0.10)] p-2 rounded-full cursor-pointer"
	>
		<div class="h-5 w-5">
			<svg
				width="100%"
				height="100%"
				style="overflow: visible;"
				preserveAspectRatio="none"
				viewBox="0 0 20 20"
				:fill="props.isActive ? '#F04438' : 'none'"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M13.426 2.5C16.3612 2.5 18.3334 5.29375 18.3334 7.9C18.3334 13.1781 10.1482 17.5 10.0001 17.5C9.85193 17.5 1.66675 13.1781 1.66675 7.9C1.66675 5.29375 3.63897 2.5 6.57416 2.5C8.25934 2.5 9.36119 3.35312 10.0001 4.10312C10.639 3.35312 11.7408 2.5 13.426 2.5Z"
					:stroke="props.isActive ? '#F04438' : 'currentColor'"
					stroke-width="1.66667"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</button>

	<UModal v-model:open="isModalOpen" :ui="{ content: 'gap-0' }">
		<template #body>
			<div class="grid gap-6">
				<div class="grid gap-2">
					<div class="text-[18px] leading-7 text-black font-bold">Список избранного</div>
					<p class="font-medium">
						Войдите в профиль, чтобы сохранить список. Если этого не сделать, он удалится {{ props.date }}
					</p>
				</div>

				<UButton size="xl" type="button">
					Войти в профиль
				</UButton>
			</div>
		</template>
	</UModal>
</template>
