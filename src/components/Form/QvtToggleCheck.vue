<template>
  <div>
    <q-btn
      flat
      :color="status ? 'primary' : 'grey'"
      :icon="status ? 'task_alt' : 'radio_button_unchecked'"
      :label="label"
      @click="clickStatus" />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'status',
    event: 'check'
  },

  props: {
    status: { type: Boolean, required: false },
    label: { type: String, required: false }
  },

  methods: {
    clickStatus () {
      this.$emit('check', !this.status)
    }
  }
}
</script>
