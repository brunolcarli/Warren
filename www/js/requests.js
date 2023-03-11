const url = 'https://buffett.brunolcarli.repl.co/graphql/';


function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};


function json(response) {
    return response.json()
};


function get_request_options(payload) {
    return {
        method: 'POST',
        headers: {
            cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
            'Content-Type': 'application/json'
        },
        body: payload
    };
};


function query_usdbrl_price(filters) {
    let payload = `{"query":"query { usdBrl${filters}{ datetimeReference price } }"}`;
    return fetch(url, {
        "method": "POST",
        "headers": {
            "cookie": "csrftoken=ctJzx1RBM4kTPkPWGpZsBIf3EUY8gr0Td2C4OCeWCsslpyXLYCLpjQGYRlxSfFZP",
            "Content-Type": "application/json",
        },
        "body": payload
    })
        .then(json)
        .then(data => {
            data = data['data']['usdBrl'];
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};


function query_usdbrl_diff(filters) {
    let payload = `{"query":"query { usdBrl${filters}{ datetimeReference } usdbrlStatistics${filters} { diff } }"}`;
    return fetch(url, {
        "method": "POST",
        "headers": {
            "cookie": "csrftoken=ctJzx1RBM4kTPkPWGpZsBIf3EUY8gr0Td2C4OCeWCsslpyXLYCLpjQGYRlxSfFZP",
            "Content-Type": "application/json",
        },
        "body": payload
    })
        .then(json)
        .then(data => {
            data = data['data'];
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};


function query_usdbrl_rolling(filters) {
    let payload = `{"query":"query { usdBrl${filters}{ datetimeReference } usdbrlStatistics${filters} { rolling } }"}`;
    return fetch(url, {
        "method": "POST",
        "headers": {
            "cookie": "csrftoken=ctJzx1RBM4kTPkPWGpZsBIf3EUY8gr0Td2C4OCeWCsslpyXLYCLpjQGYRlxSfFZP",
            "Content-Type": "application/json",
        },
        "body": payload
    })
        .then(json)
        .then(data => {
            data = data['data'];
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};


function query_usdbrl_hour_mean(filters) {
    let payload = `{"query":"query { usdbrlStatistics${filters} { groupedByHour{ labels mean ewm } } }"}`;
    return fetch(url, {
        "method": "POST",
        "headers": {
            "cookie": "csrftoken=ctJzx1RBM4kTPkPWGpZsBIf3EUY8gr0Td2C4OCeWCsslpyXLYCLpjQGYRlxSfFZP",
            "Content-Type": "application/json",
        },
        "body": payload
    })
        .then(json)
        .then(data => {
            data = data['data']['usdbrlStatistics']['groupedByHour'];
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};


function query_usdbrl_hour_var(filters) {
    let payload = `{"query":"query { usdbrlStatistics${filters} { groupedByHour{ labels variance } } }"}`;
    return fetch(url, {
        "method": "POST",
        "headers": {
            "cookie": "csrftoken=ctJzx1RBM4kTPkPWGpZsBIf3EUY8gr0Td2C4OCeWCsslpyXLYCLpjQGYRlxSfFZP",
            "Content-Type": "application/json",
        },
        "body": payload
    })
        .then(json)
        .then(data => {
            data = data['data']['usdbrlStatistics']['groupedByHour'];
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};



function query_usdbrl_weekday_mean(filters) {
    let payload = `{"query":"query { usdbrlStatistics${filters} { groupedByWeekday{ labels mean ewm } } }"}`;
    return fetch(url, {
        "method": "POST",
        "headers": {
            "cookie": "csrftoken=ctJzx1RBM4kTPkPWGpZsBIf3EUY8gr0Td2C4OCeWCsslpyXLYCLpjQGYRlxSfFZP",
            "Content-Type": "application/json",
        },
        "body": payload
    })
        .then(json)
        .then(data => {
            data = data['data']['usdbrlStatistics']['groupedByWeekday'];
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};


function query_usdbrl_weekday_var(filters) {
    let payload = `{"query":"query { usdbrlStatistics${filters} { groupedByWeekday{ labels variance } } }"}`;
    return fetch(url, {
        "method": "POST",
        "headers": {
            "cookie": "csrftoken=ctJzx1RBM4kTPkPWGpZsBIf3EUY8gr0Td2C4OCeWCsslpyXLYCLpjQGYRlxSfFZP",
            "Content-Type": "application/json",
        },
        "body": payload
    })
        .then(json)
        .then(data => {
            data = data['data']['usdbrlStatistics']['groupedByWeekday'];
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};
