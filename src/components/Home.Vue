<template>
  <div>

    <div class="container">
      <div class="jumbotron container-fluid">




      <div class="header" id="newsApp">
              select your source:
              <select v-on:change="getSource" v-model="source">
                <option value="buzzfeed">Buzzfeed</option>
                <option value="cnn">CNN</option>
              </select>

        </div>

    <hr class="my-4">

    <div v-if="displaySource">
        <div v-for="results in result.articles">

        <div class="newsTitle">  {{results.title}} </div>


          <a target="_blank" v-on:click="getCurrentSource"><img :src="results.urlToImage" class="img-responsive" /></a>

        <!--  {{results.description}} -->
          <hr/>




        </div>

    </div>

    <div v-if="singleSource">

      Test Kevin is gay and has a foot fetish

      <p v-on:click="backSource">Back to Results</p>

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
      apiKey: '865694353a2548b79f33e7450d00ec13',
      result: [],
      displaySource: false,
      sort: 'top',
      source: '',
      singleSource: false
    }
  },


  methods: {
    getSource: function()
    {
        return this.$http.get('https://newsapi.org/v1/articles?source=' + this.source  + '&sortBy=' + this.sort + '&apiKey=' + this.apiKey).then((response) => {
            this.result = response.body;
            this.displaySource = true;
        }, (response) => {
            this.result = [];
        });
    },

    getCurrentSource: function()
    {
     this.displaySource = false;
     this.singleSource = true;
   },

   backSource: function() {
     this.displaySource = true;
     this.singleSource = false;
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

.header{
  font-family: 'Lato', sans-serif;
  text-transform:uppercase;
  font-weight:400;
}

.newsTitle{
  font-size:1.2em;
}
</style>
