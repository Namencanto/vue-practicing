<template>
  <div class="flex w-screen">
    <PinsPanel :markers="markers" @marker-hover="handleMarkerHover"></PinsPanel>
    <div class="h-screen w-screen">
      <div ref="mapContainer" class="h-full w-full">
        <div
          v-for="marker in markers"
          :key="marker.name"
          @mouseover="handleMarkerHover(marker.name)"
          @mouseout="handleMarkerHover(null)"
          :class="{ 'pulse-animation': marker.name === selectedMarkerId }"
        >
          <!-- Render the marker on the map -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat, toLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import PinsPanel from "../components/PinsPanel.vue";
import { geocodeCoordinates } from "../helpers/geocodeCoordinates";
import { getRandomColor } from "../helpers/getRandomColor";
import mapPin from "../assets/map-pin.svg";
import axios from "axios";

export default {
  name: "OpenLayersMap",
  components: {
    PinsPanel,
  },
  data() {
    return {
      selectedMarkerId: null,
    };
  },
  methods: {
    handleMarkerHover(markerId) {
      this.selectedMarkerId = markerId;
    },
  },
  setup() {
    const mapContainer = ref(null);
    const markers = reactive([
      {
        name: "tralalala",
        coordinates: [0, 0],
        color: "pink",
        iconUrl: mapPin,
      },
      {
        name: "tralalal2a",
        coordinates: [10, 10],
        color: "red",
        iconUrl: mapPin,
      },
    ]);

    const markerSource = new VectorSource();
    const markerLayer = new VectorLayer({ source: markerSource });

    const fetchPinsFromDatabase = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/pins");
        const pins = response.data;
        markers.splice(0, markers.length); // Wyczyść tablicę markers
        pins.forEach((pin) => {
          console.log(markers);
          markers.push({
            name: pin.name,
            coordinates: [pin.lat, pin.lon],
            iconUrl: mapPin,
            color: pin.color,
          });

          const markerFeature = new Feature({
            geometry: new Point(fromLonLat([pin.lon, pin.lat])),
          });
          const markerStyle = new Style({
            image: new Icon({
              src: mapPin,
              color: pin.color,
            }),
          });

          markerFeature.setStyle(markerStyle);
          markerSource.addFeature(markerFeature);
        });
      } catch (error) {
        console.error(error);
      }
    };

    const addPinToDatabase = async (markerName, latitude, longitude) => {
      try {
        const response = await axios.post("http://localhost:3001/api/pins", {
          name: markerName,
          lat: latitude,
          lon: longitude,
          color: getRandomColor(),
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      await fetchPinsFromDatabase();

      const map = new Map({
        target: mapContainer.value,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          markerLayer,
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
      });

      markers.forEach((marker) => {
        const markerFeature = new Feature({
          geometry: new Point(fromLonLat(marker.coordinates)),
        });

        const markerStyle = new Style({
          image: new Icon({
            src: marker.iconUrl,
            color: marker.color,
          }),
        });

        markerFeature.setStyle(markerStyle);
        markerSource.addFeature(markerFeature);
      });

      map.on("click", async (event) => {
        const features = markerLayer.getSource().getFeatures();
        console.log(features);
        const markerName = prompt("Please enter name");
        if (markerName) {
          const clickedCoordinate = event.coordinate;
          const lonLat = toLonLat(clickedCoordinate);

          const clickedMarkerFeature = new Feature({
            geometry: new Point(clickedCoordinate),
          });

          const clickedMarkerStyle = new Style({
            image: new Icon({
              src: mapPin,
              color: getRandomColor(),
            }),
          });

          clickedMarkerFeature.setStyle(clickedMarkerStyle);
          markerSource.addFeature(clickedMarkerFeature);

          const [latitude, longitude] = lonLat;
          const location = await geocodeCoordinates(latitude, longitude);
          markers.push({
            name: markerName,
            coordinates: [latitude, longitude],
            iconUrl: mapPin,
            color: getRandomColor(),
            location,
          });
          await addPinToDatabase(markerName, latitude, longitude);
        }
      });
    });

    return { markers, mapContainer };
  },
};
</script>

<style>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

.pulse-animation {
  animation: pulse 1s infinite;
}
</style>
