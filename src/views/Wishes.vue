<template>
  <div class="section">
<!--    <div class="title">Sweden</div>-->
    <div class="content">
      <div v-for="wish in wished" class="item" v-viewer :key="wish._id">
        <img :src="wish.cities[0].picture">
        <div class="city">{{ wish.cities[0].name }}</div>
        <el-button class="delete-wish" type="primary" icon="el-icon-remove" circle @click="deleteToWish(wish.city)"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllWished, deleteWish } from '@/services/wish';
import {getCurrentUser} from "@/services/user";
export default {
  mounted() {
    const user = getCurrentUser();
    if (!user) {
      this.$message.warning('You need to Log in');
      this.$router.replace('/');
    }
    this.getWished();
  },
  data() {
    return {
      wished: []
    }
  },
  methods: {
    async getWished() {
      const user = getCurrentUser();
      const wished = await getAllWished(user._id);
      this.wished = wished;
    },
    async deleteToWish(city) {
      const user = getCurrentUser();
      const result = await deleteWish(user._id, city);
      if (result) {
        this.$message({
          message: 'wish delete successfully',
          type: 'success'
        });
        await this.getWished();
      } else {
        this.$message({
          message: 'wish delete fail',
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
  .delete-wish {
    position: absolute;
    left: 20px;
    top: 170px;
  }
</style>
