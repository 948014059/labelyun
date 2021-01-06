<template>
  <div id="app">
<!--    <div class="tops">-->
<!--      <nav class="navbar navbar-dark bg-dark">-->
<!--        <a class="navbar-brand" style="color: white">数据标注</a>-->
<!--&lt;!&ndash;        <form class="form-inline">&ndash;&gt;-->
<!--&lt;!&ndash;          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">&ndash;&gt;-->
<!--&lt;!&ndash;          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>&ndash;&gt;-->
<!--&lt;!&ndash;        </form>&ndash;&gt;-->
<!--      </nav>-->

<!--    </div>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
  .tops{
    width: 100%;
    height: 20px;
    background: red;
    text-align: center;
  }
</style>
