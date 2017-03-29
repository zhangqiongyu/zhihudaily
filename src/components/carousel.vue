<template>
  <div id="carousel">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in carouselData"
        :style="{'background-image':'url('+ item.image.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p') +')'}">
        <div>
          <router-link :to="{name: 'article', params: {id: item.id}}">
            <h3>{{ item.title }}</h3>
          </router-link>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'carousel',
    props: ['carouselData']
  }
</script>

<style>
  .el-carousel__item h3 {
    color: white;
    font-size: 2em;
    opacity: 0.75;
    line-height: 200px;
    margin: 1em;
    position: absolute;
    bottom: 0;
    width: 100%;
    line-height: 70px;
  }
  
  .el-carousel__item:nth-child(n) {
    background-repeat: no-repeat;
  }
</style>
