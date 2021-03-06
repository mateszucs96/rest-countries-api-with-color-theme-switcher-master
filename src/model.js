export const state = {
    countries: {},
    filtered: {},
    searched: {},
    details: {
        result: [],
        nativeName: '',
        languages: '',
        currencies: '',
        borders: [],
        borderData: [],
    },
    query: '',
}


export const fetchData = async (url, arg = '') => {
    try {
        const res = await fetch(url + arg);
        const data = await res.json();
        state.countries = data
        return data;

    } catch (err) {
        console.error(err)
    }
}

export const loadSearch = text => {
    state.searched = state.countries.filter(country => {
        return country.name.common.toLowerCase().startsWith(text)
    })
}

export const getCurrencies = () => {

    for (const currency of Object.values(state.details.result[0].currencies)) {
        return currency.name
    }
}

export const getNativeName = () => {
    console.log(state.details.result[0].tld[0])
    for (const name of Object.entries(state.details.result[0].name.nativeName)) {
        return name[1].official
    }
}

export const getLanguages = () => {
    let languages = [];
    for (const language of Object.values(state.details.result[0].languages)) {
        languages = [...languages, language]
    }
    return languages.splice('').join(', ')
}

export const getBorderData = (name) => {

    const border = state.details.borderData.filter(el => el.name.common === name)
    console.log(border[0])
}

export const getBorders = () => {

    state.details.borders = state.details.result[0].borders?.map(el => el)
    // push borders data in array

    state.details.borders?.forEach(el => {
        state.countries.forEach(element => {
            element.cca3 === el && state.details.borderData.push(element)
        })
    })
    console.log(state.details.borderData)
}
export const loadDetails = (countryName) => {
    state.details.result = state.countries.filter(el => {
        if (el.name.common === countryName) {
            return el
        }
    })
    state.details.nativeName = getNativeName();
    state.details.currencies = getCurrencies();
    state.details.languages = getLanguages();
    state.details.borderData = [];
    getBorders()

}
