<template>
  <div>

    <div class="container">
      <div class="jumbotron container-fluid">




          <div id="weatherApp">
  <form v-on:submit.prevent="getData">
      <input type="text" v-model="charServer"/>
      <input type="text" v-model="charName"/>
      <button class="btn btn-primary">Search for Player</button>
  </form>
</div>

    <hr class="my-4">

    <div>
          <p>
          {{result.name}}

          </p>
    </div>


    </div>
  </div>

  </div>
</template>

<script>

export default {

  data: function() {
    return{
      apiKey: '73nc6m85wd37mrws72hp5vavxm9pus98',
      result: [],
      charName: '',
      charServer: ''

    }
  },

  computed: {

  },

  methods: {
    getData: function()
    {
        return this.$http.get('https://us.api.battle.net/wow/character/' + this.charServer +  '/' + this.charName + '?locale=en_US&apikey=' + this.apiKey).then((response) => {
            this.result = response.body;
        }, (response) => {
            this.result = [];

        });
    }
  }




}




</script>

<style>

.loc{
  font-size:32px;
  text-transform:uppercase;
  font-weight:300;
}

.no-margin{
  margin:0px;
}


</style>
