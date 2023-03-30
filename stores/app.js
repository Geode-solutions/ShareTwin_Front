import { defineStore } from 'pinia'
import { use_vtk_store } from './vtk'
import { use_ws_link_store } from './ws_link'
const vtk_store = use_vtk_store()
const ws_link_store = use_ws_link_store()

export const use_app_store = defineStore('app', {
  state: () => ({
    display_menu: true,
    display_object_selector: false,
    object_tree: [{
      'id': '123',
      'name': 'name',
      'native_file_name': 'native_file_name',
      'viewable_file_name': 'viewable_file_name',
      'geode_object': 'BRep',
      'is_visible': true,
      'textures': [
        { 'texture_name': 'texture_name', 'texture_file_name': 'toto' }
      ]
    }]
  }),
  actions: {
    add_object_tree_item (item) {
      this.object_tree.push(item)
    },
    remove_object_tree_item (object_tree_index) {
      this.object_tree.arr.splice(object_tree_index, 1)
    },
    toggle_object_visibility (object_tree_index) {
      this.object_tree[object_tree_index].is_visible = !this.object_tree[object_tree_index].is_visible
      const id = this.object_tree[object_tree_index]['id']
      const is_visible = this.object_tree[object_tree_index].is_visible
      ws_link_store.$patch({ busy: true })
      vtk_store.toggle_object_visibility({ "id": id, "is_visible": is_visible })
      ws_link_store.$patch({ busy: false })
    },
    add_object_texture_item (object_tree_index, texture_item) {
      his.object_tree[object_tree_index].textures.push(texture_item)
    },
    add_object_texture (object_tree_index, texture_object, texture_object_tree_index) {
      const id = this.object_tree[object_tree_index].id
      this.object_tree[object_tree_index].textures[texture_object_tree_index].texture_name = texture_object.texture_name
      this.object_tree[object_tree_index].textures[texture_object_tree_index].texture_file_name = texture_object.texture_file_name
      ws_link_store.$patch({ busy: true })
      vtk_store.add_object_texture({ "id": id, ...texture_object })
      ws_link_store.$patch({ busy: false })
    }

  }
})
