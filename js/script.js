var app = new Vue({
  el: "#root",
  data: {
    searchInput: "",
    searchOutput: [],
  },
  methods: {
    search() {
      // ---
      // Copying array of objects from API inside searchOutput array on click if searchInput is NOT empty.
      // ---
      if (this.searchInput.length > 0) {
        // ---
        // Getting results from the API
        // ---
        axios
          .get("https://api.themoviedb.org/3/search/multi", {
            params: {
              api_key: "3a6caca7bf93b48956ef86189295e101",
              language: "it-IT",
              page: "1",
              include_adult: "false",
              query: this.searchInput,
            },
          })
          .then((response) => {
            const res = response.data.results;
            this.searchOutput = res;
            console.log(this.searchOutput);
            this.searchOutput = this.searchOutput.filter(
              (element) => element.media_type != "person"
            );
            console.log(this.searchOutput);
          });
      }
      if (this.searchInput.length == 0) {
        this.searchOutput = "";
      }
      // ---
      // Resetting searchOutput array if searchInput is empty.
      // ---
    },
    overviewItemSlice(index) {
      let overviewItemSliced = this.searchOutput[index].overview;
      overviewItemSliced = overviewItemSliced.slice(0, 70);

      if (overviewItemSliced.length >= 70) {
        overviewItemSliced += "..";
      }

      if (overviewItemSliced.length == 0) {
        overviewItemSliced = "N/A";
      }
      return overviewItemSliced;
    },
  },
  mounted() {},
});
