<template>
    <div class="info-container">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .info-container {
        text-align: center;

        h3 {
            color: #404040;
        }

        p {
            color: #676767;
        }
    }
</style>