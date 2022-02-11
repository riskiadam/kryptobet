<script>
import Vue from "vue";
import { GET_PROFILE } from "@/store/constants/actions.type";
import BaseLayout from "@/layouts/BaseLayout";
export default {
  name: 'Profile',
  head: {
    link: [
      { rel: 'canonical', href:'http://158.255.47.199/profile' }
    ]
  },
  components: {
    BaseLayout
  },
  data() {
    return {
      passwordPayload: {
        oldPassword: null,
        newPassword: null,
        confirmPass: null,
      },
      pinPayload: {
        password: "",
        newPin: "",
      },
      render: false,
      fields: [
        {
          key: "username",
          class: "text-light",
          sortable: true,
        },
        { key: "joinDate", class: "text-light", sortable: true },
        { key: "lastLoginDate", class: "text-light", sortable: true },
        {
          key: "depositCount",
          class: "text-right text-light ",
          sortable: true,
        },
        { key: "status", class: "text-right text-light", sortable: true },
      ],
      additionalBankAcc: [],
      profile: {},
    };
  },
  mounted() {
    this.$store.dispatch(GET_PROFILE).then(() => {
      this.render = true;
    });
    this.profile = this.currentUser;
  },
  methods: {
    // RESTRIC PIN
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    // ACTION METHOD
    clearPassword() {
      this.passwordPayload = {
        oldPassword: null,
        newPassword: null,
        confirmPass: null,
      };
    },
    clearPin() {
      this.pinPayload = {
        password: "",
        newPin: "",
      };
    },
    changePassword() {
      if (
        this.passwordPayload.newPassword !== this.passwordPayload.confirmPass
      ) {
        // this.showMessage("Password need to be confirmed", "error");
        Vue.notify({
          group: 'PasswordChangeError',
          title: 'Password Not Confirmed',
          text: 'Password need to be confirmed!',
          type : 'error',
          closeOnClick : true,
          max : 1,
          ignoreDuplicates : true
        });
      } else {
        this.changeLoader(true);
        this.ApiService.post("me/resetpassword", this.passwordPayload)
          .then(() => {
            // this.showMessage("Password changed saved", "success");
            Vue.notify({
              group: 'PasswordChangeSuccess',
              title: 'Password Succes Changed',
              text: 'Password changed saved!',
              type : 'success',
              closeOnClick : true,
              max : 1,
              ignoreDuplicates : true
            });
            this.clearPassword();
          })
          .catch((error) => {
            // this.showMessage(error, "error");
            Vue.notify({
              group: 'ErrorMessage',
              title: 'We Have a problem',
              text: error,
              type : 'error',
              closeOnClick : true,
              max : 1,
              ignoreDuplicates : true
            });
          })
          .finally(() => {
            this.changeLoader(false);
          });
      }
    },
    copyLink() {
      // let hostname = window.location.origin;
      // let link = `${hostname}/register/${this.currentUser.referralCode}`;
      let link = `http://158.255.47.199:7702/register/${this.currentUser.referralCode}`; 
      this.$copyText(link);
      // this.showMessage("Referral Link copied", "success");
      Vue.notify({
        group: 'RefferalMessage',
        title: 'Referral Link Copied',
        text: 'Success Copied!',
        type : 'success',
        closeOnClick : true,
        max : 1,
        ignoreDuplicates : true
      });
    },
    changePin() {
      this.changeLoader(true);
      this.ApiService.put("/me/changepin", this.pinPayload)
        .then(() => {
          // this.showMessage("Pin changed saved", "success");
          Vue.notify({
            group: 'SuccessMessage',
            title: 'Success changed',
            text: 'Pin changed saved',
            type : 'success',
            closeOnClick : true,
            max : 1,
            ignoreDuplicates : true
          });
          this.clearPin();
        })
        .catch((error) => {
          // this.showMessage(error, "error");
          Vue.notify({
            group: 'ErrorMessage',
            title: 'We Have a problem',
            text: error,
            type : 'error',
            closeOnClick : true,
            max : 1,
            ignoreDuplicates : true
          });
        })
        .finally(() => {
          this.changeLoader(false);
        });
    },
    addNewBackAcc() {
      let param = {
        idx: this.additionalBankAcc.length,
        bank: "",
        accountNo: "",
        accountName: "",
      };

      this.additionalBankAcc.push(param);
    },
    removeBankAcc(item) {
      let tmp = [];
      let idx = 0;
      for (let i = 0; i < this.additionalBankAcc.length; i++) {
        if (this.additionalBankAcc[i].idx != item.idx) {
          let param = {
            idx: idx,
            bank: this.additionalBankAcc[i].bank,
            accountNo: this.additionalBankAcc[i].accountNo,
            accountName: this.additionalBankAcc[i].accountName,
          };
          tmp.push(param);
          idx++;
        }
      }
      this.additionalBankAcc = tmp;
    },
  }
};
</script>

