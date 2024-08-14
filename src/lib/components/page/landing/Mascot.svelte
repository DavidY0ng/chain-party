<div class="relative flex justify-center items-center w-full min-h-screen bg-with-opacity">
    <div class="flex flex-col items-center gap-5 ">
        <div class="h-[500px] max-w-[600px] relative">
            <img src="/img/landing/mascot/mascot.png" class="float" alt="chain_party_mascot" />

            <!-- coins -->
            <img src='/img/landing/mascot/green coin.png' alt='coin' class="absolute top-0 translate-x-[-100px]">
            <img src='/img/landing/mascot/blur purple coin.png' alt='coin' class="absolute bottom-0 translate-x-[-450px]">
            <img src='/img/landing/mascot/bnb coin.png' alt='coin' class="absolute bottom-0 translate-x-[-200px]">
            <img src='/img/landing/mascot/usdt coin.png' alt='coin' class="absolute md:bottom-0 bottom-10 lg:translate-x-[400px] translate-x-[70%] md:translate-x-[200%]">
            <img src='/img/landing/mascot/purple coin.png' alt='coin' class="absolute top-[-20px] md:translate-x-[420px] translate-x-[100%] z-[-1]">
            <img src='/img/landing/mascot/blur green coin.png' alt='coin' class="absolute top-[10%] translate-x-[600px] hidden lg:block">
        </div>
    </div>
</div>

<style>
    .bg-with-opacity {
        position: relative;
        min-height: 1000px;
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

    @keyframes float {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }

    .float {
        animation: float 3s ease-in-out infinite;
    }

</style>