<template>
	<UModal :open="open" :ui="{ content: 'max-w-xl' }" @update:open="onUpdateOpen">
		<template #content>
			<div class="p-6">
				<div class="grid gap-4">
					<div class="grid gap-1">
						<h3 class="text-lg font-semibold text-gray-950">
							Поделиться корзиной
						</h3>
						<p class="text-sm leading-5 text-gray-500">
							Скопируйте ссылку и отправьте её получателю.
						</p>
					</div>

					<UInput
						:model-value="url"
						readonly
						color="neutral"
						size="xl"
						:ui="{ base: 'pr-28' }"
					>
						<template #trailing>
							<UButton
								color="neutral"
								variant="soft"
								size="sm"
								:loading="isCopying"
								@click="copyUrl"
							>
								{{ isCopied ? "Скопировано" : "Копировать" }}
							</UButton>
						</template>
					</UInput>

					<p v-if="copyError" class="text-sm text-red-600">
						{{ copyError }}
					</p>

					<div class="flex justify-end gap-3">
						<UButton
							color="neutral"
							variant="ghost"
							@click="closeModal"
						>
							Закрыть
						</UButton>

						<!--
						<UButton
							color="primary"
							:loading="isCopying"
							@click="copyUrl"
						>
							{{ isCopied ? "Скопировано" : "Копировать ссылку" }}
						</UButton>
						-->
					</div>
				</div>
			</div>
		</template>
	</UModal>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useCopyToClipboard } from "~/composables/useCopyToClipboard";

interface Props {
	open: boolean;
	url: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "update:open", value: boolean): void;
}>();

const {
	copied: isCopied,
	copying: isCopying,
	error: copyError,
	copy: copyToClipboard,
	reset: resetClipboardState,
} = useCopyToClipboard();

watch(
	() => props.open,
	(nextOpen) => {
		if (nextOpen) {
			resetClipboardState();
		}
	},
);

const onUpdateOpen = (value: boolean): void => {
	if (!value) {
		resetClipboardState();
	}

	emit("update:open", value);
};

const closeModal = (): void => {
	resetClipboardState();
	emit("update:open", false);
};

const copyUrl = async (): Promise<void> => {
	if (!props.url) {
		return;
	}

	await copyToClipboard(props.url);
};
</script>
