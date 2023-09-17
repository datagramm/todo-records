<template>
<div class="page1">
  <div class="wrap">
  <textarea v-model="patients" rows="30" placeholder="patients"></textarea>
  <textarea v-model="doctors" rows="30" placeholder="doctors" ></textarea>
  <textarea v-model="appointments" rows="30" placeholder="appointments"></textarea>
    </div>

  <div class="wrap">
    <input type="button" value="send data" @click="showTooltip=true; sendPatients({patients})">
    <input type="button" value="clear database">
  </div>

  <div v-show="showTooltip" class="tooltip">

    <div v-show="getAllPatients.successfulPatients.length !== 0" class="successful patients">
      <h3>Successful patients</h3>
      <h4 v-for="patient in getAllPatients.successfulPatients" v-bind:key="patient">{{patient.patientInfo}}</h4>

    </div>

    <div v-show="getAllPatients.wrongFormatPatients.length !== 0" class="wrong patients">
      <h3>Wrong format patients</h3>
      <div class="wrong patient" v-for="patient in getAllPatients.wrongFormatPatients" v-bind:key="patient">
        <h4>{{patient.patientInfo}}:</h4>
        <h4 style="color: red" v-for="wrongInfo in patient.patientWrongInfo" v-bind:key="wrongInfo">{{wrongInfo}}</h4>
      </div>

    </div>
    <input type="button" value="close" @click="showTooltip=false;">
  </div>


</div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "pageOne",
  data() {
    return {
      patients: '',
      doctors: '',
      appointments: '',
      showTooltip: false,

    }
  },
  methods: {
    ...mapActions(['sendPatients'])
  },
  computed: mapGetters(['getAllPatients'])
}
</script>

<style scoped>
  .page1 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .page1 > .wrap{
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
  }

  textarea {
    resize: none;
    border-radius: 10px;
    border: 1px solid black;
    width: 100%;
    height: 100%;
  }
  .tooltip {
    box-sizing: border-box;
    padding: 10px;
    background-color: white;
    width: 70%;
    min-height: 100px;
    border: 2px solid black;
    border-radius: 10px;
    position: fixed;

  }
  .tooltip > input {
    position: absolute;
    right: 10px;
  }

  .patients {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .patient {
    display: flex;
  }


</style>