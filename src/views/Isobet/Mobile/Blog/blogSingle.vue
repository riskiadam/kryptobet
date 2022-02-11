<script>
import BaseLayout from "@/layouts/BaseLayout";
export default {
  name: 'MobileBlogSingle',
  head: {    
    link: function (){ 
      return [
        { rel: 'canonical', href:'http://158.255.47.199/mobile/blog/' + this.blogCode}
      ]
    }
  },
  components: {
    BaseLayout
  },
  props: {
    blogCode: {
      type: String,
      required: true
    }
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
    // LOAD DATA BLOG
    loadBlogSingle() {
      this.changeLoader(true);
      this.ApiService.get("blog/" + this.blogCode)
        .then((resp) => {
          this.blogData = resp.data;
          this.blogData.imageUrl = this.blogData.imageUrl.replace('10000//Blog', '10000///Blog');
          // this.blogData.imageUrl = this.blogData.imageUrl.replace('10000', '34999');
        })
        .finally(() => {
          this.changeLoader(false);
        });
    },
  },
};
</script>

<template>
  <BaseLayout>
    <div class="blog">
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
    </div>
  </BaseLayout>
</template>