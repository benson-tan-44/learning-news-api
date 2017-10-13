<template>
  <div>

    <div class="container">
      <div class="jumbotron container-fluid">

      <div style="position:relative" class="header" id="newsApp" v-bind:class="{'open':openSuggestion}">
              Type your source:
              <input type="text"  v-model="source" v-on:click="clearCon" :value="value" @keyup.enter="getSource" @input="updateValue($event.target.value)"   @keydown.enter = 'enter'
          @keydown.down = 'down'
          @keydown.up = 'up'/>


              <ul class="dropdown-menu" style="width:100%">
                 <li v-for="(suggestion, index) in matches"
                     v-bind:class="{'active': isActive(index)}"
                     @click="suggestionClick(index)"
                     >
                   <a href="#">{{ suggestion }}</small>
                   </a>
                 </li>
              </ul>

            <!--  <div v-on:click="getSource" class="btn btn-danger">Go!</div>-->
              <div v-on:click="getRandomSource" class="btn btn-danger">Randomize!</div>

              <div >
                Filter:
              <select v-model="userFilter">
                <option :value="null">None</option>
                <option value="Reverse">Reverse</option>
              </select>

              Posts:
            <select v-model="postAmount">
              <option :value="null">All</option>
              <option value="5">5</option>
            </select>

              </div>


        </div>

    <hr class="my-4">

    <div v-if="displaySource">

      <div v-if="userFilter == 'Reverse'">

        <div v-for="results in reverseItems">


          <div class="newsTitle">  {{results.title}} </div>
            <a target="_blank" v-on:click="getCurrentSource(results)">
            <img :src="results.urlToImage" class="img-responsive" /></a>
          <hr/>


        </div>

      </div>

      <div v-else>
        <div v-for="results in limitedAmount">

          <div class="newsTitle">  {{results.title}} </div>
            <a target="_blank" v-on:click="getCurrentSource(results)">
            <img :src="results.urlToImage" class="img-responsive" /></a>
          <hr/>


        </div>
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

<!--
    <div class="test">
      {{suggestions}}

    </div>
-->



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
      selectedSource: {},
      allSources: [],
      sourcesArray:[],
      suggestions: [],
      userFilter: null,
      open:false,
      current:0,
      value:'',
      selection:'',
      postAmount:null
    }
  },

computed: {

  matches() {

    return this.sourcesArray.filter((array) => {
     return array.indexOf(this.value) >= 0;

  })

  },

  openSuggestion () {
  return this.source !== '' &&
         this.matches.length !== 0 &&
         this.open === true
  },


  reverseItems() {
    var result = this.result.articles.slice().reverse();

    if(this.postAmount === "5") {
      return result.slice(0,5);
    }

    return result;

  },

  limitedAmount() {
    if(this.postAmount == 5) {
      return this.result.articles.slice(0,5);
    } else {
      return this.result.articles;
    }
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

    clearCon: function() {

      if(this.source !== '')
      {
        this.source = '';
      }

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

      var result = this.randomNumber(0,this.allSources.length - 1);


      do{
        result = this.randomNumber(0,this.allSources.length - 1);
      }
      while(this.source == this.allSources[result].id)

         this.source = this.allSources[result].id;
         this.getSource();

   },

   pushSources() {


     for(var i=0; i<this.allSources.length; i++){
       var result = this.allSources[i].id;
       var sugg = this.allSources[i];

       if(result != 'buzzfeed') {
         this.suggestions.push(sugg)

        var conresult= result.replace(/"/g, "");
         this.sourcesArray.push(conresult);
       }
     }


   },

   obtainSourceNames() {
     this.$http.get('https://newsapi.org/v1/sources?language=en').then((response) => {
          this.allSources = response.body.sources;
          this.pushSources();
          this.getRandomSource();
      }, (response) => {
          this.allSources = [];

      });

   },


updateValue (uvalue) {
  if (this.open === false) {
    this.open = true
    this.current = 0
  }
  this.value = uvalue;
},

// When enter key pressed on the input
enter () {
  this.source = this.matches[this.current];
  this.open = false;
  this.getSource();
},

// When up arrow pressed while suggestions are open
up () {
  if (this.current > 0) {
    this.current--;
  }
},

// When down arrow pressed while suggestions are open
down () {
  if (this.current < this.matches.length - 1) {
    this.current++;
  }
},

// For highlighting element
isActive (index) {
  return index === this.current;
},

// When one of the suggestion is clicked
suggestionClick (index) {
this.source = this.matches[index]
  this.open = false;
  this.getSource();
}




 },
created() {
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
    max-width:225px;
    width:100%;
    margin-bottom:3px;
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
