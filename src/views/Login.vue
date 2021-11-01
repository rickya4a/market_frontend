<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    prepend-icon="mdi-email"
                    name="email"
                    label="Email"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click.prevent="validate"
                  :disabled="!valid"
                >Login</v-btn>
              </v-card-actions>

              <!-- Alert -->
              <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
              >{{ text }}
                <v-btn
                  color="blue"
                  text
                  @click="snackbar = false"
                >Close</v-btn>
              </v-snackbar>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    snackbar: false,
    timeout: 3000,
    text: '',
    email: '',
    emailRules: [
      v => !!v || 'Email cannot be empty',
      v => /.+@.+/.test(v) || 'Email must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password cannot be empty'
    ],
  }),
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.submit()
      }
    },
    submit () {
      let items = {
        email: this.email,
        password: this.password
      }
      axios
      .post(`http://${window.location.hostname}:8080/login`, items)
      .then((response) => {
        localStorage.clear()
        localStorage.setItem('email', response.data.data[0].email)
        localStorage.setItem('password', response.data.data[0].password)
        this.$router.push('/monster-attack')
      })
      .catch(() => {
        this.text = 'Error occured'
        this.snackbar = true
      })
    }
  }
};
</script>