import { defineStore } from 'pinia'
import { use_vtk_store } from './vtk'
import { use_ws_link_store } from './ws_link'
const vtk_store = use_vtk_store()
const ws_link_store = use_ws_link_store()

export const use_app_store = defineStore('app', {
  state: () => ({
    display_menu: true,
    display_object_selector: false,
    object_tree: [
      // {
      //   'id': 'response._data.id',
      //   'name': 'response._data.name',
      //   'native_file_name': 'response._data.native_file_name',
      //   'viewable_file_name': 'response._data.viewable_file_name',
      //   'geode_object': 'BRep',
      //   'is_visible': true,
      //   'textures': [{ 'texture_name': 'toto', 'texture_file_name': '', 'is_visible': false, 'is_applicable': false },
      //   { 'texture_name': '', 'texture_file_name': '', 'is_visible': false, 'is_applicable': false }]
      // }
    ]
  }),
  actions: {
    add_object_tree_item (item) {
      this.object_tree.push(item)
    },
    remove_object_tree_item (object_tree_index) {
      this.object_tree.splice(object_tree_index, 1)
    },
    toggle_object_visibility (object_tree_index) {
      this.object_tree[object_tree_index].is_visible = !this.object_tree[object_tree_index].is_visible
      const id = this.object_tree[object_tree_index]['id']
      const is_visible = this.object_tree[object_tree_index].is_visible
      ws_link_store.$patch({ busy: true })
      vtk_store.toggle_object_visibility({ "id": id, "is_visible": is_visible })
      ws_link_store.$patch({ busy: false })
    },
    add_texture (object_tree_index, texture_item) {
      this.object_tree[object_tree_index].textures.push(texture_item)
    },
    remove_texture (object_tree_index, texture_index) {
      this.object_tree[object_tree_index].textures.splice(texture_index, 1)
    },
    modify_texture_object (object_tree_index, texture_index, texture_object) {
      console.log('modify_texture_object texture_object', texture_object)

      const current_item = this.object_tree[object_tree_index]
      const id = current_item.id
      const current_texture = this.object_tree[object_tree_index].textures[texture_index]

      console.log('1')
      for (const [key, value] of Object.entries(texture_object)) {
        console.log(`${key}: ${value}`);
        current_texture[key] = value
        console.log('2')
      }

      console.log('3')


      console.log('current_texture', current_texture)

      if ((current_texture.texture_name != '' && current_texture.texture_name != undefined) &&
        (current_texture.texture_file_name != '' && current_texture.texture_file_name != undefined)) {
        console.log('4')
        current_texture.is_applicable = true
      }
    },
    apply_texture (object_tree_index, texture_index) {
      const current_item = this.object_tree[object_tree_index]
      const id = current_item.id
      const current_texture = this.object_tree[object_tree_index].textures[texture_index]

      ws_link_store.$patch({ busy: true })
      vtk_store.add_object_texture({ "id": id, ...texture_object })
      current_texture.is_applicable = false
      ws_link_store.$patch({ busy: false })
    }
  }
})
