<script setup lang="ts">
import type { ProductReviewCollection, ProductReview } from '~/types/productReview'
import { useProduct } from '~/composables/useProduct';

const isSortByGrade = ref(true);
const isSortByDate = ref(false);
const isSortByGradeMax = ref(true);
const isSortByDateMax = ref(true);
const visibleCount = 3;

interface Props {
	reviews: ProductReviewCollection;
}
const props = defineProps<Props>();

// Create a reactive sorted copy of reviews
const sortedReviews = ref<ProductReview[]>([]);

// Initialize with the data from props
onMounted(() => {
	if (props.reviews.data) {
		sortedReviews.value = [...props.reviews.data];
	}
	sortReviews();
});

// Watch for changes in sorting criteria
watch([isSortByGrade, isSortByGradeMax, isSortByDate, isSortByDateMax], () => {
	sortReviews();
});

// Function to sort reviews
function sortReviews() {
	const reviewsCopy = props.reviews.data? [...props.reviews.data] : [];

	if (isSortByGrade.value) {
		// Sort by grade (stars)
		if (isSortByGradeMax.value) {
			// Highest to lowest
			sortedReviews.value = reviewsCopy.sort((a, b) => b.stars - a.stars);
		} else {
			// Lowest to highest
			sortedReviews.value = reviewsCopy.sort((a, b) => a.stars - b.stars);
		}
	} else if (isSortByDate.value) {
		// Sort by date
		if (isSortByDateMax.value) {
			// Newest first
			sortedReviews.value = reviewsCopy.sort((a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
			);
		} else {
			// Oldest first
			sortedReviews.value = reviewsCopy.sort((a, b) =>
				new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
			);
		}
	}
}

const reviewsAgg = computed(() => props.reviews.agg);

const { calcRating, declineReviewWord } = useProduct();

const formatReviewDate = (d: Date): string => {
	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	}).format(new Date(d));
}

const productRating = computed(() => {
	return calcRating(reviewsAgg.value);
});

const productStars = computed(() => {
	return Math.ceil(productRating.value);
});

function changeSortGrade() {
	if (isSortByGrade.value) {
		isSortByGradeMax.value = !isSortByGradeMax.value
	} else {
		isSortByGrade.value = true
		isSortByDate.value = false
	}
	sortReviews();
}

function changeSortDate() {
	if (isSortByDate.value) {
		isSortByDateMax.value = !isSortByDateMax.value
	} else {
		isSortByDate.value = true
		isSortByGrade.value = false
	}
	sortReviews();
}

// Optional: Watch for changes in props.reviews.data
watch(() => props.reviews.data, () => {
	sortReviews();
}, { deep: true });

</script>

