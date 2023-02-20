<template>
  <div class="row window-height">
    <div class="col">
      <q-carousel
        animated
        v-model="slide"
        vertical
        infinite
        autoplay
        style="height: 100%;"
      >
        <q-carousel-slide v-for="picture in 8" :key="picture" :name="picture" :img-src="'images/Running_' + picture + '.jpg'" />
      </q-carousel>
    </div>
    <div class="col text-center">
      <h1>Running</h1>
      <h6 class="q-mb-sm">PRs</h6>
      <p>400: 1:01</p>
      <p>800: 2:20</p>
      <p>1600m: 4:50</p>
      <p>3200: 10:41</p>
      <p>5000m: 16:51</p>
      <p>5000m (XC): 17:00</p>
      <p>13.1mi: 10:41</p>
      <div class="q-gutter-sm">
        <q-btn label="Strava" color="orange" href="https://www.strava.com/athletes/96376228" target="_blank"/>
        <q-btn label="Back" color="blue" to="/" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const slide = ref<number>(1);
</script>
