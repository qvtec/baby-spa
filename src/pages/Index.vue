<template>
  <q-page>
    <div class="flex flex-center" style="height:500px">
      <div class="column no-wrap flex-center">
        <img alt="logo" src="~assets/logo.png" style="width: 150px; height: 150px">
        <div class="q-mt-md text-center">
          <q-btn rounded color="accent" label="アカウント登録" :to="{ name: 'register' }" icon="person_add" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
