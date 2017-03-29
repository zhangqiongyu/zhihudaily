<template>
  <div id="theme">
    <navbar :title="getTitle"></navbar>
    <div class="theme-blank"></div>
    <header :style="{'background-size': '100%', 'height': '500px', 'background-repeat': 'no-repeat','background-image':'url('+ String(background).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p') +')'}">
      <p class="theme-description">{{ description }}</p>
    </header>
    <list-articles :listArticles="themeStories"></list-articles>
    <load-more-articles :showDateFlag="showDateFlag" :loadMoreFlag="loadMoreThemeArticleFlag"></load-more-articles>
  </div>
</template>

<script>
import {fetchThemesById, fetchBeforeThemesById} from '../utils/api'
import {scrollTouchdown} from '../utils/base'
import navbar from '../components/navBar'
import listArticles from '../components/listArticles.vue'
import loadMoreArticles from '../components/loadMoreArticles'

export default {
  name: 'theme',
  data () {
    return {
      themeStories: [],
      showDateFlag: false,
      description: '',
      background: '',
      name: '',
      image: '',
      editors: [],
      image_source: '',
      id: 0,
      loadMoreThemeArticleFlag: false
    }
  },
  mounted () {
    this.initThemeData()
    window.addEventListener('scroll', this.listenScroll)
  },
  components: {
    'navbar': navbar,
    'list-articles': listArticles,
    'load-more-articles': loadMoreArticles
  },
  watch: {
    '$route' (to, from) {
      this.initThemeData()
    },
    loadMoreThemeArticleFlag: function (flag) {
      if (flag) {
        this.fetchMoreThemeArticle()
      }
    }
  },
  computed: {
    getTitle: function () {
      return this.name
    }
  },
  methods: {
    initThemeData: function () {
      let themeNewsId = this.$route.params.id
      fetchThemesById(themeNewsId).then(data => {
        this.$data.themeStories = data.stories
        this.$data.description = data.description
        this.$data.background = data.background
        this.$data.name = data.name
        this.$data.image = data.image
        this.$data.editors = data.editors
        this.$data.image_source = data.image_source
      })
    },
    listenScroll: function () {
      if (scrollTouchdown()) {
        this.loadMoreThemeArticleFlag = true
      } else {
        this.loadMoreThemeArticleFlag = false
      }
    },
    fetchMoreThemeArticle: function () {
      let themeId = this.$route.params.id
      let timestamp = this.themeStories[this.themeStories.length - 1]['id']
      fetchBeforeThemesById(themeId, timestamp).then(data => {
        this.themeStories = this.themeStories.concat(data.stories)
        this.id = this.themeStories[this.themeStories.length - 1].id
      })
    }
  }
}
</script>

<style scoped>
header {
  margin: -20px;
}

.theme-description {
  color: #66bbff;
  text-align: center;
  padding-top: 400px;
  font-size: xx-large;
}

.theme-blank {
  height: 54px;
}
</style>
