
<div class="flex flex-col items-center justify-center bg-with-opacity w-full min-h-screen">
    <div class=" mx-auto px-4">
        <div class=" xl:h-[800px] xl:w-[700px]">
            <div class="h-full xl:h-[760px] max-w-[700px] w-full relative flex flex-col items-center justify-center">
                <img src='/img/landing/intro/chain party.png' class='xl:h-full xl:w-full' alt='chain_party_mascot'>
                <!-- trapezium container -->
                <div class=" w-full px-3 flex justify-center absolute xl:bottom-[5%] bottom-[5%]">
                    <img src="/img/landing/intro/trapezium.png" alt="trapezium" class="xl:w-[667px] xl:h-[173px]" />
                    <div
                        class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] capitalize text-white text-center w-[80%] px-4
                                pixel-font md:text-[28px] text-[18px] font-bold md:leading-[38.168px] tracking-[0.05em] md:w-[70%]"
                    >
                        The 1st Gamefi build on EIC Chain
                    </div>
                </div>
            </div>
            <div class="container flex items-center justify-center mx-auto space-x-4">
                <div class="uppercase font-inter text-xs font-normal leading-[14.52px] text-white">
                    Incubated By
                </div>
                <img src='/img/landing/logo/eic logo.png' alt='eic-logo' class="h-8"> <!-- Adjust height as needed -->
            </div>
        </div>
    </div>
</div>

<style>
    .bg-with-opacity {
        position: relative;
        width: 100%;
        min-height: 100vh
    }
    
    .bg-with-opacity::before {
        content: "";
        background-image: url('/img/landing/intro/background.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 1;
        z-index: -2; 
    }

    .bg-with-opacity::after {
        content: "";
        background: linear-gradient(360deg, #110F27 15%, rgba(17, 15, 39, 0) 35%, rgba(17, 15, 39, 0) 87.5%, #110F27 100%);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
    }

</style>
 