import AG_GRID_LOCALE_EN from './locale.en';

const AG_GRID_LOCALE_ZH_CN = {};

Object.keys(AG_GRID_LOCALE_EN).forEach((key) => {
    AG_GRID_LOCALE_ZH_CN[key] = AG_GRID_LOCALE_EN[key];
});

// common column filter
AG_GRID_LOCALE_ZH_CN['equals'] = '相等';
AG_GRID_LOCALE_ZH_CN['notEqual'] = '不相等';

// logical filter
AG_GRID_LOCALE_ZH_CN['andCondition'] = '并且';
AG_GRID_LOCALE_ZH_CN['orCondition'] = '或者';

// i18n for agTextColumnFilter
AG_GRID_LOCALE_ZH_CN['contains'] = '包含';
AG_GRID_LOCALE_ZH_CN['notContains'] = '不包含';
AG_GRID_LOCALE_ZH_CN['startsWith'] = '起始于';
AG_GRID_LOCALE_ZH_CN['endsWith'] = '结尾至';
AG_GRID_LOCALE_ZH_CN['equals'] = '相等';
AG_GRID_LOCALE_ZH_CN['blank'] = '空值';
AG_GRID_LOCALE_ZH_CN['notBlank'] = '非空值';
AG_GRID_LOCALE_ZH_CN['filterOoo'] = '过滤Oo。';

// i18n for agNumberColumnFilter

AG_GRID_LOCALE_ZH_CN['lessThan'] = '小于';
AG_GRID_LOCALE_ZH_CN['greaterThan'] = '大于';
AG_GRID_LOCALE_ZH_CN['lessThanOrEqual'] = '小于等于';
AG_GRID_LOCALE_ZH_CN['greaterThanOrEqual'] = '大于等于';
AG_GRID_LOCALE_ZH_CN['inRange'] = '介于范围';
AG_GRID_LOCALE_ZH_CN['inRangeStart'] = '范围开始于';
AG_GRID_LOCALE_ZH_CN['inRangeEnd'] = '范围结束至';

//
// Filter Buttons
AG_GRID_LOCALE_ZH_CN['applyFilter'] = '过滤';
AG_GRID_LOCALE_ZH_CN['resetFilter'] = '重置';
AG_GRID_LOCALE_ZH_CN['clearFilter'] = '清除';
AG_GRID_LOCALE_ZH_CN['cancelFilter'] = '取消';

export default AG_GRID_LOCALE_ZH_CN;
