<template>
    <div>
        <Navbar />

      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="99999999999"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >

        <!-- Exams section  index = 0 -->
        <b-carousel-slide >
          <template v-slot:img>

            <b-container>
            <b-row>
              <b-col>
                <div v-for="quiz in getQuizs" class="rounded rounded-lg border-info" style="background: #bbe1fa">
                  <div
                    :title="quiz.quizName"
                    class="mb-2 quizCard"
                  >

                    <div style="margin-left: 20px; border-left: 10px solid #0f4c75; padding-left: 10px;">
                      <p style="font-size: 30px; color: #0f4c75" class="font-weight-bold">{{ quiz.quizName }}</p>
                      <p style="margin-top: 4px" class="text-muted"> {{ quiz.quizDescription }} <p/>


                      <div style="background: rgba(0,0,0,0.05); margin-top: 20px;">
                        <div class="btn" @click="editQuiz(quiz)">
                          <b-img style="line-height:25px; width: 25px; height: 25px" :src="require('@/assets/setting_icon.png')"></b-img>
                          <p style="line-height:25px;">Edit quiz</p>
                        </div>

                        <button class="btn" @click="showQuestions(quiz.id)">
                          <b-img style="line-height:25px; width: 25px; height: 25px" :src="require('@/assets/question_icon.png')"></b-img>
                          <p style="line-height:25px;">Questions</p>
                        </button>

                        <button class="btn " @click="showStudents(quiz.id)">
                          <b-img style="line-height:25px; width: 25px; height: 25px" :src="require('@/assets/people_access_icon.png')"></b-img>
                          <p style="line-height:25px;">Students</p>
                        </button>

                        <button class="btn ">
                          <b-img style="line-height:25px; width: 25px; height: 25px" :src="require('@/assets/statistics_icon.png')"></b-img>
                          <p style="line-height:25px;">Statistics</p>
                        </button>

                        <button class="btn">
                          <b-img style="line-height:25px; width: 25px; height: 25px" :src="require('@/assets/start_icon.png')"></b-img>
                          <p style="line-height:25px;">Start quiz</p>
                        </button>
                      </div>


                    </div>


                  </div>
                </div>

              </b-col>
            </b-row>
          </b-container>
          </template>
        </b-carousel-slide>

        <!-- Edit Exams section index = 1 -->
        <b-carousel-slide>
          <template v-slot:img>
          <b-container>
            <b-row>
              <b-col >

                <div  style="background: #bbe1fa">
                  <div class="mb-2 quizCard">
                    <span class="h1 mb-2"><b-icon-chevron-compact-left variant="dark" @click="showQuizsPage" ></b-icon-chevron-compact-left> Quiz edit</span>

                    <b-form
                      @submit.prevent="editQuizToDatabase"
                      style="
                  margin-left: 50px;
                  margin-right: 50px;
                  margin-top: 50px;
                  "
                    >

                      <b-form-group
                        id="input-group-1"
                        label="Quiz id:"
                        label-for="input-1"
                        description="this is the id of the quiz"
                      >
                        <b-form-input
                          id="input-1"
                          :value="getEditQuizItemId"
                          type="text"
                          required
                          disabled
                          placeholder="Quiz id"
                        ></b-form-input>

                      </b-form-group>

                      <b-form-group
                        id="input-group-2"
                        label="Quiz name :"
                        label-for="input-1"
                        description="Here, type your quiz name"
                      >
                        <b-form-input
                          id="input-2"
                          :value="getEditQuizItemName"
                          @input="setEditQuizItemName"
                          type="text"
                          required
                          placeholder="Name of quiz"
                        ></b-form-input>

                      </b-form-group>

                      <b-form-group
                        id="input-group-3"
                        label="Quiz description :"
                        label-for="input-1"
                        description="Here you can type a brief about your quiz"
                      >
                        <b-form-textarea
                          id="input-3"
                          :value="getEditQuizItemDescription"
                          @input="setEditQuizItemDescription"
                          rows="3"
                          max-rows="6"
                          required
                          placeholder="Description of quiz"
                        ></b-form-textarea>

                      </b-form-group>

                      <b-form-group
                        id="input-group-4"
                        label="Questions count :"
                        label-for="input-1"
                        description="Here, the maximum questions count the quiz contains for students"
                      >
                        <b-form-input
                          id="input-4"
                          :value="getEditQuizItemQuestionCount"
                          @input="setEditQuizItemQuestionCount"
                          type="number"
                          required
                          placeholder="Number of questions"
                        ></b-form-input>

                      </b-form-group>

                      <b-form-group
                        id="input-group-5"
                        label="Success grade :"
                        label-for="input-1"
                        description="Here, type quiz success grade (min 0 and max 100)"
                      >
                        <b-form-input
                          id="input-5"
                          :value="getEditQuizItemSuccessGrade"
                          @input="setEditQuizItemSuccessGrade"
                          type="number"
                          min="0"
                          max="100"
                          required
                          placeholder="Success grade"
                        ></b-form-input>

                      </b-form-group>

                      <b-form-group
                        id="input-group-6"
                        label="Quiz time :"
                        label-for="input-1"
                        description="Here, type quiz time in minutes (0 for no time and max 300)"
                      >
                        <b-form-input
                          id="input-5"
                          :value="getEditQuizItemQuizTime"
                          @input="setEditQuizItemQuizTime"
                          type="number"
                          min="0"
                          max="300"
                          required
                          placeholder="Success grade"
                        ></b-form-input>

                      </b-form-group>

                      <b-form-group
                        id="input-group-7"
                        label="Quiz swipe direction"
                        label-for="input-1"
                        description="this option let you determine the quiz swipe direction"
                      >
                        <b-form-select
                          :value="getEditQuizItemSwipeDirection"
                          @input="setEditQuizItemSwipeDirection"
                          :options="options"
                          class="mb-3"
                          value-field="item"
                          text-field="name"
                        ></b-form-select>
                      </b-form-group>

                      <b-form-group
                        id="input-group-8"
                        label="Navigation direction"
                        label-for="input-1"
                        description="this option let you determine the navigation direction"
                      >
                        <b-form-select
                          :value="getEditQuizItemNavDirection"
                          @input="setEditQuizItemNavDirection"
                          :options="options"
                          class="mb-3"
                          value-field="item"
                          text-field="name"
                        ></b-form-select>
                      </b-form-group>


                      <b-form-group
                        id="input-group-9"

                      >
                        <b-form-checkbox
                          :checked="getEditQuizItemCheckAnswerWorking"
                          @input="setEditQuizItemCheckAnswerWorking"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        >
                          check Answer working
                        </b-form-checkbox>


                      </b-form-group>

                      <b-form-group
                        id="input-group-10"
                      >
                        <b-form-checkbox
                          :checked="getEditQuizItemSaveResults"
                          @input="setEditQuizItemSaveResults"
                          class="mb-2 mr-sm-2 mb-sm-0"
                        >
                          Save results
                        </b-form-checkbox>

                      </b-form-group>


                      <b-form-group id="input-group-11">
                        <b-form-checkbox
                          :checked="getEditQuizItemShowResults"
                          @input="setEditQuizItemShowResults"
                          class="mb-2 mr-sm-2 mb-sm-0">Show results</b-form-checkbox>
                      </b-form-group>


                      <b-form-group
                        id="input-group-12">
                        <b-button type="submit" variant="primary">Edit</b-button>
                      </b-form-group>









                    </b-form>



                  </div>



                </div>





              </b-col>
            </b-row>
          </b-container>
          </template>
        </b-carousel-slide>

        <!-- Show questions section index = 2 -->
        <b-carousel-slide>
          <template v-slot:img>
            <b-container>
              <b-row>
                <b-col >

                  <div  style="background: #bbe1fa">
                    <div class="mb-2 quizCard">
                      <span class="h1 mb-2"><b-icon-chevron-compact-left variant="dark" @click="showQuizsPage" ></b-icon-chevron-compact-left> Questions </span>


                      <div v-for="question in getQuestions" class="rounded rounded-lg border-info" style="margin-top:10px; background: #bbe1fa">
                        <div
                          class="mb-2 quizCard"
                        >


                          <div style="margin-left: 20px; border-left: 10px solid #0f4c75; padding-left: 10px;">
                            <p style="font-size: 30px; color: #0f4c75" class="font-weight-bold">
                              {{ question.questionText }}

                              <b-button class="btn btn-info btn-sm">
                                <b-icon-file-earmark-text></b-icon-file-earmark-text>
                                Edit
                              </b-button>

                            </p>
                            <p v-for="answer in question.questionAnswers" style="margin-top: 4px" class="text-muted">
                              {{ answer.answerText }}
                            <p/>



                            <div style="background: rgba(0,0,0,0.05); margin-top: 20px;">
                              correct answer is :
                              <span v-for="answer in question.questionAnswers" >
                          <span v-if="answer.correct">{{ answer.answerText }}</span>
                        </span>
                            </div>


                          </div>


                        </div>
                      </div>




                    </div>



                  </div>





                </b-col>
              </b-row>
            </b-container>
          </template>
        </b-carousel-slide>

        <!-- Show Students section index = 3 -->
        <b-carousel-slide>
          <template v-slot:img>
            <b-container>
              <b-row>
                <b-col >

                  <div  style="background: #bbe1fa">
                    <div class="mb-2 quizCard">
                      <span class="h1 mb-2"><b-icon-chevron-compact-left variant="dark" @click="showQuizsPage" ></b-icon-chevron-compact-left> Students </span>
                    </div>



                  </div>





                </b-col>
              </b-row>
            </b-container>
          </template>
        </b-carousel-slide>

        <!-- Add quiz section index = 4 -->
        <b-carousel-slide>
          <template v-slot:img>
            <b-container>
              <b-row>
                <b-col >

                  <div  style="background: #bbe1fa">
                    <div class="mb-2 quizCard">
                      <span class="h1 mb-2"><b-icon-chevron-compact-left variant="dark" @click="showQuizsPage" ></b-icon-chevron-compact-left> Add new quiz</span>

                      <b-form
                        @submit.prevent="addNewQuizToDatabase"
                        style="
                  margin-left: 50px;
                  margin-right: 50px;
                  margin-top: 50px;
                  "
                      >

                        <b-form-group
                          id="input-group-13"
                          label="Quiz id:"
                          label-for="input-13"
                          description="this is the id of the quiz"
                        >
                          <b-form-input
                            id="input-1"
                            :value="getEditQuizItemId"
                            type="text"
                            required
                            disabled
                            placeholder="Quiz id"
                          ></b-form-input>

                        </b-form-group>

                        <b-form-group
                          id="input-group-14"
                          label="Quiz name :"
                          label-for="input-1"
                          description="Here, type your quiz name"
                        >
                          <b-form-input
                            id="input-14"
                            :value="getEditQuizItemName"
                            @input="setEditQuizItemName"
                            type="text"
                            required
                            placeholder="Name of quiz"
                          ></b-form-input>

                        </b-form-group>

                        <b-form-group
                          id="input-group-15"
                          label="Quiz description :"
                          label-for="input-1"
                          description="Here you can type a brief about your quiz"
                        >
                          <b-form-textarea
                            id="input-15"
                            :value="getEditQuizItemDescription"
                            @input="setEditQuizItemDescription"
                            rows="3"
                            max-rows="6"
                            required
                            placeholder="Description of quiz"
                          ></b-form-textarea>

                        </b-form-group>

                        <b-form-group
                          id="input-group-16"
                          label="Questions count :"
                          label-for="input-1"
                          description="Here, the maximum questions count the quiz contains for students"
                        >
                          <b-form-input
                            id="input-16"
                            :value="getEditQuizItemQuestionCount"
                            @input="setEditQuizItemQuestionCount"
                            type="number"
                            required
                            placeholder="Number of questions"
                          ></b-form-input>

                        </b-form-group>

                        <b-form-group
                          id="input-group-17"
                          label="Success grade :"
                          label-for="input-1"
                          description="Here, type quiz success grade (min 0 and max 100)"
                        >
                          <b-form-input
                            id="input-17"
                            :value="getEditQuizItemSuccessGrade"
                            @input="setEditQuizItemSuccessGrade"
                            type="number"
                            min="0"
                            max="100"
                            required
                            placeholder="Success grade"
                          ></b-form-input>

                        </b-form-group>

                        <b-form-group
                          id="input-group-18"
                          label="Quiz time :"
                          label-for="input-1"
                          description="Here, type quiz time in minutes (0 for no time and max 300)"
                        >
                          <b-form-input
                            id="input-18"
                            :value="getEditQuizItemQuizTime"
                            @input="setEditQuizItemQuizTime"
                            type="number"
                            min="0"
                            max="300"
                            required
                            placeholder="Success grade"
                          ></b-form-input>

                        </b-form-group>

                        <b-form-group
                          id="input-group-19"
                          label="Quiz swipe direction"
                          label-for="input-1"
                          description="this option let you determine the quiz swipe direction"
                        >
                          <b-form-select
                            :value="getEditQuizItemSwipeDirection"
                            @input="setEditQuizItemSwipeDirection"
                            :options="options"
                            class="mb-3"
                            value-field="item"
                            text-field="name"
                          ></b-form-select>
                        </b-form-group>

                        <b-form-group
                          id="input-group-20"
                          label="Navigation direction"
                          label-for="input-1"
                          description="this option let you determine the navigation direction"
                        >
                          <b-form-select
                            :value="getEditQuizItemNavDirection"
                            @input="setEditQuizItemNavDirection"
                            :options="options"
                            class="mb-3"
                            value-field="item"
                            text-field="name"
                          ></b-form-select>
                        </b-form-group>


                        <b-form-group
                          id="input-group-21"

                        >
                          <b-form-checkbox
                            :checked="getEditQuizItemCheckAnswerWorking"
                            @input="setEditQuizItemCheckAnswerWorking"
                            class="mb-2 mr-sm-2 mb-sm-0"
                          >
                            check Answer working
                          </b-form-checkbox>


                        </b-form-group>

                        <b-form-group
                          id="input-group-22"
                        >
                          <b-form-checkbox
                            :checked="getEditQuizItemSaveResults"
                            @input="setEditQuizItemSaveResults"
                            class="mb-2 mr-sm-2 mb-sm-0"
                          >
                            Save results
                          </b-form-checkbox>

                        </b-form-group>


                        <b-form-group id="input-group-23">
                          <b-form-checkbox
                            :checked="getEditQuizItemShowResults"
                            @input="setEditQuizItemShowResults"
                            class="mb-2 mr-sm-2 mb-sm-0">Show results</b-form-checkbox>
                        </b-form-group>


                        <b-form-group
                          id="input-group-24">
                          <b-button type="submit" variant="primary" >Add</b-button>
                        </b-form-group>




                      </b-form>



                    </div>



                  </div>





                </b-col>
              </b-row>
            </b-container>
          </template>
        </b-carousel-slide>

        <!-- Show add question section index = 5 -->
        <b-carousel-slide>
          <template v-slot:img>
            <b-container>
              <b-row>
                <b-col >

                  <div  style="background: #bbe1fa">
                    <div class="mb-2 quizCard">
                      <span class="h1 mb-2"><b-icon-chevron-compact-left variant="dark" @click="slide = 2" ></b-icon-chevron-compact-left> Questions </span>


                      <b-form
                        @submit.prevent="editQuizToDatabase"
                        style="
                  margin-left: 50px;
                  margin-right: 50px;
                  margin-top: 50px;
                  "
                      >

                        <b-form-group
                          id="input-group-add-question-1"
                          label="Question:"
                          label-for="input-add-question-1"
                          description="You can type your question here !"
                        >
                          <b-form-textarea
                            id="input-add-question-1"
                            type="text"
                            required
                            placeholder="Question"
                          ></b-form-textarea>

                        </b-form-group>




                        <b-form-group
                          id="input-group-add-question-3"
                          label="Answer one:"
                          label-for="input-add-question-3"
                        >

                          <b-form-input
                            id="input-add-question-3"
                            type="text"
                            required
                            placeholder="Answer one"
                          ></b-form-input>

                          <b-form-checkbox v-model="isAnswerOneCorrect" name="check-button" switch>
                            Correct answer
                          </b-form-checkbox>

                        </b-form-group>




                        <b-form-group
                          id="input-group-add-question-4"
                          label="Answer two:"
                          label-for="input-add-question-4"
                        >

                          <b-form-input
                            id="input-add-question-4"
                            type="text"
                            required
                            placeholder="Answer two"
                          ></b-form-input>

                          <b-form-checkbox v-model="isAnswerTwoCorrect" name="check-button" switch>
                            Correct answer
                          </b-form-checkbox>

                        </b-form-group>

                        <b-form-group
                          id="input-group-add-question-5"
                          label="Answer three:"
                          label-for="input-add-question-5"
                        >

                          <b-form-input
                            id="input-add-question-5"
                            type="text"
                            required
                            placeholder="Answer three"
                          ></b-form-input>

                          <b-form-checkbox v-model="isAnswerThreeCorrect" name="check-button" switch>
                            Correct answer
                          </b-form-checkbox>

                        </b-form-group>

                        <b-form-group
                          id="input-group-add-question-6"
                          label="Answer four:"
                          label-for="input-add-question-6"
                        >

                          <b-form-input
                            id="input-add-question-6"
                            type="text"
                            required
                            placeholder="Answer four"
                          ></b-form-input>

                          <b-form-checkbox v-model="isAnswerFourCorrect" name="check-button" switch>
                            Correct answer
                          </b-form-checkbox>

                        </b-form-group>

                        <b-form-group
                          id="input-group-add-question-7"
                          label="Answer five:"
                          label-for="input-add-question-7"
                        >

                          <b-form-input
                            id="input-add-question-7"
                            type="text"
                            required
                            placeholder="Answer five"
                          ></b-form-input>

                          <b-form-checkbox v-model="isAnswerFiveCorrect" name="check-button" switch>
                            Correct answer
                          </b-form-checkbox>

                        </b-form-group>

                      </b-form>


                    </div>



                  </div>





                </b-col>
              </b-row>
            </b-container>
          </template>
        </b-carousel-slide>



      </b-carousel>




      <b-button
        pill
        variant="info"
        v-if="slide === 0"
        @click="addQuiz"
        class="btn floating-action-button ">
        <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
        Add
      </b-button>

      <b-button
        pill
        variant="info"
        @click="addQuestion"
        v-if="slide === 2"
        class="btn floating-action-button ">
        <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
        Add Question
      </b-button>

    </div>
