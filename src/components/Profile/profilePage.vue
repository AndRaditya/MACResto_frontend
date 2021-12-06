<template>
    <v-main class="list" style="margin-top: 20px">
        
        <h3 class="text-h3 font-weight-medium mb-5" style="margin-top: 150px">Profile</h3>
        <v-container fluid fill-height class="posisinya" style="margin-top: -50px">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Nama" v-model="namaLengkap" :rules="nameRules" required>
                                    </v-text-field>
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required disabled>
                                    </v-text-field>
                                    <v-text-field label="Username" v-model="username" :rules="usernameRules" required>
                                    </v-text-field>
                                    <v-text-field label="Nomor Telepon" v-model="noTelp" :rules="noTelpRules" required>
                                    </v-text-field>

                                    <v-layout>
                                        <v-layout justify-end>
                                            <v-btn class="mr-2" @click="update" color="success"
                                                :class=" { 'grey darken-1 white--text' : valid, disabled: !valid }">
                                                Edit Data </v-btn>
                                            <v-btn @click="resetForm" class="red darken-3 white--text">Clear</v-btn>
                                        </v-layout>
                                    </v-layout>
                                </v-form>
                            </div>

                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<style>
    @import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");
   
    .grey--text {
        font-family: "Jolly Lodger";
    }

    .posisinya {
        left: 0;
        right: 0;
    }
</style>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                search: null,
                dialog: false,
                dialogEdit: false,
                dialogConfirm: false,

                namaLengkap: localStorage.getItem('namaLengkap'),
                email: localStorage.getItem('email'),
                username: localStorage.getItem('username'),
                noTelp: localStorage.getItem('noTelp'),

                user: new FormData,
                users: [],
                deleteId: '',
                editId: localStorage.getItem('id'),

                nameRules: [
                    (v) => !!v || 'Nama tidak boleh kosong :(',
                ],
                emailRules: [
                    (v) => !!v || 'Email tidak boleh kosong :(',
                ],
                usernameRules: [
                    (v) => !!v || 'Username tidak boleh kosong :(',
                ],
                noTelpRules: [
                    (v) => !!v || 'Nomor Telepon tidak boleh kosong :(',
                ]
            };
        },
        methods: {
            //read data
            readData() {
                var url = this.$api + '/user';
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.users = response.data.data;
                })
            },

            //update data
            update() {
                let newData = {
                    namaLengkap: this.namaLengkap,
                    email: this.email,
                    username: this.username,
                    noTelp: this.noTelp
                };
                var url = this.$api + '/user/' + this.editId;
                this.load = true;
                this.$http.put(url, newData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.inputType = 'Tambah';
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = 'red';
                    this.snackbar = true;
                    this.load = false;
                });
            },

            resetForm() {
                this.namaLengkap = null,
                    this.email = null,
                    this.username = null,
                    this.noTelp = null
            },
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
        },
    };
</script>