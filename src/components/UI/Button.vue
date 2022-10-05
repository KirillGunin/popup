<template>
    <button
    v-on="$listeners" v-bind="$attrs"
    class="text-white rounded bg-[#409488] hover:bg-[#3b82f6] px-4 py-1 m-2.5 sm:w-full"
      >{{buttonText}}</button>
</template>

<script>
  export default {
    props: {
      buttonText: {
        type: String,
        require: true,
        default: () => 'Заказать в'
      }
    }
  }
  </script>
