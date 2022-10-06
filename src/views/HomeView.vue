<template>
  <div >
    <!-- Кнопки -->
    <div class="flex flex-row sm:flex-wrap">
      <div class="lg:w-auto sm:w-full sm:flex sm:justify-center" v-for="button in buttons" :key="button.id">
        <!-- <button
        @click="switchModal = !switchModal"
        class="text-white rounded bg-[#409488] hover:bg-[#3b82f6] px-4 py-1 m-2.5"
        >Заказать в {{button.name}}</button> -->
        <!-- <app-button @click="switchModal = !switchModal">{{button.name}}</app-button> -->
        <app-button @click="switchModal = !switchModal" :buttonText="`Заказать в ${button.name}`"/>

      </div>
    </div>

    <!-- Модальное окно с формой -->
    <div class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    v-if="switchModal">
      <div class="relative mx-auto lg:w-auto flex justify-center items-center">
        <!-- Форма -->
        <form
        @submit.prevent="submitFirstForm"
        class="bg-white h-auto p-6 rounded sm:m-4">
          <h2 class="m-3 text-3xl">Заказать звонок</h2>
          <div class="m-3 text-pink-500" v-html="err" v-if="err"></div>
          <!-- Поля формы -->
          <div class="flex justify-end items-center flex-wrap sm:w-full sm:flex sm:justify-center">
            <!-- Имя -->
            <div class="mb-4 mx-3 ">
              <div class="flex">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Имя</label>
                <p>*</p>
              </div>
              <input class="shadow appearance-none border rounded w-44 py-2 px-3 h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
             focus:border-sky-500 focus:invalid:border-pink-500 sm:w-full lg:w-auto" v-model="name" type="text" placeholder="Иван Иванов" required>
            </div>
            <!-- Телефон -->
            <div class="mb-4 mx-3 ">
              <div class="flex">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Телефон</label>
                <p>*</p>
              </div>
              <masked-input mask="\+\7 (111) 111-11-11" class="shadow appearance-none border rounded w-44 py-2 px-3 h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:invalid:border-pink-500 lg:w-auto" v-model="phone" type="text" placeholder="+7 (___) ___-__-__" required/>
            </div>
            <!-- Почта -->
            <div class="mb-4 mx-3 ">
              <div class="flex">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
                <p>*</p>
              </div>
              <input class="shadow appearance-none border rounded w-44 py-2 px-3 h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:invalid:border-pink-500  lg:w-auto" v-model="email" type="text" placeholder="you@example.com" required>
            </div>
            <!-- Селектор -->
            <div class="mb-4 mx-3 ">
              <div class="flex">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Город</label>
                <p>*</p>
              </div>
              <select name="city_id" id="city_id" v-model="city_id" required
              class="shadow appearance-none border rounded w-44 py-2 px-3 h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:invalid:border-pink-500  lg:w-auto">
                <option v-for="city in cities" :value="city.value" :key="city.id">{{city.id}}</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end items-center flex-wrap sm:flex sm:justify-center lg:justify-end lg:flex-nowrap;">
            <button class="bg-[#4ca44b] hover:bg-blue-700 text-white font-light text-lg py-2 px-4 mx-3 w-44 h-10 rounded focus:outline-none focus:shadow-outline flex justify-center items-center" type="submit">
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
    v-if="switchModal"
    class="absolute z-40 inset-0 opacity-25 bg-black">
    </div>
    <!-- Ответ html от сервера в модальном окне -->
    <div class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50" v-if="answerModal">
      <div class="relative mx-auto w-auto flex flex-col justify-center items-center">
        <div @click="answerModal = !answerModal" class="text-end w-full cursor-pointer">X</div>
        <div class="bg-white h-auto p-6 rounded" v-html="resp" v-if="resp"></div>
      </div>
    </div>

    <div
    v-if="answerModal"
    class="absolute z-40 inset-0 opacity-25 bg-black">
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import MaskedInput from 'vue-masked-input'
import AppButton from '@/components/UI/Button.vue'
export default {
  name: 'modal',
  components: {MaskedInput, AppButton},
  data() {
    return {
      switchModal: false,
      answerModal: false,
      resp: null,
      err: null,
      buttons: [
        {id: 1, name: 'Москве'},
        {id: 2, name: 'Санкт-Петербурге'}
      ],
      cities: [
        { id: 'Москва', value: 1 },
        { id: 'Санкт-Петербург', value: 2 },
        { id: 'Казань', value: 3 }

      ],
      name: '',
      phone: '',
      email: '',
      city_id: ''
    }
  },
  methods: {
    submitFirstForm() {
      axios
      .post('http://hh.autodrive-agency.ru/test-tasks/front/task-7/', {
        name: this.name,
        phone: this.phone.replace(/[^\d\+]/g, ''),
        email: this.email,
        city_id: this.city_id
      })
      .then((res) => {
        if(res.status === 200) {
          this.switchModal = false
          setTimeout(() => {
            this.answerModal = true
          }, "600"),
          this.name = '',
          this.phone = '',
          this.email = '',
          this.city_id = '',
          this.resp = res.data
        }
      })
      .catch((error) => {
        this.err = error.response.data
      })
    }
  }
}
</script>
