function create_texture_object () {
  const value = ref('')
  const is_valid = computed(() => {

    return value.value != '' && value.value != null && value.value != undefined
  })

  return { value, is_valid }
}

export function create_texture_item () {
  const texture_name = create_texture_object()
  const texture_file_name = create_texture_object()
  return { texture_name, texture_file_name }
}