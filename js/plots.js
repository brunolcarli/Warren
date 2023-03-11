function reset_canvas(chart_id, div_id){
    // Resets the canvas state
    document.getElementById(chart_id).remove();
    let canvas = document.createElement(
        'canvas'
    );
    canvas.setAttribute('id', chart_id);
    canvas.setAttribute('width', '680');
    canvas.setAttribute('height', '420');
    document.getElementById(div_id).appendChild(canvas);

    return document.getElementById(chart_id).getContext('2d');
}


function resolve_datetime_input(range){
    if (range == 'ALL'){
        return '';
    }

    const today = new Date();
    var start_point = new Date(today);

    start_point.setDate(start_point.getDate() - range);
    start_point = start_point.toISOString()

    return `(datetimeReference_Gte: \\\"${start_point.slice(0, start_point.indexOf('T'))}\\\")`;
}

function plot_statistics(){
    var filter_value = resolve_datetime_input(
        document.getElementById('date_range_selection').value
    );
    var chart_type = document.getElementById('chart_selection').value;
    update_dynamic_chart(filter_value, chart_type);
}


function update_dynamic_chart(query_filter, value){

    const valid_options = {
        PRICE: plot_usdbrl_price,
        DIFF: plot_usdbrl_diff,
        ROLLING: plot_usdbrl_rolling,
        HOUR_MEAN: plot_usdbrl_hour_mean,
        HOUR_VARIANCE: plot_usdbrl_hour_var,
        // HOUR_DIFF: plot_usdbrl_hour_diff,
        WEEKDAY_MEAN: plot_usdbrl_weekday_mean,
        WEEKDAY_VARIANCE: plot_usdbrl_weekday_var,
        // WEEKDAY_DIFF: plot_usdbrl_weekday_diff,
    };
    valid_options[value](query_filter);
}


function plot_usdbrl_price(query_filter){
    return query_usdbrl_price(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const prices = [];
        const dates = [];

        for (i in dataset){
            prices.push(dataset[i]['price']);
            dates.push(dataset[i]['datetimeReference']);
        }

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Valor',
                    data: prices,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    });
}


function plot_usdbrl_diff(query_filter){
    return query_usdbrl_diff(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        let diff = dataset['usdbrlStatistics']['diff'];
        const dates = [];

        for (i in dataset['usdBrl']){
            dates.push(dataset['usdBrl'][i]['datetimeReference']);
        }

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Diferenças',
                    data: diff,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    });
}


function plot_usdbrl_rolling(query_filter){
    return query_usdbrl_rolling(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        let values = dataset['usdbrlStatistics']['rolling'];
        const dates = [];

        for (i in dataset['usdBrl']){
            dates.push(dataset['usdBrl'][i]['datetimeReference']);
        }

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Média Móvel',
                    data: values,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    });
}


function plot_usdbrl_hour_mean(query_filter){
    return query_usdbrl_hour_mean(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        let mean = dataset['mean'];
        let labels = dataset['labels'];
        let ewm = dataset['ewm'];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Média por hora do dia',
                    data: mean,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                },
                {
                    label: 'Exponenciação ponderada',
                    data: ewm,
                    fill: false,
                    borderColor: 'rgb(75, 92, 99)',
                    tension: 0.5
                },
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    });
}



function plot_usdbrl_hour_var(query_filter){
    return query_usdbrl_hour_var(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        let values = dataset['variance'];
        let labels = dataset['labels'];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Variância',
                    data: values,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    });
}



function plot_usdbrl_rolling(query_filter){
    return query_usdbrl_rolling(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        let values = dataset['usdbrlStatistics']['rolling'];
        const dates = [];

        for (i in dataset['usdBrl']){
            dates.push(dataset['usdBrl'][i]['datetimeReference']);
        }

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Média Móvel',
                    data: values,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    });
}


function plot_usdbrl_weekday_mean(query_filter){
    return query_usdbrl_weekday_mean(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        let mean = dataset['mean'];
        let labels = dataset['labels'];
        let ewm = dataset['ewm'];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Média por dia da semana',
                    data: mean,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                },
                {
                    label: 'Exponenciação ponderada',
                    data: ewm,
                    fill: false,
                    borderColor: 'rgb(75, 92, 99)',
                    tension: 0.5
                },
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    });
}



function plot_usdbrl_weekday_var(query_filter){
    return query_usdbrl_weekday_var(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        let values = dataset['variance'];
        let labels = dataset['labels'];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Variância',
                    data: values,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
    return chart;
    });
}
