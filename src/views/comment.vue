<template>
  <div id="comment">
    <navbar :title="getTitle"></navbar>
    <div class="comment">
    <el-collapse v-model="activeName" accordion value="String(1)">
      <el-collapse-item v-if="longComments.length!==0">
        <template slot="title">
          {{ longComments.length }}条长评<i class="header-icon el-icon-star-on"></i>          
        </template>
        <div v-for="longComment in longComments">
          <h1>
            <img :src="String(longComment.avatar).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')">
            {{longComment.author}}
            👍{{longComment.likes}}
          </h1>
          <div class="comment-content">
            <p>{{longComment.content}}</p>
            <p class="replied-ans" v-if="longComment.reply_to">
              <span>//{{longComment.reply_to.author + ": "}}</span>
              {{longComment.reply_to.content}}
            </p>
            <p>{{ longComment.time | replyTime}}</p>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item v-if="shortComments.length!==0">
        <template slot="title">
          {{ shortComments.length }}条短评<i class="header-icon el-icon-star-off"></i>
        </template>
        <div v-for="shortComment in shortComments">
          <h1>
            <img :src="String(shortComment.avatar).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')">
            {{shortComment.author}}
            👍{{shortComment.likes}}
          </h1>
          <div class="comment-content">
            <p>{{shortComment.content}}</p>
            <p class="replied-ans" v-if="shortComment.reply_to">
              <span>//{{shortComment.reply_to.author + ": "}}</span>
              {{shortComment.reply_to.content}}
            </p>
            <p>{{ shortComment.time | replyTime}}</p>
          </div>
        </div>
      </el-collapse-item>
  </el-collapse>
  </div>
  </div>
</template>

<script>
import navbar from '../components/navBar'
import {fetchLongCommentsById, fetchShortCommentsById} from '../utils/api'
export default {
  name: 'comment',
  data () {
    return {
      longComments: [],
      shortComments: [],
      activeName: '1'
    }
  },
  components: {
    'navbar': navbar
  },
  mounted () {
    this.initLongComments()
    this.initShortComments()
  },
  computed: {
    getTitle: function () {
      return this.longComments.length + this.shortComments.length + '条点评'
    }
  },
  methods: {
    initLongComments: function () {
      let commentId = this.$route.params.id
      fetchLongCommentsById(commentId).then(data => {
        this.longComments = data.comments
        console.log(this.longComments)
      })
    },
    initShortComments: function () {
      let commentId = this.$route.params.id
      fetchShortCommentsById(commentId).then(data => {
        this.shortComments = data.comments
      })
    }
  },
  filters: {
    replyTime: function (timestamp) {
      let date = new Date(timestamp * 1000)
      let year = date.getFullYear() + '-'
      let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let day = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
      let hour = (date.getHours() + 1 < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
      let minute = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes())
      return year + month + day + hour + minute
      // return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
    }
  }
}
</script>

<style scoped>
.comment {
  width: 100%;
  position: absolute;
  margin-top: 54px;
}

h1 {
  font-size: medium;
}

p {
  font-size: 14px;
}

p span {
  color: black;
}

.replied-ans {
  border: 4px double #b6b6b6;
  color: gray;
  width: 90%;
  left: 5%;
}
img {
  width: 20px;
}
</style>
