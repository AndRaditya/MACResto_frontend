<template>
   <div class="container">
               <div id="carouselExampleCaptions" class="carousel slide carouseledit" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner carouseledit img">
                <div class="carousel-item active">
                    <img src="./Images/carousel1.jpg" class="d-block w-100" alt="...">
                    <!--<img src="https://www.icegif.com/wp-content/uploads/rick-roll-icegif-5.gif" class="d-block w-100" alt="...">-->
                    <div class="carousel-caption d-md-block captionedit">
                        <h1><strong>Selamat Datang!</strong></h1>
                        <p>Selamat menikmati menu di MAC Resto!</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="./Images/carousel2.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-md-block captionedit">
                        <h1><strong>Selamat Datang!</strong></h1>
                        <p>Selamat menikmati menu di MAC Resto!</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="./Images/carousel3.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-md-block captionedit">
                        <h1><strong>Selamat Datang!</strong></h1>
                        <p>Selamat menikmati menu di MAC Resto!</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div>
            <div align="center">
                <div class="col-xxl-7 col-xxl-10 col-xxl-5" id="body-profile">
                    <div class="container" style="margin-bottom: 48px; margin-top: 4px" id="awalanProfile">
                        <div>
                            <h2 class="header" align="center" style="padding-top: 14px">Tentang Kami</h2>
                            <div class="row" style="margin-top: 32px; padding-bottom: 34px;" align="center">
                                <div class="col-md-6 justify-content-md-center" id="aboutUs" align="center"
                                    style="padding-left: 24px">
                                    <div style="font-size: 18px; padding-top: 18px">
                                        MAC Resto didirikan oleh 3 mahasiswa Universitas Atma Jaya Yogyakarta yang
                                        sering
                                        makan di
                                        warmindo
                                        bernama
                                        Mang Lili.
                                    </div>
                                    <div></div>
                                    <div style="font-size: 18px; padding-top: 8px">
                                        Kata MAC sendiri diambil dari teman yang hampir setiap pagi pergi ke suatu
                                        fastfood
                                        di
                                        daerahnya,
                                        sehingga kami memutuskan untuk menggunakan nama tersebut.
                                    </div>

                                </div>
                                <div class="col-md-4" id="aboutUs">
                                    <div>
                                        <img src="./Images/img-01.jpg" style="width: 400px; height: 250px">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <center>
                <div class="col-xxl-10" style="border-radius: 10px;">
                    <!-- <div class="container" style="margin-bottom: 48px; margin-top: 4px" id="awalanProfile"> -->
                    <div>
                        <h2 class="header" align="center" style="padding-top: 14px">Temukan Kami</h2>
                        <div class="row" style="margin-top: 32px; padding-bottom: 34px;" align="center">
                            <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4592.382067199909!2d110.4137818151659!3d-7.775651094396195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59f25fd37a59%3A0x56c8853d59823fa1!2sMc&#39;B%20(Bukan%20Babi%20Biasa)!5e1!3m2!1sen!2sid!4v1634603944737!5m2!1sen!2sid" 
                            width="600" height="450"allowfullscreen="" loading="lazy"></iframe> -->
                            <div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4592.382067199909!2d110.4137818151659!3d-7.775651094396195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59f25fd37a59%3A0x56c8853d59823fa1!2sMc&#39;B%20(Bukan%20Babi%20Biasa)!5e1!3m2!1sen!2sid!4v1634604366165!5m2!1sen!2sid"
                                    width="800" height="600" style="border-radius: 10px;" allowfullscreen=""
                                    loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                    <!-- </div> -->
                </div>
            </center>
        </div>

   </div>
</template>

<style scoped>
    @import './css/styleBerandaMenu.css';
    @import './css/navbar.css';
    @import './css/tampilanAwal.css';
</style>