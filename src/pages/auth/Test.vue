<template>
  <q-page padding class="fit row justify-center q-pa-md items-baseline">
    <div class="col-xs-12 col-sm-7 col-lg-5">
      <q-card flat bordered>
        <q-card-section class="bg-grey-2">
          <div class="text-h6">テスト</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form
            class="q-gutter-md"
            ref="qform"
            @submit="submit"
          >

            <QvtDate
              v-model="form.date"
              label="Date"
              :errors="errors.date" />

            <QvtSelect
              v-model="form.select"
              label="Select"
              :options="selectOptions"
              :rules="[val => !!val || '選択してください']"
              :errors="errors.select" />

            <QvtMultiSelectAdd
              v-model="form.multiSelect"
              label="MultiSelectAdd"
              :options="multiSelectAddOptions"
              :rules="[val => !!val && val.length>0 || '選択してください']"
              :errors="errors.multiSelect" />

            <QvtToggleCheck
              v-model="form.status"
              label="ToggleCheck" />

            <QvtInput
              v-model="form.name"
              label="Name"
              preIcon="account_circle"
              :rules="[val => !!val || '入力してください']"
              :errors="errors.name" />

            <QvtInput
              v-model="form.email"
              label="Email"
              type="email"
              preIcon="mail"
              :rules="[val => !!val || '入力してください']"
              :errors="errors.email" />

            <QvtInput
              v-model="form.password"
              label="Password（6文字以上）"
              type="password"
              preIcon="lock"
              :rules="[
                val => !!val || '入力してください',
                val => val.length >= 6 || '6文字以上にしてください'
              ]"
              :errors="errors.password" />

            <QvtInput
              v-model="form.password_confirmation"
              label="Password（確認）"
              type="password"
              preIcon="lock"
              :rules="[val => val == this.form.password || 'パスワードが一致しません']"
              :errors="errors.password_confirmation" />

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
import QvtInput from 'components/Form/QvtInput'
import QvtDate from 'components/Form/QvtDate'
import QvtMultiSelectAdd from 'components/Form/QvtMultiSelectAdd'
import QvtSelect from 'components/Form/QvtSelect'
import QvtToggleCheck from 'components/Form/QvtToggleCheck'

export default {
  name: 'Register',
  components: { QvtInput, QvtDate, QvtMultiSelectAdd, QvtSelect, QvtToggleCheck },
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        date: null,
        select: null,
        multiSelect: [],
        status: false
      },
      selectOptions: [
        {
          label: '米',
          value: 1
        },
        {
          label: 'りんご',
          value: 2
        },
        {
          label: 'にんじん',
          value: 3
        }
      ],
      multiSelectAddOptions: [],
      loading: false,
      errors: {}
    }
  },

  created () {
    if (this.$store.getters['auth/isAuth']) {
      this.$router.replace({ name: 'home' })
    }
  },

  methods: {
    submit () {
      console.log('submit!!')
      this.$refs.qform.validate().then(success => {
        if (!success) return
        console.log(this.form)
      })
    }
  }
}
</script>
