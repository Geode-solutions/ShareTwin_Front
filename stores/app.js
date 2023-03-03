import { defineStore } from 'pinia'


export const use_app_store = defineStore('app', {
  state: () => ({
    display_menu: true,
    display_object_selector: false,
    object_tree: reactive(
      {
        'items': [
          // {
          //   'displayed_name': 'toto.og_brep',
          //   'file_name': '',
          //   'id': '11111111111111111111111111111111',
          //   'type': 'BRep'
          // },

          // {
          //   'displayed_name': 'toto2.og_brep',
          //   'file_name': '',
          //   'id': '22222222222222222222222222222222',
          //   'type': 'BRep'
          // }
        ]
      })
  }),
  actions: {
    add_object_tree_item (item) {
      this.object_tree.items.append(item)
    },
    remove_object_tree_item (index) {
      this.object_tree.items.append(index)
    }
  }
})
