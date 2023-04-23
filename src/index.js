document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(data => addDogsToPage(data));
    function addDogsToPage(dogsData) {
        for (const dog of dogsData) {
            const span = document.createElement('span');
            span.textContent = dog.name;
            span.id = dog.id;
            document.querySelector('#dog-bar').appendChild(span);
            span.addEventListener('click', extraDogInfo);
        }
    }
    function extraDogInfo(e) {
        fetch(`http://localhost:3000/pups/${e.target.id}`)
            .then(resp => resp.json())
            .then(data => displayExtraDogInfo(data));
    }
    function displayExtraDogInfo(dogInfo) {
        function goodDog() {
            if (dogInfo.isGoodDog) {
                return 'Good Dog!'
            } else {
                return 'Bad Dog!'
            }
        }
        const dogData = document.querySelector('#dog-info');
        dogData.innerHTML = '';
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const btn = document.createElement('button');
        img.src = dogInfo.image;
        h2.textContent = dogInfo.name;
        btn.textContent = goodDog();
        btn.id = dogInfo.id;
        dogData.appendChild(img);
        dogData.appendChild(h2);
        dogData.appendChild(btn);
        btn.addEventListener('click', toggleGoodDog);
    }
    function toggleGoodness() {
        if (document.querySelectorAll('button')[1].textContent === 'Bad Dog!') {
            return true;
        } else {
            return false;
        }
    }
    function toggleGoodDog(e) {
        fetch(`http://localhost:3000/pups/${e.target.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'isGoodDog': toggleGoodness()
            })
        })
            .then(resp => resp.json())
            .then(data => {
                function goodDogie() {
                    if (data.isGoodDog) {
                        return 'Good Dog!'
                    } else {
                        return 'Bad Dog!'
                    }
                }
                document.querySelectorAll('button')[1].textContent = goodDogie();
            });
    }
    document.querySelector('#good-dog-filter').addEventListener('click', filterDogs)
    function filterDogs(e) {
        if (e.target.textContent === 'Filter good dogs: OFF') {
            e.target.textContent = 'Filter good dogs: ON';
            document.querySelector('#dog-bar').innerHTML = '';
            fetch('http://localhost:3000/pups')
                .then(resp => resp.json())
                .then(data => addGoodDogsToPage(data));
        } else {
            e.target.textContent = 'Filter good dogs: OFF';
            document.querySelector('#dog-bar').innerHTML = '';
            fetch('http://localhost:3000/pups')
                .then(resp => resp.json())
                .then(data => addDogsToPage(data));
        }
    }
    function addGoodDogsToPage(dogsData) {
        for (const dog of dogsData) {
            if (dog.isGoodDog === true) {
                const span = document.createElement('span');
                span.textContent = dog.name;
                span.id = dog.id;
                document.querySelector('#dog-bar').appendChild(span);
                span.addEventListener('click', extraDogInfo);
            }
        }
    }
});
