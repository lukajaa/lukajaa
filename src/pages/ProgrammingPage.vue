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
            v-for="picture in 1"
            :key="picture"
            :name="picture"
            :img-src="'images/Programming_' + picture + '.jpg'"
          />
        </q-carousel>
      </template>

      <template v-slot:after>
        <div :class="[isMobile ? 'q-px-none' : 'q-px-xl', 'q-mb-xl', 'hide-scrollbar']">
          <p class="text-center title">Programming</p>
          <p class="caption text-center">
            Following in the footsteps of my father and brother, I have been programming since 3rd grade. What started as some tinkering around with scratch turned into one of my favorite hobbies.
            I have programmed in Javascript, Python, and C#. I currently enjoy programming with VueJS the most, creating websites and web apps.
          </p>
          <p class="subtitle text-center q-mb-none">Projects</p>
          <q-list class="caption q-mb-lg">
            <q-expansion-item popup default-opened label="Bay Clock" header-class="midtitle q-py-md">
              <q-separator />
              <q-card>
                <q-card-section>
                  <p>
                    Bay Clock is a website that shows the current schedule and block for the
                    Bay School of San Francisco.
                  </p>
                  <a href="https://www.bayclock.org/" target="_blank">Link</a>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item popup label="Census Sample" header-class="midtitle q-py-md">
              <q-separator />
              <q-card>
                <q-card-section>
                  <p>
                    Should sampling be used in the census?<br />This is a small website
                    introducing the census and how we can use simple statistic equations to
                    sample for it.
                  </p>
                  <a href="https://lukajaa.github.io/census-sample" target="_blank">Link</a>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item popup label="Crop Check and Machine Check" header-class="midtitle q-py-md">
              <q-separator />
              <q-card>
                <q-card-section>
                  <p>
                    A pair of Stardew Valley mods that bring quality of life improvements to
                    the game by alerting the player when certain in-game items are ready.
                  </p>
                  <a
                    href="https://www.nexusmods.com/users/121487748?tab=user+files"
                    target="_blank"
                    >Link</a
                  >
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
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
