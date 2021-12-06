<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Reservasi </h3>

        <v-card>
            <v-card-title>
                <v-btn color="success" dark @click="dialog = true"> Buat Reservasi </v-btn>
            </v-card-title>

            <v-form :headers="headers" :items="reservations">
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.nama_reservator" label="Nama" disabled></v-text-field>
                        <v-text-field v-model="form.no_telp" label="No. Telepon" disabled></v-text-field>
                        <v-text-field v-model="form.no_meja" label="No. Meja" disabled></v-text-field>
                        </v-container>
                </v-card-text>
                <v-layout justify-end>
                        <v-btn small class="mr-2" @click="editHandler(item)" color="success"> edit </v-btn>
                        <v-btn small @click="deleteHandler(item.id)" class="red"> delete </v-btn>
                </v-layout>
            </v-form> 
        </v-card>
        
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Reservation</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.nama_reservator" label="Nama" required></v-text-field>
                        <v-text-field v-model="form.no_telp" label="No. Telepon" required></v-text-field>
                        <v-select
                            v-model="form.no_meja"
                            :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
                            label="No. Meja" required></v-select>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Eits!</span>
                </v-card-title>
                <v-card-text>Anda yakin ingin menghapus reservasi yang sudah dibuat?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData"> Delete </v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message}}</v-snackbar>
    </v-main>
</template> 

<script>
export default {
    name: "List",
    data() {
        return {
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,

            nama_reservator: localStorage.getItem('namaLengkap'),
            no_telp: localStorage.getItem('noTelp'),

            headers: [
                { text: "Nama", value: "nama_reservator" },
                { text: "No. Telepon", value:'no_telp' },
                { text: "No. Meja", value:'no_meja' },
                { text: "Actions", value:'actions' },
            ],
            reservation: new FormData,
            reservations: [],
            form: {
                nama_reservator: localStorage.getItem('namaLengkap'),
                no_telp: localStorage.getItem('noTelp'),
                no_meja: null,
            },
            deleteId: '',
            editId: ''
        };
    },

    methods: {
        setForm() {
            if(this.inputType !== 'Tambah') {
                this.update();
            } else {
                this.save();
            }
        },

        // Read Data Reservations
        readData() {
            var url = this.$api + '/reservation';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.reservations = response.data.data;
            })
        },

        save() {
            this.reservation.append('nama_reservator', this.form.nama_reservator);
            this.reservation.append('no_telp', this.form.no_telp);
            this.reservation.append('no_meja', this.form.no_meja);

            var url = this.$api + '/reservation/'
            this.load = true;
            this.$http.post(url, this.reservation, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData(); // baca data
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        // Ubah data Reservation
        update() {
            let newData = {
                nama_reservator : this.form.nama_reservator,
                no_telp : this.form.no_telp,
                no_meja : this.form.no_meja,
            };
            var url = this.$api + '/reservation/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); // baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        // Hapus data reservation
        deleteData() {
            var url = this.$api + '/reservation/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); // baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form.nama_reservator = item.nama_reservator;
            this.form.no_telp = item.no_telp;
            this.form.no_meja = item.no_meja;
            this.dialog = true;
        },

        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },

        close() {
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData;
        },

        cancel() {
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },

        resetForm() {
            this.form = {
                nama_reservator: null,
                no_telp: null,
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