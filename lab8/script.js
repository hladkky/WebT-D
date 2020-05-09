const TOKEN = '?token=pk_ba9bb61a36a24ec3a5ae70362941f41c'

const base_url = 'https://cloud.iexapis.co/stable'
const spec_url = '/time-series';

// fetch(url)
// 	.then(data => {return data.json()})
// 	.then(res => {console.log(res)})

fetch(base_url+spec_url+TOKEN)
  .then(response => response.json())
  .then(res => console.log(res));
