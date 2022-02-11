<script>
import BaseLayout from "@/layouts/BaseLayout";
import MenuMobile from "@/layouts/components/MenuMobile.vue";
export default {
  name: 'MobileBlog',
  head: {
    link: [
      { rel: 'canonical', href:'http://158.255.47.199/mobile/blog' }
    ]
  },
  components: {
    BaseLayout,
    MenuMobile
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
      <div class="MobileBlog">
        <b-img class="MobileBlogImage center align-center max-width" :src="require('@/assets/images/banner/slide18.jpg')" alt="Banner Blog News Isobet" />     
        <MenuMobile />
        <div class="blog-content">
          <b-row align-v="center" >
            <b-col class="blog-section-content-col" v-for="blg in blog.list" :key="blg.code"  cols="12" md="6" >
              <div class="blog-section-container">        
                <div class="blog-section-content">              
                  <b-row align-v="center" align-h="center">
                    <b-col cols="12" md="12" class="center justify-content-center">              
                      <b-img class="blog-section-image center justify-content-center" width="250" height="200" :src="blg.imageUrl" :alt="blg.title"></b-img> 
                    </b-col>
                    <b-col cols="12" md="12" class="KategoriHomeCol">
                      <div class="blog-text">
                        <b-row>
                          <b-col class="text-light">
  .text-date{
                            <h8 class=""><i>{{ blg.recordDate | localDate}}</i></h8>
                            <router-link class="text-light" :to="{ name: 'MobileBlogSingle', params: { blogCode: blg.code } }">
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
    </div>
  </BaseLayout>
</template>