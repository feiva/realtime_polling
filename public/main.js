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

//canvas.js
let dataPoints = [
  { label: 'Beef', y: 0},
  { label: 'Chicken', y: 0},
  { label: 'Bacon', y: 0},
  { label: 'Seafood', y: 0},
];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer) {
  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    theme: 'theme2',
    title: {
      text: 'Carnivore Results'
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
