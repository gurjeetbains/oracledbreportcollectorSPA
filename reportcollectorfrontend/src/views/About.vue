<template>
  <div class="container">
    <Jumbotron msg="Extract results from Backend"></Jumbotron>
    <div class="row">
      <div class="col-12">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </p>
        <form class="form-group">
          <div class="form-group">
            <label for="toDate">StartTime</label>
            <input type="datetime-local"
                   class="form-control"
                   id="toDate"
                   v-model="StartPeriod"
                   required>
          </div>
          <div class="form-group">
            <label for="fromDate">EndTime</label>
            <input type="datetime-local"
                   class="form-control"
                   id="fromDate"
                   v-model="EndPeriod"
                   required>
          </div>
          <div class="form-group">
            <label for="filename">File Name</label>
            <input type="input"
                   class="form-control"
                   id="filename"
                   v-model="FileName"
                   placeholder="RunID-TestName-SteadyState"
                   required>
          </div>
          <div class="form-group col-12">
            <button type="button" class="btn btn-primary" @click="getData">Extract Reports</button>
          </div>
        </form>
        </div>
      </div>
        <div class="row" v-show="ShowDownload">
          <div class="col 12">
            <div class="card">
              <div class="card-header">
                Download Information
              </div>
              <div class="card-body">
                <blockquote
                    class="blockquote mb-0">
                  <p>Your file will auto download when data is extracted from backend.
                     Till then enjoy.</p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-show="DownloadComplete">
          <div class="col 12">
            <div class="card">
              <div class="card-header">
                Download Information
              </div>
              <div class="card-body">
                <blockquote
                    class="blockquote mb-0">
                  <p>Download is complete. Please check the file.</p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Jumbotron from '@/components/Jumbotron.vue';
import axios from 'axios';
import XLSX from 'xlsx';

export default {
  name: 'about',
  data() {
    return {
      StartPeriod: null,
      EndPeriod: null,
      FileName: null,
      ShowDownload: false,
      DownloadComplete: false,
      errors: [],
    };
  },
  components: {
    Jumbotron,
  },
  methods: {
    checkForm() {
      if (this.StartPeriod && this.EndPeriod && this.FileName) {
        return true;
      }
      this.errors = [];
      if (!this.StartPeriod) {
        this.errors.push('StartPeriod required.');
      }
      if (!this.EndPeriod) {
        this.errors.push('EndPeriod required.');
      }
      if (!this.FileName) {
        this.errors.push('FileName required.');
      }
      return false;
    },
    getData(event) {
      if (this.checkForm(event)) {
        this.errors = [];
        this.ShowDownload = true;
        axios.post('http://localhost:4000/extractdata', {
          StartPeriod: this.StartPeriod,
          EndPeriod: this.EndPeriod,
        }).then((response) => {
          this.ShowDownload = false;
          XLSX.writeFile(response.data, `${this.FileName}.xlsx`);
          this.DownloadComplete = true;
        }).catch((e) => {
          console.log(e);
        });
      }
    },
  },
};
</script>
<style scoped>
  [type="datetime-local"] {
  background:#fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)  97% 50% no-repeat ;
  width: 40%;
  }
  [type="datetime-local"]::-webkit-inner-spin-button {
  display: none;
  }
  [type="datetime-local"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  }
  input {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
  margin: auto;
  width: 50%;
  }
  button{
    margin:3% auto;
  }
  li{
    list-style: none;
  }
</style>
