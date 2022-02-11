<script>
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      settings: {
        maxScrollbarLength: 200,
      },
      headerBgVariant: "danger",
      footerBgVariant: "danger",
      logo: null,
      params: {
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        showPin: false,
      },
      loginData: {
        username: "",
        password: "",
      },
      marqueeItems: null,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
    }),
  },
  mounted() {
    this.profile = this.currentUser;
  },
  methods: {
    liveChat() {
      window.open("https://www.livechatinc.com/chat-with/13512381/", "_blank");
      // let param = '{"code":"openbrowser","url":"'+"https://tawk.to/chat/60532f77f7ce182709316438/1f12f2rfg"+'"}';
      // window.postMessage(param, "*");
    },
    shuffle() {
      var currentIndex = this.params.numbers.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this.params.numbers[currentIndex];
        this.params.numbers[currentIndex] = this.params.numbers[randomIndex];
        this.params.numbers[randomIndex] = temporaryValue;
      }
    },
    addCategory: function (e) {
      if (e) e.preventDefault();
      console.log("Submit Success");
      this.login();
    },
    hideSide() {
      this.$refs.sidebar.hide();
    },
  },
};
</script>

<template>
  <div class="footer-mobile">
    <b-row style="padding: 0px; margin: 0px">
      <b-col style="padding: 0px; margin: 0px">
        <b-button block class="button-footer-mobile" :to="{ path: '/mobile' }">
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <svg
              id="svg"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="30"
              height="30"
              viewBox="0, 0, 400,400"
            >
              <g id="svgg">
                <path
                  id="path0"
                  d="M189.599 45.169 C 117.386 108.916,28.986 187.855,28.986 188.593 C 28.986 190.228,45.829 208.759,47.060 208.479 C 47.703 208.332,80.908 179.300,120.851 143.961 C 160.793 108.623,194.896 78.520,196.635 77.066 L 199.798 74.422 275.426 141.559 C 317.021 178.484,351.772 208.696,352.651 208.696 C 353.529 208.696,358.273 204.132,363.192 198.553 L 372.135 188.411 368.955 185.751 C 365.472 182.839,323.323 145.621,252.174 82.633 C 202.563 38.713,201.351 37.681,199.393 37.681 C 198.672 37.681,194.264 41.051,189.599 45.169 M191.044 102.683 C 119.620 165.831,80.322 201.326,79.839 203.127 C 78.677 207.466,79.154 355.544,80.338 357.793 C 82.191 361.313,82.306 361.323,122.947 361.338 L 162.319 361.353 162.319 327.009 L 162.319 292.666 164.690 290.294 L 167.062 287.923 199.517 287.923 L 231.972 287.923 234.343 290.294 L 236.715 292.666 236.715 327.009 L 236.715 361.353 276.570 361.338 C 318.661 361.322,318.146 361.372,319.746 357.164 C 321.163 353.438,321.175 207.238,319.759 203.177 C 318.930 200.800,252.103 140.619,203.737 98.694 C 199.275 94.826,200.293 94.507,191.044 102.683 "
                  stroke="none"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </g>
            </svg>
          </b-row>
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <span style="font-size: 12px; margin-top: 5px">HOME</span>
          </b-row>
        </b-button>
      </b-col>
      <b-col v-if="!isAuthenticated" style="padding: 0px; margin: 0px">
        <b-button
          block
          class="button-footer-mobile"
          @click="$bvModal.show('bv-modal-example')"
        >
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <svg
              id="svg"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="30"
              height="30"
              viewBox="0, 0, 400,400.9661835748792"
            >
              <g id="svgg">
                <path
                  id="path0"
                  d="M184.541 30.456 C 114.842 44.759,87.095 139.142,134.991 199.004 C 162.861 233.837,209.904 241.161,246.469 216.359 C 330.247 159.531,280.678 10.728,184.541 30.456 M113.527 254.821 C 20.792 304.747,28.672 297.231,29.178 335.271 L 29.469 357.163 32.376 361.862 C 34.439 365.197,36.675 367.277,40.080 369.029 L 44.876 371.498 200.457 371.498 L 356.039 371.498 360.158 369.297 C 370.124 363.974,372.379 356.422,371.739 330.519 C 371.010 301.038,370.082 299.776,335.266 280.970 C 245.258 232.350,253.005 235.637,241.231 241.077 C 215.904 252.779,188.027 253.076,161.504 241.928 C 147.250 235.937,149.952 235.211,113.527 254.821 "
                  stroke="none"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </g>
            </svg>
          </b-row>
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <span style="font-size: 12px; margin-top: 5px">ACCOUNT</span>
          </b-row>
        </b-button>
      </b-col>
      <b-col v-if="isAuthenticated" style="padding: 0px; margin: 0px">
        <b-button
          block
          class="button-footer-mobile"
          :to="{ name: 'MobileProfile' }"
        >
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <svg
              id="svg"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="30"
              height="30"
              viewBox="0, 0, 400,400.9661835748792"
            >
              <g id="svgg">
                <path
                  id="path0"
                  d="M184.541 30.456 C 114.842 44.759,87.095 139.142,134.991 199.004 C 162.861 233.837,209.904 241.161,246.469 216.359 C 330.247 159.531,280.678 10.728,184.541 30.456 M113.527 254.821 C 20.792 304.747,28.672 297.231,29.178 335.271 L 29.469 357.163 32.376 361.862 C 34.439 365.197,36.675 367.277,40.080 369.029 L 44.876 371.498 200.457 371.498 L 356.039 371.498 360.158 369.297 C 370.124 363.974,372.379 356.422,371.739 330.519 C 371.010 301.038,370.082 299.776,335.266 280.970 C 245.258 232.350,253.005 235.637,241.231 241.077 C 215.904 252.779,188.027 253.076,161.504 241.928 C 147.250 235.937,149.952 235.211,113.527 254.821 "
                  stroke="none"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </g>
            </svg>
          </b-row>
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <span style="font-size: 12px; margin-top: 5px">ACCOUNT</span>
          </b-row>
        </b-button>
      </b-col>
      <b-col style="padding: 0px; margin: 0px">
        <b-button block class="button-footer-mobile-2" target="_blank">
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <svg
              id="svg"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="30"
              height="30"
              viewBox="0, 0, 400,400.9661835748792"
            >
              <g id="svgg">
                <path
                  id="path0"
                  d="M189.372 28.086 C 120.430 31.647,58.938 78.978,37.254 145.172 C 24.737 183.383,26.456 229.087,41.745 264.616 C 47.368 277.683,47.325 278.280,37.387 324.994 C 28.133 368.490,28.165 368.261,30.918 371.014 C 33.927 374.023,36.566 373.610,80.290 363.285 C 126.925 352.272,123.443 352.735,131.730 356.453 C 229.083 400.132,345.866 339.940,368.118 234.614 C 389.026 135.653,315.909 35.025,218.357 28.506 C 213.841 28.204,208.406 27.834,206.280 27.685 C 204.155 27.535,196.546 27.715,189.372 28.086 M213.323 66.718 C 327.384 79.086,374.003 218.121,290.337 296.399 C 249.884 334.247,191.478 342.587,140.440 317.803 C 128.315 311.915,128.582 311.915,104.231 317.808 C 78.649 323.999,77.295 324.237,77.295 322.536 C 77.295 321.793,79.469 310.782,82.126 298.068 C 88.023 269.844,88.026 271.662,82.063 259.778 C 34.819 165.634,109.710 55.482,213.323 66.718 M138.647 117.080 C 101.760 137.684,106.162 185.663,149.056 230.551 C 203.683 287.716,261.362 299.408,288.319 258.780 C 298.429 243.542,294.482 238.472,266.214 230.383 C 243.126 223.776,243.280 223.760,232.400 233.848 C 221.990 243.500,219.168 243.106,199.714 229.275 C 188.265 221.135,164.257 197.020,161.041 190.429 C 157.877 183.943,158.233 182.174,164.399 173.776 C 172.934 162.150,172.934 162.141,163.208 139.961 C 153.075 116.852,147.821 111.956,138.647 117.080 "
                  stroke="none"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </g>
            </svg>
          </b-row>
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <span style="font-size: 12px; margin-top: 5px">WHATSAPP</span>
          </b-row>
        </b-button>
      </b-col>
      <b-col style="padding: 0px; margin: 0px">
        <b-button block class="button-footer-mobile-2" @click="liveChat()">
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <svg
              id="svg"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="30"
              height="30"
              viewBox="0, 0, 400,400.9661835748792"
            >
              <g id="svgg">
                <path
                  id="path0"
                  d="M38.901 61.804 C 36.093 63.079,33.892 65.105,31.896 68.252 L 28.986 72.842 28.986 145.411 L 28.986 217.979 31.829 222.463 C 36.491 229.815,38.282 230.362,59.498 230.918 L 77.933 231.401 65.103 254.589 C 58.047 267.343,52.662 277.915,53.137 278.082 C 54.443 278.543,55.776 277.753,94.203 253.740 L 129.952 231.401 198.068 230.918 C 273.284 230.384,269.187 230.743,274.678 224.217 C 279.031 219.044,279.229 215.594,279.203 145.122 C 279.175 66.500,279.207 66.737,268.228 61.752 C 261.936 58.895,45.202 58.944,38.901 61.804 M292.754 133.816 L 292.754 145.894 320.290 145.894 L 347.826 145.894 347.826 207.246 L 347.826 268.599 262.319 268.599 L 176.812 268.599 176.797 258.696 C 176.777 245.496,177.236 245.960,163.805 245.569 L 152.657 245.244 152.657 261.207 C 152.657 277.856,153.092 280.275,157.141 286.161 C 162.126 293.407,160.415 293.202,218.579 293.525 L 270.492 293.813 308.189 317.438 C 328.922 330.432,346.105 341.063,346.373 341.063 C 347.811 341.063,345.784 336.831,334.783 316.870 C 328.140 304.818,322.705 294.726,322.705 294.444 C 322.705 294.162,330.640 293.773,340.338 293.580 C 361.278 293.162,364.641 291.968,369.372 283.275 L 371.981 278.482 371.981 207.802 C 371.981 113.582,376.576 121.739,323.496 121.739 L 292.754 121.739 292.754 133.816 M105.451 124.793 C 107.509 125.410,110.944 127.413,113.084 129.244 C 132.129 145.546,112.945 175.408,90.225 164.829 C 66.448 153.758,80.326 117.265,105.451 124.793 M159.343 124.615 C 170.051 127.686,177.056 139.187,174.755 149.918 C 170.669 168.969,145.522 173.201,135.507 156.523 C 125.543 139.929,140.928 119.334,159.343 124.615 M219.191 127.264 C 234.245 136.572,232.698 157.759,216.425 165.136 C 202.566 171.420,186.516 160.835,186.516 145.411 C 186.516 128.740,204.986 118.482,219.191 127.264 "
                  stroke="none"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </g>
            </svg>
          </b-row>
          <b-row
            style="padding: 0px; margin: 0px"
            class="center text-center"
            align-h="center"
            align-v="center"
          >
            <span style="font-size: 12px; margin-top: 5px">LIVE CHAT</span>
          </b-row>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>