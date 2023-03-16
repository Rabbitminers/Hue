<template>
    <article 
        class="room-card base-card" 
        :style="{ backgroundImage: gradient }"
    >
        <IconComponent class="icon" type="Hello world!"/>
        <b class="room-name">{{name}}</b>
        <input type="range" min="1" max="100" value="50" class="banner-slider" id="myRange">
    </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from '@/components/IconComponent.vue'
import { LightData, LightState, RGB } from '../api/base/types';
import { xyToHex } from '../api/base/colour_utils';

export default defineComponent({
  name: 'RoomBanner',
  props: {
    name: {
      type: String,
      default: 'Error',
    },
    lights: {
      type: Array as () => LightData[],
      default: () => [],
    },
  },
  data() {
    return {
      colours: [] as string[],
    };
  },
  computed: {
    gradient(): string {
      const gradient = `linear-gradient(to right, ${this.colours.join(', ')})`;
      return gradient;
    },
  },
  watch: {
    lights: {
      immediate: true,
      handler(lights: LightData[]) {
        this.colours = getLightColours(lights);
      },
    },
  },
});

function getLightColours(lights: LightData[]): string[] {
  return lights.map((light) => {
    const state = light.state;
    console.log(xyToHex(state.xy[0], state.xy[1], state.bri))
    return xyToHex(state.xy[0], state.xy[1], state.bri);
  });
}

</script>

<style lang="css" scoped>
    .room-name {
        font-size: xx-large;
        grid-area: header
    }
    .icon {
        grid-area: icon;
    }

    .banner-slider {
        grid-area: slider;
    }
    
    .room-card {
        display: grid;
        grid-template-columns: 3em auto;
        grid-gap: 10px;
        grid-template-areas: 
            "icon header"
            "slider slider";
        margin: 2em;
    }
</style>