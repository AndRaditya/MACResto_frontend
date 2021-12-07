<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Reservasi</h3>

        <v-card-title>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="reservations" :search="search">
            <template v-slot:[`item`]="{ item }" class="col-sm">
                <v-card color="#FEF9EF" dark max-width="850" style="margin: 30px" shaped outlined>

                    <v-card-title>
                        <v-icon color="#FFFFFF" large left> </v-icon>
                        <h6 style="color: black; font-weight: bold">{{item.email_reservator}}</h6>
                    </v-card-title>

                    <v-card-actions>
                        <v-list-item class="grow">
                            <v-list-item-content>
                                <strong style="color: black;">
                                    Nama
                                </strong>
                            </v-list-item-content>

                            <v-list-item-content>
                                <strong style="color: black;">
                                    Nomor Telepon
                                </strong>
                            </v-list-item-content>

                            <v-list-item-content>
                                <strong style="color: black;">
                                    Nomor Meja
                                </strong>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-actions>

                    <v-card-actions>
                        <v-list-item class="grow">
                            <v-list-item-content>
                                <h6 style="color: black;">
                                    {{ item.nama_reservator }}
                                </h6>
                            </v-list-item-content>

                            <v-list-item-content>
                                <h6 style="color: black;">
                                    {{ item.no_telp }}
                                </h6>
                            </v-list-item-content>

                            <v-list-item-content>
                                <h6 style="color: black;">
                                    {{ item.no_meja }}
                                </h6>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-actions>

                    <v-card-actions>
                        <v-list-item class="grow">
                            <template align="right" justify="end" v-if="item.email_reservator == email_aktiv">
                                <v-btn color="primary" small class="mr-2" @click="editHandler(item)">
                                    <v-icon class="mr-1" color="white"> mdi-pencil </v-icon>
                                </v-btn>
                                <v-btn color="error" small @click="deleteHandler(item.id)">
                                    <v-icon class="mr-1" color="white"> mdi-delete </v-icon>
                                </v-btn>
                            </template>
                        </v-list-item>
                    </v-card-actions>

                </v-card>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" persistent width="1000px" content-class="elevation-0">
            <v-card style="margin-top: 150px">
                <v-card-title>
                    <span class="headline">{{ formTitle }} Reservasi</span>
                </v-card-title>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <v-text-field v-model="form.namaLengkap" label="Nama" :rules="nameRules" disabled>
                            </v-text-field>
                            <v-text-field v-model="form.email" label="Email" :rules="emailRules" disabled>
                            </v-text-field>
                            <v-text-field v-model="form.noTelp" label="No. Telepon" required disabled></v-text-field>
                            <v-select v-model="form.no_meja"
                                :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']" label="No. Meja" required>
                            </v-select>
                        </v-container>
                    </v-card-text>

                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm">Send</v-btn>
                    </v-card-action>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text> Anda Yakin ingin menghapus review ini? </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}
        </v-snackbar>
    </v-main>
</template>


<script>
    export default {
        name: "Reservasi",
        data() {
            return {
                inputType: "Tambah",
                load: false,
                snackbar: false,
                error_message: "",
                color: "",
                search: null,
                dialog: false,
                dialogConfirm: false,

                email_aktiv: localStorage.getItem("email"),
                // email: localStorage.getItem("email"),
                // namaLengkap: localStorage.getItem("namaLengkap"),

                headers: [{
                        text: "",
                        value: "namaLengkap",
                    },
                    {
                        text: "",
                        value: "email"
                    },
                    {
                        text: "",
                        value: "noTelp"
                    },
                    {
                        text: "",
                        value: "no_meja"
                    },
                    {
                        text: "",
                        value: "actions"
                    },
                ],
                reservation: new FormData,
                reservations: [],
                form: {
                    namaLengkap: localStorage.getItem("namaLengkap"),
                    email: localStorage.getItem("email"),
                    noTelp: localStorage.getItem("noTelp"),
                    no_meja: null,
                },
                deleteId: "",
                editId: "",
            };
        },

        methods: {
            setForm() {
                this.$refs.form.validate();
                if (this.inputType !== "Tambah") {
                    this.update();
                } else {
                    this.save();
                }
            },
            //read data reviews
            readData() {
                var url = this.$api + "/reservation";
                this.$http
                    .get(url, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then((response) => {
                        this.reservations = response.data.data;
                    });
            },
            save() {
                {
                    this.reservation.append("nama_reservator", this.form.namaLengkap);
                    this.reservation.append("email_reservator", this.form.email);
                    this.reservation.append("no_telp", this.form.noTelp);
                    this.reservation.append("no_meja", this.form.no_meja);

                    var url = this.$api + "/reservation";
                    this.load = true;
                    this.$http
                        .post(url, this.reservation, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token"),
                            },
                        })
                        .then((response) => {
                            this.error_message = response.data.message;
                            this.color = "green";
                            this.snackbar = true;
                            this.load = true;
                            this.close();
                            this.readData(); // baca data
                            this.resetForm();
                        })
                        .catch((error) => {
                            this.error_message = error.response.data.message;
                            this.color = "red";
                            this.snackbar = true;
                            this.load = false;
                        });
                }
            },
            //ubah data review
            update() {
                let newData = {
                    nama_reservator: this.form.namaLengkap,
                    email_reservator: this.form.email,
                    no_telp: this.form.noTelp,
                    no_meja: this.form.no_meja,
                };

                var url = this.$api + "/reservation/" + this.editId;
                this.load = true;
                this.$http
                    .put(url, newData, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then((response) => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.close();
                        this.readData(); // baca data
                        this.resetForm();
                        this.inputType = "Tambah";
                    })
                    .catch((error) => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
            },
            //hapus data produk
            deleteData() {
                //menghapus data
                var url = this.$api + "/reservation/" + this.deleteId;
                this.load = true;
                this.$http
                    .delete(url, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then((response) => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.close();
                        this.readData(); // baca data
                        this.resetForm();
                        this.inputType = "Tambah";
                    })
                    .catch((error) => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
            },
            editHandler(item) {
                this.inputType = "Ubah";
                this.editId = item.id;
                this.namaLengkap = item.nama_reservator;
                this.email = item.email_reservator;
                this.noTelp = item.no_telp;
                this.form.no_meja = item.no_meja;
                this.dialog = true;
            },
            deleteHandler(id) {
                this.deleteId = id;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.inputType = "Tambah";
                this.dialogConfirm = false;
                this.readData();
            },
            cancel() {
                this.resetForm();
                this.readData();
                this.dialog = false;
                this.dialogConfirm = false;
                this.inputType = "Tambah";
            },
            resetForm() {
                this.form = {
                    namaLengkap: localStorage.getItem("namaLengkap"),
                    noTelp: localStorage.getItem("noTelp"),
                    email: localStorage.getItem("email"),
                    no_meja: null,
                };
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