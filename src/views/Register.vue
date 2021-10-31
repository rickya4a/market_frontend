<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
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
                    v-model="username"
                    :rules="usernameRules"
                    prepend-icon="mdi-account"
                    name="username"
                    label="Username"
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

                  <v-text-field
                    v-model="confirmPassword"
                    :rules="rules"
                    prepend-icon="mdi-lock"
                    name="repassword"
                    label="Re-Enter Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click.prevent="validate"
                  :disabled="!valid"
                >Register</v-btn>
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
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    snackbar: false,
    timeout: 3000,
    username: '',
    usernameRules: [
      v => !!v || 'Username cannot be empty',
      v => /\w/.test(v) || 'Username must contain alphabet or numeric'
    ],
    email: '',
    emailRules: [
      v => !!v || 'Email cannot be empty',
      v => /.+@.+/.test(v) || 'Email must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password cannot be empty'
    ],
    confirmPassword: '',
  }),
  computed: {
    rules () {
      const rules = []
      if (this.password) {
        const rule =
          v => (!!v && v) === this.password || "Password doesn't match"
        rules.push(rule)
      }
      return rules
    },
  },
  watch: {
    confirmPassword: 'validateField',
    password: 'validateField',
  },
  methods: {
    validateField () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.submit()
      }
    },
    submit () {
      let items = {
        email: this.email,
        username: this.username,
        password: this.password
      }
      axios
      .post(`http://${window.location.hostname}:8080/register`, items)
      .then(() => {
        this.$router.push('/')
      })
      .catch(() => {
        this.text = 'Error occured'
        this.snackbar = true
      })
    }
  }
};
</script>