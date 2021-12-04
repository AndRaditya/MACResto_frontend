<template>
  <v-main class="list">
    <h3 class="text-h3" font-weight-medium mb-5>Reviews</h3>

    <v-card-title>
      <v-spacer></v-spacer>

      <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
    </v-card-title>

    <v-data-table :headers="headers" :items="reviews" :search="search">
      <template v-slot:[`item`]="{ item }" class="col-sm">
        <v-card
          color="#CACACA"
          dark
          max-width="850"
          style="margin: 30px"
          shaped
          outlined
        >
          <v-card-title>
            <v-icon color="#FFFFFF" large left> </v-icon>
            <span class="text-h5 font-weight-light">{{
              item.email_review
            }}</span>
          </v-card-title>

          <v-card-text class="text-h6 font-weight-bold">
            {{ item.deskripsi_review }}
          </v-card-text>

          <div>
            <v-rating
              v-model="item.star_review"
              color="yellow darken-3"
              background-color="yellow darken-3"
              half-increments
              large
              empty-icon="☆"
              full-icon="★"
            ></v-rating>
          </div>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.nama_review }}</v-list-item-title>
              </v-list-item-content>

              <v-row
                align="center"
                justify="end"
                v-if="item.email_review == email_aktiv"
              >
                <v-btn
                  color="#CACACA"
                  small
                  class="mr-2"
                  @click="editHandler(item)"
                >
                  <v-icon class="mr-1" color="green"> 🗑 </v-icon>
                </v-btn>

                <v-btn color="#CACACA" small @click="deleteHandler(item.id)">
                  <v-icon class="mr-1" color="red"> mdi-delete </v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Review</span>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-container>
              <v-text-field
                v-model="form.namaLengkap"
                label="Nama"
                :rules="nameRules"
                disabled
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                label="Email"
                :rules="emailRules"
                disabled
              ></v-text-field>

              <v-rating
                empty-icon="☆"
                full-icon="★"
                v-model="form.star_review"
                color="yellow darken-3"
                background-color="yellow darken-3"
                hover
                large
                :rules="starRules"
              ></v-rating>

              <v-textarea
                v-model="form.deskripsi_review"
                label="Deskripsi"
                required
                :rules="deskripsiRules"
              ></v-textarea>
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

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text> Anda Yakin ingin menghapus review ini? </v-card-text>
        <v-card-action>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
      >{{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "List",
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

      nameRules: [(v) => !!v || "Nama is required"],

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      deskripsiRules: [
        (v) => !!v || "Deskripsi is required",
        (v) =>
          (v && v.length <= 100) ||
          "Deskripsi must be less than 100 characters",
      ],
      headers: [
        {
          text: "",
          align: "start",
          sortable: true,
          value: "namaLengkap",
        },
        { text: "", value: "email" },
        { text: "", value: "star_review" },
        { text: "", value: "deskripsi_review" },
        { text: "", value: "actions" },
      ],
      review: new FormData(),
      reviews: [],
      form: {
        namaLengkap: localStorage.getItem("namaLengkap"),
        email: localStorage.getItem("email"),
        star_review: null,
        deskripsi_review: null,
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
      var url = this.$api + "/review";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.reviews = response.data.data;
        });
    },
    save() {
      if (
        this.form.namaLengkap != null &&
        this.form.email != null &&
        this.form.star_review != null &&
        this.form.deskripsi_review != null
      ) {
        this.review.append("nama_review", this.form.namaLengkap);
        this.review.append("email_review", this.form.email);
        this.review.append("star_review", this.form.star_review);
        this.review.append("deskripsi_review", this.form.deskripsi_review);

        var url = this.$api + "/review/";
        this.load = true;
        this.$http
          .post(url, this.review, {
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
        namaLengkap: this.form.nama_review,
        email: this.form.email_review,
        star_review: this.form.star_review,
        deskripsi_review: this.form.deskripsi_review,
      };

      var url = this.$api + "/review/" + this.editId;
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
      var url = this.$api + "/review/" + this.deleteId;
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
      this.namaLengkap = item.nama_review;
      this.email = item.email_review;
      this.form.star_review = item.star_review;
      this.form.deskripsi_review = item.deskripsi_review;
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
        email: localStorage.getItem("email"),
        star_review: null,
        deskripsi_review: null,
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
