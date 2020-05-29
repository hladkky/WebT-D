const base_url = 'https://cloud.iexapis.com/stable'

const sendRequest = async (url) => {
    let response = await fetch(url, {method: 'GET'});
    let data = await response.json();
    return data;
};

// INITIALIZATION
(() => {
    turnUpdater('on');
    const spec_url = '/stock/market/batch?types=quote&symbols=tsla,f,fcau,race,gm,tm,hmc,ttm&';

    const observable$ = new rxjs.Observable( subscriber => {
        sendRequest(base_url + spec_url + TOKEN)
            .then(obj => {
                obj = Object.values(obj);
                subscriber.next(obj);
                subscriber.complete();
            })
    });

    observable$.subscribe(
        (value) => {
            initialization(value);
        },
        (err) => console.log(err),
        () => turnUpdater('off')
    );

    const initialization = (array) => {
        for (let i = 1; i <= array.length; i++) {
            const quote = array[i-1].quote;

            const name = document.querySelector('#position' + i + ' .name');
            const symbol = document.querySelector('#position' + i + ' .symbol');
            const price = document.querySelector('#position' + i + ' .price');

            name.innerHTML = quote.companyName;
            symbol.innerHTML = quote.symbol;
            price.innerHTML = quote.latestPrice;
        }
    };
})();


let i = 0;
const lapse = document.getElementById("lapse");
rxjs.interval(100)
    .subscribe( () => {
        lapse.innerHTML = (i/10).toFixed(1);
        i++;
        if (i === 200) {
            update();
            i = 0;
        }
    })


function update() {
    turnUpdater('on');
    const spec_url = '/stock/market/batch?types=quote&symbols=tsla,f,fcau,race,gm,tm,hmc,ttm&filter=latestPrice&';

    const observable = new rxjs.Observable(subscriber => {
        sendRequest(base_url+spec_url+TOKEN)
            //.then( data => subscriber.next(data))
            .then(obj => {
                obj = Object.values(obj);
                console.log(obj);
                subscriber.next(obj);
                subscriber.complete();
            })
    });

    observable.subscribe(
        currentPrice => updValues(currentPrice),
        (err) => console.log(err),
        () => turnUpdater('off')
    );

    const updValues = (array) => {
        for (let i = 1; i <= array.length; i++) {
            console.log(i);
            const currentPrice = array[i-1].quote.latestPrice;

            const price = document.querySelector('#position' + i + ' .price');
            const changes = document.querySelector('#position' + i + ' .changes');

            const difference = currentPrice - parseFloat(price.innerHTML);
            const roundeddifference = difference.toFixed(5).replace(/\.?0+$/,"");

            price.innerHTML = currentPrice;
            changes.innerHTML = roundeddifference;

            if (difference > 0) {
                changes.style.color = 'green';
            }
            else if (difference < 0) {
                changes.style.color = 'red';
            }
            else {
                changes.style.color = 'white';
            }
        }
    };
}

function turnUpdater(switcher) {
    const updating = document.getElementById('updating');
    const timer = document.getElementById('uptodate');
    if (switcher == 'on') {
        updating.style.visibility = 'visible';
        timer.style.visibility = 'hidden';
    } else {
        updating.style.visibility = 'hidden';
        timer.style.visibility = 'visible';
    }
}

