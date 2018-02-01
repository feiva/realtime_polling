const form = document.getElementById('vote-form');


//form submit event
form.addEventListener('submit', (e) => {
  const choice = document.querySelector('input[name=meat]:checked').value;

  data = {meat: choice};

  fetch('http://localhost:3000/poll', {
    method: 'post',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

  e.preventDefault();

});

fetch('http://localhost:3000/poll')
.then(res => res.json())
.then(data => {
  const votes = data.votes;
  const totalVotes = votes.length;
  //count vote points for each one - reduce takes accumulator and current vallue
  const voteCounts = votes.reduce(
    (acc, vote) =>
    ((acc[vote.meat] = (acc[vote.meat] || 0) + parseInt(vote.points)),acc), {});

  //canvas.js
  let dataPoints = [
    { label: 'Beef', y: voteCounts.Beef },
    { label: 'Chicken', y: voteCounts.Chicken },
    { label: 'Bacon', y: voteCounts.Bacon },
    { label: 'Seafood', y: voteCounts.Seafood }
  ];

  const chartContainer = document.querySelector('#chartContainer');

  if(chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'theme2',
      title: {
        text: `Total Votes ${totalVotes}`
      },
      legend: {
        maxWidth: 450,
        itemWidth: 220
      },
      data: [
        {
          type: 'pie',
          showInLegend: true,
          legendText: "{label}",
          dataPoints: dataPoints
        }
      ]
    });
    chart.render();

    //pusher client side script
    Pusher.logToConsole = true;

     var pusher = new Pusher('2c154010285bd06837d6', {
       cluster: 'us2',
       encrypted: true
     });

     var channel = pusher.subscribe('poll');
     channel.bind('vote', function(data) {
       dataPoints = dataPoints.map(x => {
         if(x.label == data.meat){
           x.y += data.points;
           return x;
         } else {
           return x;
         }
       });
       chart.render();
     });
  }


});
