<template>
  <div class="container">
    <Jumbotron msg="Report Collection Application"></Jumbotron>
    <div class="row">
      <div class="col-12">
        <form id="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email ID</label>
            <input type="email"
                   class="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
                   placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password"
                   class="form-control"
                   id="exampleInputPassword1"
                   placeholder="Password">
          </div>
          <router-link
                to="/about"
                tag="button"
                class="btn btn-primary btn-block">Submit</router-link>
          <button type="reset" class="btn btn-primary btn-block">Reset</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Jumbotron from '@/components/Jumbotron.vue';

export default {
  name: 'home',
  components: {
    Jumbotron,
  },
};
</script>
<style scoped>
#login{
  width: 60%;
  margin:auto;
}
</style>
