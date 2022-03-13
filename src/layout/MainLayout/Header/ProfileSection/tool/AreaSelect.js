import React, { Component } from 'react';
import { Select } from 'antd';
// eslint-disable-next-line import/extensions,import/no-unresolved

const { Option } = Select;

class AreaSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSelectData: '',
            provinceList: [],
            cityList: [],
            areaList: []
        };
    }

    componentDidMount() {
        this.getProvinceList();
    }

    /** ***** 省市区列表获取 start *** */
    /** ***** 省市区列表获取 end *** */

    /** *****  省市区选中值 start **** */
    procinceChange(value) {
        this.getCityList(value);
        this.setState({ onSelectData: value });
    }

    cityChange(value) {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const code = `${this.state.onSelectData},${value}`;
        this.setState({ onSelectData: code });
        // eslint-disable-next-line react/destructuring-assignment
        if (this.props.range === 'city') {
            // eslint-disable-next-line react/destructuring-assignment
            this.props.onSelect(code);
        }
        // eslint-disable-next-line react/destructuring-assignment
        if (this.props.range === 'area') {
            this.getAreaList(value);
        }
    }

    areaChange(value) {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const code = `${this.state.onSelectData},${value}`;
        this.setState({ onSelectData: code });
        // eslint-disable-next-line react/destructuring-assignment
        this.props.onSelect(code);
    }
    /** *****  省市区选中值 end **** */

    render() {
        const { range } = this.props;
        const { provinceList, cityList, areaList } = this.state;
        const provinceOptions = provinceList.map((v) => (
            <Option key={v.provinceCode} value={v.provinceCode}>
                {v.provinceName}
            </Option>
        ));

        const cityOptions = cityList.map((v) => (
            <Option key={v.cityCode} value={v.cityCode}>
                {v.cityName}
            </Option>
        ));

        const areaOptions = areaList.map((v) => (
            <Option key={v.areaCode} value={v.areaCode}>
                {v.areaName}
            </Option>
        ));

        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <Select onChange={this.procinceChange.bind(this)} placeholder="请选择">
                    {provinceOptions}
                </Select>

                {range === 'city' || range === 'area' ? (
                    // eslint-disable-next-line react/jsx-no-bind
                    <Select onChange={this.cityChange.bind(this)} style={{ marginLeft: 5 }} placeholder="请选择">
                        {cityOptions}
                    </Select>
                ) : null}

                {range === 'area' ? (
                    // eslint-disable-next-line react/jsx-no-bind
                    <Select onChange={this.areaChange.bind(this)} style={{ marginLeft: 5 }} placeholder="请选择">
                        {areaOptions}
                    </Select>
                ) : null}
            </div>
        );
    }
}

export default AreaSelect;
