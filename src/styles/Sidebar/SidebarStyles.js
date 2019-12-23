export default ({
  burgerIcon: {
    cursor: 'pointer',
    position: 'absolute',
    left: 24,
    top: 34
  },
  container: {
    backgroundColor: '#363740',
    width: 255,
    paddingTop: 32,
    height: 'calc(100% - 0px)'
  },
  containerMobile: {
    transition: 'left 0.5s, right 0.5s',
    position: 'absolute',
    width: 255,
    height: 'calc(100% - 0px)',
    zIndex: 901
  },
  mainContainer: {
    height: '100%',
    minHeight: '100vh'
  },
  mainContainerMobile: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  mainContainerExpanded: {
    width: '100%',
    minWidth: '100vh',
  },
  menuItemList: {
    marginTop: 52
  },
  outsideLayer: {
    position: 'absolute',
    width: '100vw',
    minWidth: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.50)',
    zIndex: 900
  },
  separator: {
    borderTop: '1px solid #DFE0EB',
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.06
  },
  hide: {
    left: -255
  },
  show: {
    left: 0
  }
});
