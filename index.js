setTimeout(() => {
    initialize()
    setInterval(updateInfo, 1000)
}, 5000)

function initialize() {
    $('body').prepend(`<div style='color:white;margin-left:10px;'>normal price: <span id='extend-normal-price' style='margin-right:20px;'></span><span>premium: <span id='extend-premium'></span>%</div>`)
    console.log('initialize.')
}

function updateInfo() {
    var info = getContractInfo()
    console.log(info)
    $('#extend-normal-price').text(info.normalPrice.toFixed(4))
    $('#extend-premium').text(info.premium.toFixed(2))
}

function getContractInfo() {
    var info = {
        name: getCurrency(),
        value: getContractValue(),
        side: getSide(),
        price: getPrice(),
        strikePrice: getStrikePrice(),
        spotPrice: getSpotPrice(),
        normalPrice: 0,
        premium: 0
    }
    calcNormalPrice(info)
    calcPremium(info)
    return info
}

function getCurrency() {
    var textName = $('.name-text').text()
    if (textName.indexOf('BTC') > 0) return 'BTC'
    else if (textName.indexOf('ETH') > 0) return 'ETH'
    else if (textName.indexOf('EOS') > 0) return 'EOS'
    else if (textName.indexOf('BCH') > 0) return 'BCH'
    else if (textName.indexOf('NEO') > 0) return 'NEO'
    else if (textName.indexOf('HT') > 0) return 'HT'
    else if (textName.indexOf('BNB') > 0) return 'BNB'

}

function getSide() {
    var textName = $('.name-text').text()
    if (textName.indexOf('CALL') > 0 || textName.indexOf('涨') > 0) return 'CALL'
    else if (textName.indexOf('PUT') > 0 || textName.indexOf('跌') > 0) return 'PUT'
}

function getPrice() {
    var price = $('.pirce-box .color-cacdce').text()
    return toNumber(price)
}

function getStrikePrice() {
    var strikePrice = $('.exercise-price .color-cacdce').text()
    return toNumber(strikePrice)
}

function getSpotPrice() {
    var spotPrice = $('.perform-price .color-cacdce').text()
    return toNumber(spotPrice)
}

function getContractValue() {
    var currency = getCurrency()
    if (currency === 'BTC') return 0.002
    else if (currency === 'ETH') return 0.04
    else if (currency === "EOS") return 1
    else if (currency === "BCH") return 0.01
    else if (currency === "NEO") return 0.5
    else if (currency === "HT") return 4
    else if (currency === "BNB") return 1
}

function calcNormalPrice(info) {
    if (!info) return
    var value = info.price / info.value
    info.normalPrice = info.side === 'CALL' ? info.strikePrice + value : info.strikePrice - value
}

function calcPremium(info) {
    if (!info) return
    info.premium = (info.normalPrice - info.spotPrice) / info.spotPrice * 100
    if (info.side === 'PUT') {
        info.premium = -info.premium
    }
}

function toNumber(value) {
    if (typeof value === 'string') {
        value = Number(value.replace(/,/, ''))
    }
    return value
}