<template>
    <div id="LoginContainer" class="d-flex justify-content-center" >
        <button @click="login()" class="btn align-self-center" id="googleBtn">
            Google Login
            <b-icon-people-circle></b-icon-people-circle>
        </button>
    </div>
    
</template>

<script>
import firebase from 'firebase';

export default {
    name:'LoginContainer',
   
    data(){
        return{
             
        }
    }, 

    methods:{
        login(){
            this.$store.dispatch("loginByGoogle")
        },

    }, 

    
}



</script>

<style scoped>
#LoginContainer{
    width: 100%;
    height: 100%;
}

#googleBtn{
    width: 30%;
    height: 10%;
    background: #0f4c75;
    color: #bbe1fa;
    font-weight: bolder;
}
</style>