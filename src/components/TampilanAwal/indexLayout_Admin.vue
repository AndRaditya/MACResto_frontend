<template>
    <div class="index">
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-4 mb-5 bg-white navbaredit">
            <div class="container-fluid">
                <div class="col-sm-3">
                    <a @click="kembaliDashboard" style="text-decoration: none;">
                        <img src="../Images/restaurant (1).png" style="width: 64px; height:64px;"
                            align="left">
                        <h2 style="color: black; margin-top: 12px; margin-left: -30px; font-weight: bold;"><small>MAC Resto - Admin</small></h2>
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" style="margin: 0 0 0 auto;">
                        <li class="nav-item" style="margin-left: 16px">
                            <a class="nav-link" @click="login">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="fullheight pa-5">
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
        name: "IndexAdmin",
        data() {
            return {
                items: [{
                        title: "IndexAdmin",
                        to: "/index_admin"
                    },
                    {
                        title: "LoginAdmin",
                        to: "/login_admin"
                    },
                    // {title: "Course", to: "/course"},
                ],
            };
        },
        methods: {
            login() {
                this.$router.push({
                    name: 'LoginAdmin',
                });
            },
            kembaliDashboard() {
                this.$router.push({
                    name: 'IndexAdmin',
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