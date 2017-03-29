<template>
  <div id="load-more-news">
    <div class="day-delimiter" v-for="news in moreNews">
      <h2 v-if="showDateFlag">{{news.date | formatDate}}</h2>
      <div>
        <list-articles :listArticles="news.stories"></list-articles>
      </div> 
    </div> 
  </div>
</template>

<script>
import {fetchBeforeByDate} from '../utils/api'
import listArticles from './listArticles.vue'

export default {
  name: 'loadMoreArticles',
  data () {
    return {
      moreNews: [],
      reqDays: 1
    }
  },
  components: {
    'list-articles': listArticles
  },
  props: ['showDateFlag', 'loadMoreFlag'],
  watch: {
    loadMoreFlag: function (flag) {
      if (flag) {
        this.fetchMoreNews()
      }
    }
  },
  methods: {
    fetchMoreNews: function () {
      let date = new Date()
      this.reqDays --
      date.setDate(date.getDate() + this.reqDays)
      let year = String(date.getFullYear())
      let month = String(date.getMonth() + 1)
      let day = String(date.getDate())
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      let reqDate = year + month + day
      fetchBeforeByDate(reqDate).then(data => {
        this.moreNews.push(data)
      })
    }
  },
  filters: {
    formatDate (value) {
      var week = new Date(`${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`).getDay()
      var dayMap = {
        '0': '星期日',
        '1': '星期一',
        '2': '星期二',
        '3': '星期三',
        '4': '星期四',
        '5': '星期五',
        '6': '星期六'
      }
      return `${value.slice(4, 6)}月${value.slice(6, 8)}日 ${dayMap[week]}`
    }
  }
}
</script>

<style scoped>
.day-delimiter {
  background-color: #303030;
}

img {
  height: 100px;
  float: right;
  padding: 10px;
}

h2 {
  margin: 0;
  text-align: center;
  color: #f2f2f2;
  font-size: 35px;
}

span {
    color: black;
}
</style>
