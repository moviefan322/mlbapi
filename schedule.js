const natsSchedule = async () => {
    const response = await fetch(
      "https://statsapi.mlb.com/api/v1/schedule?lang=en&sportId=1&hydrate=team(venue(timezone)),venue(timezone),game(seriesStatus,seriesSummary,tickets,promotions,sponsorships,content(summary,media(epg))),seriesStatus,seriesSummary,linescore,tickets,event(tickets),radioBroadcasts,broadcasts(all)&season=2023&startDate=2023-03-30&endDate=2023-06-30&teamId=146&eventTypes=primary&scheduleTypes=games,events,xref"
    );
    const data = await response.json();
    const dates = data.dates;
    
    const series = dates.reduce((acc, date) => {
      const game = date.games[0];
      const seriesNumber = game.teams.away.seriesNumber;
      const seriesVariableName = `series${seriesNumber}`;
      
      if (!acc[seriesVariableName]) {
        acc[seriesVariableName] = [];
      }
      
      acc[seriesVariableName].push(game);
      return acc;
    }, {});
    
    console.log(series);
  };
  
  natsSchedule();
  