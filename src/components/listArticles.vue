<template>
  <div id="list-articles">
    <el-row style="background: blue">
      <div  v-for="article in listArticles">
      <router-link :to="{name: 'article', params: {id: article.id}}">
        <el-col :span="50" :offset="0" :key="article.id">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;float:left;">
              <span>{{ article.title }}</span>
            </div>
            <img :src="String(article.images).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')" v-if="article.images">
          </el-card>
        </el-col>
      </router-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'listArticles',
  props: ['listArticles']
}
</script>

<style scoped>
img {
  height: 100px;
  float: right;
  padding: 10px;
}

span {
  color: black;
  font-size: 20px;
}
</style>
