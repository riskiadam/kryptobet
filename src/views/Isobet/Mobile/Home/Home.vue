<script>
import Vue from "vue";
import apiService from "@/services/api.service";
import { GET_LOBBY_PRODUCT } from "@/store/constants/actions.type";
import VueNumber from "vue-number-animation";
import { mapState } from "vuex";
import Carousel from "@/layouts/components/Carousel.vue";
import BaseLayout from "@/layouts/BaseLayout";
import MenuMobile from "@/layouts/components/MenuMobile.vue";

Vue.use(VueNumber);

export default {
  name: "HomeMobile",
  head: {
    link: [{ rel: "canonical", href: "http://158.255.47.199/mobile" }],
  },
  components: {
    Carousel,
    MenuMobile,
    BaseLayout,
  },
  data() {
    return {
      counter: "05",
      counter1: "08",
      data: "",
      rulesData: {
        content: "",
      },
      isGameLoading: false,
      isValue: false,
      gamesProducts: [],
      gamesCode: null,
      gameList: [],
      someList: [
        {
          html: "slide1",
          style: {
            background: "#1bbc9b",
          },
        },
        {
          html: "slide2",
          style: {
            background: "#4bbfc3",
          },
        },
        {
          html: "slide3",
          style: {
            background: "#7baabe",
          },
        },
      ],
      options: {
        currentPage: 0,
        speed: 300,
        autoplay: "2000",
        itemAnimation: true,
        centeredSlides: false,
        thresholdDistance: 100,
        thresholdTime: 300,
        loopedSlides: 20,
        slidesToScroll: 1,
        loop: true,
        direction: "vertical",
        pagination: false,
      },
      options2: {
        currentPage: 0,
        autoplay: "7000",
        loop: true,
        loopedSlides: 10,
        itemAnimation: true,
        effect: "slide",
        timingFunction: "ease",
        pagination: true,
        centeredSlides: false,
      },
      info: null,
      linkGames: "",
    };
  },
  mounted() {
    // this.loadRules();
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      currentUser: (state) => state.me.loggedInUser,
    }),
  },
  methods: {
    theFormat(number) {
      return `IDR 63.170.${number.toFixed(2)}`;
    },
    theFormat2(number) {
      return `IDR ${number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    loadRules() {
      this.changeLoader(true);
      this.ApiService.get("configuration/rules")
        .then((resp) => {
          this.rulesData = resp.data;
          console.log(this.rulesData);
        })
        .finally(() => {
          this.changeLoader(false);
        });
    },
    play(category, code) {
      if (this.isAuthenticated) {
        let deviceType = "d";

        if (navigator.platform == "iPhone" || navigator.platform == "iPad") {
          deviceType = "m";
        } else {
          let userAgent = navigator.userAgent;
          let match = userAgent.match(/Android/g);
          if (match === null) {
            deviceType = "d";
          } else {
            deviceType = "m";
          }
        }

        apiService
          .get("games/lobby/SBOWin/" + category + "/" + code + "/" + deviceType)
          .then((resp) => {
            let data = resp.data;
            window.open(data.Target, "_blank");

            // if (code == "KN") {
            //   window.open("/widget.html?token=" + data.Data + "&lang=id");
            // } else if (code == "PPL") {
            //   window.open(data.Metadata, "_blank");
            // } else {
            //   window.open(data.Data, "_blank");
            // }
          })
          .catch((error) => {
            Vue.notify({
              group: "ErrorMessage",
              title: "Kesalahan Terjadi",
              text: error,
              type: "error",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
          })
          .finally(() => {
            //this.isLoading = false;
          });
      } else {
        // this.showMessage("Please login first to play", "error");
        Vue.notify({
          group: "ErrorMessage",
          title: "Kesalahan Terjadi",
          text: "Please Login first to play",
          type: "error",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
      }
    },
    showGames(code, link) {
      this.isGameLoading = true;
      this.gamesCode = code;
      this.lobbyUrl = link;
      this.$notify({
        group: "errormaintenance",
        title: "WE ARE VERY SORRY",
        text: "This game is under maintenance!",
        type: "error",
        closeOnClick: true,
        max: 1,
        ignoreDuplicates: true,
      });
      this.isGameLoading = false;
    },
    playGamesProduct(gameId, providerCode, vendor = "TrillionGaming") {
      if (!this.isAuthenticated) {
        this.$notify({
          group: "firstlogin",
          title: "INFORMATION",
          text: "Harap Login terlebih dahulu!",
          type: "warn",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
        return false;
      }

      this.showLoading = true;
      let code = providerCode;

      if (vendor == undefined) vendor = "TrillionGaming";

      if (this.isAuthenticated) {
        let deviceType = "d";

        if (navigator.platform == "iPhone" || navigator.platform == "iPad") {
          deviceType = "m";
        } else {
          let userAgent = navigator.userAgent;
          let match = userAgent.match(/Android/g);
          if (match === null) {
            deviceType = "d";
          } else {
            deviceType = "m";
          }
        }

        this.$store
          .dispatch(GET_LOBBY_PRODUCT, {
            vendor: vendor,
            gamesCode: code,
            productCode: gameId,
            deviceType: deviceType,
          })
          .then((data) => {
            if (vendor == "TrillionGaming") {
              if (code == "PPL" || code == "MX") {
                window.open(data.Metadata, "_blank");
              } else {
                window.open(
                  "/trg.html?payload=" +
                    encodeURIComponent(data.Payload) +
                    "&target=" +
                    encodeURIComponent(data.Target)
                );
              }
            } else {
              console.log(data);
              window.open(
                "/trg.html?payload=" +
                  encodeURIComponent(data.Payload) +
                  "&target=" +
                  encodeURIComponent(data.Target)
              );
            }
          })
          .catch((error) => {
            this.$notify({
              group: "errorgames",
              title: "KESALAHAN TERJADI",
              text: error,
              type: "error",
              closeOnClick: true,
              max: 1,
              ignoreDuplicates: true,
            });
            this.showLoading = false;
          })
          .finally(() => {
            this.showLoading = false;
          });
      } else {
        this.$notify({
          group: "firstlogin",
          title: "INFORMATION",
          text: "Harap Login terlebih dahulu!",
          type: "warn",
          closeOnClick: true,
          max: 1,
          ignoreDuplicates: true,
        });
      }
    },
    showGamesMaintenance() {
      this.isGameLoading = true;
      this.$notify({
        group: "errormaintenance",
        title: "WE ARE VERY SORRY",
        text: "This game is under maintenance!",
        type: "error",
        closeOnClick: true,
        max: 1,
        ignoreDuplicates: true,
      });
      this.isGameLoading = false;
    },
    notify() {
      this.$notify({
        group: "foo",
        type: "success",
        title: "Important message",
        text: "Hello user! This is a notification!",
      });
    },
  },
};
</script>

<template>
  <BaseLayout>
    <div class="home">
      <Carousel />
      <div
        class="
          MobileHome
          center
          text-center
          align-center
          justify-content-center
        "
        style="color: white; padding: 0px; margin: 0px"
      >
        <MenuMobile />
        <b-row
          class="center text-center align-center justify-content-center"
          style="
            padding: 0px 5px;
            margin: 0px;
            margin-top: 10px;
            width: 100%;
            height: auto;
          "
          align-h="center"
          align-v="center"
        >
          <b-col cols="4" style="padding: 0px; margin: 0px">
            <img
              loading="lazy"
              style="width: 100%; border-radius: 0px"
              src="images/animation.png"
            />
          </b-col>
          <b-col cols="8" style="padding: 0px; margin: 0px">
            <div
              class="position-relative center"
              style="width: 100%; margin: 0px; padding: 0px"
            >
              <div
                style="padding: 0px; margin: 0px; width: 100%"
                align-h="center"
              >
                <img
                  loading="lazy"
                  style="width: 100%; border-radius: 0px"
                  src="images/animation.gif"
                />
                <div class="position-absolute animation-text" align-h="center">
                  <number
                    ref="number1"
                    :from="6617312390"
                    :to="9227312890"
                    :format="theFormat2"
                    :duration="50000000"
                    :delay="2"
                    easing="Power1.easeOut"
                    class="animation-text-value"
                  />
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row style="margin: 0px; padding: 0px; background-color: black">
          <!-- PROVIDER PRAGMATIC PLAY -->
          <b-col style="padding: 0px; margin: 0px" cols="4">
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SeamlessGame', 3)"
            >
              <img
                loading="lazy"
                style="width: 100%; border-radius: 5px"
                :src="require('@/assets/images/games/mobile/provider/mx.jpg')"
                alt="Logo Pragmatic Play Provider Games"
              />
            </b-button>
          </b-col>
          <!-- PROVIDER PGSOFT -->
          <b-col style="padding: 0px; margin: 0px" cols="4">
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SeamlessGame', 35)"
            >
              <img
                loading="lazy"
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/provider/PGSOFT.jpg')
                "
                alt="Logo Pocket Games Soft Provider Games"
              />
            </b-button>
          </b-col>
          <!-- PROVIDER JOKER -->
          <b-col style="padding: 0px; margin: 0px" cols="4">
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SeamlessGame', 10)"
            >
              <img
                loading="lazy"
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/provider/joker.jpg')
                "
                alt="Logo Joker Provider Games"
              />
            </b-button>
          </b-col>
          <!-- PROVIDER IDN -->
          <b-col style="padding: 0px; margin: 0px" cols="4">
            <!-- <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              target="_blank"
              disabled
              @click="playGamesProduct('POKER', 'IDN')"
            > -->
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              disabled
            >
              <img
                loading="lazy"
                style="width: 100%; border-radius: 5px"
                :src="require('@/assets/images/games/mobile/provider/idn.jpg')"
                alt="Logo Joker Provider Games"
              />
            </b-button>
          </b-col>
          <!-- PROVIDER HABANERO -->
          <b-col style="padding: 0px; margin: 0px" cols="4">
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SeamlessGame', 2)"
            >
              <img
                loading="lazy"
                style="width: 100%; border-radius: 5px"
                :src="require('@/assets/images/games/mobile/provider/hb.jpg')"
                alt="Logo Habanero Provider Games"
              />
            </b-button>
          </b-col>
          <!-- PROVIDER PT GAMING -->
          <b-col style="padding: 0px; margin: 0px" cols="4">
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SeamlessGame', 14)"
            >
              <img
                loading="lazy"
                style="width: 100%; border-radius: 5px"
                :src="require('@/assets/images/games/mobile/provider/dpt.jpg')"
                alt="Logo PT Gaming Provider Games"
              />
            </b-button>
          </b-col>
          <!-- PROVIDER GLOBAL GAMING -->
          <b-col style="padding: 0px; margin: 0px" cols="4">
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="playGamesProduct('LOBBY', 'GG')"
            >
              <img
                loading="lazy"
                style="width: 100%; border-radius: 5px"
                :src="require('@/assets/images/games/mobile/provider/gg.jpg')"
                alt="Logo Global Gaming Provider Games"
              />
            </b-button>
          </b-col>
          <!-- PROVIDER ASIAN GAMING -->
          <b-col style="padding: 0px; margin: 0px" cols="4">
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SeamlessGame', 47)"
            >
              <img
                loading="lazy"
                style="width: 100%; border-radius: 5px"
                :src="
                  require('@/assets/images/games/mobile/provider/asia-gaming.jpg')
                "
                alt="Logo SA Gaming Provider Games"
              />
            </b-button>
          </b-col>
          <!-- PROVIDER ONE POKER GAMING -->
          <b-col style="padding: 0px; margin: 0px" cols="4">
            <b-button
              style="
                margin: 5px;
                padding: 5px;
                background-color: #f1e60d;
                border-radius: 10px;
              "
              @click="play('SeamlessGame', 7)"
            >
              <img
                loading="lazy"
                style="width: 100%; border-radius: 5px"
                :src="require('@/assets/images/games/mobile/provider/og.jpg')"
                alt="Logo SA Gaming Provider Games"
              />
            </b-button>
          </b-col>
        </b-row>
      </div>
      <b-row class="MobileHome home-text-title" align-v="center">
        <h1 class="home-text-description">
          Slot Online Depo Pulsa Kripto707 Situs Slot
        </h1>
      </b-row>
      <b-row class="MobileHome home-text-subtitle">
        <h2 class="home-subtext-description">
          Game
          <a
            href="http://158.255.47.199/"
            rel="noopener noreferrer"
            target="_blank"
            >slot online</a
          >
          menjadi salah satu cara yang bisa dilakukan oleh para penjelajah
          online untuk mencari uang secara online dengan bermain di situs
          <a
            href="http://158.255.47.199/"
            rel="noopener noreferrer"
            target="_blank"
            >slot depo pulsa</a
          >. Dengan hanya mengandalkan koneksi internet dan pulsa telpon, para
          pemaian game slot sudah bisa bermain game slot online pada mesin slot
          kesukaannya di mana pun dan kapan pun menggunakan ponsel pintar
          ataupun komputer yang mereka miliki. Tentunya permainan harus di
          lakukan di situs judi slot online yang saat ini agen judi slot online
          atau singkatnya <strong> agen slot </strong> dapat mudah di cari dan
          didapatkan dari daftar slot online terbaik di Internet. <br /><br />
          Meski kelihatannya mudah untuk mendapatkan
          <strong>slot terpercaya</strong>, ada beberapa kendala yang biasanya
          dihadapi ketika akan bermain online slot di casino online. Salah
          satunya adalah memilih situs judi online untuk mendapatkan
          <strong>agen slot online terbaik</strong>. Tidak sedikit situs slot
          online baru yang justru melakukan kecurangan dan membuat para pemain
          terus mengalami kekalahan. Jika bertemu dengan bandar judi slot
          seperti ini, berapa pun modal uang asli dan pulsa yang Anda miliki
          akan habis terkuras dalam waktu yang relatif singkat . <br /><br />
          Untuk mengantisipasi kejadian seperti ini maka kita dapat mencari
          terlebih dahulu di internet situs slot online deposit pulsa tanpa
          potongan apa yang direkomendasikan terutama di rekomendasikan pada
          daftar slot terpercaya. Pilihlah situs judi slot online yang memang
          sudah memiliki rekam jejak dan feedback bagus di internet, seperti
          <strong>Kripto707 slot depo pulsa</strong>. Kripto707 mengkhususkan diri
          pada slot online deposit pulsa tanpa potongan yang tentunya adalah
          judi slot deposit pulsa dai beragam jenis. <br /><br />
          Kripto707 <strong>situs judi slot</strong> merupakan official partner
          dari beberapa publisher games judi online terkemuka dunia dan terkenal
          sebagai <strong>agen judi slot online</strong> yang bonafide. Anda
          bisa bermain judi slot online deposit pulsa ternama, seperti
          <a
            href="https://www.pragmaticplay.com/"
            rel="noopener noreferrer"
            target="_blank"
            >Pragmatic Play</a
          >
          dan
          <a
            href="https://habanerosystems.com/"
            rel="noopener noreferrer"
            target="_blank"
            >Habanero Slot</a
          >
          hingga judi bola di IsoBet judi online slot. Yakinlah pasti agen judi
          slot satu-satunya yang banyak beredar di dunia maya dan terkenal akan
          keamanan slot terpercaya adalah cuma
          <strong>Isobet judi slot online</strong> terpercaya. <br /><br />
          Berbekal menjadi partner resmi situs judi slot online di Indonesia,
          <strong>IsoBet</strong> dipastikan bebas dari kecurangan sehingga Anda
          bisa bermain dengan tenang dan nyaman. Terlebih lagi, situs
          <strong>IsoBet</strong> dapat dengan mudah diakses lewat banyak
          perangkat seperti komputer, laptop, serta smartphone dengan sistem
          operasi Android ataupun iOs dan semua tentunya untuk bermain game slot
          online deposit pulsa tanpa potongan.<br />
        </h2>
      </b-row>
      <b-row class="MobileHome home-text-title" align-v="center">
        <h2 class="home-text-description">
          Bandar Gaming Slot Online Terpercaya
        </h2>
      </b-row>
      <b-row class="MobileHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Judi <strong>slot deposit pulsa</strong> yang biasanya hanya bisa
          dimainkan di mesin slot yang terdapat di game slot casino kini bisa
          dimainkan di mana saja dan kapan saja lewat salah satu bentuk judi
          slot online terpercaya, atau singkatnya game slot. Lewat situs slot
          online, semuanya dimainkan melalui salah satu situs judi slot yang
          telah dijalin kerjasamanya dengan provider game slot online di dunia.
          Di Indonesia sendiri, salah satu situs judi slot online yang telah
          melakukan kerja sama dengan berbagai publisher judi slot online
          terpercaya adalah IsoBet. Moto IsoBet adalah "Memberikan pengalaman
          dan keuntungan luar biasa kepada para pemain slot depo pulsa hanya di
          situs judi slot online terpercaya IsoBet". <br /><br />
          Tentunya kita sudah tidak asing dengan provider slot online seperti
          <a
            href="http://5.77.39.126/"
            rel="noopener noreferrer"
            target="_blank"
            >Hotwin</a
          >, slot joker123, slot Pragmatic Play, Habanero Slot, Microgaming,
          Spade Gaming ataupun RTG Slot. Game-game slot online mereka merupakan
          game-game slot online yang paling sering dimainkan pemain slot online
          uang asli di seluruh dunia. Selain itu mereka juga dapat bermain
          gaming slot lain di mesin slot online seperti live casino online,
          poker online hingga ke judi bola. Inti dari kesemuanya adalah ingin
          mendapatkan bonus jackpot dari salah satu penyedia situs judi slot
          online terpercaya 24 jam. <br /><br />
          Masing-masing provider membawa puluhan hingga ratusan game slot online
          yang bisa Anda mainkan sesuai dengan kegemaran kita. Masing-masing
          game slot terbaik ini tentunya memiliki tema yang berbeda, mulai dari
          tema sejarah hingga film yang tengah populer saat ini. Selain itu,
          masing-masing permainan judi <strong>slot deposit pulsa</strong> baik
          dengan deposit via pulsa telkomsel, link aja atau yang lain, juga
          mempunyai nilai maksimal jackpot yang berbeda di setiap taruhan judi,
          sehingga kita memiliki banyak pilihan ingin bermain di game judi slot
          pulsa yang relatif mudah mendapatkan jackpot terbesar tetapi nilainya
          kecil atau yang jarang bonus jackpot tapi nilainya sangat besar.
          <br /><br />
          Tentunya dengan bermain <strong>slot depo pulsa</strong> di IsoBet
          Anda akan mendapat berbagai keuntungan yang tidak bisa Anda dapatkan
          di situs judi slot online lainnya. Berikut ini adalah ulasan dari
          keuntungan ikut serta menjadi
          <a
            href="http://158.255.47.199/register"
            rel="noopener noreferrer"
            target="_blank"
            >new member</a
          >
          di IsoBet situs judi slot online terpercaya:<br />
        </h3>
      </b-row>
      <b-row class="MobileHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription">
          Keuntungan Main di Situs Slot IsoBet
        </h2>
      </b-row>
      <b-row class="MobileHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Satu keuntungan new member terbesar jika main
          <strong>slot depo pulsa</strong> di IsoBet slot indonesia online resmi
          adalah kita akan mendapatkan berbagai bonus yang tidak bisa didapatkan
          di situs judi online indonesia lainnya. Apa saja keuntungan terbaik
          slot yang dimaksud? Berikut ini beberapa di antaranya: <br />
        </h3>
      </b-row>
      <b-row
        class="MobileHome home-subtext-title"
        align-v="center"
        align-h="center"
      >
        <h2 class="home-subtext-subdescription-small">
          Bonus dan Promosi Menarik
        </h2>
      </b-row>
      <b-row class="MobileHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Dengan bermain di situs Isobet online resmi mudah menang kita memiliki
          kesempatan untuk mendapatkan bonus dan promosi menarik berupa saldo
          deposit pulsa tanpa potongan yang bisa digunakan sebagai tambahan
          modal dalam bermain <strong>slot depo pulsa</strong> pada situs judi
          slot online terbaik. Semua jenis online slot pada daftar slot di
          IsoBet memastikan member mendapatkan bonus dan promosi terbaik baik
          itu pulsa maupun uang asli, dan tenutnya
          <strong>slot deposit pulsa</strong> menjadi pilihan member teratas di
          agen slot deposit pulsa indonesia. <br /><br />
          Sebagai contoh, saat ini tersedia promosi bonus welcome member 100%
          dan deposit pulsa tanpa potongan, di mana member baru dapat bonus
          kredit secara gratis dan kita akan tetap mendapatkan uang asli dalam
          kredit judi
          <a
            href="http://158.255.47.199/"
            rel="noopener noreferrer"
            target="_blank"
            >slot deposit pulsa</a
          >
          kita. Dalam waktu tertentu pun tersedia event freespin situs judi
          slot. Kami juga akan mengadakan event setiap bulannya dengan hadiah
          menarik bagi para pecinta game judi online slot terutama bonus double
          bagi para VIP member agen slot IsoBet situs judi slot depo pulsa
          terbaik. <br />
        </h3>
      </b-row>
      <b-row class="MobileHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Jackpot Terbesar Slot Online Terbesar
        </h2>
      </b-row>
      <b-row class="MobileHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Semua dari kita ingin mendapatkan jackpot ketika sedang bermain di
          situs slot baik itu mesi slot, live casino online ataupun taruhan judi
          lainnya di agen judi slot terpercaya. Apalagi jika hadiah yang bisa
          didapat jumlahnya sangat besar bukan? <br /><br />
          Jika kita main di situs judi online slot seperti IsoBet agen slot,
          kita memiliki kesempatan untuk meraih kemenangan
          <strong>slot deposit pulsa</strong> hingga ratusan juta rupiah. Anda
          tidak perlu takut jika kemenangan
          <strong>slot depo pulsa</strong> Anda pada permaian situs judi slot
          tidak dibayarkan karena tidak ada batas maximal withdraw di IsoBet
          agen judi online, naik itu ratusan juga hingga miliaran rupiah di
          semua permainan mudah menang seperti slot terbaik slot Joker123, slot
          Pragmatic, Poker Online Indonesia ataupun game judi slot lainnya --
          semua pasti dibayar. Para new member dipastikan akan nyaman dan aman
          atas transaksinya karena IsoBet agen slot online sebagai mitra para
          provider game kelas dunia menyiapkan customer service 24 jam slot
          terbaik selama permainan kita. Customer service 24 jam ini akan
          mendampingi para pemain slot depo pulsa dalam permainan di situs slot
          IsoBet agen judi online terbesar dan penyedia slot indonesia slot
          terbaik. <br />
        </h3>
      </b-row>
      <b-row class="MobileHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Data Pribadi Dijamin Keamanannya
        </h2>
      </b-row>
      <b-row class="MobileHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Kebocoran data tentu menjadi hal yang paling ingin dihindari oleh
          penjudi di mana pun mereka bermain. Hal ini dikarenakan kebocoran data
          akan membuat identitas asli pemain akan tersebar luas dan mengganggu
          kenyamanan dan keamanan dari para pejudi. <br /><br />
          Anda tidak perlu takut hal ini terjadi jika bermain slot online di
          Isobet <strong>slot depo pulsa</strong>. Setelah Anda melakukan
          registrasi, setiap data member di situs judi slot IsoBet yang diterima
          akan di-enkripsi dengan sistem tercanggih sehingga data diri pribadi
          aman dan tidak akan jatuh ke tangan yang salah. Semua data baik data
          pribadi, data finansial, data permainan mesin slot, semua deposit
          pulsa tanpa potongan akan aman disimpan di database kami. <br />
        </h3>
      </b-row>
      <b-row class="MobileHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription">
          Cara Menang Judi Online dengan Mudah
        </h2>
      </b-row>
      <b-row class="MobileHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Siapapun pastinya ingin memainkan permainan judi online yang mudah
          menang di bandar judi slot. Tentunya ini dikarenakan jackpot atau
          bonus judi online yang besar tentunya sudah menanti untuk bisa diraih
          para pemenang slot terpercaya. Meski begitu, ada beberapa langkah yang
          bisa Anda lakukan agar kemenangan dalam bermain slot online ini bisa
          didapatkan dengan mudah dari bandar judi slot deposit pulsa tanpa
          potongan. Berikut ini beberapa langkah yang bisa Anda lakukan: <br />
        </h3>
      </b-row>
      <b-row class="MobileHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Pahami main slot deposit pulsa tanpa potongan
        </h2>
      </b-row>
      <b-row class="MobileHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Memahami permainan slot deposit pulsa tanpa potongan adalah merupakan
          hal paling penting dan biasanya justru tidak diingat oleh seseorang
          sebelum mulai memainkan slot pulsa. Jika Anda tidak memahami permainan
          judi online slot pulsa yang ingin dimainkan, hal ini sama saja seperti
          membeli kucing dalam karung. Anda hanya akan bermain judi slot
          terpercaya tanpa tahu apa yang akan dihadapi. Customer service Isobet
          siap membantu dan memandu segala pertanyaan maupun keluh kesah para
          VIP member IsoBet <strong>slot deposit pulsa tanpa potongan.</strong>
          <br /><br />
          Sebagai contoh bermain slot deposit pulsa tanpa potongan. Sebelum
          bermain, ada baiknya jika Anda mengenal dan menghafalkan kombinasi
          simbol
          <a
            href="https://en.wikipedia.org/wiki/Slot_machine"
            rel="noopener noreferrer"
            target="_blank"
            >slot</a
          >
          yang bisa menghadirkan jackpot dalam judi slot online di situs slot
          terbaru. Tanpa mengenal kombinasi ini, mustahil Anda bisa memenangkan
          permainan slot terbaru yang baru dilihat dan dikenal. Begitu juga
          apabila mau bermain di
          <strong>slot deposit pulsa tanpa potongan</strong> terpercaya di
          Indonesia lainnya. bermain slot terbaru pulsa tentu harus mencoba demo
          nya terlebih dahulu sebelum main dengan bandar judi sebenarnya.
          <br /><br />
          Hal yang sama juga harus Anda lakukan sebelum main di situs
          <strong>slot deposit pulsa tanpa potongan</strong> lainnya. Beberapa
          permainan <strong>slot depo pulsa</strong> biasanya berhubungan dengan
          teori probabilitas sehingga Anda harus bisa melakukan analisa
          permainan dengan mudah di setiap daftar slot online terbaik yang ada.
          <br /><br />
          Sebagai situs <strong>slot deposit pulsa</strong> terbaik di
          Indonesia, kami memberikan Anda kesempatan untuk melakukan uji coba
          permainan judi sebelum mulai memasang taruhan pada daftar slot online
          bandar judi casino online terpercaya di indonesia. Manfaatkan hal
          tersebut agar Anda bisa meraih keuntungan maksimal dari slot terbaru.
          <br />
        </h3>
      </b-row>
      <b-row class="MobileHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Persiapkan waktu yang cukup
        </h2>
      </b-row>
      <b-row class="MobileHome MobileHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Langkah selanjutnya yang harus Anda lakukan setelah memahami game judi
          online yang Anda incar adalah jangan terburu-buru dalam bermain
          <strong>slot deposit pulsa</strong>. Salah satu kesalahan pejudi
          pemula biasanya terjadi dalam permainan judi slot online. Mereka
          biasanya bermain terburu-buru, apalagi ketika mereka sudah mulai
          memenangkan permainan di situs judi slot online. <br /><br />
          Bermainlah dengan santai. Konsentrasi dan konsisten adalah kunci utama
          untuk memenangkan setiap permainan slot online. Jika terburu-buru,
          biasanya konsentrasi akan langsung hilang ketika Anda melakukan
          sedikit kesalahan dalam judi <strong>slot deposit pulsa</strong>.
          Jangan pernah berharap lawan akan melakukan kesalahan yang sama karena
          biasanya mereka sudah jauh lebih berpengalaman di situs judi slot
          online. <br />
        </h3>
      </b-row>
      <b-row class="MobileHome home-subtext-title" align-v="center">
        <h2 class="home-subtext-subdescription-small">
          Lakukan pengaturan modal yang baik
        </h2>
      </b-row>
      <b-row class="MobileHome home-text-subtitle">
        <h3 class="home-subtext-description">
          Manajemen modal merupakan hal penting lain yang mudah sekali dilupakan
          ketika bermain judi online. Seorang penjudi
          <strong>slot deposit pulsa</strong> ketika sudah bermain biasanya
          tidak akan fokus lagi pada modal yang mereka miliki. Yang ada di dalam
          pikiran mereka adalah bagaimana caranya agar bisa meraih kemenangan
          saat bermain. <br /><br />
          Ketika hal ini sudah terjadi, akan sangat beruntung jika pemain
          tersebut selalu meraih kemenangan. Namun, jika kekalahan dialami,
          biasanya tidak terasa modal bermain sudah semakin menipis saat main di
          situs judi online. <br /><br />
          Hal semacam ini biasanya ditemukan dalam judi
          <strong>slot online</strong>. Dalam judi slot online, kehadiran
          kombinasi gambar yang mendatangkan jackpot
          <strong>slot deposit pulsa</strong> dalam beberapa game slot online
          cukup mudah didapat sehingga kemenangan beruntun pun bisa saja
          terjadi. <br /><br />
          Untuk itu, sebelum bermain dalam sebuah gem
          <a
            href="https://en.wikipedia.org/wiki/Online_gambling"
            rel="noopener noreferrer"
            target="_blank"
            >judi online</a
          >, alangkah baiknya jika Anda sudah menetapkan terlebih dahulu batasan
          modal yang akan dimainkan pada <strong>slot deposit pulsa</strong>.
          Hal ini penting untuk mengantisipasi jika Anda mengalami kekalahan
          nantinya.<br /><br />
          Tahu kapan waktunya harus berhenti baik ketika sedang menang ataupun
          kalah adalah salah satu ciri Anda sudah menguasai permainan judi
          online pada <strong>slot deposit pulsa</strong> Kalah itu hal yang
          biasa karena Anda pastinya membutuhkan pengalaman dalam bermain
          sebelum bisa mendapatkan kemenangan.<br />
        </h3>
      </b-row>
      <b-modal
        id="gamelinkHome"
        hide-footer
        class="center"
        ref="gamelinkHome"
        centered
        size="sm"
        scrollable
      >
        <template #modal-header="{ close }" class="center">
          <h4
            class="gamelink-text modal-title-20 center justify-content-center"
          >
            POPUP LINK GAMES
          </h4>
          <b-button variant="outline-danger" @click="close()">
            <span class="center"> X </span>
          </b-button>
        </template>
        <ul class="row-pm-0 center">
          <p class="gamelink-paragraph">
            If the game doesn't open, <br />
            you can click the button below.
          </p>
          <a v-bind:href="this.linkGames" target="_blank">
            <b-btn class="gamelink-button"> OPEN GAME </b-btn>
          </a>
        </ul>
      </b-modal>
    </div>
  </BaseLayout>
</template>