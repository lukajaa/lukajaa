<template>
  <div>
    <Transition>
      <div
        v-if="!started"
        class="starting-screen fixed text-center text-white items-center column q-pa-md"
      >
        <div class="absolute-center column justify-center">
          <p class="title-no-margin col">Lucas K. Chang</p>
          <p class="subtitle-no-margin col q-mb-sm">Run the</p>
          <q-select
            v-model="race"
            :options="race_options"
            hide-bottom-space
            color="white"
            items-aligned
            input-style="text-align: center;"
            class="self-center"
            hide-dropdown-icon
            rounded outlined

            dark
          >
            <template v-slot:selected-item="scope">
              <span class="text-white subtitle-no-margin q-pa-lg">
                {{ scope.opt.replace(/_/g, ' ') }}
              </span>
            </template>
          </q-select>
          <p class="subtitle-no-margin col">course with me</p>
          <div class="col-auto">
            <q-btn label="Begin" color="primary" @click="start()" no-caps />
          </div>
          <p class="nontitle q-my-sm">or skip to</p>
          <div class="q-gutter-sm">
            <q-btn label="Running" color="red" to="/running" no-caps />
            <q-btn label="Programming" color="purple" to="/programming" no-caps />
          </div>
        </div>
      </div>
    </Transition>
    <Transition>
      <div v-if="started" class="absolute text-center" style="width: 100%; z-index: 10">
        <p class="subtitle text-white">
          {{ date_done }} | {{ distance_done }}mi | {{ minutes_done }}m
          {{ seconds_done }}s
        </p>
      </div>
    </Transition>
    <div id="map"></div>
    <q-dialog v-model="ended">
      <div class="ended-modal text-white text-center q-pa-md notitle rounded-borders">
        <p class="subtitle-no-margin">Race Report</p>
        <p>Time: {{ seconds_to_time(races[race].time) }}</p>
        <p>Distance: {{ races[race].distance }} miles ({{ races[race].distance_km }} km)</p>
        <p>Pace: {{ races[race].pace }} min/mi ({{ races[race].pace_km }} min/km)</p>
        <p>Milestones: {{ Object.keys(achievements).length }}</p>
        <br>
        <p>Learn more</p>
        <div class="q-gutter-sm">
            <q-btn label="Running" color="red" to="/running" no-caps />
            <q-btn label="Programming" color="purple" to="/programming" no-caps />
        </div>
        <p class="q-my-sm">or</p>
        <q-btn label="Start Over" color="blue" @click="ended=false;started=false;" no-caps />
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import BCL_Finals from '../data/BCL_Finals.json';
import BCL_1 from '../data/BCL_1.json';
import CIF_State_Meet from '../data/CIF_State_Meet.json';
import achievements_json from '../data/achievements.json';
import { onMounted, ref, watch } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-gpx';

var achievements: AchievementsType = achievements_json;
var races : RacesType = {
  'BCL_Finals': {'json': BCL_Finals, 'time': 1020, 'distance': 3.1, 'distance_km': 5, 'pace': '5:28', 'pace_km': '3:24'},
  'BCL_1': {'json': BCL_1, 'time': 1082, 'distance': 3.2, 'distance_km': 5.2, 'pace': '5:38', 'pace_km': '3:29'},
  'CIF_State_Meet': {'json': CIF_State_Meet, 'time': 1025, 'distance': 3.1, 'distance_km': 5, 'pace': '5:30', 'pace_km': '3:26'},
}

// VARS
var map;
var current_race;
var first_date = new Date('2013/12/31');
var now = new Date();
var date_diff = now.getTime() - first_date.getTime();

// REFS
const started = ref<boolean>(false);
const ended = ref<boolean>(false);
const race = ref<string>('BCL_Finals');
const race_options = ref<string[]>(['BCL_Finals', 'BCL_1', 'CIF_State_Meet']);

// stats
const date_done = ref<string>('Feb 2013');
const distance_done = ref<string>('0.00');
const minutes_done = ref<string>('0');
const seconds_done = ref<string>('0');

// icons
var runnerIcon = L.icon({
  iconUrl: 'icons/icon.png',
  iconSize: [30, 30], // size of the icon
  iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});
var runningIcon = L.icon({
  iconUrl: 'icons/running.png',
  iconSize: [30, 30], // size of the icon
  iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});
