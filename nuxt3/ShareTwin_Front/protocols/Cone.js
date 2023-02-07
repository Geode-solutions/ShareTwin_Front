/* eslint-disable arrow-body-style */
export default function createMethods (session) {
  return {
    create_visualization: () => session.call('create_visualization', []),
    reset_camera: () => session.call('reset_camera', []),
    // update_resolution: (resolution) =>
    //   session.call('update_resolution', [resolution]),
    send_filenames: (filenames) => session.call('send_filenames', [filenames]),
    // update_height: (height) => session.call('update_height', [height]),
    reset: () => session.call('geode_reset'),
  };
}
