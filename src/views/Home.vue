<template>
    <div class="home">
        <Generator msg="PostCoin Paper Wallet"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Generator from '@/components/Generator.vue'

    export default {
        name: 'home',
        components: {
            Generator
        }
    }
</script>
