<template>
    <div>
        <form action="#">
            <div class="file-field input-field">
            <div class="btn">
                <span>{{ buttonText }}</span>
                <input 
                    @change="onInputFileChange"
                    type="file"
                    ref="fileInput"
                >
            </div>
            <div class="file-path-wrapper">
                <input 
                    ref="filePath"
                    class="file-path validate" 
                    type="text"
                >
            </div>
            </div>
            
            <button 
                class="btn btn-submit"
                type="submit" 
                :disabled="!file"
                @click.prevent="onSubmitClick"
            >
                Upload <i class="material-icons right">file_upload</i> 
            </button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            default: 'Choose file',
            required: false
        }
    },

    data() {
        return {
            file: null
        }
    },

    methods: {
        onInputFileChange(e) {
            this.file = e.target.files[0];
        },

        clearValues() {
            const filePath = this.$refs.filePath;

            this.file = null;
            this.$refs.fileInput.value = '';
            filePath.value = '';
            filePath.classList.remove('valid');
        },
        
        onSubmitClick() {
            if (!this.file) {
                return;
            }

            this.$emit('uploadFile', this.file);
        }
    }
}
</script>

<style lang="scss" scoped>
    .btn-submit {
        margin-left: auto;
        display: inherit;
    }
</style>
