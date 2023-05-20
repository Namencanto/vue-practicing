<template>
  <div class="min-w-[20rem] p-4">
    <v-card
      class="mb-4"
      v-for="marker in markers"
      :key="marker.name"
      @mouseover="$emit('marker-hover', marker.name)"
      @mouseout="$emit('marker-hover', null)"
    >
      <v-card-text class="cursor-pointer">
        <div class="flex items-center">
          <v-icon class="mr-2">mdi-map-marker</v-icon>
          <span>{{ marker?.name }}</span>
        </div>
        <div v-if="marker.location" class="text-gray-500">
          {{ marker.location }}
        </div>
      </v-card-text>
      <div
        class="w-full h-1"
        :style="{
          backgroundColor: marker.color,
          transition: 'background-color 0.2s',
          animation:
            marker.name === selectedMarker ? 'pulse 1s infinite' : 'none',
        }"
      ></div>
    </v-card>
  </div>
</template>

<script>
import { geocodeCoordinates } from "~/helpers/geocodeCoordinates";
export default {
  props: {
    markers: {
      type: Array,
      required: true,
    },
    selectedMarker: {
      type: String,
      default: null,
    },
  },
  watch: {
    markers: {
      immediate: true,
      handler(newMarkers) {
        this.updateMarkerLocations(newMarkers);
      },
    },
  },
  methods: {
    async updateMarkerLocations(markers) {
      for (const marker of markers) {
        if (!marker.location) {
          const [latitude, longitude] = marker.coordinates;
          const location = await geocodeCoordinates(latitude, longitude);
          marker.location = location;
        }
      }
    },
  },
};
</script>

<style>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
