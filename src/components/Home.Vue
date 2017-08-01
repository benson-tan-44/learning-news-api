<template>
  <div>

    <div class="container">
      <div class="jumbotron container-fluid">




          <div id="weatherApp">
            <form v-on:submit.prevent="getPets">
      Server:
      <input type="text" v-model="charServer"/>
      Character:
      <input type="text" v-model="charName"/>
      <button class="btn btn-primary">Search Pets</button>
          </form>
</div>

    <hr class="my-4">

    <div v-for="results in result">


    <div v-for="pets in results.collected">

        {{pets.name}}
            {{pets.icon}}


    </div>



</table>



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
      charServer: '',
      displayData: false
    }
  },

  methods: {
    getPets: function()
    {
        return this.$http.get('https://us.api.battle.net/wow/character/' + this.charServer +  '/' + this.charName + '?fields=pets&' + 'locale=en_US&apikey=' + this.apiKey).then((response) => {
            this.result = response.body;
            this.displayData = true;
        }, (response) => {
            this.result = [];
            this.displayData = false;
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
