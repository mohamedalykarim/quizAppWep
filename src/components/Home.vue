<template>
    <div>
        <Navbar />

        <b-container>


            <b-row id="cardContainer" >

                <b-col  class="d-flex justify-content-center">

                        <b-card style="width:250px; height:350px; margin:5px" class="card" :img-src="require('@/assets/constructor_icon.png')" img-alt="Image" img-top>
                            <button style="width:100%" @click="goConstructor()" class="btn btn-info align-self-center" id="constructorBtn">
                            Constructor
                            </button>
                        </b-card>


                        <b-card style="width:250px; height:350px; margin:5px " class="card" :img-src="require('@/assets/student_icon.png')" img-alt="Image" img-top>

                            <button style="width:100%" @click="goStudent()" class="btn btn-info align-self-center" id="constructorBtn">
                            Student
                            </button>
                        </b-card>


                </b-col>


            </b-row>
        </b-container>





    </div>
</template>

<script>
import Navbar from './includes/Navbar';
import { mapGetters } from 'vuex';
import firebase from 'firebase';



export default {
    name: 'Home',
    components:{
        Navbar
    },

    data(){
        return {
        }
    },

    computed:{
        ...mapGetters([
            "getUser"
        ])
    },

    methods:{
        goConstructor(){
            this.$router.push("/Constructor");
        },
        goStudent(){
            this.$router.push("/Student");
        }
    }


}
</script>

<style scoped>
#cardContainer{
    min-height: 100%;
}

.card{
    padding: 10px;
}


</style>
