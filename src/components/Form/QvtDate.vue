<template>
  <q-input
    outlined
    :value="date || defaultDate"
    @input="$emit('input', $event)"
    mask="date"
    hide-bottom-space
    :error="!!errors && errors.length>0"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date
            today-btn
            :locale="myLocale"
            :value="date || defaultDate"
            @input="dateInput"
            :options="options"
           />
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:after v-if="rangeBefore">
      <q-icon dense name="navigate_next" />
    </template>

    <template v-slot:error>
      <div v-for="(error, key) in errors" :key="key">
        {{ error }}
      </div>
    </template>
  </q-input>
</template>

<script>
import { date } from 'quasar'

export default {
  data () {
    return {
      myLocale: {
        days: '日曜_月曜_火曜_水曜_木曜_金曜_土曜'.split('_'),
        daysShort: '日_月_火_水_木_金_土'.split('_'),
        months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        monthsShort: '1/_2/_3/_4/_5/_6/_7/_8/_9/_10/_11/_12/'.split('_'),
        firstDayOfWeek: 1
      },
      defaultDate: date.formatDate(Date.now(), 'YYYY/MM/DD')
    }
  },
  model: {
    prop: 'date',
    event: 'input'
  },
  props: {
    date: { type: String, required: false },
    rangeBefore: { type: Boolean, required: false, default: false },
    options: { type: Function, required: false },
    errors: { type: Array, required: false }
  },
  methods: {
    dateInput (value) {
      this.$emit('input', value)
      this.$refs.qDateProxy.hide()
    }
  }
}
</script>
