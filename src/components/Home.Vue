<template>
  <div>

    <div class="container">
      <div class="jumbotron container-fluid">




      <div id="weatherApp">
            <form v-on:submit.prevent="getSource">
              <button v-on:click="toggleSource" class="btn btn-primary">Display</button>
            </form>
        </div>

    <hr class="my-4">

    <div v-if="displaySource">
        <div v-for="results in result.articles">

          {{results.title}}
          <img :src="results.urlToImage" class="img-responsive" />
          <hr/>




        </div>



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
      apiKey: '8ffa9387a9c04a03bd31dca865d38f31',
      result: [],
      displaySource: false,
      sort: 'top',
      source: 'cnn'
    }
  },

  computed: {

  },


  methods: {
    getSource: function()
    {
        return this.$http.get('https://newsapi.org/v1/articles?source=' + this.source  + '&sortBy=' + this.sort + '&apiKey=' + this.apiKey).then((response) => {
            this.result = response.body;
        }, (response) => {
            this.result = [];
        });
    },

    toggleSource: function()
    {
      if(this.displaySource == false){
        this.displaySource = true;
      } else {
        this.displaySource = false;
      }


    }



  }


}




</script>

<style>
ul{
  list-style-type: none;
}

.loc{
  font-size:32px;
  text-transform:uppercase;
  font-weight:300;
}

.no-margin{
  margin:0px;
}


</style>
