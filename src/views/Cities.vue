<template>
  <div class="section">
<!--    <div class="title">Sweden</div>-->
    <div class="content">
      <div v-for="city in cities" class="item" v-viewer :key="city._id">
        <img :src="city.picture">
        <div class="city">{{ city.name }}</div>
        <el-button class="add-wish" type="primary" icon="el-icon-circle-plus" circle @click="addToWish(city._id)"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCitiesByCountryId } from '@/services/city';
import { getCurrentUser } from "@/services/user";
import { addWish } from "@/services/wish";
export default {
  mounted() {
    const user = getCurrentUser();
    if (!user) {
      this.$message.warning('You need to Log in');
      this.$router.replace('/');
    }
    const { id } = this.$route.params;
    this.getCities(id);
  },
  data() {
    return {
      cities: []
    }
  },
  methods: {
    async getCities(countryId) {
      const cities = await getCitiesByCountryId(countryId);
      this.cities = cities;
    },
    async addToWish(cityId) {
      const user = getCurrentUser();
      const result = await addWish(user._id, cityId);
      if (result) {
        this.$message({
          message: 'wish add successfully',
          type: 'success'
        });
      } else {
        this.$message({
          message: 'wish add fail',
          type: 'error'
        });
      }
    }
  }
}
</script>

<style scoped>
  .section {
    margin: 80px 0;
    padding-bottom: 100px;
  }
  .section .content::after, .section-2 .content::after {
    content: '';
    display: table;
    clear: both;
  }
  .section .content .item {
    position: relative;
    margin-top: 50px;
    float: left;
  }
  .section .content .item:not(:nth-child(3n + 1)) {
    margin-left: 30px;
  }
  .section .content .item img {
    width: 380px;
    height: 225px;
    border-radius: 10px;
  }
  .section .content .item .city {
    margin-top: 20px;
    color: #1EA59A;
    font-weight: bold;
    font-size: 18px;
  }
  .add-wish {
    position: absolute;
    left: 20px;
    top: 170px;
  }
</style>
