<template>
  <div>
    <Transition>
      <div v-if="!started" class="starting-screen fixed text-center text-white bg-black items-center column">
        <div class="absolute-center">
          <h1 class="col">Lucas K. Chang</h1>
          <h4 class="col">Run the BCL Championships course with me as I pass through personal milestones</h4>
          <q-btn
            label="Begin"
            color="primary"
            @click="start()"
          />
        </div>
      </div>
    </Transition>
    <Transition>
      <div v-if="started" class="absolute text-center" style="width: 100%; z-index: 10">
        <h3 class="text-white">{{ date_done }} | {{ distance_done }}mi | {{ minutes_done }}m {{ seconds_done }}s</h3>
      </div>
    </Transition>
    <div id="map">
    </div>
  </div>
</template>

<script setup lang="ts">
import BCL_Finals from '../data/BCL_Finals.json';
import achievements_json from '../data/achievements.json';
import { onMounted, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-gpx'

var achievements : AchievementsType = achievements_json;

// VARS
var map;
var gpx_length = Object.keys(BCL_Finals).length;
var first_date = new Date('2013/12/31')
var now = new Date()
var date_diff = now.getTime() - first_date.getTime()

// REFS
const started = ref<boolean>(false);

// stats
const date_done = ref<string>('Feb 2013');
const distance_done = ref<string>('0.00');
const minutes_done = ref<string>('0');
const seconds_done = ref<string>('0');

// icons
var runnerIcon = L.icon({
    iconUrl: 'icons/icon.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var runningIcon = L.icon({
    iconUrl: 'icons/running.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var programmingIcon = L.icon({
    iconUrl: 'icons/programming.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var personalIcon = L.icon({
    iconUrl: 'icons/personal.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

function start() {
  started.value = true;
  var index = 0;
  var runner_marker = L.marker(
        [BCL_Finals[index].lat, BCL_Finals[index].lon],
        {icon: runnerIcon}
  ).addTo(map)

  var move_loop = setInterval(function() {
    if (index >= gpx_length - 1) {
      clearInterval(move_loop);
      runner_marker.remove();
    }
    // update marker position
    runner_marker.setLatLng([BCL_Finals[index].lat, BCL_Finals[index].lon]);

    // update stats
    var percent_done = index / gpx_length;
    var unpadded_distance_done = (Math.round(3.1 * percent_done * 100) / 100).toString();
    distance_done.value = unpadded_distance_done.length > 3 ? unpadded_distance_done : unpadded_distance_done + '0';
    var total_seconds_done = 1020 * percent_done + 1;
    minutes_done.value = (Math.floor(total_seconds_done / 60)).toString();
    var unpadded_seconds_done = (Math.round(total_seconds_done % 60) - 1).toString();
    seconds_done.value = unpadded_seconds_done.length > 1 ? unpadded_seconds_done : '0' + unpadded_seconds_done;
    var unformatted_date_done = new Date(first_date.getTime() + date_diff * percent_done);
    date_done.value = unformatted_date_done.toDateString().split(' ')[1] + ' ' + unformatted_date_done.toDateString().split(' ')[3]

    // milestone
    var index_date = unformatted_date_done.getFullYear() + '-' + (unformatted_date_done.getMonth() + 1) + '-' + unformatted_date_done.getDate();
    var milestone = achievements[index_date] || null

    if (milestone) {
      var milestone_icon = ''
      if (milestone.type == 'running') {
        milestone_icon = runningIcon
      } else if (milestone.type == 'programming') {
        milestone_icon = programmingIcon
      } else if (milestone.type == 'personal') {
        milestone_icon = personalIcon
      }
      var milestone_marker = L.marker(
            [BCL_Finals[index].lat, BCL_Finals[index].lon],
            {icon: milestone_icon}
      ).addTo(map)
      .bindPopup(`<p class="text-h6 q-my-none">${index_date}</p>${milestone.description} <br><a href="${milestone.link}">Link</a>`)
      if (milestone.important) {
        milestone_marker.openPopup();
      }
    }

    // tick
    index++;
  }, 5);
}

onMounted(() => {
  map = L.map('map', { zoomControl: false, scrollWheelZoom: false, dragging: false, doubleClickZoom: false });

  var gpx = 'GPXs/BCL_Final.gpx' // URL to your GPX file or the GPX itself
  new L.GPX(gpx, {
    polyline_options: {
        color: '#FC4C02',
        weight: 15,
        lineCap: 'round'
    },
    marker_options: {
        startIconUrl: '',
        endIconUrl: ''
    },
    async: true
    }).on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
  }).addTo(map);
})
</script>
