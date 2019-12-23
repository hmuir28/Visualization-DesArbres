export default ({
  cardsContainer: {
    marginRight: -30,
    marginTop: -30
  },
  cardRow: {
    marginTop: 30,
    '@media (max-width: 768px)': {
      marginTop: 0
    }
  },
  miniCardContainer: {
    flexGrow: 1,
    marginRight: 30,
    '@media (max-width: 768px)': {
      marginTop: 30,
      maxWidth: 'none'
    }
  },
  todayTrends: {
    marginTop: 30
  },
  lastRow: {
    marginTop: 30
  },
  unresolvedTickets: {
    marginRight: 30,
    '@media (max-width: 1024px)': {
        marginRight: 0
    }
  },
  tasks: {
    marginTop: 0,
    '@media (max-width: 1024px)': {
      marginTop: 30,
    }
  }
});
