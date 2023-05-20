<template>
  <div class="flex items-center justify-center h-screen">
    <v-card class="max-w-sm">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit="login">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field
            v-model="password"
            label="Hasło"
            required
            type="password"
          ></v-text-field>
          <v-btn type="submit" color="primary">Login</v-btn>
        </v-form>
        <div class="text-center mt-4">
          <span>Don't have an account?</span>
          <NuxtLink to="register"> Register </NuxtLink>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Logika logowania użytkownika
      console.log("Zalogowano!");
    },
  },
};
</script>
