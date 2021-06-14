<template>
  <div class="header">
    <div class="left" @click="toHome">
      <img width="50px" src="../assets/images/logo.png">
      <span>Explore</span>
    </div>
    <div class="right">
      <ul class="p-list">
        <li><router-link to="/">Home page</router-link></li>
        <li><router-link to="/countries">Library</router-link></li>
        <li><router-link to="/wishes">Wishlist</router-link></li>
      </ul>
      <template v-if="!user || !user._id">
        <el-button type="primary" class="btn" round @click="dialogVisible=true">Log in</el-button>
        <el-button type="primary" class="btn" round @click="signUpDialogVisible=true">Sign up</el-button>
      </template>
      <el-dropdown v-else trigger="click">
        <span class="el-dropdown-link">
          {{ user.email }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
        class="login-dialog"
        :visible.sync="dialogVisible"
        :show-close="false"
        width="437px">
      <div class="title">Explore Account</div>
      <div class="content">
        <el-input v-model="email" class="login-input" placeholder="Email"></el-input>
        <el-input v-model="password" type="password" class="login-input" placeholder="Password"></el-input>
      </div>
      <div class="actions">
        <el-button class="btn" type="primary" @click="userLogin">Log in</el-button>
        <el-button class="btn" type="info" @click="dialogVisible = false">Close</el-button>
      </div>
    </el-dialog>
    <el-dialog
        class="login-dialog"
        :visible.sync="signUpDialogVisible"
        :show-close="false"
        width="437px">
      <div class="title">Sign up</div>
      <div class="content">
        <el-input v-model="signUpEmail" class="login-input" placeholder="Email"></el-input>
        <el-input v-model="signUpPassword" type="password" class="login-input" placeholder="Password"></el-input>
      </div>
      <div class="actions">
        <el-button class="btn" type="primary" @click="userSignUp">Sign Up</el-button>
        <el-button class="btn" type="info" @click="signUpDialogVisible = false">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getCurrentUser, login, signUp} from "@/services/user";

export default {
  data() {
    return {
      email: '',
      password: '',
      dialogVisible: false,
      signUpDialogVisible: false,
      signUpEmail: '',
      signUpPassword: '',
      user: {}
    };
  },
  mounted() {
    this.user = getCurrentUser();
  },
  methods: {
    async userLogin() {
      const result = await login(this.email, this.password);
      if (result) {
        this.$message({
          message: 'login successful!',
          type: 'success'
        });
        this.dialogVisible = false;
        this.email = '';
        this.password = '';
        this.user = result;
        localStorage.setItem('user', JSON.stringify(result));
      } else {
        this.$message({
          message: 'invalid email or password',
          type: 'error'
        });
      }
    },
    async userSignUp() {
      const result = await signUp(this.signUpEmail, this.signUpPassword);
      if (result === 201) {
        this.$message({
          message: 'signup successful!',
          type: 'success'
        });
        this.signUpDialogVisible = false;
        this.signUpEmail = '';
        this.signUpPassword = '';
      } else if (result === 409) {
        this.$message({
          message: 'email has been registered',
          type: 'error'
        });
      } else {
        this.$message({
          message: 'invalid email or password',
          type: 'error'
        });
      }
    },
    toHome() {
      this.$router.push('/');
    },
    logout() {
      localStorage.clear();
      this.user = {};
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }
  .left {
    display: flex;
    align-items: center;
    color: #117182;
    font-weight: bold;
    letter-spacing: 0.5px;
    cursor: pointer;
  }
  .left img {
    margin-right: 8px;
  }
  .right {
    display: flex;
    align-items: center;
  }
  .p-list::after {
    content: '';
    display: table;
    clear: both;
  }
  .p-list li {
    float: left;
    margin: 0 20px;
  }
  .p-list li a {
    text-decoration: none;
    color: inherit;
  }
  .p-list li a:hover {
    color: #42afc2;
    font-weight: bold;
  }
  .right .btn {
    margin-left: 30px;
    padding: 8px 16px;
    border-radius: 10px;
  }
  .actions .btn {
    width: 100%;
    height: 45px;
    margin: 0;
    border-radius: 10px;
  }
  .login-dialog .actions .btn + .btn {
    margin-top: 20px;
  }
  .login-dialog .content {
    margin: 20px 0;
  }
  .login-dialog .content .login-input {
    border-radius: 10px;
    margin-bottom: 25px;
  }
  .login-dialog .title {
    text-align: center;
    color: #000000;
    font-size: 38px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  .el-dropdown-link {
    color: #42afc2;
    cursor: pointer;
  }
</style>
