<template>
  <v-file-input
    chips
    class="pa-4"
    :messages="messages"
    :accept="accept"
    :success-messages="message"
    :success="success"
    @click:clear="objects = []"
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
},
data () {
    return {
    files: [],
    success: false,
    message: '',
    Filename: '',
    VtpFile: ''
    }
},
methods: {
    SetFilename(changedFiles){
        this.success = true
        this.message = 'File(s) selected'
        if (changedFiles) {
            this.files = [changedFiles]
        }
    },
}
}
</script>
