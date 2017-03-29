<template>
  <div id="article">
    <navbar :title="getTitle"></navbar>
    <div class="story-extra">
      <!--h3>{{}}</h3-->
    <router-link :to="{name: 'comment', params: {id: articleId}}">
      <h2>✍🏿 <span> {{numComments}} </span></h2>
    </router-link>
    <h2 class="comment">👍🏿<span> {{popularity}}</span></h2>
    </div>
    <div class="header-blank"></div>
    <div v-if="articleContent.body" >
			<div class="article-decor" v-if="articleContent.image" 
      :style="{'background-image':'url('+ String(articleContent.image).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p') +')'}">
			<header class="article-title-decor">
				<div class="article-title">{{ articleContent.title }}</div>
				<div class="img-source">{{articleContent.image_source}}</div>				
			</header>
			</div>
      <div v-html="String(articleContent.body).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')"></div>
    </div>
  </div>
</template>

<script>
import navbar from '../components/navBar'
import {fetchNewsById, fetchExtraById} from '../utils/api'
export default {
  name: 'article',
  data () {
    return {
      articleContent: '',
      articleId: 0,
      popularity: 0,
      numComments: 0
    }
  },
  components: {
    'navbar': navbar
  },
  created () {
    let articleId = this.$route.params.id
    this.fetchArticle(articleId)
  },
  mounted () {
    this.initStoryExtra()
  },
  computed: {
    getTitle: function () {
      return '文章'
    }
  },
  methods: {
    fetchArticle: function (id) {
      this.articleId = this.$route.params.id
      fetchNewsById(id).then(data => {
        this.articleContent = data
      })
    },
    initStoryExtra: function () {
      let storyId = this.$route.params.id
      fetchExtraById(storyId).then(data => {
        this.popularity = data.popularity
        this.numComments = data.comments
      })
    }
  }
}
</script>

<style scoped>
@import '../styles/css/article.css';

.story-extra {
  height: 120px;
  width: 20%;
  background-color: #1e1e1e;
  color: #66bbff;
  position: fixed;
  right: 0;
}

.header-blank {
  height: 54px;
  width: 100%;
  background-color: #fff;
}

h2 {
  color: #66bbff;
  float: right;
  bottom: 0;
  font-size: xx-large;
  padding-top: 40px;
  padding-right: 25px;
}

h2 span {
  font-size: large;
}

h2.comment {
  color: #b6b6b6;
}
</style>
