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
    model: {
      prop: 'file',
    },
    props: {
        messages: {
            type: String,
            required: true,
        },
        accept: {
            type: String,
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
                console.log('file from selector : ', this.file)
                this.$emit('input', this.file)
            }
        },
    }
}
</script>
