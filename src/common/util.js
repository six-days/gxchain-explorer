export function cached (fn) {
    const cache = Object.create(null);
    return function cachedFn (str) {
        const fnKey = `${fn.name}_${str}`.trim();
        const hit = cache[fnKey];
        return hit || (cache[fnKey] = fn(str));
    };
}

const arrayFrom = (len) => {
    const loopArr = new Array(len).join(',').split(',');
    return loopArr;
};
export const arrayFromCache = cached(arrayFrom);

export const getHeight = (el) => {
    let height = 0;
    if (el.getBoundingClientRect) {
        height = el.getBoundingClientRect().height;
    }
    if (!height) {
        height = Math.max(el.offsetHeight, el.clientHeight);
    }

    return height;
};

/* eslint-disable */
const supportCss3 = (style) => {
    let prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase());
        };

    for (i in prefix) { humpString.push(_toHumb(`${prefix[i]}-${style}`)); }

    humpString.push(_toHumb(style));

    for (i in humpString) { if (humpString[i] in htmlStyle) return true; }

    return false;
};
export const supportCssCache = cached(supportCss3);
/* eslint-enable */

export const callExp = (main, exp) => {
    const layerList = exp.split('.').filter(Boolean);
    let value = null;
    try {
        value = layerList.reduce((prev, next) => prev[next], main);
    } catch (ex) {
        value = null;
    }
    return value;
};

export const coinList = [
    {
        'symbol': 'wkc',
        'name': '链克',
        'supply': '1,200,000,000(已减去销毁的3亿)',
        'contract': '无合约地址'
    }, {
        'symbol': 'hgbc',
        'name': '碱基',
        'supply': '3,000,000,000',
        'contract': '0xead0edd69c479f3a81c2f1b8b36de118c6db8486'
    }, {
        'symbol': 'lzt',
        'name': '懒钻',
        'supply': '1,000,000,000',
        'contract': '0xd4d5dc30dd24e03ec1432efb28292aa975834a47'
    }, {
        'symbol': 'cjf',
        'name': '超积分',
        'supply': '250,000,000(可增发)',
        'contract': '0x0e5fd8f5cf50ee91af25d57a4048ac73cb689f37'
    }];
