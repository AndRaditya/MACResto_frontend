<template>
    <v-main class="list">

        <h3 class="text-h3 font-weight-medium mb-5" style="margin-top: 150px"></h3>
        <v-container fluid fill-height class="posisinya" style="margin-top: -90px">

            <div class="row">
                <v-card color="#D65106" height="150px">

                    <v-list-item-content>
                        <v-list-item-title class="text-h5 mb-1" style="color: #FFFFFF;margin-top: 30px"> MENU
                        </v-list-item-title>
                        <v-list-item-subtitle style="color: #FFFFFF">Pilihan menu yang tersedia</v-list-item-subtitle>
                    </v-list-item-content>
                </v-card>
            </div>

            <div class="d-flex align-items-start" style="margin-top: 60px">
                <div class="nav flex-column nav-pills me-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <!-- <button class="nav-link active" id="v-pills-semua-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-semua" type="button" role="tab" aria-controls="v-pills-home"
                        aria-selected="true" style="background-color: #D65106">Semua</button>
                    <button class="nav-link" id="v-pills-makanan-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-makanan" type="button" role="tab" aria-controls="v-pills-messages"
                        aria-selected="false">Makanan</button>
                    <button class="nav-link" id="v-pills-minuman-tab" data-bs-toggle="pill"
                        data-bs-target="#v-pills-minuman" type="button" role="tab" aria-controls="v-pills-settings"
                        aria-selected="false" style="margin-bottom: 16px">Minuman</button> -->
                    <!-- <a href="listPesananPage.php">
                    <button class="nav-link" id="v-pills-pesan-tab"  data-bs-toggle="pill"
                    type="button" role="tab"  aria-controls="v-pills-settings" href="listPesananPage.php" 
                    aria-selected="false">Pesan</button>
                </a> -->
                    <hr>

                    <button class="btn btn-light" style="background-color: #d17a49; 
                    color:white; outline-color: #d17a49; width: 140px; height: 40px;" @click="btnReview">
                        Pesan Disini
                    </button>

                </div>

                <div>
                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <img src="../Images/nasi_goreng.jpeg" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <br>
                                    <h4>Nasi Goreng</h4>
                                    <h5>Rp 17.500</h5>
                                    <br>
                                </div>
                            </v-col>

                            <v-col>
                                <img src="../Images/mie_goreng.jpg" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <br>
                                    <h4>Mie Goreng</h4>
                                    <h5>Rp 16.000</h5>
                                    <br>
                                </div>
                            </v-col>

                            <v-col>
                                <img src="../Images/mie_kuah.jpg" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <br>
                                    <h4>Mie Kuah</h4>
                                    <h5>Rp 14.000</h5>
                                    <br>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <img src="../Images/bubur_ayam.jpg" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <br>
                                    <h4>Bubur Ayam</h4>
                                    <h5>Rp 12.500</h5>
                                    <br>
                                </div>
                            </v-col>

                            <v-col>
                                <img src="../Images/ayam_goreng.jpg" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <br>
                                    <h4>Ayam Goreng</h4>
                                    <h5>Rp 15.000</h5>
                                    <br>
                                </div>
                            </v-col>

                            <v-col>
                                <img src="../Images/ayam_bakar.jpg" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <br>
                                    <h4>Ayam Bakar</h4>
                                    <h5>Rp 15.000</h5>
                                    <br>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-container fluid>
                        <v-row>
                            <v-col>
                                <img src="../Images/air_mineral.jpeg" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <br>
                                    <h4>Air Mineral</h4>
                                    <h5>Rp 3.000</h5>
                                    <br>
                                </div>
                            </v-col>

                            <v-col>
                                <img src="../Images/esteh_manis.jpeg" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <br>
                                    <h4>Es Teh Manis</h4>
                                    <h5>Rp 5.000</h5>
                                    <br>
                                </div>
                            </v-col>

                            <v-col>
                                <img src="../Images/es_teler.jpg" class="img-fluid" alt="Image">
                                <div class="why-text">
                                    <br>
                                    <h4>Es Teler</h4>
                                    <h5>Rp 10.000</h5>
                                    <br>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </div>
<!-- 

            <v-container fluid>
                <div style="background-color: #C44C06; margin-top: 60px; height: 150px">

                    <div class="row" style="padding-top: 32px;">
                        <div class="col-lg-12" align="center">
                            <p class="d-flex justify-content-center" align="center" style="color: white;">&copy; MAC
                                Resto
                            </p>
                            <div style="color: white; font-size: 14px; font-family: 'Segoe UI';">
                                Made with Sweat and Blood.
                            </div>
                        </div>
                    </div>
                </div>
            </v-container> -->
        </v-container>
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

            btnReview() {
                this.$router.push({
                    name: 'Review',
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