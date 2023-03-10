import { defineStore } from 'pinia'
import { use_vtk_store } from './vtk'
const vtk_store = use_vtk_store()

export const use_app_store = defineStore('app', {
  state: () => ({
    display_menu: true,
    display_object_selector: false,
    object_tree:
    {
      'items': []
    }
  }),
  actions: {
    add_object_tree_item (item) {
      this.object_tree.items.push(item)
      console.log('add_object_tree_item')
      console.log(this.object_tree.items)
    },
    remove_object_tree_item (index) {
      this.object_tree.items.arr.splice(index, 1)
    },
    toggle_object_visibility (index) {
      console.log(index)
      this.object_tree.items[index]['is_visible'] = !this.object_tree.items[index]['is_visible']
      const id = this.object_tree.items[index]['id']
      const is_visible = this.object_tree.items[index]['is_visible']
      vtk_store.toggle_object_visibility({ "id": id, "is_visible": is_visible })
    },

    add_texture_to_item (index, texture_object) {
      console.log('From add_texture_to_item !')
      const id = this.object_tree.items[index]['id']
      const texture_name = this.object_tree.items[index]['texture_name']
      const texture_file_name = this.object_tree.items[index]['texture_file_name']
      vtk_store.add_object_texture({ "id": id, "texture_name": texture_name, "texture_file_name": texture_file_name })
    }
  }
})
