<script>
import BaseLayout from "@/layouts/BaseLayout";
export default {
  name: 'Blog',
  head: {
    link: [
      { rel: 'canonical', href:'http://158.255.47.199/blog' }
    ]
  },
  components: {
    BaseLayout
  },
  data() {
    return {
      blog: {
        list: [],
        totalCount: 2,
        maxPage: 1,
        paging: {
          PageSize: 10,
          PageNo: 1,
          Sort: [{ ColumnName: "RecordDate", Direction: "DESC" }],
        },
      },
    };
  },
  mounted() {
    this.loadBlog();
  },
  watch: {
    "blog.paging": {
      handler() {
        this.loadBlog();
      },
      deep: true,
    },
    paging: function (val) {
      this.pagingLocal = val;
    },
  },
  methods: {
    loadBlog() {
      this.changeLoader(true);
      let payload = { Paging: this.blog.paging };
      this.ApiService.post("blog", payload).then((resp) => {
        this.blog.list = resp.data;
        for(let i=0;i<this.blog.list.length;i++){
            this.blog.list[i].imageUrl = this.blog.list[i].imageUrl.replace('10000//Blog', '10000///Blog');
        }
        this.blog.totalCounted = resp.totalCount;
        this.blog.maxPage = Math.ceil(resp.totalCount / 10);
      }).finally(()=>{
        this.changeLoader(false);
      })
    }
  }
};
</script>

<template>
  <BaseLayout>
  <div class="blog">
    <div>
      <img class="DesktopBlog-image center align-center max-width" :src="require('@/assets/images/banner/long-banner-6.jpg')" alt="banner" fluid />
    </div>
    <div class="DesktopBlog">
      <b-row class="align-center center justify-content-center">
        <b-button class="text-menu-bottom" :to="{ name: 'Promotion' }" >Promosi</b-button>
        <b-button class="text-menu-bottom" :to="{ name: 'Blog' }" >Berita</b-button>
        <b-button class="text-menu-bottom" :to="{ name: 'Refferal' }" >Referral</b-button>
        <b-button class="text-menu-bottom" :to="{ name: 'Help' }" >Bantuan</b-button>
        <b-button class="text-menu-bottom" target="_blank" href="http://165.22.253.162/keluaran-togel.amp" >Live Score</b-button>
      </b-row>
    </div>
    <div class="DesktopBlog">
      <div class="blog-content">
        <b-row>
          <b-col class="DesktopBlog-Col" cols="12" md="12">
            <div class="blog-section-container-transparent">
              <div class="blog-section-content-transparent">
                <b-row align-v="center" >
                  <b-col class="blog-section-content-col" v-for="blg in blog.list" :key="blg.code" cols="12" md="6">
                    <div class="blog-section-container">        
                      <div class="blog-section-content">              
                        <b-row align-v="center">
                          <b-col cols="12" md="7">              
                            <b-img class="blog-section-image" width="300" height="250" :src="blg.imageUrl" :alt="blg.title"></b-img> 
                          </b-col>
                          <b-col class="blog-section-col-padding" cols="12" md="5">
                            <div class="blog-text">
                              <b-row>
                                <b-col class="text-light">
                                  <h8 class="text-date"><i>{{ blg.recordDate | localDate}}</i></h8>
                                  <router-link class="text-light" :to="{ name: 'BlogSingle', params: { blogCode: blg.code } }">
                                    <h4><b>{{ blg.title }}</b></h4>
                                  </router-link>
                                </b-col>
                              </b-row>                
                            </div>
                          </b-col>
                        </b-row>              
                      </div>        
                    </div>   
                  </b-col>
                </b-row>  
              </div>
            </div> 
          </b-col> 
        </b-row>
      </div>
    </div>
  </div>
  </BaseLayout>
</template>