<template>
  <q-select
    outlined
    :value="selected"
    @input="$emit('change', $event)"
    :options="options"
    stack-label
    :label="label"
    map-options
    :rules="rules"
    :error="!!errors && errors.length>0"
    hide-bottom-space
    :readonly="readonly"
  >
    <template v-slot:append>
      <q-icon name="close" @click.stop="$emit('change', null)" class="cursor-pointer" />
    </template>

    <template v-slot:error>
      <div v-for="(error, key) in errors" :key="key">
        {{ error }}
      </div>
    </template>
  </q-select>
</template>

<script>
export default {
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    selected: { type: Object, required: false },
    label: { type: String, required: true },
    options: { type: Array, required: true },
    readonly: { type: Boolean, required: false },
    rules: { type: Array, required: false },
    errors: { type: Array, required: false }
  }
}
</script>
