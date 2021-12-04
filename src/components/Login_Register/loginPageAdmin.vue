<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-card>
                        <h1 style="font-family: Anton, sans-serif; padding-top: 50px">Masuk Admin</h1>
                        <img src="../Images/login.jpeg" style="width: 150px" />
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <div class="mb3">
                                        <p class="text-start" style="margin-bottom: 5px;">
                                            <strong>E-Mail</strong>
                                        </p>
                                        <v-text-field v-model="email" :rules="emailRules" required filled
                                            label="Masukkan E-Mail">
                                        </v-text-field>
                                    </div>

                                    <div class="mb3">
                                        <p class="text-start" style="margin-bottom: 5px;">
                                            <strong>Password</strong>
                                        </p>
                                        <v-text-field filled v-model="password" type="password" min="8"
                                            :rules="passwordRules" counter required label="Masukkan Password">
                                        </v-text-field>
                                    </div>          
                                    <v-layout justify-center>
                                        <v-btn class="btn btn-primary d-block w-100 white--text" @click="submit"
                                            style="background: #ff7d00; margin-right: 8px" name="register">
                                            Masuk
                                        </v-btn>
                                    </v-layout>

                                     <v-layout justify-center style="margin-top: 20px">
                                        <v-btn @click="clear" class="grey darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message}}</v-snackbar>
    </main>
</template>


<style>
    @import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");
   
  
    .posisinya {
        position: absolute;
        margin-top: 100px;
        left: 0;
        right: 0;
    }
</style>

<script>
    export default {
        name: "Login",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong :(',
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'E-Mail tidak boleh kosong :(',
                ]
            };
        },
        mounted(){
                this.showVerified();
            },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    if(this.email === "admin@admin.com"){
                        this.load = true;
                        this.$http.post(this.$api + '/login', {
                            email: this.email,
                            password: this.password
                        }).then(response => {
                            //simpan data id usere yang diinput
                            localStorage.setItem('id', response.data.user.id);
                            localStorage.setItem('token', response.data.access_token);
                            localStorage.setItem('namaLengkap', response.data.user.namaLengkap);
                            localStorage.setItem('email', response.data.user.email);
                            localStorage.setItem('username', response.data.user.username);
                            localStorage.setItem('noTelp', response.data.user.noTelp);

                            this.error_message = response.data.message;
                            this.color = "green";
                            this.snackbar = true;
                            this.load = false;
                            this.clear();
                            this.$router.push({
                                name: 'DashboardAdmin',
                            });
                        }).catch(error => {
                            this.error_message = error.response.data.message;
                            this.color = "red";
                            this.snackbar = true;
                            localStorage.removeItem('token');
                            this.load = false;
                        })
                    }else{
                        this.$router.push({
                                name: 'Index',
                            });
                    }
                    
                }
            },
            showVerified(){
                if(this.$route.query.verified == 'success'){
                    this.success = true;
                    this.router.push(
                        '/login'
                    );
                }
            },
            clear() {
                this.$refs.form.reset()
            },
            register() {
                this.$router.push({
                    name: 'Register',
                });
            }
        },
    };
</script>