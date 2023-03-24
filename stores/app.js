import { defineStore } from 'pinia'
import { use_vtk_store } from './vtk'
import { use_ws_link_store } from './ws_link'
const vtk_store = use_vtk_store()
const ws_link_store = use_ws_link_store()

export const use_app_store = defineStore('app', {
  state: () => ({
    display_menu: true,
    display_object_selector: false,
    object_tree: []
  }),
  actions: {
    add_object_tree_item (item) {
      console.log(item)
      this.object_tree.push(item)
    },
    remove_object_tree_item (index) {
      this.object_tree.arr.splice(index, 1)
    },
    toggle_object_visibility (index) {
      this.object_tree[index].is_visible = !this.object_tree[index].is_visible
      const id = this.object_tree[index]['id']
      const is_visible = this.object_tree[index].is_visible
      ws_link_store.$patch({ busy: true })
      vtk_store.toggle_object_visibility({ "id": id, "is_visible": is_visible })
      ws_link_store.$patch({ busy: false })
    },

    add_object_texture (index, texture_object) {
      const id = this.object_tree[index].id
      this.object_tree[index].texture_name = texture_object.texture_name
      this.object_tree[index].texture_file_name = texture_object.texture_file_name
      ws_link_store.$patch({ busy: true })
      vtk_store.add_object_texture({ "id": id, ...texture_object })
      console.log('add_object_texture', this.object_tree[index])
      ws_link_store.$patch({ busy: false })
    }
  }
})
