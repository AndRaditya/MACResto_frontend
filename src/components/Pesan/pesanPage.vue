<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5> Pesan Menu </h3>

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>

                <v-spacer></v-spacer>

                <v-btn color="success" dark @click="dialog = true"> Buat Pesanan </v-btn>
            </v-card-title>

            <v-data-table :headers="headers" :items="orders" :search="search">
                <template v-slot:[`item.actions`]="{ item }"> 
                    <v-btn small class="mr-2" @click="editHandler(item)"> edit </v-btn>
                    <v-btn small @click="deleteHandler(item.id)"> delete </v-btn>
                </template>
            </v-data-table> 
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Pesanan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-select
                            v-model="form.makanan"
                            :items="['Nasi Goreng', 'Mie Goreng', 'Mie Kuah',
                                        'Bubur', 'Ayam Goreng', 'Ayam Bakar']"
                            label="Makanan" required></v-select>
                        <v-text-field v-model="form.jumlah_makanan" label="Jumlah" required></v-text-field>
                        <v-select
                            v-model="form.minuman"
                            :items="['Air Mineral', 'Es Teh Manis', 'Es Teler']"
                            label="Minuman" required></v-select>
                        <v-text-field v-model="form.jumlah_minuman" label="Jumlah" required></v-text-field>
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
            headers: [
                { text: "Makanan", value:'makanan' },
                { text: "Jumlah", value:'jumlah_makanan' },
                { text: "Minuman", value:'minuman' },
                { text: "Jumlah", value:'jumlah_minuman' },
                { text: "Actions", value:'actions' },
            ],
            order: new FormData,
            orders: [],
            form: {
                makanan: null,
                jumlah_makanan: null,
                minuman: null,
                jumlah_minuman: null,
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

        // Read Data Orders
        readData() {
            var url = this.$api + '/order';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.orders = response.data.data;
            })
        },

        save() {
            this.order.append('makanan', this.form.makanan);
            this.order.append('jumlah_makanan', this.form.jumlah_makanan);
            this.order.append('minuman', this.form.minuman);
            this.order.append('jumlah_minuman', this.form.jumlah_minuman);

            var url = this.$api + '/order/'
            this.load = true;
            this.$http.post(url, this.order, {
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

        // Ubah data Order
        update() {
            let newData = {
                makanan : this.form.makanan,
                jumlah_makanan : this.form.jumlah_makanan,
                minuman : this.form.minuman,
                jumlah_minuman : this.form.jumlah_minuman,
            };
            var url = this.$api + '/order/' + this.editId;
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

        // Hapus data order
        deleteData() {
            var url = this.$api + '/order/' + this.deleteId;
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
            this.form.makanan = item.makanan;
            this.form.jumlah_makanan = item.jumlah_makanan;
            this.form.minuman = item.minuman;
            this.form.jumlah_minuman = item.jumlah_minuman;
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
                makanan: null,
                jumlah_makanan: null,
                minuman: null,
                jumlah_minuman: null,
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