<script>
import BaseLayout from "@/layouts/BaseLayout";
export default {
  name: 'BlogSingle',
  head: {    
    link: function (){ 
      return [
        { rel: 'canonical', href:'http://158.255.47.199/blog/' + this.blogCode}
      ]
    }
  },
  props: {
    blogCode: {
      type: String,
      required: true
    }
  },
  components: {
    BaseLayout
  },
  data() {
    return {
      blogData: {},
    };
  },
  mounted() {
    this.loadBlogSingle();
  },
  methods: {
    loadBlogSingle() {
      this.changeLoader(true);
      this.ApiService.get("blog/" + this.blogCode)
        .then((resp) => {
          this.blogData = resp.data;
          this.blogData.imageUrl = this.blogData.imageUrl.replace('10000//Blog', '10000///Blog');
        })
        .finally(() => {
          this.changeLoader(false);
        });
    }
  },
};
</script>

<template>
  <BaseLayout>
  <div class="blog">
    <!-- STRUKTUR ISI KONTEN BLOG DARI CMS --> 
    <div class="blog-content">
      <div class="blog-section-container">
        <div class="blog-section-content blog-padding">
          <b-row>
            <b-col cols="12">
              <!-- STRUKTUR JUDUL BLOG --> 
              <b-row>
                <b-col class="blog-title">
                  <router-link class="text-light" :to="{ path: '/Blog'  }">
                    <h2>{{ blogData.title }}</h2>
                  </router-link>                  
                </b-col>              
              </b-row>

              <!-- STRUKTUR TANGGAL BLOG --> 
              <b-row>
                <b-col class="blog-title">
                  <h4>{{ blogData.recordDate | localDate }}</h4>              
                </b-col>
              </b-row>              

              <!-- STRUKTUR GAMBAR BLOG --> 
              <b-img :src="blogData.imageUrl" fluid-grow :alt="blogData.title"></b-img>
              
              <!-- STRUKTUR ISI TEXT BLOG --> 
              <b-row>
                <b-col class="blog-content">
                  <div v-html="blogData.content" class="text-light" style="color:white;" />                 
                </b-col>
              </b-row>

            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    
    <!-- STRUKTUR ISI KONTEN BLOG DARI HARDCODE --> 
    <!-- <div class="blog-content">
      <div class="blog-section-container">
        <div class="blog-section-content blog-padding">
        
          <b-row v-show="this.blogCode == 'Blackjack'">
            <b-col cols="12">
              <b-row>
                <b-col class="blog-title">                  
                  <router-link class="text-light" :to="{ path: '/Blog'  }">
                    <h2><b>Cara Bermain Blackjack</b></h2>
                  </router-link>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="blog-title">
                  
                  <h6><i>{{new Date().toLocaleString()}}</i></h6>
                </b-col>
              </b-row>
              
              <b-img alt="Cara Bermain Blackjack" src="https://wallpapercave.com/wp/wp2180156.jpg" fluid-grow></b-img>
              <b-row>
                <b-col class="blog-content">
                 
                  <div style="color:white;">

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:2%;">
                      <b-col cols="12" md="4" align-v="center">
                        <b-img src="https://cdn.discordapp.com/attachments/775251064621367316/789424184002215966/unknown.png" fluid-grow style="width:100%;" alt="Cara Bermain Blackjack"></b-img>
                      </b-col>
                      <b-col cols="12" md="8" align-v="center">
                        <b-row>
                          <h6 style="letter-spacing:0.5px; font-size:18px;"><b>1. Pelajari nilai kartu</b></h6>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            Dalam Blackjack, masing-masing kartu memiliki nilai masing-masing. Tujuan dari permainan ini adalah untuk mengalahkan Dealer (Bandar) dan juga mencegah kartu Anda terbakar dimana memiliki jumlah 22 atau lebih. Berikut adalah nilai-nilai setiap kartu dalam permainan Blackjack:
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	<i>Kartu angka</i>: Angka yang tertera pada kartu sama jumlahnya dengan nilai kartu tersebut (kartu 2 sampai 10).
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	<i>Kartu Kerajaan</i>: Untuk kartu ini memiliki nilai yaitu 10.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	<i>Kartu As</i>: Kartu As dapat bernilai 1 atau 10 tergantung kegunaannya. Namun biasanya kartu As ini diberi nilai 11, namun semua bisa berubah menjadi nilai 1 jika itu diperlukan.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Jika Anda memiliki kartu As dengan kartu raja atau kartu yang memiliki nilai 10, maka Anda langsung mendapatkan Blackjack.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Tangan pemegang kartu As disebut tangan "halus".
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:2%;">
                      <b-col cols="12" md="4" align-v="center">
                        <b-img alt="Cara Bermain Blackjack" src="https://cdn.discordapp.com/attachments/775251064621367316/789424206118256660/unknown.png" fluid-grow style="width:100%;"></b-img>
                      </b-col>
                      <b-col cols="12" md="8" align-v="center">
                        <b-row>
                          <h6 style="letter-spacing:0.5px; font-size:18px;"><b>2. Pelajari pilihan anda</b></h6>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            Biasanya sebuah kasino mendapatkan keuntungan dari permainan ini dengan menjadikan pemain sebagai pemasang pertama. Jika seorang pemain memiliki jumlah kartu lebih dari 21 maka Dealer akan langsung mengambil uang taruhan pemain tersebut. Dan jika Dealer mendapat jumlah kartu yang lebih dari 21 juga, maka uang taruhan tetap menjadi milik Dealer. Dealer memiliki kewenangan untuk membuka kartunya paling akhir. Ada dua pilihan dasar saat Anda mendapatkan giliran untuk bermain, yaitu:
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	<i>Hit</i>: Mengambil kartu lain. Anda dapat mengambil kartu lain hingga Anda mencapai jumlah 21.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	<i>Stand</i>: Anda tidak mengambil kartu tambahan.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Namun ada beberapa opsi lain yang dapat Anda ambil saat Anda mendapat giliran untuk bermain, yaitu:
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	<i>Insurance (Asuransi)</i>: Apabila kartu Dealer yang terbuka adalah kartu As, pemain boleh membeli insurance (Asuransi) yang nilainya setengah uang yang ditaruhkan. Pemain diperkenankan membeli insurance bila pemain menduga kartu tertutup Dealer itu bernilai 10. Bila benar Dealer mendapat Blackjack, insurance itu dibayar 2 banding 1. Sebaliknya, jika Dealer tidak mendapatkan Blackjack, insurance itu hilang dan permainan dilanjutkan seperti biasanya.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	<i>Double Down</i>: Hal ini berlaku jika Anda ingin melipatgandakan taruhan Anda, dan Anda hanya diberi kesempatan untuk mengambil hanya satu kartu tambahan. Hal ini bisa Anda lakukan jika dua kartu Anda hanya bernilai 8-11.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	<i>Split (Pisah Kartu)</i>: Pemain memisahkan dua kartu pertama menjadi dua pegangan terpisah, manjadi 2 pemasangan taruhan dan menggandakan taruhannya. Kedua kartu yang dipisahkan itu harus bernilai sama (yaitu sepasang 8 dan 8, King dan Queen dsb). Pada kondisi split ini, kartu As dan kartu nilai 10 dihitung sebagai "21", bukannya Blackjack. –Dalam kata lain, mereka tidak akan dibayar 3 banding 2, namum masih mengalahkan pegangan Dealer yang mempunyai nilai 20 atau kurang. Lebih lagi, sesudah memisah satu pAsang As-As, pemain akan hanya menambah satu kartu untuk setiap kartu As.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	<i>Surrender (Tidak mengikuti permainan)</i>: Pada banyak kasino, Anda dapat (sebelum bermain dan setelah menentukan apakah Dealer memiliki Blackjack) memilih untuk menyerah dari setengah taruhan Anda tanpa bermain. Menyerah hanya dapat dilakukan ketika Dealer menunjukkan kartu 9-As, dan pemain memiliki kartu 5-7 atau kartu 12-16.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Saat Dealer memiliki kartu As, maka dia akan langsung membuka kartu berikutnya untuk melihat apakah dia mendapatkan Blackjack.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:2%;">
                      <b-col cols="12" md="4" align-v="center">
                        <b-img src="https://cdn.discordapp.com/attachments/775251064621367316/789424226082750484/unknown.png" fluid-grow style="width:100%;" alt="Cara Bermain Blackjack"></b-img>
                      </b-col>
                      <b-col cols="12" md="8" align-v="center">
                        <b-row>
                          <h6 style="letter-spacing:0.5px; font-size:18px;"><b>3. Cobalah untuk memenangkan permainan</b></h6>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            Jika Anda ingin menang dalam permainan Blackjack, maka Anda harus memiliki jumlah kartu 21 (Blackjack) atau kartu Anda bernilai lebih tinggi daripada Dealer namun tidak lebih dari 21.
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Dealer akan memberi giliran pemain hingga salah satunya memutuskan bertahan. Selanjutnya dealer akan membuka kartunya, dan ini menentukah akhir permainan. Tentu saja, setiap kartunya berbeda. Biasanya, pemain meniru dealer pada kartu 16 atau kurang. Namun, strategi ini buruk. Strategi tidak pernah bangkrut sedikit lebih bagus, tetapi tetap saja strategi yang buruk. 
                          </span>
                        </b-row>
                        <b-row>
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Kelebihan utama kasino (bandar) adalah pemain harus mengeluarkan kartu terlebih dahulu. Jika pemain bangkrut (kartunya lebih dari 21), kasino akan segera mengambil alih uangnya. Jika kasino bangkrut akibat kartu yang sama, pemain tetap akan kalah. Dealer adalah pemain terakhir yang mengeluarkan kartu.
                          </span>
                        </b-row>
                        
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:2%;">                      
                      <b-col cols="12" align-v="center">
                        <b-row style="background-color:white;">
                          <h6 style="letter-spacing:0.5px; font-size:22px; color:#8d1517; padding:2% ; margin:0%;"><b>Strategi & Peraturan</b></h6>
                        </b-row>
                        <b-row style="margin-top:10px;">
                          <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold;">
                            1. Pahami "aturan yang ada pada setiap kasino". 
                          </span>
                        </b-row>
                        <b-row style="margin-left:20px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            Setiap kasino memiliki aturan bermain Blackjack yang berbeda-beda, jadi cobalah untuk memahami peraturan untuk bermain Blackjack di tiap kasino yang Anda pilih untuk bermain Blackjack.
                          </span>
                        </b-row>
                        <b-row style="margin-left:20px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Dealer biasanya akan memberitahukan terlebih dahulu aturan dalam bermain Blackjack ditempat mereka sehingga tidak membingungkan Anda
                          </span>
                        </b-row>

                        <b-row style="margin-top:10px;">
                          <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold;">
                            2. Pahami aturan dasar. 
                          </span>
                        </b-row>
                        <b-row style="margin-left:20px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            Anda tentu harus mengerti terlebih dahulu aturan dasar bermain Blackjack seperti yang telah dijelaskan diatas sebelum Anda bisa mengikuti permainannya.
                          </span>
                        </b-row>

                        <b-row style="margin-top:10px;">
                          <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold;">
                           3. Pahami cara nilai dari setiap kartu. 
                          </span>
                        </b-row>
                        <b-row style="margin-left:20px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            Seperti yang telah dijelaskan sebelumnya, kartu kerajaan yaitu King, Queen, Jack dan kartu 10 bernilai 10. Kartu As dapat bernilai 1 atau 11, tergantung dari kondisi yang diinginkan pemain. Semua sisa kartu 2 sampai 9, dihitung berdasarkan angka yang tercetak pada kartu tersebut.
                          </span>
                        </b-row>

                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:2%;">                      
                      <b-col cols="12" align-v="center">
                        <b-row style="background-color:white;">
                          <h6 style="letter-spacing:0.5px; font-size:22px; color:#8d1517; padding:2% ; margin:0%;"><b>Saran</b></h6>
                        </b-row>
                        <b-row style="margin-top:10px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Jika Dealer telah membuka kartu pertama dan keluar kartu kerajaan atau As, maka pertimbangkan untuk tidak mengikuti permainan. Apalagi jika kartu yang Anda miliki hanya bernilai 15 kebawah, karena kemungkinan besar Anda akan kalah.
                          </span>
                        </b-row>

                        <b-row style="margin-top:10px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Usahakan untuk terus bermain jika kartu Anda bernilai diatas 17 karena kemungkinan Anda untuk menang cukup besar.
                          </span>
                        </b-row>
                        
                        <b-row style="margin-top:10px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                           •	Jika kaertu Anda bernilai 11 kebawah, cobalah untuk melakukan "double down".
                          </span>
                        </b-row>
                        
                        <b-row style="margin-top:10px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                           •	Usahakan untuk tidak melakukan "hit" saat kartu Anda telah bernilai 12. Karena jika Anda tetap melakukan hit maka Anda akan mendapatkan kemungkinan sebesar 30% untuk kalah, terutama jika kartu hit dari Dealer menunjukan nilai 4-6.
                          </span>
                        </b-row>

                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:2%;">                      
                      <b-col cols="12" align-v="center">
                        <b-row style="background-color:white;">
                          <h6 style="letter-spacing:0.5px; font-size:22px; color:#8d1517; padding:2% ; margin:0%;"><b>Perhatian</b></h6>
                        </b-row>
                        <b-row style="margin-top:10px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Jangan bertaruh saat Anda dalam keadaan mabuk karena kemungkinan Anda akan kehilangan banyak uang.
                          </span>
                        </b-row>

                        <b-row style="margin-top:10px;">
                          <span style="font-size:14px; text-align: justify; text-align-last: left;">
                            •	Jangan terus memaksakan untuk bertaruh jika Anda sudah tidak memiliki uang.
                          </span>
                        </b-row>
                        
                      </b-col>
                    </b-row>
                    
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row v-show="this.blogCode == 'Capsun'">
            <b-col cols="12">
              <b-row>
                <b-col class="blog-title">
                  
                  <router-link class="text-light" :to="{ path: '/Blog'  }">
                  <h2><b>Cara Bermain Capsa Susun</b></h2>
                  </router-link>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="blog-title">
                  
                  <h6><i>{{new Date().toLocaleString()}}</i></h6>
                </b-col>
              </b-row>
             
              <b-img alt="Cara Bermain Capsa Susun" src="https://cdn.discordapp.com/attachments/775251064621367316/789443477921726464/cubes_cards_poker_combination_11561_1920x1080.png" fluid-grow></b-img>
              <b-row>
                <b-col class="blog-content">
                  
                  <div style="color:white;">

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Cara bermain capsa susun sangatlah mudah kita terapkan saat ini, hanya berlatih secara rutin pada agen resmi kami dan belajar banyak strategi bermain dengan cara banyak membaca artikel tentang panduan main.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Para pakar judi online mengatakan besarnya kemenangan yang kita dapatkan dalam bermain judi online, tergantung seberapa banyak kita membaca panduan tips, trik dan strategi bermain dalam sebuah artikel.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Ingin mengetahui panduan bermain capsa agar menang, maka tepat sekali karena pada kesempatan kali ini admin ingin membahas tentang cara bermain capsa dengan menggunakan modal kecil.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Sebelum anda memahami cara bermain capsa susun, maka ada baiknya anda mempelajari 3 tingkatan dalam penyusunan kartu pada agen kami seperti: 5-5-3
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        • Tingkatan pertama yaitu yang paling bawah(5) Kartu tertinggi seperti menyusun kartu dengan kombinasi Full House. <br/>
                        • Tingkatan kedua yaitu yang bagian tengah(5) Kartu tertingg kedua setelah kartu dia atas seperti menyusun kartu dengan kombinasi High Card As. <br/>
                        • Tingkatan ketiga yaitu paling atas(3) kartu terendah diantara 2 kartu di atas menyusun kartu dengan kombinasi High Card King. <br/>
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Bagaimana cukup mudah bukan memahami penyusunan kartu dalam bermain capsa, tentu penjelasan di atas sebagai dasar awal dalam bermain permainan tersebut. Namun jika ingin memahami lebih jelas lagi silahkan baca artikel di bawah ini.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:18px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        Cara Bermain Capsa Susun 
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Permainan capsa bisa dikatakan sebagai game beradu strategi, karena untuk menang dalam permainan ini membutuhkan banyak skill dalam penyusunan kartu dengan baik supaya menang.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Jika merasa penasaran dengan strategi bermain capsa agar menang, maka jangan kemana-mana karena di bawah ini kami akan membahas tentang cara bermain capsa susun pada situs kami.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Berikut ini cara bermain capsa susun:
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        – Mempunyai Target Untuk Menang, sebelum menaruh bet untuk bertarung pada agen resmi yang anda inginkan, kami sarankan untuk mempunyai target kemenangan guna untuk memotivasi anda dalam bermain game tersebut.
                        Jika anda kurang mengerti tentang target kemenangan yang kami jelaskan, contoh jika anda melakukan deposit sebesar Rp.10.000 seperti maksimal deposit pada agen kami dan akan melakukan penarikan dana jika chip anda sudah mencapai Rp.210.000 maka itu yang dinamakan target kemenangan.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        – Mempunyai Modal Besar, modal besar sangat berpengaruh dalam permainan capsa susun, karena dengan modal besar kita bisa mendapatkan peluang yang lebih besar dan dapat melakukan teknik gertakan dengan jumlah bet yang besar sehingga membuat lawan down.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        – Berpindah Meja, jika dalam bermain judi online anda terus menerus mengalami kekalahan, maka langkah yang harus anda lakukan ialah berpindah meja supaya mendapatkan keberuntungan dan bisa memenangkan permainan.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        – Melihat Permainan Lawan, langkah ini banyak digunakan para pemain judi umumnya, karena dengan langkah ini anda dapat menentukan cara bermain yang ingin anda lakukan untuk periode selanjutnya.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        – Bermain Santai, dalam bermain judi online terutama capsa susun anda harus mempunyai pikiran yang tenang atau bermain dengan santai, agar cara bermain anda tidak terburu-buru dalam mengambil tindakan yang mengakibatkan banyak kekalahan.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Melakukan Penarikan Dana Secara Bertahap, maksud kami dengan point ini ialah bagi anda para pemain judi online yang sedang melakukan taruhan, kami anjurkan untuk untuk melakukan withdraw dari hasil dana kemenangan yang anda miliki. <br/><br/>
                        Contohnya jika anda telah melakukan deposit sebesar Rp.25.000 dan selama bermain mengalami kenaikan sebesar 75.000 maka kami sarankan untuk melakukan penarikan dana sebesar Rp.50.000. <br/><br/>
                        Demikian penjelasan kami tentang cara bermain capsa susun agen termurah IDN Play, semoga apa yang kami berikan dapat bermanfaat bagi anda terkhusus untuk anda para pemain baru dalam bermain judi online capsa. <br/><br/>
                        Sekian yang dapat kami sampaikan, terima kasih atas segala waktunya.<br/><br/>
                      </span>                      
                    </b-row>
                    
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row v-show="this.blogCode == 'Ceme'">
            <b-col cols="12">
              <b-row>
                <b-col class="blog-title">
                  
                  <router-link class="text-light" :to="{ path: '/Blog'  }">
                  <h2><b>Cara Bermain Ceme Keliling</b></h2>
                  </router-link>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="blog-title">
                  
                  <h6><i>{{new Date().toLocaleString()}}</i></h6>
                </b-col>
              </b-row>
             
              <b-img alt="Cara Bermain Ceme Keliling" src="https://cdn.discordapp.com/attachments/775251064621367316/789453466337673227/21213.png" fluid-grow></b-img>
              <b-row>
                <b-col class="blog-content">
                 
                  <div style="color:white;">

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Sebelum memahami lebih luas dalam bermain ceme keliling, alangkah baiknya anda memahami dasar permainan tersebut seperti: memahami jenis kartu, cara menghitung kartu dan mengenal jenis kartu spesial.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Maka untuk kesempatan kali ini admin ingin membahas tentang memahami jenis kartu.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Untuk memahami jenis kartu pada permainan ini sama halnya belajar jenis kartu pada permainan ceme dan permainan domino qq, semuanya memiliki 7 seri dalam satu set pada permainan tersebut.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold;">
                        1. Memahami jenis kartu pada permainan ceme keliling:
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        A. Seri kosong (0)
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Dalam satu set kartu terdapat 7 kartu yang memiliki kosong (0) <br/>
                        Contoh. 0|0, 0|1, 0|2, 0|3, 0|4, 0|5, 0|6.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        B. Seri satu (1)
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Dalam satu set kartu terdapat 6 kartu yang memiliki bulatan (1) <br/>
                        Contoh. 1|1, 1|2, 1|3, 1|4, 1|5, 1|6.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        C. Seri dua (2)
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Dalam satu set kartu terdapat 5 kartu yang memiliki bulatan (2) <br/>
                        Contoh. 2|2, 2|3, 2|4, 2|5, 2|6.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        D. Seri tiga (3)
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Dalam satu set kartu terdapat 4 kartu yang memiliki bulatan (3) <br/>
                        Contoh. 3|3, 3|4, 3|5, 3|6.
                      </span>                      
                    </b-row>
                    
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        E. Seri empat (4)
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Dalam satu set kartu terdapat 3 kartu yang memiliki bulatan (4) <br/>
                        Contoh. 4|4, 4|5, 4|6.
                      </span>                      
                    </b-row>
                    
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        F. Seri lima (5)
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Dalam satu set kartu terdapat 2 kartu yang memiliki bulatan (3) <br/>
                        Contoh. 5|5, 5|6.
                      </span>                      
                    </b-row>
                    
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        G. Seri enam (6)
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Dalam satu set kartu terdapat 1 jenis kartu yang memiliki bulatan (6) <br/>
                        Contoh. 6|6.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold;">
                        2. Cara Menghitung Kartu Pada Permainan Ceme Keliling
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; letter-spacing:0.5px;">
                        o	Untuk anda yang belum mengerti tentang cara menghitung kartu pada permainan ceme keliling, maka tepat sekali karena di bawah ini kami akan membahasnya secara lengkap. <br/>
                        o	Cara menghitung permainan ceme keliling tentu sangatlah mudah, tinggal menghitung jumlah bulatan pada sisi bawah kartu dan atas kartu yang berada pada sebelah kiri kemudian menjumlahkannya dengan kartu yang berada pada sebelah kanan. <br/>
                        o	Maka kalian akan mendapatkan hasil dari total jumlah kartu tersebut, kemudian perlu anda pahami bahwa salam permainan ini nilai tertinggi adalah (Sembilan) 9. Nah jika kartu yang anda miliki lebih dari angka sembilan maka total hasil tetap di mulai dari angka 0-9. <br/>
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold;">
                        3. Mengenal Jenis Kartu Spesial Ceme Keliling
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; letter-spacing:0.5px;">
                        Dalam bermain ceme keliling terdapat jenis kartu spesial jika tidak mengerti silahkan lihat di bawah ini:
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        A. Kartu Enam Dewa (6666)
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Contoh. Kartu bandar 0|6, 1|5, kartu kartu member 2|4, 3|3
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        B. Kartu Balak
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Contoh. Kartu bandar 0|0, 5|5 dan kartu member 1|1, 3|3.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        C. Kartu Murni Besar
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Contoh. Kartu bandar 4|6, 5|6 dan kartu member 5|5, 6|6. Kedua pihak tersebut harus memperoleh jumlah kartu yang besar 39-43.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; letter-spacing:0.5px;">
                        Bagaimana cukup mudah bukan memahami cara bermain ceme keliling pada artikel kami, jika anda sedang mencari solusi tentang perjudian online bisa membaca semua artikel yang kami berikan pada agen kami terpercaya. <br/> <br/>
                      </span>                      
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row v-show="this.blogCode == 'Domino'">
            <b-col cols="12">
              <b-row>
                <b-col class="blog-title">
                  
                  <router-link class="text-light" :to="{ path: '/Blog'  }">
                  <h2><b>Cara Bermain Domino</b></h2>
                  </router-link>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="blog-title">
                 
                  <h6><i>{{new Date().toLocaleString()}}</i></h6>
                </b-col>
              </b-row>
              
              <b-img alt="Cara Bermain Domino" src="https://cdn.discordapp.com/attachments/775251064621367316/789462114770878484/asdasdrt.png" fluid-grow></b-img>
              <b-row>
                <b-col class="blog-content">
                  
                  <div style="color:white;">

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Permainan Domino dimainkan dengan menggunakan kartu domino, dimana 1 set kartu domino terdiri dari 28 kartu. Domino umumnya dapat dimainkan sampai dengan 4 pemain yang berarti masing masing pemain akan menerima 7 buah kartu domino. Pemain secara berurutan membuang kartu dimeja, pemain pertama yang kartunya habislah pemenangnya. Namun untuk membuang kartu juga tidak bisa sembarang, kamu harus memperhatikan nilai / titik pada kartu mu. Nilai pada salah satu sisi kartu mu harus sama dengan salah satu kartu paling ujung yang berada di meja. Perhatikan contohnya pada gambar berikut :
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Domino" src="https://cdn.discordapp.com/attachments/775251064621367316/789813690576142346/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Karena kartu paling ujung dimeja bernilai 5 atau 1 maka kamu hanya dapat membuang kartu yang memiliki nilai tersebut.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:20px; font-weight:bold; text-align: justify; text-align-last: left;">
                        <i>Cara Menang Main Domino Teknik Profesional</i>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Masyarakat kita dari dulu sampai sekarang lebih paham jika kita sebut kartu Domino daripada kartu domino, padahal Domino itu adalah nama  permainan dan kartu domino itu baru lah jenis kartu yang digunakan. <br/><br/>
                        Dalam setiap set kartu domino yang umumnya dipergunakan untuk bermain Domino, terdapat 28 buah kartu. Masing – masing kartu terdiri dari 2 bagian dengan bulatan – bulatan di bagian atas dan bawah serta dipisahkan oleh sebuah garis halus. Yang beredar di Indonesia pada umumnya adalah jenis kartu dengan bulatan berwarna merah.
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Domino" src="https://cdn.discordapp.com/attachments/775251064621367316/789815263834275851/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Kartu Domino paling kecil bernilai 0, di mana di dalam kartu tersebut hanya terdapat garis lurus saja alias ada bulatan sama sekali. Nilai terbesar dari sebuah kartu Domino adalah 12, dimana terdiri dari 6 bulatan masing – masing di bagian atas dan bagian bawah kartu ini biasa disebut juga dengan julukan balak 6. <br/><br/>
                        Sebutan untuk kartu balak diberikan kepada kartu yang memiliki bulatan sama di atas dan di bawahnya, 1/1 , 2 / 2, 3 / 3, 4 / 4, 5 / 5, 6 / 6 itu lah jenis kartu balak yang terdapat dalam jenis kartu domino ini.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:20px; font-weight:bold; text-align: justify; text-align-last: left;">
                        <i>Tips & Trik Main Domino Professional</i>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Banyak pemain yang pada awalnya asal asalan dalam membuang kartu Domino, Asal ada angka yang cocok maka langsung di buang. Padahal hal tersebut sangat fatal dan dapat membuatmu yang semestinya dapat memenangkan permainan malah berbalik kalah. Bila kamu tertarik dengan permainan ini maka kamu wajib mengetahui trik main Domino professional untuk memenangkan permainan Domino dengan pasti. <br/><br/>
                        Bila kamu melawan pemain yang tidak mengetahui trik bermain Domino ini, kami jamin kalau kamu dapat dengan mudah mengalahkan mereka. Berikut trik bermain Domino secara professional yang terbukti ampuh :
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:18px; font-weight:bold; text-align: justify; text-align-last: left;">
                        <i>1. Amati Kartu Domino Yang Kamu Miliki</i>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Dalam awal permainan Domino, setiap pemain akan dibagikan 7 buah kartu domino yang berbeda secara acak. Bila saat itu kamu mendapatkan sekitar 5 kartu dengan angka yang sama maka kamu memiliki peluang menang yang tinggi. Contoh 5 kartu dengan salah satunya sisinya memiliki angka 1 sebagai berikut (1|0), (1|2), (1|5) dan (1|6). Sebab bila kamu memiliki 5 kartu berangka 1 di salah satu sisinya, kartu yang berangka 1 hanya tersisa 2 lagi. Jadi ketika angka 1 keluar, pemain lain akan cenderung melakukan pass sebab kartu tersebut sebagian besar berada di tangan mu. <br/><br/>
                        Namun usahakan untuk tidak menutup kartu yang memiliki angka tersebut di meja dengan kartu kita sendiri. Sebaliknya bila kamu dapat menutup kartu dengan ujung berangka 1 maka langsunglah melakukannya. Usahakan agar setiap kartu yang ada di meja berujung 1. Hal ini agar lawan mu tidak dapat membuang kartu dan hanya dapat melakukan pass. Contohnya seperti gambar dibawah ini :
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Domino" src="https://cdn.discordapp.com/attachments/775251064621367316/789816451011051550/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Pada contoh diatas, kartu di meja memiliki ujung 5 dan 1. Bila posisi mu memegang banyak kartu dengan angka 1 maka jangan menutup dengan angka 1. Namun usahakan agar ujungnya terus berangka 1. Ingatlah baik baik cara ini, sebab ini merupakan salah satu cara pintar main Domino yang sangat efektif.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:18px; font-weight:bold; text-align: justify; text-align-last: left;">
                        <i>2. Utamakan Membuang Kartu Besar / Balak</i>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Bila kartu yang kamu dapatkan tidak seperti contoh diatas atau kurang bagus maka prioritaskan untuk membuang kartu besar dan balak. Hal ini karena bila terjadi Dominoh maka kamu otomatis kalah jika masih memegang kartu kartu besar. Terutama bila kamu memiliki balak 0, 5 atau 6, kamu wajib membuang kartu tersebut terlebih dahulu. Sebab selain memiliki nilai yang besar, kartu balak juga akan sulit untuk dibuang. <br/><br/>
                        Meski akan sulit untuk memenangkan permainan bila kartu mu kurang bagus, namun kamu tetap memiliki kesempatan pada Dominoh. Bila kamu membuang semua kartu besar dan balak serta hanya memiliki kartu kecil, kesempatan untuk memenangkan permainan lebih besar. Sebab seperti yang sudah ditulis pada cara main Domino diatas, saat Dominoh pemain dengan angka kartu terkecil yang menang. Namun jika tidak memungkinkan untuk terjadinya Dominoh maka kamu harus teliti dalam memilih kartu untuk dibuang.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:18px; font-weight:bold; text-align: justify; text-align-last: left;">
                        <i>3. Bunuh Kartu Balak Lawan</i>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Sudah dikatakan diatas kalau memegang kartu balak 0, 5 dan 6 akan sangat beresiko. Bila kamu memegang kartu tersebut maka cepat cepatlah buang. Sedangkan bila kamu tidak memegangnya maka matikanlah kartu tersebut. Mematikan kartu berarti membuat kartu tersebut tidak bisa dibuang lagi, sehingga akan terus dipegang sampai Dominoh. Sebab bila balak 0, 5 dan 6 mati maka pemain yang memegang kartu tersebut sudah akan otomatis kalah. Dengan menyingkirkan pesaing lain tentu akan membuat mu semakin mudah untuk menang. <br/><br/>
                        Untuk membunuh kartu balak kamu harus mentutup kartu yang ingin dibunuh. Contoh bila kamu ingin membunuh balak 5 maka usahakan agar kartu di meja tidak berujung 5. Atau kamu juga dapat langsung mentutup kartu yang berujung 5 dengna kartu lain. Hal ini agar pemain lain tidak memiliki kesempatan untuk mengeluarkan balak 5. Meski teknik bermain Domino yang satu ini cukup sulit untuk dilakukan namun kamu tetap harus mencobanya. Sebab kartu balak 0, 5 dan 6 memiliki dampak yang sangat besar diakhir permainan. Alasan mengapa sulit untuk membunuh kartu lawan adalah karena untuk melakukannya harus ada kerja sama dengan pemain lain. Contoh bila kamu terus menutup angka 6 namun pemain lain membuang kartu yang berujung 6 maka usaha mu sia sia.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:18px; font-weight:bold; text-align: justify; text-align-last: left;">
                        <i>4. Perhatikan Kartu Yang Telah Dibuang</i>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Ini merupakan salah satu cara bermain Domino yang sangat penting bila kamu ingin menang. Usahakan untuk terus memperhatikan kartu apa saja yang telah dibuang oleh pemain. Sebab bila kamu mengetahui kartu apa saja yang telah dibuang, kamu dapat mengetahui kartu milik pemain lain. <br/><br/>
                        Rumus untuk menghitung kartu Domino sebenarnya cukup mudah. Contohnya kamu memegang 4 kartu yang memiliki angka 2 dan sudah ada 3 kartu dengan angka 2 di meja. Jika kamu membuang kartu yang berujung angka 2 berarti semua pemain hanya dapat melakukan pass. Sebab kamu satu satunya pemain yang memegang kartu dengan angka 2. Dengan begitu kartu ditangan mu akan lebih cepat habis dibandingkan pesaing mu. Karena mereka tidak dapat membuang kartu apa apa dan hanya dapat menunggumu membuang kartu yang lain selain 2.<br/><br/>
                        Itulah panduan cara bermain Domino serta tips & trik bermain Domino yang harus kamu ketahui. Permainan ini dimainkan dengan kartu domino, kamu dapat membaca asal permainan domino bila tertarik dengan kartu domino ini. Kartu domino ini juga digunakan dalam cara bermain domino qq. Sekian cara bermain Domino serta trik bermain Domino yang dapat kamu gunakan untuk mengalahkan teman teman mu saat bermain.<br/><br/>
                      </span>
                    </b-row>

                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row v-show="this.blogCode == 'Baccarat'">
            <b-col cols="12">
              <b-row>
                <b-col class="blog-title">
                 
                  <router-link class="text-light" :to="{ path: '/Blog'  }">
                  <h2><b>Cara Bermain Baccarat</b></h2>
                  </router-link>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="blog-title">
                 
                  <h6><i>{{new Date().toLocaleString()}}</i></h6>
                </b-col>
              </b-row>
             
              <b-img alt="Cara Bermain Baccarat" src="https://cdn.discordapp.com/attachments/775251064621367316/789687174525091840/212133.png" fluid-grow></b-img>
              <b-row>
                <b-col class="blog-content">
                 
                  <div style="color:white;">

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">1. Pelajari posisi taruhan.</strong> <br/> Anda dapat bertaruh di posisi Bankir, Pemain, atau bahkan keduanya. Taruhan harus dipasang sebelum kartu dibagikan ke Pemain atau Bankir.
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Baccarat" src="https://cdn.discordapp.com/attachments/775251064621367316/789818095224750090/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">2. Pelajari cara pembagian kartu.</strong> <br/> Salah seorang peserta/bandar bertanggung jawab atas dek dan bertugas membagikan kartu. Kartu dibagikan di meja secara terbuka, pertama-tama ke kotak Pemain, lalu ke Bankir. Untuk pertama kali, masing-masing peserta mendapat dua kartu.
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Baccarat" src="https://cdn.discordapp.com/attachments/775251064621367316/789818922090233856/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">3. Umumkan total poin kartu untuk kedua posisi.</strong> <br/> Poin kartu 10 dan kartu gambar = 0, As = 1, dan semua kartu lain poinnya sesuai dengan angka masing-masing. Jika total poin lebih dari 10, yang dipakai adalah digit ke-2. Misalnya, kartu 9 dan 6 jika dijumlahkan hasilnya 15. Berarti total poinnya 5. Untuk memenangkan permainan ini, Anda harus bertaruh pada posisi yang total poinnya paling mendekati angka 9.
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Baccarat" src="https://cdn.discordapp.com/attachments/775251064621367316/789819235886694410/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">4. Pahami arti kemenangan “murni.”</strong> <br/> Kemenangan murni terjadi Jika total poin dua kartu pertama bernilai 8 atau 9, baik di kotak Pemain atau Bankir. Pada saat ini terjadi, permainan selesai. Semua taruhan yang sudah dipasang akan dihitung dan dibayar.
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Baccarat" src="https://cdn.discordapp.com/attachments/775251064621367316/789819750300647434/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">5. Pembagian kartu ketiga ditentukan oleh total poin kartu.</strong> <br/> Pemain mendapat giliran pertama. Pemain dengan total poin 8 atau 9 tidak mendapat tambahan kartu. Total poin 6-7 tidak harus meminta kartu tambahan. Total poin 0-5, kartu ketiga dibagikan ke Pemain, kecuali total poin kartu Bankir 8 atau 9 (Bankir langsung dinyatakan sebagai pemenangnya).
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Baccarat" src="https://cdn.discordapp.com/attachments/775251064621367316/789820014022754315/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">6. Pelajari aturan pemberian kartu ketiga untuk posisi Bankir.</strong> <br/> Jika Pemain sudah selesai/tidak menambah kartu, giliran Bankir bermain. Jika total poin kartu Bankir 0-5, kartu ketiga dibagikan. Jika total poin 6-7, tidak ada pembagian kartu ketiga. Posisi-posisi lain bergantung pada kartu ketiga yang dibagikan ke Pemain:
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Jika kartu ketiga Pemain adalah 9, 10, kartu gambar, atau As, Bankir diberi kartu tambahan saat total poin kartunya 0-3. Total poin 4-7 tidak mendapat tambahan kartu. <br/>
                        •	Jika kartu ketiga Pemain adalah 8, Bankir mendapat kartu tambahan saat total poin kartunya 0-2. Total poin 3-7 tidak mendapat tambahan kartu. <br/>
                        •	Jika kartu ketiga Pemain adalah 6 atau 7, Bankir mendapat kartu tambahan saat total poinnya 0-6. Total poin 7 tidak mendapat tambahan kartu. <br/>
                        •	Jika kartu ketiga Pemain adalah 4 atau 5, Bankir mendapat kartu tambahan saat total poinnya 0-5. Total poin 6-7 tidak mendapat tambahan kartu. <br/>
                        •	Jika kartu ketiga Pemain adalah 2 atau 3, Bankir mendapat kartu tambahan saat total poinnya 0-4. Total poin 5-7 tidak mendapat tambahan kartu. <br/>
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Baccarat" src="https://cdn.discordapp.com/attachments/775251064621367316/789820620970917908/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">7. Begitu semua kartu selesai dibagikan, hitung dan tentukan pemenangnya.</strong> <br/> Pemenangnya adalah yang total poin kartunya paling mendekati 9. Jika terjadi seri, tidak ada pemenang. Kadang peserta yang bertaruh di pihak Bankir tetap mendapat komisi meskipun kalah.
                      </span>
                    </b-row>

                    <b-row class="center justify-content-center" align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <b-img alt="Cara Bermain Baccarat" src="https://cdn.discordapp.com/attachments/775251064621367316/789821506817228800/unknown.png" fluid-grow></b-img>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:20px; text-align: justify; text-align-last: left;font-weight:bold;">
                        TIPS
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Jangan bertaruh terus-menerus. Cermati posisi-posisi yang lampau. Pasang taruhan Anda pada saat terjadi kemenangan berturut-turut atau ketika peluang kemenangan Pemain atau Bankir besar. <br/>
                        •	Jangan bertaruh melawan pihak yang menang berturut-turut. <br/>
                        •	Pada kartu 8 dek, peluang kemenangan Pemain: 1,06%, peluang kemenangan Bankir: 1,24%, dan peluang seri: 14,36%. <br/>
                        •	Peluang kemenangan di Bakarat bergantung pada jumlah dek kartu yang digunakan. Peluangnya adalah sebagai berikut:<br/>
                        •	Coba hitung nilai kartu setiap posisi dan jika menurut insting Anda kartu berikutnya bernilai rendah atau kartu gambar, ubah taruhan Anda.<br/>
                        •	Begitu kartu selesai dibagikan, peluang kemenangan Pemain dan Bankir hampir mencapai 50/50.<br/>
                        •	Pada kartu dek tunggal, peluang kemenangan Bankir: 1,29%, peluang kemenangan Pemain: 1,01%, peluang seri: 15,57%.<br/>
                        •	Bankir lebih sering menambah kartu sehingga peluang kemenangannya agak lebih besar.<br/>
                        •	Pada kartu 6 dek, peluang kemenangan Pemain: 1,06%, peluang kemenangan Bankir: 1,24%, peluang seri: 14,44%.<br/><br/>
                      </span>
                    </b-row>                   

                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row v-show="this.blogCode == 'Cemee'">
            <b-col cols="12">
              <b-row>
                <b-col class="blog-title">
                 
                  <router-link class="text-light" :to="{ path: '/Blog'  }">
                  <h2><b>Cara Bermain Ceme</b></h2>
                  </router-link>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="blog-title">
                
                  <h6><i>{{new Date().toLocaleString()}}</i></h6>
                </b-col>
              </b-row>
             
              <b-img alt="Cara Memainkan Ceme" src="https://cdn.discordapp.com/attachments/775251064621367316/789701594756808764/2121312.png" fluid-grow></b-img>
              <b-row>
                <b-col class="blog-content">
                
                  <div style="color:white;">

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Cara bermain ceme sangatlah mudah untuk kita pahami, hanya mengkombinasikan 2 kartu yang dibagi bandar secara acak dan dimainkan oleh 2-8 orang dalam satu meja setiap periodenya. <br/><br/>
                        Untuk menjadi pemenang dalam permainan ceme online yaitu mendapatkan kartu tertinggi di antara pemain lainnya, pada permainan ceme kartu 9 merupakan kartu yang palig tinggi. <br/><br/>
                        Nah, itulah kata pembuka dari kami tentang permain ceme, jika ingin mengetahui lebih banyak lagi tentang permain tersebut. khususnya pemula dalam bermain judi online ceme maka silahkan baca artikel kami di bawah ini. <br/>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:20px; text-align: justify; text-align-last: left; font-weight:bold;">
                        Cara Bermain Ceme Untuk New Member Langsung Mahir
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Sebelum bergabung pada agen resmi kami terpercaya, maka alangkah baiknya kalian membaca artikel kami di bawah ini yang membahas tentang aturan dalam bermain ceme. <br/><br/>
                        Berikut ini 2 tahapan yang harus anda perhatikan dalam bermain ceme:
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:18px; text-align: justify; text-align-last: left; font-weight:bold;">
                        Tahapan Pertama Aturan Dalam Bermain :
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold;">
                        – Dalam bermain ceme terdapat beberapa room seperti: Smallest, Small, Medium, Large, Vip yang disesuaikan dengan limit bet yang anda miliki.<br/>
                        – Jika ingin menjadi bandar pada permain ini harus memiliki aturan sesuai dengan roomnya seperi : Smallest Rp.280,000, Small Rp. 560,000, Medium Rp. 980,000, Large Rp.1,400,000, Vip tergantung kepada meja yng kita pilih. <br/>
                        – Pemenang dalam permain ceme yang memili kartu di atas bandar bukan setara apalagi di bawah kartu bandar.<br/>
                        – Pemain yang mendapatkan kartu 9 akan dibayar 2x lipat oleh bandar.<br/>
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:18px; text-align: justify; text-align-last: left; font-weight:bold;">
                        Tahapan Kedua Menghitung Kartu:
                      </span>                      
                    </b-row>

                     <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold;">
                        Berikut ini cara menghitung kartu dalam permainan domino qq agar anda tidak salah saat bermain:
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        A. Seri (6) : 6|6. <br/>
                        B. Seri (5) : 5 | 5, 5 | 6.<br/>
                        C. Seri (4) : 4 | 4, 4 | 5, 4 | 6.<br/>
                        D. Seri (3) : 3 | 3, 3 | 4, 3 | 5, 3 | 6.<br/>
                        E. Seri (2) : 2 | 2, 2 | 3, 2 | 4, 2 | 5, 2 | 6.<br/>
                        F. Seri (1) : 1 | 1, 1 | 2, 1 | 3, 1 | 4, 1 | 5, 1 | 6.<br/>
                        G. 0|0, 0|1, 0|2, 0|3, 0|4, 0|5, 0|6.<br/><br/>
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        *Contoh:<br/>
                        0|1, 0|5 = 6 1|2, 1|6 = 0 2|2, 2|4 = 0 3|5, 3|6 = 7 4|5, 4|6 = 9 5|5, 5|6 = 1<br/>
                        Bagaimana cukup mudah bukan memahami cara bermain ceme pada penjelasan kami di atas, selain itu permainan ceme juga mempunyai jenis kartu terbaik seperti di bawah ini.<br/>
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold;">
                        Penasaran dengan jenis kartu tersebut, silahkan baca artikel kami di bawah ini:
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        1. Balak Enam (6666)
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Maksud dari balak 6 disini yaitu kartu player dan bandar sama-sama berjumlah 6 pada kedua sisi. <br/>
                        Contoh: kartu player 2|4, 3|3 kartu bandar 0|6, 5|1.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        2. Balak
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Maksud dari balak yaitu sama seperti penjelasan di atas, cuman disini keduanya harus mendapatkan balak pada kedua sisi. <br/>
                        Contoh. Kartu member 1|1, 2|2 dan kartu bandar 3|3, 5|5.
                      </span>                      
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        3. Murni Kecil
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Maksud dari murni kecil disini yaitu penjumlahan kartu bandar dan kartu member tidak lebih dari 9 <br/>
                        Contoh: Kartu member 1|1, 03 dan kartu bandar 1|3, 0|0.
                      </span>                      
                    </b-row>
                    
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; font-weight:bold; letter-spacing:0.5px;">
                        4. Murni Besar
                      </span>                      
                    </b-row>
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:0% 2% 1% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        Maksud dari penjelasan tentang murni besar dan murni kecil sebenarnya sama. Namun disini anda harus mendapatkan jumlah kartu besar 39-43. <br/>
                        Contoh: Kartu member 5|6, 4|5 dan kartu bandar 5|5, 4|6
                      </span>                      
                    </b-row>
                    
                    <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 0% 3% ;">                                                                     
                      <span style="font-size:16px; text-align: justify; text-align-last: left; letter-spacing:0.5px;">
                        Demikian penjelasan kami mengenai cara bermain ceme, semoga dengan adanya artikel ini dapat menambah wawasan anda dalam bermain ceme pada agen resmi kami terpercaya. Sekian yang dapat kami samapikan, selamat mencoba. Terima kasih <br/><br/>
                      </span>                      
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row v-show="this.blogCode == 'Holdem'">
            <b-col cols="12">
              <b-row>
                <b-col class="blog-title">
                 
                  <router-link class="text-light" :to="{ path: '/Blog'  }">
                  <h2><b>Cara Bermain Texas Hold'Em</b></h2>
                  </router-link>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="blog-title">
                  
                  <h6><i>{{new Date().toLocaleString()}}</i></h6>
                </b-col>
              </b-row>
             
              <b-img alt="Cara Bermain Texas Holdem" src="https://cdn.discordapp.com/attachments/775251064621367316/789829022539317288/apps.32865.13672061214767198.3336fb4c-c283-4579-ad82-96f02585b57c.jpg" fluid-grow></b-img>
              <b-row>
                <b-col class="blog-content">
                 
                  <div style="color:white;">

                    <b-row align-v="center" style="background-color:white; margin:2% 0% 2% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:20px; text-align: justify; text-align-last: left; font-weight:bold; color:#8d1517">
                        Memahami Permainan Texas Hold'em
                      </span>
                    </b-row>

                    <b-row align-v="center">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789829978283573258/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">1. Tentukan pihak bank. </strong><br/>
                            Pilihlah satu pemain yang dipercaya, atau orang luar (yang tidak ikut bertaruh) untuk mengumpulkan dan menghitung uang atau apapun yang Anda pertaruhkan, dan mengubahnya dengan koin poker untuk setiap pemain. Jika Anda tidak bermain untuk uang, maka bank harus membagikan koin dalam jumlah yang sama untuk setiap pemain. Ada beberapa cara untuk mengatur permainan ini.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Pemain tidak boleh ikut kembali, dengan pemenang akan mendapatkan keseluruhan total taruhan. Dalam versi ini, setiap pemain ikut dalam permainan dengan jumlah taruhan yang ditentukan-mungkin enam puluh ribu rupiah untuk taruhan iseng, atau sekitar satu juta rupiah untuk taruhan yang lebih serius. Tidak ada batas dalam jumlah koin yang bisa dipertaruhkan-Anda bisa mempertaruhkan semuanya (all in)- tetapi jika pemain kehabisan koin, ia harus keluar dari permainan dan tidak diperbolehkan ikut kembali dengan koin lainnya. Dalam turnamen ini, pemain biasanya disisihkan satu per satu hingga pemain terakhir memenangkan semua taruhan. <br/><br/>
                        •	Ada batas, tetapi pemain bisa berhenti kapan saja. Dalam permainan ini taruhan pada setiap tahap dibatasi jumlahnya, tetapi pemain bisa membeli lebih banyak kapanpun ia mau. Pemain bisa berhenti bertaruh kapanpun ia inginkan, tanpa harus melalui proses eliminasi. Seringkali seorang pemain berhenti bertaruh ketika menang dan menguangkan kemenangannya.<br/>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789831031981080576/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">2. Tentukan pembagi kartu. </strong><br/>
                            Berikan pembagi kartu sebuah koin "tombol" dan satu pak kartu standar (52 kartu tanpa joker). Pembagi kartu mengocok kartu dan selalu membagi ke sebelah kirinya, searah dengan jarum jam. Setelah membagikan kartu ke kiri, maka koin tombol akan berpindah ke kiri dan pekerjaan membagi kartu berpindah sesuai urutan.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789831389721788426/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">3. Lakukan ante. </strong><br/>
                            Minta setiap pemain mengajukan "ante"--yang merupakan taruhan minimum sebelum mereka melihat kartunya. Hal ini tidak wajib dilakukan, tetapi dapat membantu agar permainan berjalan lancar dan taruhan selalu berada dalam jumlah yang pantas.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789831607703306270/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">4. Tentukan blind kecil (small blind) dan blind besar (big blind). </strong><br/>
                            Pemain di sebelah kiri pembagi kartu disebut small blind dan harus memainkan setengah dari taruhan minimum. Pemain berikutnya setelah si pemain di sebelah kiri merupakan big blind, yang memainkan taruhan minimum secara penuh. Taruhan sesungguhnya di mulai dari pemain yang berposisi di sebelah kiri sang big blind.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789831834795638814/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">5. Bagikan setiap pemain dua kartu secara tertutup. </strong><br/>
                            Bagikan kartu satu persatu, dimulai dari sebelah kiri pembagi kartu, dan berakhir di pembagi kartu. Pemain dapat melihat kartu mereka sendiri dan harus menjaganya agar tetap tertutup. Ada dua macam kartu, yaitu kartu "hole" atau "pocket", dan setiap pemain mengharapkan kedua kartu yang dibagikan pertama merupakan gabungan terbaik dengan kartu lainnya.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789832072747417641/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">6. Ikut bertaruh (call), naikkan taruhan (raise), atau mundurlah (fold) dengan bergantung pada kartu di tangan Anda (pocket card). </strong><br/>
                            Dimulai dari pemain di sebelah kiri big blind (big blind), setiap pemain harus mengikuti (call) atau meningkatkan (raise) jumlah taruhan saat itu untuk tetap ikut dalam taruhan. Jika pemain memilih untuk menaikkan taruhan (raise), maka pemain berikutnya harus ikut atau menaikkan taruhan baru itu, dst. Menaikkan taruhan seringnya harus sesuai dengan urutan (skala) dari taruhan minimum (dari big blind). JIka pemain berpikir bahwa kartu yang dimilikinya kurang baik, maka mereka dapat mundur (fold) dan duduk menunggu hingga taruhan selesai. Taruhan berjalan searah jarum jam hingga setiap pemain entah ikut (call) atau keluar dari taruhan (fold). Jika seorang pemain membuat taruhan dan tidak ada pemain lain ikut (call), maka taruhan berakhir dan pemain itu memenangkan semua uang taruhan.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Ketika taruhan memutari meja dan kembali ke pemain big blind atau small blind, maka pemain ini telah mengurangi koin mereka yang telah digunakan untuk ikut pada taruhan yang telah ditentukan. Jadi, jika tidak ada pemain bertaruh lebih dari taruhan terkecil (minimum), maka pemain big blind memiliki pilihan untuk menaikkan jumlah taruhan atau tetap pada jumlah taruhan tanpa menambahnya. <br/>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789832376150786048/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">7. Bagikan kartu "the flop", tiga kartu diletakkan di meja, dimana setiap pemain dapat melihat kartu. </strong><br/>
                            Kartu-kartu ini disebut juga kartu komunitas(community card) yang merupakan penentu kemenangan taruhan bagi para pemain dan digunakan untuk membuat kombinasi dengan kartu di tangan (pocket card) mereka.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Sebelum membagikan kartu "flop", atau kartu berikutnya, pembagi kartu harus membuang atau "burn", kartu teratas dari satu pak kartu yang tersisa secara tertutup untuk mencegah kecurangan.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789832691284574208/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">8. Bertaruhlah, lewati giliran (check), atau mundur (fold).</strong><br/>
                            Ada ronde tambahan, dengan kali ini dilakukan tanpa blind yang dimulai dari pemain pada sisi kiri pengocok. Para pemain bertaruh pada jumlah total kedua kartu yang tertutup di tangan mereka dan tiga kartu komunitas yang terbuka pada pihak pembagi kartu.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Jika belum ada pemain yang menaikkan taruhan, pemain dapat melakukan pas (check) tanpa menambah taruhan. Jika tidak ada yang menaikkan taruhan, maka permainan terus berjalan, tetapi jika ada seorang pemain yang menaikkan jumlah taruhan, maka pemain yang melakukan pas harus ikut menambah taruhannya untuk tetap berada pada permainan.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789832979894763540/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">9. Baliklah “the turn” dan mainkan satu ronde lagi. </strong><br/>
                            The turn adalah kartu komunitas keempat yang diambil dengan posisi terbuka oleh pembagi kartu. Sekarang para pemain dapat mengevaluasi kesempatan menang mereka berdasarkan kombinasi terbaik lima kartu -- dengan dua yang mereka miliki dan empat kartu komunitas -- sembari mengetahui bahwa ada satu kartu komunitas tambahan yang bisa memperbaiki kombinasi yang ada. Pemain tanpa kombinasi yang bagus pada tahap ini mungkin lebih baik mundur dari permainan, kecuali jika ia berharap ia bisa menggertak lawannya agar mundur.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789833190780567552/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">10. Bagikan kartu komunitas terakhir, "the river" dan mainkanlah ronde terakhir taruhan. </strong><br/>
                            Karena the river merupakan kartu terakhir, para pemain akan bertaruh berdasarkan lima kartu terbaik dari total tujuh yang ada--kartu di tangan Anda tidak akan berubah, jadi mundurlah sekarang jika Anda yakin Anda tidak akan menang. Sekali lagi, jika seorang pemain mengajukan taruhan yang tidak akan direspon oleh pemain lainnya, ia akan menang tanpa harus membuka kartunya.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789833399476158484/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">11. Tunjukkan kartu Anda pada waktu "the showdown". </strong><br/>
                            Dengan asumsi bahwa akan ada setidaknya dua pemain yang mundur (fold) pada putaran terakhir, pemain yang tersisa membuka kedua kartu di tangan mereka (pocket cards), dimulai dari pemain terakhir yang membuat taruhan dan berjalan terbalik searah jarum jam. Setiap pemain mengumumkan kelima kartu di tangan mereka. Pemain yang memiliki kartu dengan nilai tertinggi memenangkan taruhan (total koin taruhan pada putaran ini).
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="margin-top:2%;">
                      <b-col cols="12" md="3">
                        <b-img alt="Cara Bermain Texas Holdem" style="width:100%;" src="https://cdn.discordapp.com/attachments/775251064621367316/789833619597295618/unknown.png" fluid-grow></b-img>
                      </b-col>
                      <b-col cols="12" md="9">
                        <b-row align-v="center" style="background-color:#8d1517; margin:0%; padding:1% 2% 1% 2% ;">                                               
                          <span style="font-size:16px; text-align: justify; text-align-last: left;">
                            <strong style="font-weight:bold; letter-spacing:0.5px;">12. Putar tombol, kocok kartu dan main lagi. </strong><br/>
                            Hold'em poker biasanya berlanjut hingga kebanyakan pemain dikalahkan atau keluar dan entah seorang pemenang memiliki semua koin atau pemain yang tersisa memutuskan untuk membagi hasil taruhan sama banyak dengan berapa yang telah mereka menangkan.
                          </span>
                        </b-row>
                      </b-col>
                    </b-row>

                    <b-row align-v="center" style="background-color:white; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:20px; text-align: justify; text-align-last: left; font-weight:bold; color:#8d1517">
                        Memahami Kartu Poker
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">1. Pahami 10 dasar permainan poker. </strong>Poker didasari oleh tingkatan nilai dari beberapa kombinasi kartu yang berbeda. Pemegang dengan kombinasi terbaik menang. Di bawah ini ada beberapa kombinasi kartu standar dari terendah ke tertinggi.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">2. High card. </strong>Ketika Anda tidak memegang kombinasi apapun, nilai kartu didasarkan oleh kartu tertinggi, dengan kartu 7 menjadi angka terendah dan kartu As menjadi kartu tertinggi.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">3. A pair. </strong>Dua kartu yang memiliki angka yang sama. Sebagai contoh: 3(♠) - J(♣) - J(♥) - 2(♥) - 5(♦) memiliki sepasang kartu Jack.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">4. Two pairs. </strong>Dua pasang kartu dengan angka yang sama. Sebagai contoh: 4(♥) - 4(♦) - 9(♠) - 9(♣) - A(♠) memiliki dua pasang kartu yang sama yaitu 4 dan 9.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">5. Three of a kind. </strong>Tiga kartu dengan angka yang sama. Sebagai contoh: 6(♣) - 6(♦) - 6(♠) - 3(♠) - J(♣) memiliki tiga kartu 6.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">6. Straight. </strong>Lima kartu berurut dengan gambar karakter yang berbeda. Sebagai contoh: 5(♣) - 6(♠) - 7(♣) - 8(♦) - 9(♥) merupakan urutan (straight).
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">8. Full House. </strong>Tiga kartu yang sama dipasangkan dengan dua kartu yang sama. Sebagai contoh: 7(♥) - 7(♣) - 7(♠) - Q(♥) - Q(♦) merupakan kartu full house.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">9. Four of a Kind. </strong>Empat kartu yang sama dengan angka yang sama. Sebagai contoh: J(♥) - J(♠) - J(♣) - J(♦) - 5(♣) merupakan kartu four of a kind.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">10. Straight Flush. </strong>Kemungkinan kombinasi tertinggi didalam poker. Sama seperti urutan (straight), tetapi semua kartu memiliki gambar karakter yang sama. Sebagai contoh: 3(♥) - 4(♥) - 5(♥) - 6(♥) - 7(♥) merupakan kartu straight flush.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">11. Royal Flush. </strong>Sama seperti kartu straight flush, tetapi kartunya terdiri dari kartu as, raja (king), ratu (queen), pangeran (jack). Sebagai contoh: 10(♣) - J(♣) - Q(♣) - K(♣) - A(♣)
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">12. Bandingkan kartu-kartu dengan nilai yang seimbang. </strong>Jika dalam permainan terdapat dua orang dalam sesi showdown (sesi membuka kartu) dengan dua kartu yang sama, pemenang taruhan ditentukan dengan kartu siapa yang memiliki angka tertinggi. Di bawah ini ditunjukkan contoh aturannya:
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0% 0% 0% 0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Sepasang kartu dengan angka 9 mengalahkan sepasang kartu dengan angka 4. <br/>
                        •	Dua pasang kartu pangeran (jack) dan 2 mengalahkan dua pasang kartu 7 dan 5. <br/>
                        •	Sebuah kartu urutan (straight) hingga kartu ratu (queen) mengalahkan kartu urutan yang hanya sampai pada angka 10. <br/>
                        •	Kartu As-high flush mengalahkan kartu raja (king)-high flush. <br/>
                        •	Jika kedua pemain memiliki kartu kombinasi dengan nilai yang sama, pemegang kartu yang memiliki kartu ekstra yang lebih tinggi merupakan pemenangnya. Sebagai contoh sepasang kartu 8 dengan kartu As sisanya mengalahkan sepasang kartu 8 dengan kartu 10 sebagai sisanya.<br/>                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:white; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:20px; text-align: justify; text-align-last: left; font-weight:bold; color:#8d1517">
                        Mengetahui Strategi Sudut
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">1. Mempertaruhkan semuanya (all in). </strong>Jika Anda sangat percaya diri bahwa kartu yang ada di tangan Anda dapat mengalahkan semua pemain, atau Anda yakin bahwa tidak ada pemain lain yang bisa menandingi kartu Anda, Anda dapat mempertaruhkan semua koin Anda dalam taruhan- dan melakukan sebuah langkah yang berani. Jika Anda memiliki koin poker yang lebih banyak dari pemain lain, Anda dapat memaksa mereka mempertaruhkan semua koin poker mereka dengan mempertaruhkan sejumlah koin sesuai dengan jumlah koin poker yang mereka miliki. Jika hanya ada satu pemain yang ikut dalam taruhan, setiap pemain menunjukkan kartu di tangan mereka dan sisa kartu komunitas (community card) akan dibagikan.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0% 0% 0% 0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Dalam suatu turnamen, jika Anda hanya memiliki 5 blind besar atau ante, Anda akan kalah setelah 5 ronde di meja. Jadi, Anda harus mempertaruhkan semuanya pra-flop dengan kartu yang cukup bagus, dengan harapan mendapatkan dua kali lipat atau semua orang menyerah. Jika Anda hanya punya 5 blind dan ante, cukup pilih blind dan ante yang bermakna 20 persen peningkatan untuk Anda (ini cukup besar). Jadi, misalnya, Anda punya kartu pair, as, raja, atau dua kartu wajah, pertimbangkan untuk mempertaruhkan semuanya sebelum flop (jika belum ada yang masuk). <br/>
                        •	Anda memiliki chip lebih sedikit dibanding pemain lain dan terhadap blind/ante. Jika bertaruh dalam jumlah besar akan membuat separuh chip Anda atau lebih masuk ke dalam pot, ada baiknya Anda mempertaruhkan semuanya sekaligus agar tampak kuat dan dapat memberi tekanan maksimal. Meskipun Anda punya kartu nut (flop terbaik), jangan mencoba slow-bet dan menambah jumlah taruhan minimum. Lawan yang bisa mengamati Anda akan curiga, mengapa Anda tidak mempertaruhkan semua sekaligus jika punya kartu yang kuat. Dalam kasus apa pun, lawan kemungkinan akan mengartikan pilihan Anda untuk mempertaruhkan semua dengan chip yang sedikit sebagai tindakan putus asa dan menambah taruhan jika kartu mereka cukup bagus. <br/>
                        •	Jika chip Anda lebih dari cukup dibandingkan lawan yang meletakkan taruhan tertinggi di meja, Anda mungkin bisa memaksanya mempertaruhkan semuanya dengan bertaruh dalam jumlah yang sama (Anda boleh bilang all in). Jika tidak ada pemain lain yang ikut bertaruh dan pemain dengan chip yang lebih sedikit tidak mundur, keduanya akan membuka kartu mereka saat showdown. Dengan begitu, sisa kartu komunitas akan dibagikan satu demi satu tanpa taruhan pada masing-masingnya (karena pemain yang mempertaruhkan semuanya tidak punya chip lagi). Jika pemain lain menang, berarti Anda menambah taruhannya menjadi 2 kali lipat. Namun, Anda juga berkesempatan membuatnya pulang. <br/>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">2. Membuat taruhan sampingan. </strong>Jika satu pemain mempertaruhkan semua koin mereka, pemain lain yang ikut dalam taruhan dan mempunyai koin poker lebih dapat membuat taruhan tambahan dengan yang lainnya. Hal ini disebut “taruhan sampingan"(side pot). Satu taruhan baru dibuat untuk pemain lainnya hingga semua pemain mempertaruhkan semua koinnya (all in). Total taruhan yang dapat dimenangkan oleh seorang pemain adalah jumlah taruhan yang mereka pertaruhkan ketika mempertaruhkan semua koin mereka (all in). Sedangkan pemain lain dapat bertaruh satu sama lain dengan wadah taruhan yang berbeda. Pada sesi showdown (sesi menunjukkan kartu) taruhan utama dimenangkan oleh pemain yang memiliki kartu terbaik dan wadah taruhan lain dimenangkan oleh pemain lain yang bertaruh (membuat taruhan sampingan).
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0% 0% 0% 0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Jika kartu Anda cukup bagus, misalnya, QA, dan pemain dengan chip yang lebih sedikit telah mempertaruhkan semuanya, kemungkinan sebagai gertakan atau semimenggertak, Anda juga bisa menambah jumlah taruhan sebagai permainan terpisah (beberapa pemain mungkin akan menambah taruhan dan menambah taruhan lagi meskipun tidak punya kartu yang bagus, seperti QQ). Gerakan Anda akan membantu mengisolasi pemain dengan chip lebih sedikit untuk mempertaruhkan semuanya meskipun dengan kartu yang lebih lemah daripada Anda. <br/>
                        •	Jika salah satu pemain telah mempertaruhkan semua dan belum ada uang di pot samping, cobalah melewati giliran Anda, kecuali jika kartu Anda membaik. Tanpa uang di pot samping untuk dimainkan, tidak masuk akal menggertak pemain lain dan meningkatkan peluang kemenangan pemain yang mempertaruhkan semuanya. Melewati hand down akan memaksimalkan peluang Anda mengeliminasi pemain dengan chip yang lebih sedikit dan sudah mempertaruhkan semuanya. Ini disebut sebagai cooperation play.<br/>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">3. Bermain "heads-up." </strong>Urutan dari bertaruh sedikit berbeda ketika permainan hanya dimainkan oleh dua pemain. Pemain dengan pembagi kartu menempati posisi small blind dan musuh-nya merupakan big blind. Small blind merupakan orang yang pertama kali bertaruh di setiap babak taruhan.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:white; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:20px; text-align: justify; text-align-last: left; font-weight:bold; color:#8d1517">
                        Menguasai Strategi
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">1. Gertaklah lawan. </strong>Menggertak adalah dengan berpura-pura bahwa kartu Anda lebih baik dari pemain lain, dan menaikkan taruhan secara agresif untuk memaksa pemain lain mundur (fold)- hasilnya memenangkan taruhan dengan kartu yang rendah atau sedang. Menggertak memang berisiko, akan tetapi, karena Anda tidak pernah tahu kapan lawan Anda memiliki kartu yang cukup baik untuk ikut dalam taruhan (call) sepanjang permainan hingga putaran terakhir.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">2. Cobalah semimenggertak. </strong>Jika Anda memiliki kartu yang berpeluang menang, seperti kartu AK sekop, dan juga dua kartu sekop di meja, Anda mungkin bisa bertaruh atau menambah taruhan dan mendapatkan kartu flush. Semigertak cenderung berpeluang lebih tinggi dibandingkan gertak penuh, dengan memberikan Anda dua cara atau lebih untuk menang. (1) Lawan Anda mungkin akan mundur terhadap taruhan flop Anda, atau (2) mereka akan ikut bertaruh, tetapi Anda bisa bertaruh lagi untuk memenangkan kartu (meskipun tidak akan membuat siapa pun mundur, dan tampak seperti taruhan berkelanjutan), atau (3) kartu Anda terbuka dan Anda harus bertaruh lagi (memang mahal, tetapi tidak sebesar mempertaruhkan semuanya). 
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">3. Cobalah slow-play, terutama pada kartu monster. </strong>Jika Anda mendapatkan kartu flop monster atau the nuts (flop terbaik untuk kartu yang Anda punya) atau minimal trip, lewati giliran dan tambah taruhan untuk memicu gertakan karena Anda akan tampak lemah atau memiliki kartu yang lemah. Lawan Anda mungkin akan mendapatkan kartu yang lemah. Slow play cocok digunakan pada pemain yang agresif dan mungkin akan menggertak jika ada yang tampak memiliki kartu yang buruk. Jika Anda mendapatkan flop full house dan bertaruh, sementara semua orang mundur, Anda hanya akan mendapatkan hasil sedikit. Jadi, lewati giliran Anda dan biarkan mereka bermain lebih dahulu selagi Anda mencoba mendapatkan kartu keempat atau kelima. Namun, berhati-hatilah. Jangan sampai Anda terlihat slow-play dan melewati banyak lawan untuk melihat kartu. Misalnya, jika Anda memiliki kartu T(♥) - T(♠), dan flop terbuka T(♣) - 9(♦) - 3(♣) untuk "trips T", dan Anda hanya punya 3 lawan atau lebih. Jangan mencoba slow play set atau trip, terutama jika Anda menambah taruhan sebelum flop dan dikenal sering bertaruh terus-menerus. Bertaruh pada pot ketiga untuk mendapatkan kartu flush atau straight, atau bermainlah untuk membuka kartu berikutnya.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">4. Coba mengintimidasi untuk menang (bukan yang paling populer). </strong>Intimidasi pemain lain (asalkan masih mengikuti aturan turnamen). Teruslah menebak posisi awal lawan dan berteori tentang kartu mereka sambil bertaruh. Tanpa melanggar aturan. Membanggakan cerita tentang mendapatkan nut memang bodoh, tetapi akan membuat pikiran mereka teralihkan. Teruslah banyak bicara, banyak menganalisis taruhan, dan menebak cara lawan Anda berstrategi, serta kartu yang mereka pegang sambil mengamati reaksi masing-masingnya dan mengetahui siapa yang unggul daripada Anda.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0% 0% 0% 0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Bicaralah tanpa menghambat permainan saat ada yang kalah dari Anda, "Bagaimana kamu bertaruh dengan Jack, dan sepuluh", dan hal seperti "Kenapa kamu menghabiskan uang dan waktu hanya untuk Ratu, aduh...." Jangan mengharapkan jawaban. Namun, jangan mengganggu permainan. Tanyakan segala hal yang masuk akal. Tanyakan segala hal tentang permainan hanya jika Anda berhadapan dengannya saat Anda tampak akan menentukan berapa jumlah taruhan dan haruskah Anda mundur. Tanyakan pertanyaan yang masuk akal kepada pemain dengan chip lebih sedikit, seperti "Kamu mau aku bertaruh? atau mundur?" kemudian teruskan dengan "Jika kamu mau aku bertaruh, aku mungkin akan mundur. Jujurlah, kamu mau aku bagaimana, mundur? Ya, mundur? Mundur kan?". Setelah itu, lawan akan mundur dengan kartu yang lebih bagus, dan Anda hanya menunjukkan kartu yang lemah. Lawan Anda mungkin akan menahan marah. <br/>
                        •	Berlama-lama mundur, berhati-hati kemudian mengatakan "Kupikir kamu punya kartu nut kan? Jadi, kamu punya kartu ratu atau lebih bagus lagi, oke, aku mundur." Jika langkah ini terasa tepat dan Anda belum mempertaruhkan semua, "Setiap kali kamu membuka kartu sesuai harapan, jika kamu bisa melihat kartu lawan, kamu akan menang, dan setiap kali lawan memainkan kartu berbeda dengan harapan, jika mereka bisa melihat kartumu, mereka tetap akan menang.", menurut penulis David Sklansky yang dianggap pakar berjudi. Mirip dengan bermain dengan apa yang paling mungkin dipegang oleh pemain lain dan membuat orang lain bermain sesuai apa pun yang sepertinya Anda tahu melalui ucapan Anda sehingga mempertanyakan langkah mereka, sementara Anda memutuskan cara bertaruh. Setelah mendegar ucapan Anda, lawan sering kali akan mundur karena kebingungan meskipun kartu mereka lebih bagus.<br/>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">5. Selami pikiran lawan langsung Anda hingga mengalihkan perhatiannya. </strong>Jangan mengharapkan banyak jawaban. Cukup tanyakan: "Jadi, berapa banyak chipmu? "Aku mungkin akan mempertaruhkan semua!" "Aku akan menunjukkan kartuku di akhir permainan, oke!" Kemudian katakan "Jika kamu membuka kartumu, aku juga akan menunjukkan kartuku", "Aku mau menghitung jumlah chipku (membuang banyak waktu), aku punya sekitar..." Seriuslah, "Aku harus tahu....." "berapa banyak yang ada di pot", "berapa banyak taruhan sekarang", dll. Apa pun yang dirasa perlu diketahui secara teoretis (seperti Anda belum tahu). "Oh, jadi kamu punya pair bawah. Eh bukan, pair atas." "Eh sekarang sepertinya kamu punya ratu... ya kan?" Anda bisa menebak-nebak seperti itu, mengubah pikiran, menebak lagi, dll. Buatlah pemain lain tidak nyaman, marah, atau kesal. Jadi, mereka mungkin akan bertaruh berlebihan terhadap kartu yang lemah untuk membalas Anda. Meskipun begitu, mereka bisa saja mundur atau kalah, atau kebingungan. 
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0% 0% 0% 0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Jangan berlebihan agar Anda tidak terlalu dibenci. Jangan berbicara selagi pemain lain menentukan apakah akan bertaruh atau mundur. Jadilah pemain yang baik dengan mengatakan "Kartu yang bagus!" meskipun Anda menang. Katakan "Kalian lawan yang hebat!", dan jangan berlebihan dalam bertanya-tanya.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">6. Ikut bertaruh dan tambah taruhan. </strong>Jika kartu Anda cukup bagus, meskipun bukan monster (di posisi awal seperti di bawah pemain berikutnya), katakanlah Anda punya kartu bagus (dipasangkan dengan kartu di meja) dan kartu top kicker setelah flop, mungkin Anda punya kartu yang paling bagus. Anda bisa bertaruh di depan, tetapi semua orang mungkin akan mundur dan Anda tidak bisa mendapatkan uang lebih banyak daripada jumlah taruhan awal. Cara lainnya, ikut bertaruh di awal dengan harapan seseorang akan bertaruh nanti sehingga Anda bisa melihat siapa yang punya kartu bagus. Setelah giliran permainan kembali kepada Anda untuk ikut bertaruh, tambah jumlah taruhan! Sekarang, jika lawan Anda bertaruh dengan kartu tengah, dia mungkin akan mundur di tahap ini dan Anda bisa mendapatkan uang lebih banyak. Jika taruhan Anda diikuti atau ditambah lagi, Anda sebaiknya mempertimbangkan untuk mundur jika berhadapan dengan pemain yang kartunya lebih bagus. Saat Anda tidak punya kartu bagus, gertakan ikut bertaruh dan menambah taruhan ini cocok digunakan untuk lawan dengan kartu yang lemah. Meskipun demikian, gertakan ikut bertaruh dan menambah taruhan ini sangat berisiko karena Anda akan tampak lemah dan tidak bisa menakuti lawan. Jadi, Anda mungkin harus berhadapan dengan lawan yang mundur setelah ada seseorang yang menambah taruhan sebelum Anda mencoba langkah ini terhadapnya, terutama jika kartunya lemah atau jelek. 
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">7. Baca kartu musuh Anda. </strong>Poker bukan hanya permainan kemungkinan- akan tetapi poker juga merupakan permainan psikologi. Perhatikan lawan Anda secara hati-hati ketika mereka “memberi tahu”- melalui pergerakan bahasa tubuh yang menandakan ketika pemain menggertak atau mempunyai kartu yang baik. Pelajari juga sikap dan kebiasan lawan Anda. Anda tentunya tidak ingin mencoba menggertak pemain yang selalu ikut (call) kapanpun.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">8. Naikkan jumlah taruhan. </strong>Jika Anda mempunyai kartu yang baik dan akan memenangkan taruhan, Anda ingin pemain lain bertaruh sebanyak mungkin. Untuk melakukan ini, jangan naikkan taruhan secara agresif. Sebaliknya, naikkan taruhan Anda secara bertahap untuk mengikat pemain lain sepanjang taruhan.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">9. Lakukan perhitungan. </strong>Poker tidak selalu merupakan permainan statistik. Jika Anda mampu, hitung kemungkinan kartu berikutnya atau kartu yang akan keluar yang membuat kartu rendah yang Anda miliki menjadi kartu pemenang-atau yang membuat kartu potensial lawan mengalahkan Anda. Jangan bertaruh ketika kesempatan jauh melawan Anda.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">10. Sering-seringlah mundur (fold). </strong>Jika kartu di tangan Anda (pocket cards) sedang jelek (angka 2-7 dianggap kartu terjelek di tangan) atau jika Anda tidak mempunyai kombinasi yang baik setelah pembangian kartu flop (kartu kombinasi ketiga), mundur secepatnya. Secara realistis Anda mungkin hanya akan memiliki satu kesempatan dari empat kesempatan, dan semakin banyak pemain dalam permainan, maka Anda harus bermain dengan lebih berhati-hati. JIka Anda pernah melihat permainan poker di TV, dapat terlihat bahwa pemain pro bermain di setiap kesempatan, tetapi itu merupakan tipuan dari televisi - mereka tidak menunjukkan sisi di mana kebanyakan pemain mundur (fold) di awal sesi. Banyak pemain akan mundur (fold) tanpa melihat pembagian kartu ketiga (flop) jika dia tidak mempunyaI setidaknya sepasang kartu as.
                      </span>
                    </b-row>
                    
                    <b-row align-v="center" style="background-color:#8d1517; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        <strong style="font-weight:bold;">11. Kelola uang Anda. </strong>Jika kartu di tangan Anda (pocket cards) sedang jelek (angka 2-7 dianggap kartu terjelek di tangan) atau jika Anda tidak mempunyai kombinasi yang baik setelah pembangian kartu flop (kartu kombinasi ketiga), mundur secepatnya. Secara realistis Anda mungkin hanya akan memiliki satu kesempatan dari empat kesempatan, dan semakin banyak pemain dalam permainan, maka Anda harus bermain dengan lebih berhati-hati. JIka Anda pernah melihat permainan poker di TV, dapat terlihat bahwa pemain pro bermain di setiap kesempatan, tetapi itu merupakan tipuan dari televisi - mereka tidak menunjukkan sisi di mana kebanyakan pemain mundur (fold) di awal sesi. Banyak pemain akan mundur (fold) tanpa melihat pembagian kartu ketiga (flop) jika dia tidak mempunyaI setidaknya sepasang kartu as.
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:white; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:20px; text-align: justify; text-align-last: left; font-weight:bold; color:#8d1517">
                        Hal yang Anda Butuhkan
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0% 0% 0% 0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	2 - 10 pemain. <br/>
                        •	Satu pak standar kartu (singkirkan kartu joker).<br/>
                        •	Koin poker, biasanya dalam pecahan 1, 5, 25, dan 100.<br/>
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:white; margin:2% 0% 0% 0%; padding:1% 2% 1% 2% ;">                                               
                      <span style="font-size:20px; text-align: justify; text-align-last: left; font-weight:bold; color:#8d1517">
                        Tips
                      </span>
                    </b-row>

                    <b-row align-v="center" style="background-color:#8d1517; margin:0% 0% 0% 0%; padding:1% 2% 1% 4% ;">                                               
                      <span style="font-size:16px; text-align: justify; text-align-last: left;">
                        •	Jika Anda bermain secara daring dan ingin meningkatkan hasil Anda, gunakan "kalkulator poker" untuk membantu Anda memecahkan kebingungan Anda.
                      </span>
                    </b-row>                    

                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

        </div>
      </div>
    </div> -->

  </div>
  </BaseLayout>
</template>