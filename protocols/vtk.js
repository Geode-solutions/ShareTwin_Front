/* eslint-disable arrow-body-style */
export default function createMethods (session) {
  return {
    create_visualization: () => session.call('create_visualization', []),
    reset_camera: () => session.call('reset_camera', []),
    send_filenames: (file_names) => session.call('send_filenames', [file_names]),
    reset: () => session.call('reset'),
  };
}
