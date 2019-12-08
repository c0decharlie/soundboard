<template>
    <div>
        <form enctype="multipart/form-data">
            <label for="">File upload</label>
            <input 
                @change="onInputFileChange"
                type="file" 
                name="audio">
            <button 
                type="submit" 
                :disabled="!file"
                @click.prevent="onSubmitClick">
                Upload
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: null
        }
    },

    methods: {
        onInputFileChange(e) {
            this.file = e.target.files[0];
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