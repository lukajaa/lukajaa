<template>
  <div class="window-height">
    <q-splitter v-model="splitter" style="height: 100%" disable :horizontal="isMobile">
      <template v-slot:before v-if="!isMobile">
        <q-carousel
          animated
          v-model="slide"
          vertical
          infinite
          autoplay
          style="height: 100%"
        >
          <q-carousel-slide
            v-for="picture in 8"
            :key="picture"
            :name="picture"
            :img-src="'images/Running_' + picture + '.jpg'"
          />
        </q-carousel>
      </template>

      <template v-slot:after>
        <div class="text-center nontitle">
          <p class="title">Running</p>
          <p class="subtitle q-mb-sm">PRs</p>
          <p>400: 1:01</p>
          <p>800: 2:20</p>
          <p>1600m: 4:50</p>
          <p>3200: 10:41</p>
          <p>5000m: 16:51</p>
          <p>5000m (XC): 17:00</p>
          <p>13.1mi: 1:35:14</p>
          <div class="q-gutter-sm">
            <q-btn
              label="Strava"
              color="orange"
              href="https://www.strava.com/athletes/96376228"
              target="_blank"
              no-caps
            />
            <q-btn
              label="Back"
              color="blue"
              to="/"
              no-caps
            />
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

// VARS
const $q = useQuasar(); // quasar instance
const isMobile = $q.platform.is.mobile;

// REFS
const slide = ref<number>(1);
const splitter = ref<number>(isMobile ? 0 : 50);
</script>
