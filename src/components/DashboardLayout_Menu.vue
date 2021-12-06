<template>
    <div class="dashboard">
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-4 mb-5 bg-white navbaredit">
            <div class="container-fluid">
                <div class="col-sm-2">
                    <a @click="kembaliDashboard" style="text-decoration: none;">
                        <img src="./Images/restaurant (1).png" style="width: 64px; height:64px;"
                            align="left">
                        <h3 style="color: black; margin-top: 12px; margin-left: -30px; font-weight: bold;"><small>MAC Resto - Menu</small></h3>
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" style="margin: 0 0 0 auto;">
                        <li class="nav-item" style="margin-left: 16px">
                            <a class="nav-link" @click="btnPesanMenu">Pesan Menu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"  @click="btnReview">Review</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="fullheight pa-5" style="margin-top: 150px; padding-top:150px">
            <router-view></router-view>
        </div>
    </div>
</template>

<style>
    fieldset {
        width: fit-content;
    }

    .navbaredit {
        padding: 25px 25px !important;
        font-weight: bold;
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }

    .active a {
        background-color: #d17a49;
        border-radius: 5px;
        color: white !important;
    }
</style>

<script>
    export default {
        name: "DashboardMenu",
        data() {
            return {
                items: [{
                        title: "DashboardMenu",
                        to: "/dashboard_menu"
                    },
                    {
                        title: "Pesan",
                        to: "/pesanMenu"
                    },
                    {
                        title: "Review",
                        to: "/review"
                    },
                    // {title: "Course", to: "/course"},
                ],
            };
        },
        methods: {
            btnPesanMenu() {
                this.$router.push({
                    name: 'Pesan',
                });
                
            },
            btnReview() {
                this.$router.push({
                    name: 'Review',
                });
            },    

            kembaliDashboard() {
                this.$router.push({
                    name: 'Dashboard',
                });
            }
        }
    };
</script>
<style scoped>
    .fullheight {
        min-height: 100vh !important;
    }

    .router {
        text-decoration: none;
        color: black;
    }
</style>