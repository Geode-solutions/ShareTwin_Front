import { defineStore } from 'pinia'


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
    },
    remove_object_tree_item (index) {
      this.object_tree.items.arr.splice(index, 1)
    },
    toggle_object_vibility (index) {
      console.log(index)
      this.object_tree.items[index]['is_visible'] = !this.object_tree.items[index]['is_visible']
    }
  }
})
