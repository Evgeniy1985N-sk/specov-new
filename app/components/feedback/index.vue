<script setup lang="ts">

</script>

<template>
	<Section>
		<div class="max-w-(--container) m-auto sm:px-4">
			<div class="items-end flex rounded-2xl lg:m-0">
				<div
					class="bg-[linear-gradient(90deg,#d3b579,#e9d7b5)] flex h-full w-full justify-end lg:pl-12 items-center rounded-2xl">

					<div
						class="lg:flex-nowrap flex-col-reverse lg:flex-row gap-4 flex flex-wrap justify-center grow items-center pb-6 md:pb-22 lg:pb-0">

						<div class="max-w-[640px] px-4 py-4 lg:px-0 lg:max-w-[506px] gap-1.5 flex flex-col items-start shrink-0">
							<div
								class="text-[24px] md:text-4xl md:leading-11 text-zinc-950 font-['Russo_One'] text-4xl items-start flex self-stretch">
								<p>
									Свяжитесь с
									менеджером, если
									остались
									вопросы.
								</p>
							</div>

							<div class="w-full pr-[30px] flex self-stretch items-center">
								<div class="text-[14px] md:font-medium md:leading-6 text-gray-800 items-center flex grow">
									<p>
										Позвоните
										по
										номеру
										<span class="font-bold">+7
											(3452)
											56-86-86
										</span>
										или
										оставьте
										свои
										контакты,
										и
										менеджер
										сам
										свяжется
										с вами
									</p>
								</div>
							</div>

							<FeedbackForm />

							<div class="lg:max-w-[483px] pr-[5px] pt-2.5 self-stretch">
								<div class="leading-[18px] text-gray-600 text-xs items-center flex">
									<p>
										Нажимая
										кнопку
										«Заказать
										звонок»,
										я
										соглашаюсь
										с 
										<a class="underline" href="https://av.ru/termsAndConditions">Общими
											условиями
											и
											соглашением</a>
										 и с 
										<a class="underline" href="https://av.ru/user_privacy_policy_gs.pdf">Политикой
											защиты
											и
											обработки
											персональных
											данных</a>
										, а
										также
										даю 
										<a class="underline" href="https://av.ru/registration_consent.pdf">согласие
											на
											обработку
											моих
											персональных
											данных</a>
									</p>
								</div>
							</div>
						</div>

						<img class="hidden lg:block w-full" src="/image/Image.svg" alt="ManagerEmail" />
						<img class="lg:hidden w-full" src="/image/Image-2.svg" alt="ManagerEmail" />

					</div>

				</div>
			</div>
		</div>
	</Section>

</template>


<style scoped></style>