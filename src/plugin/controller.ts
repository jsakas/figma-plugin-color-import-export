figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  console.log('onmessage', msg)

  figma.closePlugin();
};