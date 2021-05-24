<template>
  <div class="section">
<!--    <div class="title">Sweden</div>-->
    <div class="content">
      <div v-for="country in countries" class="item" v-viewer :key="country._id" @click="toCity(country._id)">
        <img :src="country.picture">
        <div class="city">{{ country.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllCountries } from '@/services/country';
import {getCurrentUser} from "@/services/user";
export default {
  mounted() {
    const user = getCurrentUser();
    if (!user) {
      this.$message.warning('You need to Log in');
      this.$router.replace('/');
    }
    this.getCountries();
  },
  data() {
    return {
      countries: []
    }
  },
  methods: {
    async getCountries() {
      const countries = await getAllCountries();
      this.countries = countries;
    },
    toCity(countryId) {
      this.$router.push('/cities/' + countryId)
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
    margin-top: 50px;
    float: left;
    cursor: pointer;
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
</style>
