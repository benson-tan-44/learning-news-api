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


          <a target="_blank" v-on:click="getCurrentSource(results.author, results.title, results.description, results.urlToImage, results.publishedAt, results.url)">
            <img :src="results.urlToImage" class="img-responsive" /></a>

        <!--  {{results.description}} -->
          <hr/>




        </div>

    </div>

    <div v-if="singleSource">
      <div class="row">
        <div class="col-md-7">

          <img :src="selectedSource.image" class="img-responsive" />
        </div>

        <div class="col-md-5">
          <div class="newsTitle underline"> {{selectedSource.title}} </div>
          <div class="newsDesc"> {{selectedSource.description}}</div>
          <div class="published">{{selectedSource.published | formatDate }}</div>
          <button class="btn btn-danger"><a target="_blank" :href="selectedSource.url" >Read More</a></button>
          <button class="btn btn-danger" v-on:click="backSource">Back to Results</button>
        </div>

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

    getCurrentSource: function(author, title, description, image, published, url )
    {
     this.displaySource = false;
     this.singleSource = true;
     this.selectedSource = {
       author: author,
       title: title,
       description: description,
       image: image,
       published: published,
       url: url
     }
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
  font-weight:300;
}

.newsTitle{
  font-size:1em;
}

.underline{
  text-decoration:underline;
}


.newsDesc{
  font-size:0.8em;
}

.btn-danger{
  border:none;
}


</style>
