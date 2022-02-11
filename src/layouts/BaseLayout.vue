<script>
import Header from "./components/Header";
import Navigation from "./components/Nav";
import Ticker from "./components/Ticker";
import Footer from "./components/Footer";
import FooterMobile from "./components/FooterMobile";
import FooterBarcode from "./components/FooterBarcode";
import GamesDesktop from "./components/GamesDesktopList.vue";
import GamesMobile from "./components/GamesMobileList.vue";

export default {
    components: {
        Header,
        Navigation,
        Footer,
        Ticker,
        FooterMobile,
        FooterBarcode,
        GamesDesktop,
        GamesMobile
    },    
}
</script>

<template>
    <div class="app-container">
        <Header />
        <Navigation />
        <Ticker />
        <div class="body-container max-width">
            <slot></slot>
        </div>
        <Footer />
        <FooterMobile />
        <FooterBarcode />
        <GamesDesktop />
        <GamesMobile />
    </div>
</template>