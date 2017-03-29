<template>
  <div class="navbar">
    <header>
      <button type="button" @click="showSidebar">
      </button>
      <h1>
        {{title}}
      </h1>
    </header>
    <div v-if="show" class="sidebar">
      <div class="theme-bar">
        <router-link :to="{name:'index', params: {id: ''}}">
        <h1 class="theme">知</h1>
        <div class="theme-title">首页</div>
        </router-link>
      </div>
      <div class="theme-bar"  v-for="(theme, index) in themes">
        <router-link :to="{name:'theme', params:{id:theme.id}}">
        <h1 class="theme"> {{ themeImage[index].image }} </h1>
        <div class="theme-title">{{ theme.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchThemes} from '../store/api'
export default {
  name: 'navbar',
  data () {
    return {
      themes: [],
      themeImage: [
        {image: '💕'},
        {image: '👏'},
        {image: '📀'},
        {image: '🚨'},
        {image: '🗼'},
        {image: '📊'},
        {image: '📈'},
        {image: '💻'},
        {image: '🎮'},
        {image: '🎼'},
        {image: '🎭'},
        {image: '⛷'}
      ],
      show: false
    }
  },
  props: ['title', 'showBackBtn', 'showNumComments', 'showPopularity'],
  mounted () {
    fetchThemes().then(data => {
      this.$data.themes = data.others
    })
  },
  methods: {
    showSidebar: function () {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
.navbar {
  width: 100%;
  height: auto;
  position: fixed;
  padding: 0;
  margin: 0;
  z-index: 3;
}

h1 {
  background-color: #141414;
  padding: 12px 0;
  margin: 0;
  color: #efefef;
  font-size: 22px;
  text-align: center;
  text-decoration: none;
  height: 30px;
}

button {
  left: 0;
  padding: 10px;
  position: absolute;
  height: 53px;
  width: 50px;
  background-image: url(../assets/sidebar_btn_link.svg);
}

button:hover {
  background-image: url(../assets/sidebar_btn_hover.svg);
}

.sidebar {
  width: 100%;
  background-color: #f2f2f2;
  margin: 0;
  position: fixed;
  z-index: 3;
  top: 53px;
  height: auto;
  background-color: #1e1e1e;
}

.theme-bar {
  width: 7.6923%;
  height: 106px;
  float: left;
  text-align: center;
  color: #efefef;
  font-size: 11px;
  font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
}

.theme {
  font-size: 40px;
  background-color: #1e1e1e;
}

.theme-title {
  color: #66bbff;
  font-size: 11px;
  text-decoration: none;
  padding-top: 18px;
  font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
}

a {
  text-decoration: none;
}

a:active {
  color: #66bbff;
}
</style>
