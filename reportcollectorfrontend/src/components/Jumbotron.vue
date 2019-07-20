<template>
  <div class="jumbotron jumbotron-fluid" id="jumbo">
    <h1 class="display-4">{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>
<style scoped>
#jumbo{
  background-color: rgb(204, 230, 255);
}
</style>
