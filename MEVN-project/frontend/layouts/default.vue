<template>
  <div>
    <header class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Training Tracker</h1>
        <nav>
          <ul class="flex space-x-4">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/workouts">Workouts</NuxtLink></li>
            <li><NuxtLink to="/progress">Progress</NuxtLink></li>
            <li><NuxtLink to="/settings">Settings</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>
<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
