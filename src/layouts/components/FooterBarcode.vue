<script>
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      publicPath: process.env.BASE_URL,
      settings: {
        maxScrollbarLength: 200,
      },
      headerBgVariant: "danger",
      footerBgVariant: "danger",
      logo: null,
      marqueeItems: null,
      visible: false,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
    }),
  },
  mounted() {
    this.visible = true;
  },
  methods: {
    onHidden() {
      this.visible = false;
    },
    onDownload() {
      this.$refs.goTo.click();
    },
  },
};
</script>

