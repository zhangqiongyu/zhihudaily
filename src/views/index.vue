<template>
  <div id="index">
    <navbar :title="getTitle"></navbar>
    <carousel :carouselData="articles.top_stories"></carousel>
    <list-articles :listArticles="articles.stories"></list-articles>
    <load-more-articles :showDateFlag="showDateFlag" :loadMoreFlag='loadMore'></load-more-articles>
  </div>
</template>

<script>
import {fetchLatestNews} from '../utils/api'
import {scrollTouchdown} from '../utils/base'
import navbar from '../components/navBar'
import carousel from '../components/carousel'
import listArticles from '../components/listArticles.vue'
import loadMoreArticles from '../components/loadMoreArticles'

export default {
  name: 'index',
  data () {
    return {
      articles: {},
      showBar: false,
      loadMore: false,
      moreArticles: '',
      showDateFlag: true
    }
  },
  components: {
    'carousel': carousel,
    'navbar': navbar,
    'list-articles': listArticles,
    'load-more-articles': loadMoreArticles
  },
  mounted () {
    this.fetchArticles()
    window.addEventListener('scroll', this.listenScroll)
  },
  computed: {
    getTitle: function () {
      return '今日热闻'
    }
  },
  methods: {
    fetchArticles: function () {
      fetchLatestNews().then(data => {
        this.articles = data
      })
    },
    showSidebar: function () {
      this.showBar = !this.showBar
    },
    listenScroll: function () {
      if (scrollTouchdown()) {
        this.loadMore = true
      } else {
        this.loadMore = false
      }
    }
  }
}
</script>

<style scoped>
</style>
