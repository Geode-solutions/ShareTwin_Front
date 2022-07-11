/* eslint-disable arrow-body-style */
export default function createMethods(session) {
  return {
    createVisualization: () => session.call('create.visualization', []),
    resetCamera: () => session.call('reset.camera', []),
    updateResolution: (resolution) =>
      session.call('update.resolution', [resolution]),
    sendFilenames: (filenames) => session.call('send.filenames', [filenames]),
    updateHeight: (height) => session.call('update.height', [height]),
    reset: () => session.call('geode.reset'),
  };
}
