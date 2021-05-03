<template>
  <q-select
    outlined
    :value="selected"
    @input="$emit('change', $event)"
    use-input
    use-chips
    multiple
    input-debounce="0"
    @new-value="createTag"
    :options="filterOptions"
    @filter="filterFn"
    stack-label
    :label="label"
    :rules="rules"
    :error="!!errors && errors.length>0"
    hide-bottom-space
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
  data () {
    return {
      filterOptions: []
    }
  },
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    selected: { type: Array, required: false },
    label: { type: String, required: true },
    options: { type: Array, required: true },
    rules: { type: Array, required: false },
    errors: { type: Array, required: false }
  },
  methods: {
    createTag (val, done) {
      if (val.length > 0) {
        if (!this.options.includes(val)) {
          done(val, 'add-unique')
        }
      }
    },

    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = this.options
        } else {
          const needle = val.toLowerCase()
          this.filterOptions = this.options.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    }
  }
}
</script>
