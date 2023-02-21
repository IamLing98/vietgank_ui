import React, { lazy } from 'react';
// debounce so filtering doesn't happen every millisecond
import Moment from 'react-moment';
// eslint-disable-next-line
import moment from 'moment/min/moment-with-locales';
import PropTypes from 'prop-types';

Moment.globalMoment = moment;
Moment.globalLocale = 'zh-cn';

export function debounce(fn, threshold) {
    var timeout;
    threshold = threshold || 100;
    return function debounced() {
        clearTimeout(timeout);
        var args = arguments;
        var _this = this;
        function delayed() {
            fn.apply(_this, args);
        }
        timeout = setTimeout(delayed, threshold);
    };
}

export const MomentUtil = (props) => {
    const { value } = props;

    return <Moment date={new Date(value)} fromNow />;
};

MomentUtil.propTypes = {
    value: PropTypes.any
};

const styles = [`background : rebeccapurple`, `border-radius: 0.5em`, `color : white`, `font-weight : bold`, `padding: 2px 0.5em`].join(
    ';'
);

export function debugLog(...args) {
    console.debug(`%c51cloudclass`, styles, ...args);
}
