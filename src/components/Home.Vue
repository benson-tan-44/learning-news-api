<template>
  <div>

    <div class="container">
      <div class="jumbotron container-fluid">

      <div class="header" id="newsApp">
              select your source:
              <select v-on:change="getSource" v-model="source">
                <option value="bloomberg">Bloomberg</option>
                <option value="cnn">CNN</option>
                <option value="espn">ESPN</option>
              </select>

              <div v-on:click="getRandomSource" class="btn btn-danger">Randomize!</div>

        </div>

    <hr class="my-4">

    <div v-if="displaySource">
        <div v-for="results in result.articles">

        <div class="newsTitle">  {{results.title}} </div>

          <a target="_blank" v-on:click="getCurrentSource(results)">
            <img :src="results.urlToImage" class="img-responsive" /></a>

        <!--  {{results.description}} -->
          <hr/>

        </div>

    </div>

    <div v-if="singleSource">
      <div class="row row-padder">


          <img :src="selectedSource.image" class="img-responsive" />

          <div class="newsTitle underline"> {{selectedSource.title}} </div>

          <span v-if="selectedSource.published != '' ">
            <div class="published">{{selectedSource.published | formatDate }} by {{selectedSource.author}}</div>
          </span>

          <div class="newsDesc"> {{selectedSource.description}}</div>

          <hr />

          <div class="btn btn-danger"><a target="_blank" :href="selectedSource.url" >Read More</a></div>
          <div class="btn btn-danger" v-on:click="backSource">Back to Results</div>


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
      availableSources: ['cnn', 'bloomberg', 'espn'],
      apiKey: '865694353a2548b79f33e7450d00ec13',
      result: [],
      displaySource: false,
      sort: 'top',
      source: '',
      singleSource: false,
      selectedSource: {}
    }
  },


  methods: {
    getSource: function()
    {
        return this.$http.get('https://newsapi.org/v1/articles?source=' + this.source  + '&sortBy=' + this.sort + '&apiKey=' + this.apiKey).then((response) => {
            this.result = response.body;
            this.displaySource = true;
            this.singleSource = false;
        }, (response) => {
            this.result = [];

        });

    },

    getCurrentSource: function(results)
    {
     this.displaySource = false;
     this.singleSource = true;
     this.selectedSource = {
       author: results.author,
       title: results.title,
       description: results.description,
       image: results.urlToImage,
       published: results.publishedAt,
       url: results.url,
     }
   },

  randomNumber: function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
  },

   backSource: function() {
     this.displaySource = true;
     this.singleSource = false;
   },

   getRandomSource: function() {

      var result = this.randomNumber(0,2);

      do{
        result = this.randomNumber(0,2);
      }
      while(this.source == this.availableSources[result])

         this.source = this.availableSources[result];
         this.getSource();

   },

   obtainSourceNames() {
     this.$http.get('https://newsapi.org/v1/sources?language=en').then((response) => {
          this.allSources = response.body;
          this.pushSources();
      }, (response) => {
          this.allSources = [];
      });

   }



 },
 mounted() {
   this.getRandomSource();
   this.obtainSourceNames();
 }


}




</script>

<style>

button, input, select, textarea {
    font-family: inherit;
    font-size: 16px;
    line-height: inherit;
    padding: 6px;
    text-transform: uppercase;
    vertical-align: middle;
}

.row-padder{
  padding-left:10px;
  padding-right:10px;
}

.published{
  font-size:14px;
  text-transform:uppercase;
}

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
  font-weight:300;
}

.newsTitle{
  font-size:1em;
  text-transform:uppercase;
  font-weight:700;
}

.underline{

}


.newsDesc{
  font-size:0.8em;
  margin-top:2%;
}

.btn-danger{
  border:none;
}


</style>
