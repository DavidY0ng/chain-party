<div class="flex justify-center items-center w-full min-h-screen bg-with-opacity">
    <div class="flex flex-col items-center gap-5 ">
        <div class="h-[500px] max-w-[600px] relative">
            <img src="/img/landing/mascot/mascot.png" class="" alt="chain_party_mascot" />

            <!-- coins -->
            <img src='/img/landing/mascot/green coin.png' class="absolute top-0 translate-x-[-100px]">
            <img src='/img/landing/mascot/blur purple coin.png' class="absolute bottom-0 translate-x-[-450px]">
            <img src='/img/landing/mascot/bnb coin.png' class="absolute bottom-0 translate-x-[-200px]">
            <img src='/img/landing/mascot/usdt coin.png' class="absolute md:bottom-0 bottom-10 lg:translate-x-[400px] translate-x-[50%] md:translate-x-[160%]">
            <img src='/img/landing/mascot/purple coin.png' class="absolute top-[-20px] md:translate-x-[420px] translate-x-[100%] z-[-1]">
            <img src='/img/landing/mascot/blur green coin.png' class="md:absolute top-[10%] translate-x-[600px] hidden">
        </div>
    </div>
</div>

<style>
    .bg-with-opacity {
        position: relative;
    }
    
    .bg-with-opacity::before {
        content: "";
        background-image: url('/img/landing/mascot/background.png');
        background-repeat: repeat-x;
        position: absolute;
        top: 30%;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.6;
        z-index: -1; 
    }
</style>