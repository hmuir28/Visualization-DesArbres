export default ({
  activeBar: {
    height: 56,
    width: 3,
    backgroundColor: '#DDE2FF',
    position: 'absolute',
    left: 0
  },
  activeContainer: {
    backgroundColor: 'rgba(221,226,255, 0.08)'
  },
  activeTitle: {
    color: '#DDE2FF'
  },
  container: {
    height: 56,
    cursor: 'pointer',
    ':hover': {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    paddingLeft: 32,
    paddingRight: 32
  },
  title: {
    fontFamily: 'Muli',
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '0.2px',
    color: '#A4A6B3',
    marginLeft: 24
  }
});
