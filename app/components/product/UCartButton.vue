<script setup lang="ts">

interface Props { 
	isInCart: boolean
};

const props = withDefaults(defineProps<Props>(), {
	isInCart: false,
});

const emit = defineEmits<{
	"click": [];
}>();

	
const noProductText = "В корзину";
const hasProductText = "Корзина";

const handleClick = async () => {
	if(props.isInCart){
		//redirect
		await navigateTo('/cart');
	}else{
		emit('click');
	}
}

const isMounted = ref(false);
onMounted(() => {
	isMounted.value = true;
});

</script>

<template>
	<UButton @click="handleClick"
	>
	  <i class="flex items-center justify-center h-5 w-5">
		<ProductIconCart />
	  </i>
	  <span class="text-sm leading-5">
		  {{ isMounted && props.isInCart? hasProductText : noProductText }}
	  </span>
	</UButton>

</template>