var programmingIcon = L.icon({
  iconUrl: 'icons/programming.png',
  iconSize: [30, 30], // size of the icon
  iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});
var personalIcon = L.icon({
  iconUrl: 'icons/personal.png',
  iconSize: [30, 30], // size of the icon
  iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});

function start() {
  started.value = true;
  var index = 0;
  var race_dict = races[race.value].json
  var gpx_length = Object.keys(race_dict).length;
  var runner_marker = L.marker([race_dict[0].lat, race_dict[0].lon], {
    icon: runnerIcon,
  }).addTo(map);

  var move_loop = setInterval(function () {
    if (index >= gpx_length - 1) {
      clearInterval(move_loop);
      ended.value = true;
      runner_marker.remove();
    }
    // update marker position
    runner_marker.setLatLng([race_dict[index].lat, race_dict[index].lon]);

    // update stats
    var percent_done = index / gpx_length;
    var unpadded_distance_done = (Math.round(3.1 * percent_done * 100) / 100).toString();
    distance_done.value =
      unpadded_distance_done.length > 3
        ? unpadded_distance_done
        : unpadded_distance_done + '0';
    var total_seconds_done = 1020 * percent_done + 1;
    minutes_done.value = Math.floor(total_seconds_done / 60).toString();
    var unpadded_seconds_done = (Math.round(total_seconds_done % 60) - 1).toString();
    seconds_done.value =
      unpadded_seconds_done.length > 1
        ? unpadded_seconds_done
        : '0' + unpadded_seconds_done;
    var unformatted_date_done = new Date(first_date.getTime() + date_diff * percent_done);
    date_done.value =
      unformatted_date_done.toDateString().split(' ')[1] +
      ' ' +
      unformatted_date_done.toDateString().split(' ')[3];

    // milestone
    var index_date =
      unformatted_date_done.getFullYear() +
      '-' +
      (unformatted_date_done.getMonth() + 1) +
      '-' +
      unformatted_date_done.getDate();
    var milestone = achievements[index_date] || null;

    if (milestone) {
      var milestone_icon = '';
      if (milestone.type == 'running') {
        milestone_icon = runningIcon;
      } else if (milestone.type == 'programming') {
        milestone_icon = programmingIcon;
      } else if (milestone.type == 'personal') {
        milestone_icon = personalIcon;
      }
      var milestone_marker = L.marker([race_dict[index].lat, race_dict[index].lon], {
        icon: milestone_icon,
      })
        .addTo(map)
        .bindPopup(
          `<p class="nontitle">${milestone.description}</p>${index_date} | <a href="${milestone.link}">Link</a>`
        );
      if (milestone.important) {
        milestone_marker.openPopup();
      }
    }

    // tick
    index++;
  }, 5);
}

function seconds_to_time(seconds: number) : string {
  var minutes = Math.floor(seconds / 60);
  var unpadded_seconds = (seconds % 60).toString();
  var padded_seconds = unpadded_seconds.length > 1 ? unpadded_seconds : '0' + unpadded_seconds;
  return minutes + ':' + padded_seconds;
}

// WATCHERS

// watch ended value
watch(race, function (val) {
  var old_race = current_race;
  current_race = new L.GPX('GPXs/' + val + '.gpx', {
    polyline_options: {
      color: '#FC4C02',
      weight: 15,
      lineCap: 'round',
    },
    marker_options: {
      startIconUrl: '',
      endIconUrl: '',
    },
    async: true,
  }).on('loaded', function (e) {
      map.flyToBounds(e.target.getBounds(), {
        duration: 1,
      });
      setTimeout(function() {
        old_race.remove();
      }, 1000);
    })
  .addTo(map);
});

onMounted(() => {
  map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    doubleClickZoom: false,
    touchZoom: false,
  });

  current_race = new L.GPX('GPXs/' + race.value + '.gpx', {
    polyline_options: {
      color: '#FC4C02',
      weight: 15,
      lineCap: 'round',
    },
    marker_options: {
      startIconUrl: '',
      endIconUrl: '',
    },
    async: true,
  })
    .on('loaded', function (e) {
      map.fitBounds(e.target.getBounds());
    })
    .addTo(map);
});
</script>
