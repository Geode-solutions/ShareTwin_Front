<template>
  <v-file-input
    chips
    class="pa-4"
    :messages="messages"
    :accept="accept"
    :success-messages="message"
    :success="success"
    @click:clear="file = []"
    @change="SetFilename"
  />
</template>

<script>
export default {
    name: 'FileSelector',
    props: {
        messages: {
            type: String,
            required: true,
        },
        accept: {
            type: String,
            required: true,
        },
        file: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            success: false,
            message: '',
        }
    },
    methods: {
        SetFilename (changedFile) {
            this.success = true
            this.message = 'File(s) selected'
            if (changedFile) {
                this.file = [changedFile]
                // console.log('this.files.size : ', this.file[0].size)
                // this.$emit('input', this.files)
            }
        },
    }
}
</script>
