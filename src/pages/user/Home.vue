<template>
  <div class="q-pa-md">
    HOME
  </div>
</template>

<script>
export default {
  name: 'PageHome',

  created () {
    this.$axios.post('dashboard')
  }
}
</script>
