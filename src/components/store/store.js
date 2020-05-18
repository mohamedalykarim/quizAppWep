import Vue from "vue"
import Vuex from "vuex"
import firebase from 'firebase'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
      user:{
        isLogged:false,
        data : null
      },
      constructorQuizs : [],
      questions : [],
      lastQuestionLoaded : null,
      editQuizItem : null,
      questionItem : null

    },
    getters : {
      getUser(state){
        return state.user;
      },

      getConstructorQuizs(state){
        return state.constructorQuizs;
      },

      getEditQuizItem(state){
        return state.editQuizItem;
      },
      getQuestionItem(state){
        return state.questionItem;
      },
      getQuestions(state){
        return state.questions;
      },
      getLastQuestionLoaded(state){
        return state.lastQuestionLoaded;
      }


    },
    mutations:{
      SET_USER_IS_LOGGED(state, value){
        state.user.isLogged = value;
      },

      SET_USER_DATA(state, value){
        state.user.data = value;
      },

      SET_CONSTRUCTOR_QUIZS(state, value){
          state.constructorQuizs = value;
      },

      SET_EDIT_QUIZ_ITEM(state, value){
        state.editQuizItem = value;
      },
      SET_QUESTION_ITEM(state, value){
        state.questionItem = value;
      },
      SET_EDIT_QUIZ_ITEM_NAME(state, value){
        state.editQuizItem.quizName = value;
      },
      SET_EDIT_QUIZ_ITEM_DESCRIPTION(state, value){
        state.editQuizItem.quizDescription = value;
      },
      SET_EDIT_QUIZ_ITEM_QUESTION_COUNT(state, value){
        state.editQuizItem.questionCountWanted = value;
      },
      SET_EDIT_QUIZ_ITEM_SUCCESS_RESULT(state, value){
        state.editQuizItem.quizResult = value;
      },
      SET_EDIT_QUIZ_ITEM_QUIZ_TIME(state, value){
        state.editQuizItem.timeInMinutes = value;
      },
      SET_EDIT_QUIZ_ITEM_SWIPE_DIRECTION(state, value){
        state.editQuizItem.quizSwipeDirection = value;
      },
      SET_EDIT_QUIZ_ITEM_NAV_DIRECTION(state, value){
        state.editQuizItem.quizNavigationDirection = value;
      },
      SET_EDIT_QUIZ_ITEM_CHECK_ANSWER_WORKING(state, value){
        state.editQuizItem.checkAnswerWorking = value;
      },
      SET_EDIT_QUIZ_ITEM_SAVE_RESULTS(state, value){
        state.editQuizItem.saveResults = value;
      },
      SET_EDIT_QUIZ_ITEM_SHOW_RESULTS(state, value){
        state.editQuizItem.showResults = value;
      },
      RESET_QUESTIONS(state, value){
        state.questions = value;
      },
      APPEND_QUESTIONS(state, value){
        state.questions.push(value);
      },
      COPY_LAST_QUESTION(state, value){
        state.lastQuestionLoaded = value;
      },
    },

    actions:{
      setUserLogged({ commit }, payload){
        commit('SET_USER_IS_LOGGED', true);
        commit('SET_USER_DATA', payload);
      },

      setUserNotLogged({ commit }){
        commit('SET_USER_IS_LOGGED', false);
        commit('SET_USER_DATA', null);
      },

      loginByGoogle({ commit }){
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
          prompt: 'select_account'
        });

        firebase.auth().signInWithPopup(provider).then(function(result) {
          const user = result.user;

          const id = user.uid;
          const displayName = user.displayName;
          const isAdmin = true;
          const userName = user.displayName.replace("@gmail.com", "");
          const userData = {
            id,
            displayName,
            userName,
            isAdmin
          };


          firebase.firestore().collection('user').doc(user.uid)
            .get(function(doc){
              if(doc.exists)return;
              firebase.firestore().collection('user').doc(user.uid)
                .set(userData);

              commit('SET_USER_IS_LOGGED', true);
              commit('SET_USER_DATA', userData)


            })

        }).catch(function(error) {
          alert(error);
        });
      },

      getUserData({ commit }, payload){

        firebase.firestore().collection('user').doc(payload)
          .get()
          .then(function(doc){
            if(!doc.exists)return;
            commit('SET_USER_DATA', doc.data());

          });
      },

      logOut({ commit }){

        firebase.auth().signOut();

      },

      loadConstructorQuiz({ commit }, payload){
          firebase.firestore().collection("quiz")
            .where("owner", "==", payload)
            .get()
            .then(
              snapshot => {

                var quizs = [];

                snapshot.forEach(function (doc) {
                  quizs.push({
                    id : doc.data().id,
                    owner : doc.data().owner,
                    checkAnswerWorking : doc.data().checkAnswerWorking,
                    peopleCanAccess : doc.data().peopleCanAccess,
                    questionCountWanted : doc.data().questionCountWanted,
                    quizDescription : doc.data().quizDescription,
                    quizName : doc.data().quizName,
                    quizNavigationDirection : doc.data().quizNavigationDirection,
                    quizResult : doc.data().quizResult,
                    quizSwipeDirection : doc.data().quizSwipeDirection,
                    saveResults : doc.data().saveResults,
                    showResults : doc.data().showResults,
                    timeInMinutes : doc.data().timeInMinutes
                  });
                });
                commit("SET_CONSTRUCTOR_QUIZS", quizs)

              }
            )
            .catch();
      },

      setEditQuizItem ({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM', payload)
      },
      setQuestionItem ({ commit }, payload){
        commit('SET_QUESTION_ITEM', payload)
      },
      setEditQuizItemName ({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_NAME', payload)
      },
      setEditQuizItemDescription ({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_DESCRIPTION', payload)
      },
      setEditQuizItemQuestionCount ({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_QUESTION_COUNT', payload)
      },
      setEditQuizItemSuccessGrade({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_SUCCESS_RESULT', payload)
      },
      setEditQuizItemQuizTime({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_QUIZ_TIME', payload)
      },
      setEditQuizItemSwipeDirection({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_SWIPE_DIRECTION', payload)
      },
      setEditQuizItemNavDirection({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_NAV_DIRECTION', payload)
      },
      setEditQuizItemCheckAnswerWorking({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_CHECK_ANSWER_WORKING', payload)
      },
      setEditQuizItemSaveResults({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_SAVE_RESULTS', payload)
      },
      setEditQuizItemShowResults({ commit }, payload){
        commit('SET_EDIT_QUIZ_ITEM_SHOW_RESULTS', payload)
      },

      editQuizToDatabase({ commit }){
        firebase.firestore().collection("quiz")
          .doc(this.state.editQuizItem.id)
          .update(this.state.editQuizItem)
          .then(event =>{

            this.state.constructorQuizs.forEach((element, index) => {
              if(element.id === this.state.editQuizItem.id) {
                items[index] = this.state.editQuizItem;
              }
            });

          })
          .catch(error =>{
            console.log(error)
          });

      },

      addNewQuizToDatabase({ commit }){
        const id = firebase.firestore().collection("quiz").doc().id;
        this.state.editQuizItem.id = id;
        this.state.editQuizItem.peopleCanAccess = [];
        this.state.editQuizItem.owner = this.state.user.data.id;

        firebase.firestore().collection("quiz")
          .doc(id)
          .set(this.state.editQuizItem)
          .then(event =>{
            this.state.constructorQuizs.push(this.state.editQuizItem)
          })
          .catch(error =>{
            console.log(error)
          });

      },

      getFirstQuestions({ commit }, payload){
        commit("RESET_QUESTIONS", []);
        firebase.firestore().collection("quiz").doc(payload).collection("question")
          .orderBy("id")
          .startAt(0)
          .limit(5)
          .get()
          .then(documents =>{

            if (documents.docs.length > 0){
              commit("COPY_LAST_QUESTION", documents.docs[documents.docs.length - 1])
            }

            documents.docs.forEach((element, index) =>{
              commit("APPEND_QUESTIONS", {
                id: element.data().id,
                questionText : element.data().questionText,
                questionAnswers : element.data().questionAnswers
              });

            });

            console.log(documents.docs.length);
          })
          .catch();
      },

      loadMoreQuestions({ commit }, payload){
        if (this.state.lastQuestionLoaded === null)return;
        firebase.firestore().collection("quiz").doc(payload).collection("question")
          .orderBy("id")
          .startAfter(this.state.lastQuestionLoaded)
          .limit(3)
          .get()
          .then(documents =>{

            if (documents.docs.length > 0){
              commit("COPY_LAST_QUESTION", documents.docs[documents.docs.length - 1])
            }

            if (documents.empty){
              commit("COPY_LAST_QUESTION", null)
            }



            documents.docs.forEach((element, index) =>{
              commit("APPEND_QUESTIONS", {
                id: element.data().id,
                questionText : element.data().questionText,
                questionAnswers : element.data().questionAnswers
              });

            });

            console.log(documents.docs.length);
          })
          .catch();
      }
    }
});
