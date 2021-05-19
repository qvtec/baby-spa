<template>
  <q-layout view="lHh lpR lFf">

    <q-header class="bg-primary">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-btn flat size="lg" no-caps :to="{ name: 'top' }">
            BABY APP
          </q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" content-class="bg-grey-3" bordered>
      <!-- drawer content -->
      <q-list>
        <q-item v-if="user" :to="{ name: 'profile' }">
          <q-item-section avatar>
            <q-avatar v-if="user.photo">
              <q-img :src="user.photo" />
            </q-avatar>
            <q-icon v-else name="accessibility_new" />
          </q-item-section>
          <q-item-section>
            {{ user.name }}
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item :to="{ name: 'home' }">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            PAGE1
          </q-item-section>
        </q-item>

        <q-item :to="{ name: 'home' }">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            PAGE2
          </q-item-section>
        </q-item>

        <q-item :to="{ name: 'home' }">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            PAGE3
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable @click.native="logout()" >
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            ログアウト
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { Loading, LoadingBar } from 'quasar'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      left: false,
      essentialLinks: linksData
    }
  },

  computed: {
    user () {
      return this.$store.getters['auth/user']
    }
  },

  methods: {
    async logout () {
      LoadingBar.start()
      Loading.show()
      await this.$store.dispatch('auth/logout')
      Loading.hide()
      LoadingBar.stop()
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
