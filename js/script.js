var app = new Vue({
  el: "#root",
  data: {
    searchInput: "",
    searchOutput: [],
  },
  methods: {
    search() {
      console.log(this.searchInput);
    },
  },
  updated() {
    // ---
    // Getting results from the API
    // ---
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=3a6caca7bf93b48956ef86189295e101&language=en-US&page=1&include_adult=false&query=${this.searchInput}`
      )
      .then((response) => {
        const res = response.data.results;
        this.searchOutput = res;
      });
  },
});
