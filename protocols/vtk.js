/* eslint-disable arrow-body-style */
export default function createMethods (session) {
  return {
    create_visualization: () => session.call('create_visualization', []),
    reset_camera: () => session.call('reset_camera', []),
    create_object_pipeline: (params) => session.call('create_object_pipeline', [params]),
    reset: () => session.call('reset'),
  };
}
