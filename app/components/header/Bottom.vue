<script setup lang="ts">

</script>


<template>

  <div class="hidden lg:flex max-w-(--container) w-full m-auto px-4 overflow-clip justify-center items-center">
    <div
      class="w-full font-semibold leading-6 text-gray-600 flex flex-wrap justify-center self-stretch gap-x-5 gap-y-3 items-center">

      <div class="hidden border-zinc-300 xl:flex pr-4 self-stretch border-r border-solid">
        <div class="gap-2 leading-5 text-sm flex justify-center">

          <!-- stores -->
          <a href="/stores" class="gap-1 flex justify-center bg-green-100 hover:bg-[#AAF0CD] transition items-center py-1 px-2.5 rounded-2xl">
            <div class="h-4 w-4"><svg width="100%" height="100%" style="overflow: visible;" preserveAspectRatio="none"
                viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 14V10.4C10 10.0266 10 9.83995 9.92734 9.69734C9.86342 9.5719 9.76144 9.46991 9.63599 9.406C9.49339 9.33333 9.3067 9.33333 8.93333 9.33333H7.06667C6.6933 9.33333 6.50661 9.33333 6.36401 9.406C6.23857 9.46991 6.13658 9.5719 6.07266 9.69734C6 9.83995 6 10.0266 6 10.4V14M2 4.66667C2 5.77124 2.89543 6.66667 4 6.66667C5.10457 6.66667 6 5.77124 6 4.66667C6 5.77124 6.89543 6.66667 8 6.66667C9.10457 6.66667 10 5.77124 10 4.66667C10 5.77124 10.8954 6.66667 12 6.66667C13.1046 6.66667 14 5.77124 14 4.66667M4.13333 14H11.8667C12.6134 14 12.9868 14 13.272 13.8547C13.5229 13.7268 13.7268 13.5229 13.8547 13.272C14 12.9868 14 12.6134 14 11.8667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V11.8667C2 12.6134 2 12.9868 2.14532 13.272C2.27316 13.5229 2.47713 13.7268 2.72801 13.8547C3.01323 14 3.3866 14 4.13333 14Z"
                  stroke="#0A5B40" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg></div>
            <div class="text-green-800"> Магазины </div>
          </a>

          <a href="/enterprize-customers"
            class="gap-1 flex justify-center bg-yellow-50 hover:bg-[#EAE0BE] transition items-center py-1 px-2.5 rounded-2xl">
            <div class="h-4 w-4"><svg width="100%" height="100%" style="overflow: visible;" preserveAspectRatio="none"
                viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.6666 4.66667C10.6666 4.04669 10.6666 3.7367 10.5984 3.48236C10.4135 2.79218 9.87441 2.25308 9.18422 2.06815C8.92989 2 8.6199 2 7.99992 2C7.37994 2 7.06995 2 6.81561 2.06815C6.12543 2.25308 5.58633 2.79218 5.4014 3.48236C5.33325 3.7367 5.33325 4.04669 5.33325 4.66667M3.46659 14H12.5333C13.28 14 13.6534 14 13.9386 13.8547C14.1895 13.7268 14.3934 13.5229 14.5213 13.272C14.6666 12.9868 14.6666 12.6134 14.6666 11.8667V6.8C14.6666 6.05326 14.6666 5.6799 14.5213 5.39468C14.3934 5.1438 14.1895 4.93982 13.9386 4.81199C13.6534 4.66667 13.28 4.66667 12.5333 4.66667H3.46659C2.71985 4.66667 2.34648 4.66667 2.06126 4.81199C1.81038 4.93982 1.60641 5.1438 1.47858 5.39468C1.33325 5.6799 1.33325 6.05326 1.33325 6.8V11.8667C1.33325 12.6134 1.33325 12.9868 1.47858 13.272C1.60641 13.5229 1.81038 13.7268 2.06126 13.8547C2.34648 14 2.71985 14 3.46659 14Z"
                  stroke="#7A5432" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg></div>
            <div class="text-yellow-800"> Юрлицам </div>
          </a>
        </div>
      </div>

      <HeaderMenu />

    </div>



  </div>
</template>