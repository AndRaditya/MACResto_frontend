<template>
    <v-main class="list" style="margin-top: 550px; margin-bottom: 40px">
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex sm12 sm4 elevation-6>
                    <v-card>
                        <h1 style="padding-top: 50px; font-family: Anton, sans-serif; font-size: 35px !important">
                            Daftar Sekarang
                        </h1>

                        <img src="../Images/register.png" style="width: 130px; height: 130px; margin-bottom: 25px" />
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <div class="mb3">
                                        <p class="text-start" style="margin-bottom: 5px;">
                                            <strong style="font-size: 15px !important">Nama Lengkap</strong>
                                        </p>
                                        <v-text-field v-model="namaLengkap" :rules="namaLengkapRules" required filled
                                            label="Masukkan Nama Lengkap"></v-text-field>
                                    </div>

                                    <div class="mb3">
                                        <p class="text-start" style="margin-bottom: 5px;">
                                            <strong style="font-size: 15px !important">E-Mail</strong>
                                        </p>
                                        <v-text-field v-model="email" :rules="emailRules" required filled
                                            label="Masukkan E-Mail">
                                        </v-text-field>
                                    </div>

                                    <div class="mb3">
                                        <p class="text-start" style="margin-bottom: 5px;">
                                            <strong style="font-size: 15px !important">Nomor Telepon</strong>
                                        </p>
                                        <v-text-field filled v-model="noTelp" :rules="noTelpRules" required
                                            label="Masukkan Nomor Telepon">
                                        </v-text-field>
                                    </div>

                                    <div class="mb3">
                                        <p class="text-start" style="margin-bottom: 5px;">
                                            <strong style="font-size: 15px !important">Username</strong>
                                        </p>
                                        <v-text-field filled v-model="username" :rules="usernameRules" required
                                            label="Masukkan Username">
                                        </v-text-field>
                                    </div>

                                    <div class="mb3">
                                        <p class="text-start" style="margin-bottom: 5px;">
                                            <strong style="font-size: 15px !important">Password</strong>
                                        </p>
                                        <v-text-field filled v-model="password" type="password" min="8"
                                            :rules="passwordRules" counter required label="Masukkan Password">
                                        </v-text-field>
                                    </div>

                                    <v-layout justify-center>
                                        <v-btn class="btn btn-primary d-block w-100 white--text" @click="submit"
                                            style="background: #ff7d00; margin-right: 8px" name="register">
                                            Daftar
                                        </v-btn>
                                    </v-layout>

                                    <v-layout justify-center style="margin-top: 20px">
                                        <v-btn @click="clear" class="grey darken-3 white--text">Clear</v-btn>
                                    </v-layout>

                                    <v-layout justify-center style="margin-top: 20px">
                                        <span class="d-table-cell" style="font-size: 12px">Sudah punya akun?</span>
                                        <a class="text-start d-table-cell forgot" @click="login"
                                            style="width: 111px; color: var(--bs-blue)">
                                            <span style="text-decoration: underline; margin: 4px"> Login
                                                Disini!</span>
                                        </a>
                                    </v-layout>

                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>

                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message}}
                    </v-snackbar>

                </v-flex>
            </v-layout>
        </v-container>
    </v-main>

</template>


<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");

    .posisinya {
        position: absolute;
        margin-top: 20px;
        left: 0;
        right: 0;
    }
</style>

<script>
    export default {
        name: "Register",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                namaLengkap: '',
                namaLengkapRules: [
                    (v) => !!v || 'Nama Lengkap tidak boleh kosong :(',
                ],
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong :(',
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'E-Mail tidak boleh kosong :(',
                ],
                noTelp: '',
                noTelpRules: [
                    (v) => !!v || 'Nomor Telepon tidak boleh kosong :(',
                ],
                username: '',
                usernameRules: [
                    (v) => !!v || 'Username tidak boleh kosong :(',
                ]
            };
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    //cek validasi data yang terkirim
                    this.load = true;
                    this.$http.post(this.$api + '/register', {
                        namaLengkap: this.namaLengkap,
                        email: this.email,
                        password: this.password,
                        noTelp: this.noTelp,
                        username: this.username
                    }).then(response => {
                        //simpan data id usere yang diinput
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.clear();
                        this.$router.push({
                            name: 'Index',
                        });
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    })
                }
            },
            clear() {
                this.$refs.form.reset()
            },
            login() {
                this.$router.push({
                    name: 'Login',
                });
            }
        },
    };
</script>