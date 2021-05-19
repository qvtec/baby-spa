<template>
  <q-page padding class="fit row justify-center q-pa-md items-baseline">
    <div class="col-xs-12 col-sm-7 col-lg-5">
      <q-card flat bordered>
        <q-card-section class="bg-grey-2">
          <div class="text-h6">アカウント登録</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form
            class="q-gutter-md"
            ref="form"
            @submit="submit"
          >

            <q-input
              outlined
              hide-bottom-space
              v-model="credentials.name"
              label="Name"
              type="name"
              lazy-rules
              :rules="[val => !!val || '入力してください']"
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
            </q-input>

            <q-input
              outlined
              hide-bottom-space
              v-model="credentials.email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[val => !!val || '入力してください']"
              :error="!!errors.email && errors.email.length>0"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>

              <template v-slot:error>
                <div v-for="(error, key) in errors.email" :key="key">
                  {{ error }}
                </div>
              </template>
            </q-input>

            <q-input
              outlined
              hide-bottom-space
              v-model="credentials.password"
              label="Password（6文字以上）"
              type="password"
              lazy-rules
              :rules="[
                val => !!val || '入力してください',
                val => val.length >= 6 || '6文字以上にしてください'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <q-input
              outlined
              hide-bottom-space
              v-model="credentials.password_confirmation"
              label="Password（確認）"
              type="password"
              lazy-rules
              :rules="[val => val == this.credentials.password || 'パスワードが一致しません']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <div>
              <q-btn
                class="full-width"
                label="登録"
                :loading="loading"
                type="submit"
                color="accent"
                size="lg" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
      <div class="q-py-md">
        <q-btn flat color="primary" label="アカウントを持っている方はこちら" to="/auth/login" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      credentials: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      loading: false,
      errors: {}
    }
  },

  methods: {
    submit () {
      this.$refs.form.validate().then(success => {
        if (!success) return
        this.loading = true

        this.$store.dispatch('auth/register', this.credentials)
          .then(() => {
            this.$router.replace({ name: 'email.verify' })
            this.$q.notify({ type: 'positive', message: '成功しました' })
          })
          .catch(error => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors
            }
            this.$q.notify({ type: 'negative', message: '失敗しました' })
            this.loading = false
          })
      })
    }
  }
}
</script>
