<template>
  <div class="window-height hide-scrollbar">
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
            v-for="picture in 4"
            :key="picture"
            :name="picture"
            :img-src="'images/Programming_' + picture + '.jpg'"
          />
        </q-carousel>
      </template>

      <template v-slot:after>
        <div :class="[isMobile ? 'q-px-none' : 'q-px-xl', 'q-mb-xl', 'hide-scrollbar']">
          <p class="text-center title">Programming</p>
          <p class="subtitle text-center q-mb-none">Projects</p>
          <div class="nontitle q-pa-xl q-gutter-md">
            <div class="bg-blue-1 rounded-borders q-px-md q-py-sm">
              <p class="subtitle-no-margin q-my-lg">Bay Clock</p>
              <p>
                Bay Clock is a website that shows the current schedule and block for the
                Bay School of San Francisco.
              </p>
              <a href="https://www.bayclock.org/" target="_blank">Link</a>
            </div>

            <div class="bg-red-1 rounded-borders q-px-md q-py-sm">
              <p class="subtitle-no-margin q-my-lg">Census Sample</p>
              <p>
                Should sampling be used in the census?<br />This is a small website
                introducing the census and how we can use simple statistic equations to
                sample for it.
              </p>
              <a href="https://lukajaa.github.io/census-sample" target="_blank">Link</a>
            </div>

            <div class="bg-green-1 rounded-borders q-px-md q-py-sm">
              <p class="subtitle-no-margin q-my-lg">Crop Check and Machine Check</p>
              <p>
                A pair of Stardew Valley mods that bring quality of life improvements to
                the game by alerting the player when certain in-game items are ready.
              </p>
              <a
                href="https://www.nexusmods.com/users/121487748?tab=user+files"
                target="_blank"
                >Link</a
              >
            </div>
          </div>
          <div class="text-center q-gutter-sm">
            <q-btn
              label="Github"
              color="grey-10"
              href="https://github.com/lukajaa"
              target="_blank"
              no-caps
            />
            <q-btn
              label="Scratch (Not used)"
              color="orange"
              href="https://scratch.mit.edu/users/lukaja/"
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
