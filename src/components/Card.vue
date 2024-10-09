<template>
    <article class="flex flex-col rounded-3xl h-80 sm:w-11/12 xl:w-1/3 grow lg:grow-0">
        <section class="header w-full py-4 px-5">
            <slot name="header">
                Header
            </slot>
        </section>

        <hr class="w-11/12 mx-auto">

        <section class="body w-full h-full overflow-hidden py-4 px-5">
            <slot name="body">
                Body
            </slot>
        </section>

        <section class="w-full py-4 px-5">
            <slot name="footer">Footer</slot>
        </section>
    </article>
</template>

<script setup>
</script>

<style scoped>
    article{
        color: var(--text-color);
        background-color: #212936cc;

        hr{
            border-color: #4D5562;
        }
    }
</style>