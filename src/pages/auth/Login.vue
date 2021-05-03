<template>
  <q-page padding class="fit row justify-center q-pa-md items-baseline">
    <div class="col-xs-12 col-sm-7 col-lg-5">
      <q-card flat bordered>
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6">ログイン</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form
            class="q-gutter-md"
            ref="form"
            @submit="login"
          >

            <q-input
              outlined
              hide-bottom-space
              v-model="credentials.email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[val => !!val || '入力してください']"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input
              outlined
              hide-bottom-space
              v-model="credentials.password"
              label="Password"
              type="password"
              lazy-rules
              :rules="[val => !!val || '入力してください']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <div>
              <q-btn
                class="full-width"
                label="ログイン"
                :loading="loading"
                type="submit"
                color="accent"
                size="lg" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
      <div class="q-py-md">
        <q-btn flat label="アカウント登録" to="/auth/register" icon="person_add" />
        <q-btn flat label="パスワード再発行" to="/password/remind" icon="o_lock" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      loading: false
    }
  },

  created () {
    if (this.$store.getters['auth/isAuth']) {
      this.$router.replace({ name: 'home' })
    }
  },

  methods: {
    login () {
      this.$refs.form.validate().then(success => {
        if (!success) return
        this.loading = true

        this.$store.dispatch('auth/login', this.credentials)
          .then(() => {
            this.$router.replace({ name: 'home' })
            this.$q.notify({ type: 'positive', message: 'ログインに成功しました' })
          })
          .catch(() => {
            this.$q.notify({ type: 'negative', message: 'ログインに失敗しました' })
            this.loading = false
          })
      })
    }
  }
}
</script>
