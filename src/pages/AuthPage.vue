<template>
  <div class="container">
    <h1>Welcome to</h1>
    <h1 class="text-rrnotes">rr-notes</h1>
    <div class="buttons">
      <RouterLink :to="{ name: 'login' }"
        ><v-btn variant="elevated" color="success">Login</v-btn></RouterLink
      >
      <RouterLink :to="{ name: 'register' }">
        <v-btn variant="elevated" color="warning">Register</v-btn></RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.text-rrnotes {
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3rem;
  border: 1px solid black;
  border-radius: 1rem;
}
</style>
