<template>
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
                <img src="../Images/carousel1.jpg" class="d-block w-100" alt="...">
                <!--<img src="https://www.icegif.com/wp-content/uploads/rick-roll-icegif-5.gif" class="d-block w-100" alt="...">-->
                <div class="carousel-caption d-md-block captionedit">
                    <h1><strong>Selamat Datang!</strong></h1>
                    <p>Selamat menikmati menu di MAC Resto!</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../Images/carousel2.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-md-block captionedit">
                    <h1><strong>Selamat Datang!</strong></h1>
                    <p>Selamat menikmati menu di MAC Resto!</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../Images/carousel3.jpg" class="d-block w-100" alt="...">
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
</template>

<style>
@import '../css/styleBerandaMenu.css';
@import '../css/navbar.css';
@import '../css/tampilanAwal.css';
</style>


