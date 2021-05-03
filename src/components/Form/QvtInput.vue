<template>
  <q-input
    outlined
    :value="inputValue"
    @input="$emit('input', $event)"
    :label="label"
    :type="type"
    :placeholder="placeholder"
    :prefix="prefix"
    :readonly="readonly"
    hide-bottom-space
    lazy-rules
    :rules="rules"
    :error="!!errors && errors.length>0"
  >
    <template v-slot:before v-if="!!beforeIcon">
      <q-btn round dense flat :icon="beforeIcon" />
    </template>

    <template v-slot:prepend v-if="!!preIcon">
      <q-icon :name="preIcon" />
    </template>

    <template v-slot:after v-if="!!afterIcon">
      <q-btn round dense flat :icon="afterIcon" @click="afterIconClick" />
    </template>

    <template v-slot:error>
      <div v-for="(error, key) in errors" :key="key">
        {{ error }}
      </div>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'QvtInputComponent',
  model: {
    prop: 'inputValue',
    event: 'input'
  },
  props: {
    inputValue: { type: String, required: true },
    label: { type: String, required: false },
    type: { type: String, required: false, default: 'text' },
    placeholder: { type: String, required: false },
    prefix: { type: String, required: false },
    preIcon: { type: String, required: false },
    beforeIcon: { type: String, required: false },
    afterIcon: { type: String, required: false },
    readonly: { type: Boolean, required: false },
    rules: { type: Array, required: false },
    errors: { type: Array, required: false }
  },
  methods: {
    afterIconClick () {
      this.$emit('afterIconClick')
    }
  }
}
</script>
