<template>
  <q-layout view="hHh Lpr fFf">

    <q-header class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat size="lg" no-caps :to="{ name: 'top' }">
            <q-avatar square>
              <img src="~assets/logo.png" />
            </q-avatar>
            <div v-if="$q.screen.gt.xs" class="q-pl-sm">
              BABY APP
            </div>
          </q-btn>
        </q-toolbar-title>

        <q-btn rounded color="accent" label="ログイン" :to="{ name: 'login' }" icon="login" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title>
          <strong>HOME</strong> App
        </q-toolbar-title>
        <q-space />
        <q-item-label caption>v{{ $q.version }}</q-item-label>
      </q-toolbar>
      <q-toolbar>
        <div class="text-center q-gutter-xs">
          <q-btn flat size="sm" label="サイトポリシー" />
          <q-btn flat size="sm" label="利用規約" />
          <q-btn flat size="sm" label="プライバシーポリシー" />
        </div>
      </q-toolbar>
      <q-toolbar>
        <q-item class="col text-center">
          <q-item-section>
            <q-item-label>@2020 qvtec</q-item-label>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'TopLayout',
  data () {
    return {
      left: false
    }
  }
}
</script>
