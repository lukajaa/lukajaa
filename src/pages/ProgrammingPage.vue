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
        <q-carousel-slide v-for="picture in 4" :key="picture" :name="picture" :img-src="'images/Programming_' + picture + '.jpg'" />
      </q-carousel>
    </div>
    <div class="col text-center q-px-xl q-pb-xl">
      <h1>Programming</h1>
      <h6 class="q-mb-none">Projects</h6>
      <div class="q-pa-xl q-gutter-md">
        <q-card>
          <q-card-section>
            <h5 class="q-my-lg">Bay Clock</h5>
            <p>Bay Clock is a website that shows the current schedule and block for the Bay School of San Francisco.</p>
            <p>View it here: <a href="https://www.bayclock.org/" target="_blank">https://www.bayclock.org/</a></p>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <h5 class="q-my-lg">Census Sample</h5>
            <p>Should sampling be used in the census?<br>This is a small website introducing the census and how we can use simple statistic equations to sample for it.</p>
            <p>View it here: <a href="https://lukajaa.github.io/census-sample" target="_blank">https://lukajaa.github.io/census-sample</a></p>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <h5 class="q-my-lg">Crop Check and Machine Check</h5>
            <p>A pair of Stardew Valley mods that bring quality of life improvements to the game by alerting the player when certain in-game items are ready.</p>
            <p>View them here: <a href="https://www.nexusmods.com/users/121487748?tab=user+files" target="_blank">https://www.nexusmods.com/users/121487748?tab=user+files</a></p>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-gutter-sm">
        <q-btn label="Github" color="grey-10" href="https://github.com/lukajaa" target="_blank"/>
        <q-btn label="Back" color="blue" to="/" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const slide = ref<number>(1);
</script>