<template>
	<div class="flex flex-col-reverse sm:flex-row justify-between gap-4">
		<div class="w-full max-w-[700px]">
			<h2 class="hidden sm:block mb-4 font-['Russo_One'] text-gray-950 font-normal text-[24px] leading-8">Отзывы
			</h2>

			<div class="flex items-center gap-4 font-semibold text-sm leading-5 mb-4 sm:mb-6 mt-2 sm:mt-0">
				<span>
					Сортировать по:
				</span>
				<p class="flex gap-4">
					<ProductButtonSort @handle-click="changeSortGrade()" :is-sort-by-max="isSortByGradeMax"
						text="Оценке" :is-active="isSortByGrade" />
					<ProductButtonSort @handle-click="changeSortDate()" :is-sort-by-max="isSortByDateMax" text="Дате"
						:is-active="isSortByDate" />
				</p>
			</div>

			<ul class="border-t border-gray-300">
				<!-- Use sortedReviews instead of reviews -->
				<li v-for="review in sortedReviews.slice(0, visibleCount)" :key="review.id"
					class="grid gap-4 py-6 border-b border-gray-300">

					<!-- Rest of your review template remains the same -->
					<div class="grid gap-2">
						<div class="flex gap-2 flex-wrap ">
							<span class="font-bold text-base leading-6 text-gray-950">
								{{ review.name }}
							</span>
							<span class="text-sm leading-6 font-medium">
								{{ formatReviewDate(review.created_at) }}
							</span>
							<UBadge v-if="review.purchased_from_us"
								class="sm:ml-auto px-3 rounded-full text-(--Brand-800) bg-(--Brand-100)">
								<i class="flex items-center justify-center w-4 h-4">
									<ProductIconMark />
								</i>
								Товар куплен у нас
							</UBadge>
						</div>
						<div v-if="review.stars" class="flex items-center text-warning-500 text-sm leading-5 font-bold">
							<i v-for="star in review.stars"
								class="flex items-center justify-center shrink-0 w-5 h-5 text-warning-500 p-0.5">
								<ProductIconStar />
							</i>

							<i v-for="star in (5 - review.stars)"
								class="flex items-center justify-center shrink-0 w-5 h-5 text-gray-300 p-0.5">
								<ProductIconStar />
							</i>
							{{ review.stars }}.0
						</div>
					</div>

					<div v-if="review.pros" class="grid gap-1">
						<p class="text-sm font-bold leading-5 text-gray-950">
							Плюсы:
						</p>
						<span class="text-sm font-medium leading-5 text-gray-600">
							{{ review.pros }}
						</span>
					</div>

					<div v-if="review.cons" class="grid gap-1">
						<p class="text-sm font-bold leading-5 text-gray-950">
							Минусы:
						</p>
						<span class="text-sm font-medium leading-5 text-gray-600">
							{{ review.cons }}
						</span>
					</div>

					<div class="grid gap-1">
						<p class="text-sm font-bold leading-5 text-gray-950">
							Комментарий:
						</p>
						<span class="text-sm font-medium leading-5 text-gray-600">
							{{ review.comment_text }}
						</span>
					</div>
				</li>
			</ul>

			<UButton @click="visibleCount += 3" v-if="visibleCount <= sortedReviews.length"
				class="w-full sm:w-auto table m-auto mt-6 bg-gray-100 text-(--Brand-950) text-sm font-semibold hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-4 py-2.5">
				Показать еще
			</UButton>
		</div>

		<!-- Rest of your component remains the same -->
		<div class="flex flex-col gap-6 sm:max-w-[280px] w-full">
			<div class="">
				<p class="text-5 text-gray-950 font-bold">
					{{ productRating }}
				</p>

				<div class="flex justify-between">
					<span class="flex">
						<i v-for="star in productStars"
							class="w-6 h-6 flex items-center justify-center text-warning-500 p-0.5">
							<ProductIconStar />
						</i>
						<i v-for="star in (5 - productStars)"
							class="w-6 h-6 flex items-center justify-center text-gray-300 p-0.5">
							<ProductIconStar />
						</i>
					</span>
					<p class="text-sm leading-5 font-medium">
						{{ declineReviewWord(reviewsAgg.tot_count) }}
					</p>
				</div>
			</div>

			<UButton
				class="w-full flex items-center justify-center bg-gray-100 text-(--Brand-950) text-sm font-semibold hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-4 py-2.5">
				Оставить отзыв
			</UButton>

			<div v-for="starType in reviewsAgg.stars" :key="`stars-${starType.stars}`"
				class="flex items-center justify-between">
				<span class="flex">
					<i v-for="star in starType.stars"
						class="flex items-center justify-center shrink-0 w-5 h-5 text-warning-500 p-0.5">
						<ProductIconStar />
					</i>

					<i v-for="star in (5 - starType.stars)"
						class="flex items-center justify-center shrink-0 w-5 h-5 text-gray-300 p-0.5">
						<ProductIconStar />
					</i>
				</span>

				<p class="text-sm leading-5 font-medium">
					{{ declineReviewWord(starType.cnt) }}
				</p>
			</div>
		</div>
	</div>
</template>