<template>
  <BaseLayout>
    <div class="profile" v-if="render">
      <b-row
        class="ProfileDesktop"
        style="padding:0px; margin:0px; margin-top:30px;"
      >
        <div class="profile-content" style="padding:0px;">
          <div class="profile-section-container" style="background-color:#000;">
            <div
              class="profile-section-title"
              style="background-color:#320033; color:white; padding:15px; margin:0px;"
            >
              PROFILE ACCOUNT
            </div>
            <div class="profile-section-content">
              <b-container fluid>
                <!-- Nama Lengkap-->
                <b-row class="profile-form-row">
                  <b-col col cols="12" md="6" class="profile-form-label"
                    >Name</b-col
                  >
                  <b-col col cols="12" md="6" class="profile-form-input">
                    <b-form-input v-model="profile.accountName"></b-form-input>
                  </b-col>
                </b-row>

                <!-- Nama Player -->
                <b-row class="profile-form-row">
                  <b-col col cols="12" md="6" class="profile-form-label"
                    >Username</b-col
                  >
                  <b-col col cols="12" md="6" class="profile-form-input">
                    <b-form-input v-model="profile.username"></b-form-input>
                  </b-col>
                </b-row>

                <!-- Tanggal Lahir -->
                <!-- <b-row class="profile-form-row">
                <b-col col cols="12" md="6" class="profile-form-label"
                  >Date of Birth</b-col>
                  <b-col col cols="12" md="6" class="profile-form-input">
                  <b-form-input></b-form-input>
                  </b-col>
              </b-row>-->

                <!-- Jenis Kelamin -->
                <!-- <b-row class="profile-form-row">
                <b-col col cols="12" md="6" class="profile-form-label"
                  >Gender</b-col>
                  <b-col col cols="12" md="6" class="profile-form-input">
                  <b-form-input></b-form-input>
                  </b-col>
              </b-row> -->

                <!-- User Email -->
                <b-row class="profile-form-row">
                  <b-col col cols="12" md="6" class="profile-form-label"
                    >Email</b-col
                  >
                  <b-col col cols="12" md="6" class="profile-form-input">
                    <b-form-input v-model="profile.email"></b-form-input>
                  </b-col>
                </b-row>

                <!-- User Mobile -->
                <b-row class="profile-form-row">
                  <b-col col cols="12" md="6" class="profile-form-label"
                    >Mobile</b-col
                  >
                  <b-col col cols="12" md="6" class="profile-form-input">
                    <b-form-input v-model="profile.phone"></b-form-input>
                  </b-col>
                </b-row>

                <!-- Jumlah Credit -->
                <b-row class="profile-form-row">
                  <b-col col cols="12" md="6" class="profile-form-label"
                    >Available Balance</b-col
                  >
                  <b-col col cols="12" md="6" class="profile-form-input">
                    <b-form-input
                      fluid
                      disabled
                      v-model="mainWallet.balance"
                    ></b-form-input>
                  </b-col>
                </b-row>

                <!-- Nama Bank -->
                <b-row class="profile-form-row">
                  <b-col col cols="12" md="6" class="profile-form-label"
                    >Bank</b-col
                  >
                  <b-col col cols="12" md="6" class="profile-form-input">
                    <b-form-input
                      v-model="currentUser.bank.name"
                      type="text"
                      size="sm"
                      fluid
                      disabled
                    ></b-form-input>
                  </b-col>
                </b-row>

                <!-- Norek. Bank -->
                <b-row class="profile-form-row">
                  <b-col col cols="12" md="6" class="profile-form-label"
                    >Bank Account No.</b-col
                  >
                  <b-col col cols="12" md="6" class="profile-form-input">
                    <span class="form-control" style="background-color:#E9ECEF">
                      {{ currentUser.accountNo | backMasking }}
                    </span>
                  </b-col>
                </b-row>

                <!-- A.N. Bank -->
                <b-row class="profile-form-row">
                  <b-col col cols="12" md="6" class="profile-form-label"
                    >Bank Account Name</b-col
                  >
                  <b-col col cols="12" md="6" class="profile-form-input">
                    <b-form-input
                      v-model="currentUser.accountName"
                      type="text"
                      size="sm"
                      fluid
                      disabled
                    ></b-form-input>
                  </b-col>
                </b-row>

                <!-- Penambahan Akun Bank -->
                <div
                  v-for="x in additionalBankAcc"
                  :key="x.idx"
                  class="separator-bank-acc"
                >
                  <b-row class="profile-form-row">
                    <b-col col cols="12" md="6" class="profile-form-label"
                      >Bank {{ x.idx + 1 }}</b-col
                    >
                    <b-col col cols="12" md="6" class="profile-form-input">
                      <b-form-input
                        v-model="x.bank"
                        type="text"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="profile-form-row">
                    <b-col col cols="12" md="6" class="profile-form-label"
                      >Bank Account No. {{ x.idx + 1 }}</b-col
                    >
                    <b-col col cols="12" md="6" class="profile-form-input">
                      <b-form-input
                        v-model="x.accountNo"
                        type="text"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="profile-form-row">
                    <b-col col cols="12" md="6" class="profile-form-label"
                      >Bank Account Name {{ x.idx + 1 }}</b-col
                    >
                    <b-col col cols="12" md="6" class="profile-form-input">
                      <b-form-input
                        v-model="x.accountName"
                        type="text"
                        size="sm"
                        fluid
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="profile-form-row">
                    <b-col col cols="12">
                      <b-button class="submit-button-2" @click="removeBankAcc(x)">
                        Save
                      </b-button>
                    </b-col>
                  </b-row>

                  <b-row class="profile-form-row">
                    <b-col col cols="12">
                      <b-button class="submit-button-2" @click="removeBankAcc(x)">
                        Remove
                      </b-button>
                    </b-col>
                  </b-row>
                </div>

                <!-- Tombol Penambahan Akun Bank -->
                <b-row
                  class="profile-form-row"
                  hidden
                  v-if="additionalBankAcc.length < 3"
                >
                  <b-col col cols="12">
                    <b-button
                      fluid
                      class="submit-button-2"
                      @click="addNewBackAcc"
                    >
                      Add Bank Account
                    </b-button>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
        </div>

        <b-col>
          <div class="profile-content" style="padding:0px; margin:0px;">
            <div
              class="profile-section-container"
              style="padding:0px; margin:0px;"
            >
              <div
                class="profile-section-title"
                style="background-color:#320033; color:white; padding:15px; margin:0px;"
              >
                CHANGE PASSWORD
              </div>
              <div class="profile-section-content">
                <b-container fluid>
                  <b-row>
                    <b-col cols="12">
                      <b-form @submit.prevent="changePassword">
                        <b-row class="profile-form-row">
                          <b-col
                            col
                            cols="12"
                            md="4"
                            align-self="center"
                            class="profile-form-label"
                            >Old password</b-col
                          >
                          <b-col col cols="12" md="8" class="profile-form-input">
                            <b-form-input
                              v-model="passwordPayload.oldPassword"
                              type="password"
                              size="sm"
                              fluid
                            ></b-form-input>
                          </b-col>
                        </b-row>
                        <b-row class="profile-form-row">
                          <b-col
                            col
                            cols="12"
                            md="4"
                            align-self="center"
                            class="profile-form-label"
                            >New Password</b-col
                          >
                          <b-col col cols="12" md="8" class="profile-form-input">
                            <b-form-input
                              v-model="passwordPayload.newPassword"
                              type="password"
                              size="sm"
                              fluid
                            ></b-form-input>
                          </b-col>
                        </b-row>
                        <b-row class="profile-form-row">
                          <b-col
                            col
                            cols="12"
                            md="4"
                            align-self="center"
                            class="profile-form-label"
                            >Confirm Password</b-col
                          >
                          <b-col
                            col
                            cols="12"
                            md="8"
                            align-self="center"
                            class="profile-form-input"
                          >
                            <b-form-input
                              v-model="passwordPayload.confirmPass"
                              type="password"
                              size="sm"
                              fluid
                            ></b-form-input>
                          </b-col>
                        </b-row>
                        <b-row class="profile-form-row">
                          <b-col
                            col
                            cols="12"
                            md="4"
                            class="profile-form-label"
                          ></b-col>
                          <b-col col cols="12" md="4" class="profile-form-input">
                            <b-button class="reset-button" @click="clearPassword"
                              >Reset</b-button
                            >
                          </b-col>
                          <b-col col cols="12" md="4" class="profile-form-input">
                            <b-button
                              type="submit"
                              class="submit-button-2"
                              style="background-color:#FF9933"
                              >Submit</b-button
                            >
                          </b-col>
                        </b-row>
                      </b-form>
                    </b-col>
                  </b-row>
                </b-container>
              </div>
            </div>
          </div>

          <!-- <div class="profile-content">
            <div class="profile-section-container">
              <div class="profile-section-title">CHANGE PIN</div>
              <div class="profile-section-content">
                <b-container fluid>
                  <b-row>
                    <b-col cols="12">
                      <b-form @submit.prevent="changePin">
                        <b-row class="profile-form-row">
                          <b-col
                            col
                            cols="12"
                            md="4"
                            align-self="center"
                            class="profile-form-label"
                            >Password</b-col
                          >
                          <b-col col cols="12" md="8" class="profile-form-input">
                            <b-form-input
                              v-model="pinPayload.password"
                              type="password"
                              size="sm"
                              fluid
                            ></b-form-input>
                          </b-col>
                        </b-row>
                        <b-row class="profile-form-row">
                          <b-col
                            col
                            cols="12"
                            md="4"
                            align-self="center"
                            class="profile-form-label"
                            >New Pin</b-col
                          >
                          <b-col col cols="12" md="8" class="profile-form-input">
                            <input
                              @keypress="onlyNumber"
                              type="password"
                              v-model="pinPayload.newPin"
                              class="form-control"
                              maxlength="4"
                            />
                          </b-col>
                        </b-row>
                        <b-row class="profile-form-row">
                          <b-col
                            col
                            cols="12"
                            md="4"
                            class="profile-form-label"
                          ></b-col>
                          <b-col col cols="12" md="8" class="profile-form-input">
                            <b-button type="submit" class="submit-button-2"
                              >Submit</b-button>
                          </b-col>
                        </b-row>
                      </b-form>
                    </b-col>
                  </b-row>
                </b-container>
              </div>
            </div>
          </div> -->

          <div
            class="profile-content"
            style="padding:0px; margin:0px; margin-top:15px; margin-bottom:15px;"
          >
            <div
              class="profile-section-container"
              style="padding:0px; margin:0px; "
            >
              <div
                class="profile-section-title"
                style="background-color:#320033; color:white;padding:15px; margin:0px;"
              >
                REFERRAL
              </div>
              <div class="profile-section-content">
                <b-container fluid>
                  <b-row class="profile-form-row">
                    <b-col
                      col
                      cols="4"
                      class="profile-form-label"
                      style="padding:0px; margin:0px;"
                    >
                      Referral Code
                    </b-col>

                    <b-col
                      col
                      cols="8"
                      class="profile-form-input"
                      style="padding:0px; margin:0px;"
                    >
                      <b-form-input
                        v-model="currentUser.referralCode"
                        type="text"
                        size="sm"
                        fluid
                        disabled
                      >
                      </b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="profile-form-row">
                    <b-col
                      col
                      cols="4"
                      class="profile-form-input"
                      style="padding:0px; margin:0px;"
                    >
                    </b-col>

                    <b-col
                      col
                      cols="8"
                      class="profile-form-input"
                      style="padding:0px; margin:0px; width:100%"
                    >
                      <b-button
                        class="submit-button-2"
                        @click="copyLink"
                        style="width:100%; background-color:#FF9933;"
                      >
                        Copy Link Referral Code
                      </b-button>
                    </b-col>
                  </b-row>

                  <b-row class="profile-form-row">
                    <b-col
                      style="padding:0px; margin:0px;"
                      col
                      cols="12"
                      md="12"
                      class="profile-form-label  mb-2"
                      >Referral List</b-col
                    >
                  </b-row>

                  <b-row class="profile-form-row">
                    <b-table
                      class="center text-center justify-content-center"
                      style="background-color:#000; color:white;"
                      small
                      center
                      dark
                      hover
                      striped
                      show-empty
                      :items="currentUser.referralList"
                      :fields="fields"
                    >
                      <template v-slot:cell(joinDate)="data">
                        <span>{{ data.item.joinDate | localDate }}</span>
                      </template>

                      <template v-slot:cell(lastLoginDate)="data">
                        <span>{{ data.item.lastLoginDate | localDate }}</span>
                      </template>

                      <template v-slot:cell(status)="data">
                        <div class="text-info">
                          {{
                            data.item.isActive ? "Active" : "Waiting for Approval"
                          }}
                        </div>
                        <div class="text-danger">
                          {{ data.item.isBlacklisted ? "Account Locked" : "" }}
                        </div>
                      </template>
                    </b-table>
                  </b-row>
                </b-container>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </BaseLayout>
</template>
