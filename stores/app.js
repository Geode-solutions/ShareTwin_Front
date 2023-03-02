import { defineStore } from 'pinia'


export const use_app_store = defineStore('app', {
  state: () => ({
    display_object_selector: false,
    object_tree: reactive(
      {
        'items': [
          {
            'object_name': 'toto.test',
            'object_type': 'BRep'
          }
        ]
      })
  }),
  actions: {
    add_object_tree_item (object_name, object_type) {
      item = {}
      this.object_tree.items
    }
  }
})
