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
            name="personal"
            img-src="images/Personal.jpg"
          />
        </q-carousel>
      </template>

      <template v-slot:after>
        <div :class="[isMobile ? 'q-px-none' : 'q-px-xl', 'q-mb-xl', 'hide-scrollbar', 'text-center']">
          <p class="title">Personal</p>
          <p class="caption">
            When I'm not <a class="text-black" href="/#/running">running</a> or <a class="text-black" href="/#/programming">programming</a>,
            I enjoy reading, playing videogames, and hanging out with friends. I'm also interested in urban planning and how our built environment affects our lives.
            At night, I always enjoy <a class="text-black" href="https://www.youtube.com/@lukaja1828" target="_black">playing minecraft</a> with my friends.
          </p>
          <div class="q-gutter-sm">
            <q-btn
              label="Instagram"
              color="purple"
              href="https://www.instagram.com/chucas.lang/"
              target="_blank"
              no-caps
            />
            <q-btn
              label="Twitter (Not used)"
              color="info"
              href="https://twitter.com/ignlukaja"
              target="_blank"
              no-caps
            />
            <q-btn
              label="Discord"
              color="blue-14"
              @click="discord"
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

function discord () {
    $q.dialog({
      title: 'Discord',
      message: 'lukaja#4104'
    })
  }
</script>
