
<div class="mb-[200px] mt-[100px] flex w-full flex-col items-center gap-5 bg-with-opacity bg-no-repeat">
    <div class="h-[500px] max-w-[600px] relative">
        <img src="/img/landing/mascot/mascot.png" class="" alt="chain_party_mascot" />

        <!-- coins -->
        <img src='/img/landing/mascot/green coin.png' class="absolute top-0 translate-x-[-100px]">
        <img src='/img/landing/mascot/blur purple coin.png' class="absolute bottom-0 translate-x-[-450px]">
        <img src='/img/landing/mascot/bnb coin.png' class="absolute bottom-0 translate-x-[-200px]">
        <img src='/img/landing/mascot/usdt coin.png' class="absolute bottom-0 translate-x-[400px]">
        <img src='/img/landing/mascot/purple coin.png' class="absolute top-[-20px] translate-x-[420px] z-[-1]">
        <img src='/img/landing/mascot/blur green coin.png' class="absolute top-[10%] translate-x-[600px]">
        
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
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.6;
        z-index: -1; 
    }
</style>