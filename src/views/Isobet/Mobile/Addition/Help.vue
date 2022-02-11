<script>
import BaseLayout from "@/layouts/BaseLayout";
import MenuMobile from "@/layouts/components/MenuMobile.vue";
export default {
  name: "MobileHelp",
  head: {
    link: [{ rel: "canonical", href: "http://158.255.47.199/mobile/help" }],
  },
  components: {
    BaseLayout,
    MenuMobile,
  },
  data() {
    return {
      rules1: true,
      rules2: false,
      rules3: false,
      rules4: false,
      rules5: false,
      rules6: false,
      rules7: false,
    };
  },
  methods: {
    onRules1() {
      this.rules1 = true;
      this.rules2 = false;
      this.rules3 = false;
      this.rules4 = false;
      this.rules5 = false;
      this.rules6 = false;
      this.rules7 = false;
    },
    onRules2() {
      this.rules1 = false;
      this.rules2 = true;
      this.rules3 = false;
      this.rules4 = false;
      this.rules5 = false;
      this.rules6 = false;
      this.rules7 = false;
    },
    onRules3() {
      this.rules1 = false;
      this.rules2 = false;
      this.rules3 = true;
      this.rules4 = false;
      this.rules5 = false;
      this.rules6 = false;
      this.rules7 = false;
    },
    onRules4() {
      this.rules1 = false;
      this.rules2 = false;
      this.rules3 = false;
      this.rules4 = true;
      this.rules5 = false;
      this.rules6 = false;
      this.rules7 = false;
    },
    onRules5() {
      this.rules1 = false;
      this.rules2 = false;
      this.rules3 = false;
      this.rules4 = false;
      this.rules5 = true;
      this.rules6 = false;
      this.rules7 = false;
    },
    onRules6() {
      this.rules1 = false;
      this.rules2 = false;
      this.rules3 = false;
      this.rules4 = false;
      this.rules5 = false;
      this.rules6 = true;
      this.rules7 = false;
    },
    onRules7() {
      this.rules1 = false;
      this.rules2 = false;
      this.rules3 = false;
      this.rules4 = false;
      this.rules5 = false;
      this.rules6 = false;
      this.rules7 = true;
    },
  },
};
</script>

