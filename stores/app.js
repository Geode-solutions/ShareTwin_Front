export const use_app_store = defineStore('app', {
  state: () => ({
    display_menu: false,
    display_object_selector: false,
    display_crs_assigner: false,
    display_crs_converter: false,
    display_georeferencing_drawer: false,
    picking_mode: false,
    object_tree: [],
    object_tree_index: null,
    picked_point: { x: null, y: null },
    accepted_gtcu: useLocalStorage('accepted_gtcu', false)
  }),
  getters: {
    are_textures_valid: (state) => (object_tree_index) => {
      const textures = state.object_tree[object_tree_index].textures

      for (let i = 0; i < textures.length; i++) {
        const texture = textures[i]

        if (texture.texture_name.is_valid === false || texture.texture_file_name.is_valid === false) {
          return false
        }
      }
      return true
    }
  },
  actions: {
    accept_gtcu () {
      this.accepted_gtcu = true
      localStorage.setItem('accepted_gtcu', true)
      this.display_menu = true
      window.location.href = "/app"

    },
    async add_object_tree_item (object_tree_item) {
      object_tree_item.is_visible = true
      object_tree_item.textures = [create_texture_item()]

      this.object_tree.push(object_tree_item)

      await this.get_coordinate_systems(this.object_tree.length - 1)
    },
    remove_object_tree_item (object_tree_index) {
      this.object_tree.splice(object_tree_index, 1)
    },
    toggle_object_visibility (object_tree_index) {
      const vtk_store = use_vtk_store()
      const ws_link_store = use_ws_link_store()
      this.object_tree[object_tree_index].is_visible = !this.object_tree[object_tree_index].is_visible
      const id = this.object_tree[object_tree_index]['id']
      const is_visible = this.object_tree[object_tree_index].is_visible
      ws_link_store.$patch({ busy: true })
      vtk_store.toggle_object_visibility({ id, is_visible })
      ws_link_store.$patch({ busy: false })
    },
    add_texture_object (object_tree_index) {
      this.object_tree[object_tree_index].textures.push(create_texture_item())
    },
    remove_texture_object (object_tree_index, texture_index) {
      this.object_tree[object_tree_index].textures.splice(texture_index, 1)
    },

    modify_texture_object (object_tree_index, texture_index, key, value) {
      const current_item = this.object_tree[object_tree_index]
      const current_texture = current_item.textures[texture_index]
      current_texture[key].value = value
    },
    apply_textures (object_tree_index) {
      const ws_link_store = use_ws_link_store()
      const vtk_store = use_vtk_store()
      const current_object = this.object_tree[object_tree_index]
      const id = current_object.id
      const textures = current_object.textures

      ws_link_store.$patch({ busy: true })
      vtk_store.apply_textures({ id, textures })
      ws_link_store.$patch({ busy: false })
    },
    toggle_picking_mode (value) {
      this.picking_mode = value
    },
    toggle_display_georeferencing_drawer (value, object_tree_index) {
      this.display_georeferencing_drawer = value
      this.object_tree_index = object_tree_index
    },
    toggle_display_crs_assigner (value, object_tree_index) {
      console.log('toggle_display_crs_assigner', value)
      this.display_crs_assigner = value
      this.object_tree_index = object_tree_index
    },
    toggle_display_crs_converter (value, object_tree_index) {
      console.log('toggle_display_crs_converter', value)
      this.display_crs_converter = value
      this.object_tree_index = object_tree_index
    },
    async set_picked_point (x, y) {
      const vtk_store = use_vtk_store()
      const response = await vtk_store.get_point_position({ x, y })
      const { x: world_x, y: world_y } = response
      this.picked_point.x = world_x
      this.picked_point.y = world_y
      this.picking_mode = false
    },

    async get_coordinate_systems (object_tree_index) {
      console.log('get_coordinate_systems', object_tree_index)
      const ws_link_store = use_ws_link_store()
      ws_link_store.$patch({ busy: true })
      const params = new FormData()
      console.log('object_tree', this.object_tree)
      params.append('native_file_name', this.object_tree[object_tree_index].native_file_name)
      params.append('geode_object', this.object_tree[object_tree_index].geode_object)
      await api_fetch(`/coordinate_systems`, { body: params, method: 'POST' }, {
        'response_function': (response) => {
          console.log(response)
          this.object_tree[object_tree_index].coordinate_systems = response._data.coordinate_systems
          console.log('object_tree', this.object_tree)
        }
      })
      ws_link_store.$patch({ busy: false })
    }
  }
})
