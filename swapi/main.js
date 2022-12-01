const SWAPI_BASE_URL = `https://swapi.dev/api`;

const getPerson = url => {
    let promise = new Promise((resolve, reject) => {
        axios.get(url)
        .then(res => {
            resolve(res.data);
        })
        .catch(error => {
            reject(new Error(error.response.data));
        });
    });
    return promise;
}

const getResidents = () => {
    //clears the content
    let container = document.querySelector('content');
    while(container.lastChild)
    {
        container.removeChild(container.lastChild);
    }
    
    axios.get(`${SWAPI_BASE_URL}/planets/2`)
    .then(res => {
        res.data.residents.forEach(url => {
            let promise = getPerson(url);
            promise.then(
                (person) => {
                    let header = document.createElement('h2');
                    header.textContent = person.name;
                    container.appendChild(header);
                },
                (error) => {
                    console.log(error);
                }
            );
        })
    })
    .catch(error => {
        console.log(error);
    })
}


let getResidentsBtn = document.querySelector('#get-residents');
getResidentsBtn.addEventListener('click', getResidents);