<template>
  <BaseLayout>
    <div class="help" style="background-color: black">
      <div class="MobileHelp" style="padding: 0px; margin: 0px">
        <b-img
          style="width: 100%; border-bottom: 1px solid white"
          class="center align-center max-width"
          :src="require('@/assets/images/banner/slide17.jpg')"
          alt="Banner Live Casino Games ISOBET"
        />
        <MenuMobile />
        <b-row style="padding: 0px; margin: 0px; margin-top: 10px">
          <b-col cols="6" style="padding: 0px; margin: 0px">
            <b-button
              style="background-color: transparent; border: 0px"
              @click="onRules1()"
            >
              <b-img
                style="width: 100%"
                :src="require('@/assets/images/button/help/help-button-1.png')"
                alt="Tombol Peraturan"
              ></b-img>
            </b-button>
          </b-col>

          <b-col cols="6" style="padding: 0px; margin: 0px">
            <b-button
              style="background-color: transparent; border: 0px"
              @click="onRules2()"
            >
              <b-img
                style="width: 100%"
                :src="require('@/assets/images/button/help/help-button-2.png')"
                alt="Tombol Tentang Referral"
              ></b-img>
            </b-button>
          </b-col>
        </b-row>
        <b-row style="padding: 0px; margin: 0px; margin-bottom: 10px">
          <b-col cols="6" style="padding: 0px; margin: 0px">
            <b-button
              style="background-color: transparent; border: 0px"
              @click="onRules3()"
            >
              <b-img
                style="width: 100%"
                :src="require('@/assets/images/button/help/help-button-3.png')"
                alt="Tombol Cara Bermain"
              ></b-img>
            </b-button>
          </b-col>

          <b-col cols="6" style="padding: 0px; margin: 0px">
            <b-button
              style="background-color: transparent; border: 0px"
              @click="onRules4()"
            >
              <b-img
                style="width: 100%"
                :src="require('@/assets/images/button/help/help-button-4.png')"
                alt="Tombol FAQ"
              ></b-img>
            </b-button>
          </b-col>
        </b-row>
        <b-row
          v-if="rules3 || rules5 || rules6 || rules7"
          style="
            margin-left: 10px;
            margin-right: 10px;
            margin: 0px;
            padding: 0px;
            margin-bottom: 10px;
          "
          class="center justify-content-center text-center align-center"
          align-h="center"
          align-v="center"
        >
          <b-col cols="4" style="padding: 0px; margin: 0px">
            <b-button
              style="
                background-color: transparent;
                border: 0px;
                padding: 0px;
                margin: 0px;
              "
              @click="onRules5()"
            >
              <b-img
                style="width: 100%"
                :src="require('@/assets/images/button/help/help-button-5.png')"
                alt="Tombol General Info"
              ></b-img>
            </b-button>
          </b-col>

          <b-col cols="4" style="padding: 0px; margin: 0px">
            <b-button
              style="
                background-color: transparent;
                border: 0px;
                padding: 0px;
                margin: 0px;
              "
              @click="onRules6()"
            >
              <b-img
                style="width: 100%"
                :src="require('@/assets/images/button/help/help-button-6.png')"
                alt="Tombol Info Saldo"
              ></b-img>
            </b-button>
          </b-col>

          <b-col cols="4" style="padding: 0px; margin: 0px">
            <b-button
              style="
                background-color: transparent;
                border: 0px;
                padding: 0px;
                margin: 0px;
              "
              @click="onRules7()"
            >
              <b-img
                style="width: 100%"
                :src="require('@/assets/images/button/help/help-button-7.png')"
                alt="Tombol Panduang Bermain"
              ></b-img>
            </b-button>
          </b-col>
        </b-row>
        <b-row style="padding: 0px; margin: 0px; padding-bottom: 20px">
          <b-col cols="12">
            <b-card
              style="width: 100%; height: 100%; background-color: #f18713"
              v-show="rules1"
            >
              <b-row
                class="text-center center align-center justify-content-center"
                style="
                  border-radius: 10px;
                  margin-bottom: 10px;
                  padding-top: 15px;
                  padding-bottom: 10px;
                  background-color: #d64e05;
                "
              >
                <h6
                  style="color: white; font-weight: bold; letter-spacing: 2px"
                >
                  PERATURAN
                </h6>
              </b-row>

              <b-row class="left">
                <h6 style="padding: 0%; color: black; text-align: justify">
                  <strong style="font-weight: bold">
                    <i> Selamat datang di ISOBET BET ONLINE. </i> </strong
                  ><br /><br />
                  <strong style="font-weight: bold; font-size: 18px">
                    Syarat dan Ketentuan Bermain di Situs Judi Online ISOBET. </strong
                  ><br /><br />
                  Sebagai member anda tentunya ingin merasakan kenyamanan bukan?
                  maka dari itu member harus mengikuti peraturan yang ada pada
                  website kami agar semua tetap berjalan sesuai protokol yang
                  ada. Dengan bergabung bersama ISOBET berarti anda setuju
                  mengikuti peraturan yang telah dibuat oleh ISOBET ini. Ini
                  adalah sebagai tanggung jawab kami sebagai agen judi online
                  terpercaya di Indonesia ini. <br /><br />
                  <strong style="font-weight: bold"
                    >Syaratnya adalah sebagai berikut ini:
                  </strong>
                </h6>
              </b-row>

              <b-tr>
                <b-td>1. </b-td>
                <b-td style="text-align: justify"
                  >Member ISOBET wajib berumur diatas 18 tahun.</b-td
                >
              </b-tr>

              <b-tr>
                <b-td>2. </b-td>
                <b-td style="text-align: justify"
                  >Jika anda ingin melakukan DEPOSIT atau WITHDRAW pastikan NAMA
                  ANDA dan DATA DIRI ID anda SAMA.</b-td
                >
              </b-tr>

              <b-tr>
                <b-td>3. </b-td>
                <b-td style="text-align: justify"
                  >Proses deposit belum bisa kami proses, apabila DANA yang
                  dikirim tidak sama dengan nama yang didaftarkan
                  (HANGUS).</b-td
                >
              </b-tr>

              <b-tr>
                <b-td>4. </b-td>
                <b-td style="text-align: justify"
                  >Member yang melakukan tindakan pengisian formulir deposit
                  kosong atau tanpa melakukan transfer dana, akibatnya akun akan
                  diamankan oleh admin.</b-td
                >
              </b-tr>

              <b-tr>
                <b-td>5. </b-td>
                <b-td style="text-align: justify"
                  >Kami menyediakan berbagai bank dalam negeri seperti BCA,
                  MANDIRI, BNI dan BRI untuk transaksi member.</b-td
                >
              </b-tr>

              <b-tr>
                <b-td>6. </b-td>
                <b-td
                  >Dan untuk memudahkan member setia ISOBET, kami menyediakan
                  sistem pembayaran SISPAY.
                </b-td>
              </b-tr>

              <b-row class="left" style="margin-top: 15px">
                <h6 style="padding: 0%; color: black; text-align: justify">
                  <strong style="font-weight: bold; font-size: 18px">
                    Apa itu Sispay? </strong
                  ><br /><br />
                  Sispay adalah Sistem Pembayaran Otomatis tanpa anda harus
                  pergi ke ATM, cukup dengan memiliki Internet Banking saja.
                  Peraturan ini dibuat semata mata bertujuan untuk menjaga
                  kualitas dan kenyamanan para member agar mendapatkan kepuasan
                  dalam bermain.<br /><br />
                </h6>
              </b-row>

              <b-row class="left" style="margin-top: 15px">
                <h6 style="padding: 0%; color: black; text-align: justify">
                  <strong style="font-weight: bold; font-size: 18px">
                    JADWAL ONLINE / OFFLINE BANK </strong
                  ><br /><br />
                </h6>
              </b-row>

              <b-row class="left" style="margin-top: 0px">
                <b-col cols="12" md="6">
                  <b-card
                    style="width: 100%; height: 100%; border-radius: 10px"
                    class="max-width max-height"
                  >
                    <h8>
                      <h5
                        style="
                          font-weight: bold;
                          border-bottom: 2px solid black;
                          padding-bottom: 8px;
                        "
                      >
                        BCA
                      </h5>
                      <br />
                      Senin – Jumat : 00.00 – 21.00 WIB <br />
                      Sabtu : Silahkan dikonfirmasi kembali ke customer service
                      kami <br />
                      Minggu / Libur Nasional : ONLINE 24 Jam <br /><br />
                    </h8>
                  </b-card>
                </b-col>
                <b-col cols="12" md="6" style="margin-top: 10px">
                  <b-card
                    style="width: 100%; height: 100%; border-radius: 10px"
                    class="max-width max-height"
                  >
                    <h8>
                      <h5
                        style="
                          font-weight: bold;
                          border-bottom: 2px solid black;
                          padding-bottom: 8px;
                        "
                      >
                        MANDIRI
                      </h5>
                      <br />
                      Senin – Minggu : 03.00 – 23.00 WIB <br />
                    </h8>
                  </b-card>
                </b-col>
              </b-row>

              <b-row class="left" style="margin-top: 10px">
                <b-col cols="12" md="6">
                  <b-card
                    style="width: 100%; height: 100%; border-radius: 10px"
                    class="max-width max-height"
                  >
                    <h8>
                      <h5
                        style="
                          font-weight: bold;
                          border-bottom: 2px solid black;
                          padding-bottom: 8px;
                        "
                      >
                        BNI
                      </h5>
                      <br />
                      Senin – Minggu : ONLINE 24 Jam <br />
                    </h8>
                  </b-card>
                </b-col>
                <b-col cols="12" md="6" style="margin-top: 10px">
                  <b-card
                    style="width: 100%; height: 100%; border-radius: 10px"
                    class="max-width max-height"
                  >
                    <h8>
                      <h5
                        style="
                          font-weight: bold;
                          border-bottom: 2px solid black;
                          padding-bottom: 8px;
                        "
                      >
                        BRI
                      </h5>
                      <br />
                      Senin – Minggu : 05.00 – 22.00 WIB <br />
                    </h8>
                  </b-card>
                </b-col>
              </b-row>
            </b-card>

            <b-card
              style="width: 100%; height: 100%; background-color: #f18713"
              v-show="rules2"
            >
              <b-row
                class="text-center center align-center justify-content-center"
                style="
                  border-radius: 10px;
                  margin-bottom: 10px;
                  padding-top: 15px;
                  padding-bottom: 10px;
                  background-color: #d64e05;
                "
              >
                <h6
                  style="color: white; font-weight: bold; letter-spacing: 2px"
                >
                  APA ITU REFERRAL?
                </h6>
              </b-row>

              <b-row class="left">
                <h6 style="padding: 0%; color: black; text-align: justify">
                  <strong style="font-weight: bold">
                    <i> Selamat datang di ISOBET BET ONLINE. </i> </strong
                  ><br /><br />

                  Sistem <b style="font-weight: bold">REFERRAL</b> adalah salah
                  satu sistem yang ditawarkan dalam permainan poker online.
                  Sistem <b style="font-weight: bold">REFERRAL</b> menjadi salah
                  satu daya tarik paling besar bagi para pemain poker online
                  karena pemain poker online memiliki kesempatan untuk
                  mendapatkan pemasukan tambahan berupa komisi tanpa harus
                  berkerja keras. <br /><br />
                  Untuk mendapatkan komisi
                  <b style="font-weight: bold">REFERRAL</b> ini, Anda hanya
                  perlu mengajak pemain baru untuk bergabung dan bermain poker
                  online di situs poker online tempat Anda bermain. Dari setiap
                  pemain yang berhasil Anda ajak untuk bergabung, Anda akan
                  mendapatkan bonus sebesar 2.5% dari kekalahan downline anda
                  SEUMUR HIDUP. <br /><br />
                  <b style="font-weight: bold">Sebagai Contoh :</b> : Ketika
                  seorang pemain judibola online kalah sebesar Rp.10.000.000,
                  maka <b style="font-weight: bold">KOMISI REFERRAL</b> adalah
                  2.5% dari Rp10.000.000 tersebut adalah Rp. 250.000 akan
                  menjadi <b style="font-weight: bold">KOMISI REFERRAL</b> yang
                  berhak Anda terima. Itulah sebabnya kenapa banyak pemain poker
                  online yang bisa mendapatkan
                  <b style="font-weight: bold">KOMISI REFERRAL</b> yang nilainya
                  ratusan ribu rupiah hingga jutaan rupiah bahkan puluhan juta
                  rupiah setiap minggunya. <br /><br />
                </h6>
              </b-row>
            </b-card>

            <b-card
              style="width: 100%; height: 100%; background-color: #f18713"
              v-show="rules3"
            >
              <b-row
                class="text-center center align-center justify-content-center"
                style="
                  border-radius: 10px;
                  margin-bottom: 10px;
                  padding-top: 15px;
                  padding-bottom: 10px;
                  background-color: #d64e05;
                "
              >
                <h6
                  style="color: white; font-weight: bold; letter-spacing: 2px"
                >
                  CARA BERMAIN
                </h6>
              </b-row>

              <b-row class="left">
                <h6 style="padding: 0%; color: black; text-align: justify">
                  <strong style="font-weight: bold">
                    <i> Selamat datang di ISOBET BET ONLINE. </i> </strong
                  ><br /><br />
                </h6>
              </b-row>
            </b-card>

            <b-card
              style="width: 100%; height: 100%; background-color: #f18713"
              v-if="rules5"
            >
              <b-row
                class="text-center center align-center justify-content-center"
                style="
                  border-radius: 10px;
                  margin-bottom: 10px;
                  padding-top: 15px;
                  padding-bottom: 10px;
                  background-color: #d64e05;
                "
              >
                <h6
                  style="color: white; font-weight: bold; letter-spacing: 2px"
                >
                  GENERAL INFO
                </h6>
              </b-row>

              <b-row class="left">
                <strong style="font-weight: bold">
                  <i> Selamat datang di ISOBET BET ONLINE. </i> </strong
                ><br /><br />

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col style="padding: 0px; margin: 0px; width: 10px">
                    <strong block style="font-weight: bold; font-size: 18px">
                      PENDAFTARAN </strong
                    ><br /><br />
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>1.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Buka situs online ISOBET, kemudian pilih menu
                      REGISTER.</span
                    >
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>2.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Isi data diri dengan lengkap sesuai dengan petunjuk yang
                      ada.</span
                    >
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>3.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Pastikan semua data diri sudah diisi dengan benar mulai
                      dari nama, nomor rekening, nama rekening, nomor telepon,
                      email, username dan password.</span
                    >
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>4.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Setelah diisi semua data diri dengan lengkap dan valid
                      silakan klik SUBMIT.</span
                    >
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>5.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Silakan menunggu beberapa saat operator kami akan
                      melakukan pengecekan terlebih dahulu.</span
                    >
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>6.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Setelah dikonfirmasi silahkan logout dan login kembali
                      dengan username dan password yang Anda daftarkan. Selamat
                      bermain.</span
                    >
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-top: 20px;
                  "
                  block
                >
                  <b-col style="padding: 0px; margin: 0px; width: 10px">
                    <strong block style="font-weight: bold; font-size: 18px">
                      LUPA KATA SANDI </strong
                    ><br /><br />
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>1.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Pilih "forgot password"</span>
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>2.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Kemudian isi nomor telepon yang valid karena kami akan
                      kirimkan sms berupa LINK RESET PASSWORD.</span
                    >
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>3.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik SUBMIT reset password.</span>
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>4.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Setelah menerima LINK RESET PASSWORD di sms silahkan
                      diklik dan diubah ke password baru yang di inginkan.</span
                    >
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>5.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Kemudian klik SUBMIT, maka password baru sudah dapat
                      digunakan.</span
                    >
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-top: 20px;
                  "
                  block
                >
                  <b-col style="padding: 0px; margin: 0px; width: 10px">
                    <strong block style="font-weight: bold; font-size: 18px">
                      UBAH KATA SANDI </strong
                    ><br /><br />
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>1.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik profile pada akun Anda.</span>
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>2.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Pilih di menu Change Password.</span>
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>3.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Silahkan isi data yang diminta dengan benar seperti
                      password lama dan password baru serta konfirmsi password
                      baru yang Anda inginkan.</span
                    >
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>4.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Kemudian klik SUBMIT, maka password baru anda sudah dapat
                      digunakan.</span
                    >
                  </b-col>
                </b-row>

                <strong style="font-weight: bold; margin-top: 15px">
                  <i>
                    Jika anda menemui kendala dalam melakukan pendaftaran maupun
                    pergantian kata sandi atau lupa kata sandi silahkan hubungi
                    costumer service kami yang bertugas selama 7x24 jam.
                  </i> </strong
                ><br /><br />
              </b-row>
            </b-card>

            <b-card
              style="width: 100%; height: 100%; background-color: #f18713"
              v-if="rules6"
            >
              <b-row
                class="text-center center align-center justify-content-center"
                style="
                  border-radius: 10px;
                  margin-bottom: 10px;
                  padding-top: 15px;
                  padding-bottom: 10px;
                  background-color: #d64e05;
                "
              >
                <h6
                  style="color: white; font-weight: bold; letter-spacing: 2px"
                >
                  INFO SALDO
                </h6>
              </b-row>

              <b-row class="left">
                <strong style="font-weight: bold">
                  <i> Selamat datang di ISOBET BET ONLINE. </i> </strong
                ><br /><br />

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col style="padding: 0px; margin: 0px; width: 10px">
                    <strong block style="font-weight: bold; font-size: 18px">
                      DEPOSIT SISPAY </strong
                    ><br /><br />
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <span>
                    Untuk menggunakan Deposit Sispay, anda membutuhkan Internet
                    Banking. <br />
                    Kemudian, untuk melakukan transfer anda membutuhkan Token
                    yang sudah diberikan oleh Masing-masing Bank.<br />
                    Langkah-langkah Deposit Sispay adalah sebagai berikut :
                    <br /><br />
                  </span>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">1.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">Login</span>
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <span style="margin-left: 10px"
                    >Login terlebih dahulu untuk masuk menggunakan ID Anda.
                  </span>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-top: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">2.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">Transfer</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>a.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Klik nama 'WALLET' yang berada di sebelah kanan
                      atas.</span
                    >
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>b.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik menu 'DEPOSIT'.</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>c.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik menu 'SISPAY'.</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>d.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Isi form SISPAY yang sudah disediakan.</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>e.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik 'SUBMIT'.</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>f.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Masukkan USER ID dan PIN/PASSWORD INTERNET BANKING
                      anda.</span
                    >
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>g.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Selanjutnya, Ikuti Langkah-langkah yang telah
                      disediakan.</span
                    >
                  </b-col>
                </b-row>

                <strong style="font-weight: bold; margin-top: 15px">
                  <i>
                    Sesudah itu, saldo virtual anda anda akan langsung terisi.
                    Selamat Mencoba.</i
                  > </strong
                ><br /><br />

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-top: 20px;
                  "
                  block
                >
                  <b-col style="padding: 0px; margin: 0px; width: 10px">
                    <strong block style="font-weight: bold; font-size: 18px">
                      DEPOSIT MANUAL </strong
                    ><br /><br />
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <span>
                    Langkah-langkah Deposit Manual adalah sebagai berikut :
                    <br /><br />
                  </span>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">1.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">Login</span>
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <span style="margin-left: 10px"
                    >Login terlebih dahulu untuk masuk menggunakan ID Anda.
                  </span>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-top: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">2.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">Transfer</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>a.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Jika anda ingin mengisi dana, maka anda tinggal melakukan
                      transfer sesuai nominal yang anda inginkan. <br />
                      (LAKUKAN PENGISIAN DANA TERLEBIH DAHULU)</span
                    >
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>b.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Klik nama 'WALLET' yang berada di sebelah kanan
                      atas.</span
                    >
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>c.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik menu 'DEPOSIT'.</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>d.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik menu 'BANK'.</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>e.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Isi form MANUAL TRANSFER yang sudah disediakan.</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>f.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik 'SUBMIT'.</span>
                  </b-col>
                </b-row>

                <strong style="font-weight: bold; margin-top: 15px">
                  <i>
                    Sesudah itu, anda hanya tinggal menunggu pihak Admin mengisi
                    saldo virtual Anda. Selamat Mencoba.</i
                  > </strong
                ><br /><br />

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-top: 20px;
                  "
                  block
                >
                  <b-col style="padding: 0px; margin: 0px; width: 10px">
                    <strong block style="font-weight: bold; font-size: 18px">
                      WITHDRAWAL </strong
                    ><br /><br />
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <span>
                    Langkah-langkah Deposit Withdrawal adalah sebagai berikut :
                    <br /><br />
                  </span>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">1.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">Login</span>
                  </b-col>
                </b-row>

                <b-row style="padding: 0px; margin: 0px; width: 100%" block>
                  <span style="margin-left: 10px"
                    >Login terlebih dahulu untuk masuk menggunakan ID Anda.
                  </span>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-top: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">2.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span style="font-weight: bold">Transfer</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>a.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span
                      >Klik nama ‘ WALLET ’ yang berada di sebelah kanan
                      atas.</span
                    >
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>b.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik menu 'WITHDRAWAL'.</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>c.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Isi form WITHDRAWAL yang sudah disediakan.</span>
                  </b-col>
                </b-row>

                <b-row
                  style="
                    padding: 0px;
                    margin: 0px;
                    width: 100%;
                    margin-left: 10px;
                  "
                  block
                >
                  <b-col cols="0.5" style="padding: 0px; margin: 0px">
                    <span>c.</span>
                  </b-col>
                  <b-col cols="11" style="padding: 0px; margin: 0px">
                    <span>Klik 'SUBMIT'.</span>
                  </b-col>
                </b-row>

                <strong style="font-weight: bold; margin-top: 15px">
                  <i>
                    Sesudah itu, anda hanya tinggal menunggu pihak Admin
                    mengirim uang nya ke rekening anda. Selamat Mencoba.</i
                  > </strong
                ><br /><br />
              </b-row>
            </b-card>

            <b-card
              style="width: 100%; height: 100%; background-color: #f18713"
              v-if="rules7"
            >
              <b-row
                class="text-center center align-center justify-content-center"
                style="
                  border-radius: 10px;
                  margin-bottom: 10px;
                  padding-top: 15px;
                  padding-bottom: 10px;
                  background-color: #d64e05;
                "
              >
                <h6
                  style="color: white; font-weight: bold; letter-spacing: 2px"
                >
                  PANDUAN BERMAIN
                </h6>
              </b-row>

              <b-row class="left">
                <h6 style="padding: 0%; color: black; text-align: justify">
                  <strong style="font-weight: bold">
                    <i> Selamat datang di ISOBET BET ONLINE. </i> </strong
                  ><br /><br />
                </h6>
              </b-row>
            </b-card>

            <b-card
              style="width: 100%; height: 100%; background-color: #f18713"
              v-if="rules4"
            >
              <b-row
                class="text-center center align-center justify-content-center"
                style="
                  border-radius: 10px;
                  margin-bottom: 10px;
                  padding-top: 15px;
                  padding-bottom: 10px;
                  background-color: #d64e05;
                "
              >
                <h6
                  style="color: white; font-weight: bold; letter-spacing: 2px"
                >
                  FAQ
                </h6>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  </BaseLayout>
</template> 