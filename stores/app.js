import { defineStore } from 'pinia'
import { use_vtk_store } from './vtk'
const vtk_store = use_vtk_store()

export const use_app_store = defineStore('app', {
  state: () => ({
    display_menu: true,
    display_object_selector: false,
    object_tree: []
  }),
  actions: {
    add_object_tree_item (item) {
      console.log('add_object_tree_item')
      console.log(item)
      this.object_tree.push(item)
      console.log('add_object_tree_item 2')
      console.log(this.object_tree)
    },
    remove_object_tree_item (index) {
      this.object_tree.arr.splice(index, 1)
    },
    toggle_object_visibility (index) {
      console.log(index)
      this.object_tree[index].is_visible = !this.object_tree[index].is_visible
      const id = this.object_tree[index]['id']
      const is_visible = this.object_tree[index].is_visible
      console.log('is_visible', is_visible)
      vtk_store.toggle_object_visibility({ "id": id, "is_visible": is_visible })
    },

    add_object_texture (index, texture_object) {
      console.log('From add_texture_to_item !')
      const id = this.object_tree[index].id
      // this.object_tree[index].texture_name = texture_object.texture_name
      this.object_tree[index].texture_file_name = texture_object.texture_file_name

      vtk_store.add_object_texture({ "id": id, ...texture_object })
    }
  }
})
