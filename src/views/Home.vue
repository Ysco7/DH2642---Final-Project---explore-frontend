<template>
  <div style="padding-bottom: 100px">
    <img class="banner-bg" src="../assets/images/banner-bg.png">
    <div class="banner-wrapper">
      <div class="banner-panel">
        <div class="title">Find the place to travel All over the world</div>
        <div class="search-panel">
          <div class="country">
            <div class="country-label">Select country</div>
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ currentCountry._id ? currentCountry.name : 'Country' }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="country in countries" :key="country._id" @click.native="currentCountry = country">{{ country.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <el-button class="btn" type="primary" @click="$router.push('/cities/' + currentCountry._id)">Start exploring</el-button>
          </div>
        </div>
      </div>
      <img class="banner-l" src="../assets/images/banner.jpg" />
    </div>
    <div class="introduce">
      <div class="left">Introduction of Explore</div>
      <div class="right">Explore is a product that helps users find future travel locations, where you can find and bookmark places worth visiting around the world.</div>
    </div>
    <div class="section section-2">
      <div class="title">Most popular place</div>
      <div class="content">
        <div v-for="(city, index) in hotCity" class="item" :key="city._id" v-viewer>
          <img :src="city.picture">
          <div class="cty">
            <div class="name">{{ city.name }}</div>
            <div class="like">{{ index === 0 ? '8' : index === 1 ? '3' : '1' }} like</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section section-3">
      <div class="title">Start Explore</div>
      <div class="content">
        <div v-for="country in hotCountry" class="item" :key="country._id" @click="$router.push('/cities/' + country._id)">
          <img :src="country.picture">
          <div class="city">{{ country.name }}</div>
        </div>
      </div>
    </div>
    <div class="section section-4">
      <el-button class="btn" type="primary" @click="$router.push('/countries')">Explore all</el-button>
    </div>
  </div>
</template>

<script>
import { getAllCountries } from '@/services/country';
import { getHotCities } from '@/services/city';
export default {
  mounted() {
    this.getCountries();
    this.getCities();
  },
  data() {
    return {
      countries: [],
      cities: [],
      currentCountry: {}
    }
  },
  computed: {
    hotCountry() {
      return this.countries.slice(0, 6);
    },
    hotCity() {
      return this.cities.slice(0, 3);
    }
  },
  methods: {
    async getCountries() {
      const countries = await getAllCountries();
      this.countries = countries;
    },
    async getCities() {
      const cities = await getHotCities();
      this.cities = cities;
    }
  }
}
</script>

<style scoped>
  .banner-wrapper {
    position: relative;
    display: flex;
    margin-top: 10px;
    overflow: hidden;
  }
  .banner-wrapper img {
    width: 1000px;
    height: 600px;
    border-radius: 10px;
  }
  .banner-bg {
    position: absolute;
    top: 470px;
    left: -50px;
    width: 100px;
    height: 100px;
    z-index: -1;
  }
  .banner-wrapper .banner-l {
    margin-left: 200px;
  }
  .banner-wrapper .banner-r {
    margin-left: 25px;
  }
  .banner-panel {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  .banner-panel .title {
    font-size: 40px;
    font-weight: bold;
    color: #1EA59A;
    width: 500px;
  }
  .search-panel {
    display: flex;
    justify-content: space-between;
    width: 320px;
    background-color: #ffffff;
    margin-top: 30px;
    padding: 28px;
    border-radius: 10px;
    box-shadow: 0px 10px 20px 0px rgba(64, 72, 82, 0.1);
  }
  .search-panel .country-label {
    margin-bottom: 10px;
    color: #7D8186;
    font-size: 13px;
    line-height: 21px;
  }
  .btn {
    height: 100%;
  }
  .el-dropdown-link {
    font-weight: bold;
    cursor: pointer;
  }
  .el-dropdown-link i {
    margin-left: 20px;
    font-size: 16px;
    line-height: 30px;
  }
  .section {
    /*margin: 150px 0;*/
  }
  .section .title {
    color: #121212;
    font-weight: bold;
    font-size: 30px;
  }
  .section-2 {
    margin-top: 150px;
  }
  .section-2 .content .item {
    position: relative;
    float: left;
    margin: 50px 0;
    overflow: hidden;
    cursor: pointer;
  }
  .section-2 .content .item .cty {
    position: absolute;
    left: -40px;
    bottom: -10px;
    background-color: #ffffff;
    padding: 20px 50px;
    border-radius: 10px;
  }
  .section-2 .content .item .name {
    color: #1EA59A;
    font-weight: bold;
    font-size: 14px;
  }
  .section-2 .content .item .like {
    color: #9395A0;
    font-size: 13px;
    margin-top: 5px
  }
  .section-2 .content .item:not(:nth-child(3n + 1)) {
    margin-left: 30px;
  }
  .section-2 .content .item img {
    width: 380px;
    height: 225px;
    border-radius: 10px
  }
  .section-3 {
    margin: 80px 0;
  }
  .section-3 .content::after, .section-2 .content::after {
    content: '';
    display: table;
    clear: both;
  }
  .section-3 .content .item {
    margin-top: 50px;
    float: left;
    cursor: pointer;
  }
  .section-3 .content .item:not(:nth-child(3n + 1)) {
    margin-left: 30px;
  }
  .section-3 .content .item img {
    width: 380px;
    height: 225px;
    border-radius: 10px;
  }
  .section-3 .content .item .city {
    margin-top: 20px;
    color: #1EA59A;
    font-weight: bold;
    font-size: 18px;
  }
  .section-4 {
    text-align: center;
  }
  .section-4 .btn {
    width: 190px;
    height: 67px;
    border-radius: 10px;
  }
  .introduce {
    display: flex;
    align-items: center;
    margin: 80px 0;
  }
  .introduce .left {
    font-size: 25px;
    font-weight: bold;
  }
  .introduce .right {
    width: 580px;
    margin: 0 auto;
    line-height: 30px;
    word-spacing: 2px;
    font-weight: lighter;
  }
</style>