</template>

<script>
import Navbar from '../includes/Navbar';

export default {

  data() {
    return{
      slide : 0,
      sliding: false,
      pageStatus : "showQuiz",
      currentQuizId: "",

      options :[
        {item : "left", name : "Left"},
        {item : "right", name : "Right"}
      ]

    }
  },

  components:{
    Navbar
  },
  computed:{
    getQuizs(){
      return this.$store.getters.getConstructorQuizs;
    },

    getEditQuizItemId(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.id;
    },
    getEditQuizItemName(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.quizName;
    },
    getEditQuizItemDescription(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.quizDescription;
    },
    getEditQuizItemQuestionCount(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.questionCountWanted;
    },
    getEditQuizItemSuccessGrade(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.quizResult;
    },
    getEditQuizItemQuizTime(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.timeInMinutes;
    },
    getEditQuizItemSwipeDirection(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.quizSwipeDirection;
    },
    getEditQuizItemNavDirection(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.quizNavigationDirection;
    },
    getEditQuizItemCheckAnswerWorking(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.checkAnswerWorking;
    },
    getEditQuizItemSaveResults(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.saveResults;
    },
    getEditQuizItemShowResults(){
      if (this.$store.getters.getEditQuizItem === null)return "";
      return this.$store.getters.getEditQuizItem.showResults;
    },
    getQuestions(){
      return this.$store.getters.getQuestions;
    }

  },

  methods:{
    onSlideStart(slide) {
      this.sliding = false
    },
    onSlideEnd(slide) {
      this.sliding = false
    },

    addQuiz(){
      this.$store.dispatch("setEditQuizItem", {})
      this.slide = 4;
    },

    addQuestion(){
      this.$store.dispatch("setQuestionItem", {})
      this.slide = 5
    },

    editQuiz(quiz){
      this.$store.dispatch("setEditQuizItem", null)
      this.$store.dispatch("setEditQuizItem", quiz)
      this.slide = 1;
    },

    editQuizToDatabase(){
      this.$store.dispatch("editQuizToDatabase")
    },

    addNewQuizToDatabase(){
      this.$store.dispatch("addNewQuizToDatabase")
    },

    showQuizsPage(){
      this.slide = 0;
    },

    setEditQuizItemName(value){
      this.$store.dispatch("setEditQuizItemName", value)
    },
    setEditQuizItemDescription(value){
      this.$store.dispatch("setEditQuizItemDescription", value)
    },
    setEditQuizItemQuestionCount(value){
      this.$store.dispatch("setEditQuizItemQuestionCount", value)
    },
    setEditQuizItemSuccessGrade(value){
      this.$store.dispatch("setEditQuizItemSuccessGrade", value)
    },
    setEditQuizItemQuizTime(value){
      this.$store.dispatch("setEditQuizItemQuizTime", value)
    },
    setEditQuizItemSwipeDirection(value){
      this.$store.dispatch("setEditQuizItemSwipeDirection", value)
    },
    setEditQuizItemNavDirection(value){
      this.$store.dispatch("setEditQuizItemNavDirection", value)
    },
    setEditQuizItemCheckAnswerWorking(value){
      this.$store.dispatch("setEditQuizItemCheckAnswerWorking", value)
    },
    setEditQuizItemSaveResults(value){
      this.$store.dispatch("setEditQuizItemSaveResults", value)
    },
    setEditQuizItemShowResults(value){
      this.$store.dispatch("setEditQuizItemShowResults", value)
    },

    showQuestions(quizId){
      this.slide = 2;
      this.currentQuizId = quizId;
      this.$store.dispatch("getFirstQuestions", quizId)
    },
    showStudents(quizId){
      this.slide = 3;
      this.currentQuizId = quizId;
    },

    loadMoreQuestions(quizId){
      this.$store.dispatch("loadMoreQuestions", quizId)
    },

    questionsLoadMore(){
      window.onscroll = () => {
        let bottomOfWindow = document.body.scrollHeight <= (window.top.scrollY + document.body.offsetHeight );

        if (bottomOfWindow && this.slide === 2){
          if (this.$store.getters.getLastQuestionLoaded !== null){
            this.loadMoreQuestions(this.currentQuizId);
          }
        }

      };
    }
  },

  created() {
    if (this.$store.getters.getUser.data !== null) {
      this.$store.dispatch("loadConstructorQuiz", this.$store.getters.getUser.data.id);
    }

    this.questionsLoadMore();

  }

}
</script>

<style scoped>
  .quizCard{
    background: url('~@/assets/bg.png') repeat;
    width: 100%;
    height: 100%;
    margin-top: 10px;
    padding: 10px;
  }

  .floating-action-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }


  .slide-left-leave-active,
  .slide-left-enter-active,
  .slide-right-leave-active,
  .slide-right-enter-active {
    transition: 0.45s;
  }

  .slide-left-enter {
    transform: translate(-100%, 0);
  }

  .slide-right-enter {
    transform: translate(100%, 0);
  }

  .slide-left-leave-to {
    transform: translate(-100%, 0);
  }

  .slide-right-leave-to {
    transform: translate(100%, 0);
  }




</style>
