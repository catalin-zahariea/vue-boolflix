var app = new Vue({
  el: "#root",
  data: {
    searchInput: "",
    searchOutput: [],
    searchNoResult: "",
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
            // ---
            // Filtering out objects with media_type == "person" from searchOutput array.
            // searchOut array will contain only objects with media_type == "movie" || media_type == "tv".
            // ---
            this.searchOutput = this.searchOutput.filter(
              (element) => element.media_type != "person"
            );
            console.log(this.searchOutput);
          });
      }
      // ---
      // Emptying searchOutput array when searchInput length == 0.
      // ---
      if (this.searchInput.length == 0) {
        this.searchOutput = "";
      }
      // ---
      // Displaying error message when searchInput >= 1 and searchOutput is empty.
      // ---
      if (this.searchOutput.length == 0 && this.searchInput.length >= 1) {
        this.searchNoResult = "Non abbiamo trovato quello che cercavi";
      } else {
        // ---
        // Resetting error message when searchInput == 0.
        // ---
        this.searchNoResult = "";
      }
    },

    searchCast() {},

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
