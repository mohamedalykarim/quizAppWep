<template>
<div>
  <b-navbar class="background"  toggleable="lg" type="dark" variant="info">
    <b-navbar-brand @click="goHome">Quiz App</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="getUser.isLogged" @click="goConstructor">Constructor</b-nav-item>
        <b-nav-item v-if="getUser.isLogged" @click="goStudent">Student</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="false">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>


      <b-navbar-nav v-if="!getUser.isLogged">
        <b-nav-item @click="goLogin()" >Login</b-nav-item>
      </b-navbar-nav>



        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">English</b-dropdown-item>
          <b-dropdown-item href="#">عربي</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right v-if="getUser.isLogged">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item>Profile</b-dropdown-item>
          <b-dropdown-item @click="logOut()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Navbar",
    data(){
      return {

      }
    },
    computed:{
      ...mapGetters([
        "getUser"
      ]),
    },

    methods:{
      goHome(){
        if(this.$router.currentRoute.name == "Home")return;
        this.$router.push("/")
      },
      goLogin(){
        if(this.$router.currentRoute.name == "Login")return;
        this.$router.push("/Login")
      },
      goConstructor(){
        if(this.$router.currentRoute.name == "Constructor")return;
        this.$router.push("/Constructor")
      },
      goStudent(){
        if(this.$router.currentRoute.name == "Student")return;
        this.$router.push("/Student")

      },
      logOut(){
       this.$store.dispatch("logOut")

      }
    }
}
</script>

<style scoped>
  .background{
    background: url('~@/assets/bg.png') repeat;
  }
</style>
