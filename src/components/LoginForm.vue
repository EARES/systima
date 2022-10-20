<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
        <div class="d-flex">
          <v-img src="@/assets/logo.svg" contain></v-img>
          <p>SYSTIMA</p>
        </div>
      </v-col>
      <v-col cols="12" lg="5" class="login-part d-flex align-center justify-center">
        <v-row no-gutters class="align-start">
          <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
            <div class="login-wrapper pt-md-4 pt-0">
              <v-container>
                <v-row class="flex-column">
                  <v-col cols="12">
                    <p class="login-slogan display-2 text-center font-weight-medium my-10">
                      Login
                    </p>
                  </v-col>
                  <v-form v-model="form" class="login-form">
                    <v-text-field name="email" v-model="email" label="Email" :rules="[rules.required, rules.email]">
                    </v-text-field>
                    <v-text-field name="password" v-model="password" label="Password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                      :type="showPassword ? 'text' : 'password'" @click:append="password.length > 1 ? showPassword = !showPassword : null">
                    </v-text-field>
                    <v-flex class="d-flex justify-space-between">
                      <a href="#" class="primary--text">
                        Forgot password?
                      </a>
                      <v-btn color="success" :loading="loading" :disabled="!form" @click="login()">Login
                        <v-icon right dark>
                          mdi-chevron-right
                        </v-icon>
                      </v-btn>
                    </v-flex>
                    <v-alert border="bottom" v-if="authError" class="mt-3" type="error" dense text>Invalid credentials,
                      Try Attempt Count: {{ authCount }}</v-alert>
                  </v-form>
                </v-row>
              </v-container>
            </div>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-footer>
              <div class="primary--text">
                © 2022, All rights reserved.
              </div>
            </v-footer>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginForm',
  computed: {
    ...mapGetters(['authCount', 'isAuth']),
    authError () {
      return this.authCount > 0 && !this.isAuth
    }
  },
  watch: {
    authCount () {
      if (this.authCount > 2) window.location.reload()
    }
  },
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    form: false,
    loading: false,

    rules: {
      required: (v) => !!v || 'Required field',
      email: (v) => /.+@.+\..+/.test(v) || 'Invalid email',
      min: (v) => (v && v.length > 4) || 'Min 5 Length'
    }
  }),
  methods: {
    ...mapActions(['signIn']),
    login () {
      this.loading = true
      setTimeout(() => {
        this.signIn({
          email: this.email,
          password: this.password
        })
        this.loading = false
      }, 1000)
    }
  }
}
</script>
<style src="../assets/components/login.scss" lang="scss" scoped />
