import React from 'react';
import $ from 'jquery';
import './Select.css';

// eslint-disable-next-line no-underscore-dangle
global.__CITY__ = require('./city.json');

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        // eslint-disable-next-line no-underscore-dangle
        this.json = global.__CITY__;
        this.state = {
            province: '',
            city: '',
            country: '',
            provinceIndex: -1,
            cityIndex: -1
        };
    }

    // eslint-disable-next-line react/no-deprecated,camelcase
    UNSAFE_componentWillMount = () => {
        // eslint-disable-next-line react/destructuring-assignment,react/prop-types
        if (this.props.cityName !== '') {
            // eslint-disable-next-line react/destructuring-assignment,react/prop-types
            const arr = this.props.cityName.split(' ');
            // eslint-disable-next-line array-callback-return
            this.json.map((array, index) => {
                if (array.name === arr[0]) {
                    // eslint-disable-next-line array-callback-return
                    this.json[index].city.map((cityName, cityIndex) => {
                        if (cityName.name === arr[1]) {
                            this.setState({
                                provinceIndex: index,
                                cityIndex
                            });
                        }
                    });
                }
            });
        }
    };

    componentDidMount = () => {
        // eslint-disable-next-line react/destructuring-assignment,react/prop-types
        if (this.props.cityName !== '') {
            // eslint-disable-next-line react/destructuring-assignment,react/prop-types
            const arr = this.props.cityName.split(' ');
            $('#province').val(arr[0]);
            $('#city').val(arr[1]);
            $('#country').val(arr[2]);
        }
    };

    provinceOption = () =>
        this.json.map((array, index) => (
            <option key={index} data-index={index}>
                {array.name}
            </option>
        ));

    cityOption = () => {
        // eslint-disable-next-line react/destructuring-assignment
        if (parseInt(this.state.provinceIndex, 10) === -1) {
            return false;
        }
        // eslint-disable-next-line react/destructuring-assignment
        return this.json[this.state.provinceIndex].city.map((array, index) => (
            <option key={index} data-index={index}>
                {array.name}
            </option>
        ));
    };

    countryOption = () => {
        // eslint-disable-next-line react/destructuring-assignment
        if (parseInt(this.state.cityIndex, 10) === -1) {
            return false;
        }
        // eslint-disable-next-line react/destructuring-assignment
        return this.json[this.state.provinceIndex].city[this.state.cityIndex].area.map((array, index) => (
            <option key={index} data-index={index}>
                {array}
            </option>
        ));
    };

    provinceChange = (event) => {
        const e = event.target;
        let val = e.value;
        const indexing = e.options[e.selectedIndex].getAttribute('data-index');
        // eslint-disable-next-line react/no-string-refs
        this.refs.city.value = -1;
        // eslint-disable-next-line react/no-string-refs
        this.refs.country.value = -1;

        if (parseInt(val, 10) === -1) {
            val = '';
        }

        this.setState(
            {
                cityIndex: -1,
                provinceIndex: indexing,
                province: e.value,
                city: '',
                country: ''
            },
            () => {
                // eslint-disable-next-line react/destructuring-assignment,react/prop-types
                this.props.callbackParent({
                    province: val,
                    // eslint-disable-next-line react/destructuring-assignment
                    city: this.state.city,
                    // eslint-disable-next-line react/destructuring-assignment
                    country: this.state.country
                });
            }
        );
    };

    cityChange = (event) => {
        const e = event.target;
        let val = e.value;
        const indexing = e.options[e.selectedIndex].getAttribute('data-index');

        if (parseInt(val, 10) === -1) {
            val = '';
        }

        // eslint-disable-next-line react/no-string-refs
        this.refs.country.value = -1;

        this.setState(
            {
                city: e.value,
                cityIndex: indexing,
                country: ''
            },
            () => {
                // eslint-disable-next-line react/destructuring-assignment,react/prop-types
                this.props.callbackParent({
                    // eslint-disable-next-line react/destructuring-assignment
                    province: this.state.province,
                    city: val,
                    // eslint-disable-next-line react/destructuring-assignment
                    country: this.state.country
                });
            }
        );
    };

    countryChange = (event) => {
        const e = event.target;
        let val = e.value;
        const indexing = e.options[e.selectedIndex].getAttribute('data-index');
        if (indexing === -1) {
            this.setState({
                cityIndex: -1,
                provinceIndex: indexing
            });
            // eslint-disable-next-line react/no-string-refs
            this.refs.province.value = -1;
        }

        this.setState({
            country: e.value
        });

        if (parseInt(val, 10) === -1) {
            val = '';
        }

        // eslint-disable-next-line react/destructuring-assignment,react/prop-types
        this.props.callbackParent({
            // eslint-disable-next-line react/destructuring-assignment
            province: this.state.province,
            // eslint-disable-next-line react/destructuring-assignment
            city: this.state.city,
            country: val
        });
    };

    render() {
        return (
            <span>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                    className="city-select"
                    /* eslint-disable-next-line react/destructuring-assignment,react/prop-types */
                    name={this.props.provinceName ? this.props.provinceName : 'province'}
                    id="province"
                    /* eslint-disable-next-line react/no-string-refs */
                    ref="province"
                    onChange={this.provinceChange}
                >
                    <option key="-1" value="-1" data-index="-1">
                        省份
                    </option>
                    {this.provinceOption()}
                </select>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                    className="city-select"
                    /* eslint-disable-next-line react/destructuring-assignment,react/prop-types */
                    name={this.props.cityName ? this.props.cityName : 'city'}
                    id="city"
                    onChange={this.cityChange}
                    /* eslint-disable-next-line react/no-string-refs */
                    ref="city"
                >
                    <option key="-1" value="-1" data-index="-1">
                        地级市
                    </option>
                    {this.cityOption()}
                </select>
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                    className="city-select"
                    /* eslint-disable-next-line react/destructuring-assignment,react/prop-types */
                    name={this.props.countryName ? this.props.countryName : 'country'}
                    id="country"
                    onChange={this.countryChange}
                    /* eslint-disable-next-line react/no-string-refs */
                    ref="country"
                >
                    <option key="-1" value="-1" data-index="-1">
                        市、县级市
                    </option>
                    {this.countryOption()}
                </select>
            </span>
        );
    }
}

export default City;
// import React from 'react';
// import $ from 'jquery';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
//
// // eslint-disable-next-line no-underscore-dangle
// global.__CITY__ = require('./city.json');
//
// class City extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//         // eslint-disable-next-line no-underscore-dangle
//         this.json = global.__CITY__;
//         this.state = {
//             province: '',
//             city: '',
//             country: '',
//             provinceIndex: -1,
//             cityIndex: -1
//         };
//     }
//
//     // eslint-disable-next-line react/no-deprecated
//     componentWillMount = () => {
//         // eslint-disable-next-line react/destructuring-assignment
//         if (this.props.cityName !== '') {
//             // eslint-disable-next-line react/destructuring-assignment
//             const arr = this.props.cityName.split(' ');
//             // eslint-disable-next-line array-callback-return
//             this.json.map((array, index) => {
//                 if (array.name === arr[0]) {
//                     // eslint-disable-next-line array-callback-return
//                     this.json[index].city.map((cityName, cityIndex) => {
//                         if (cityName.name === arr[1]) {
//                             this.setState({
//                                 provinceIndex: index,
//                                 cityIndex
//                             });
//                         }
//                     });
//                 }
//             });
//         }
//     };
//
//     componentDidMount = () => {
//         // eslint-disable-next-line react/destructuring-assignment
//         if (this.props.cityName !== '') {
//             // eslint-disable-next-line react/destructuring-assignment
//             const arr = this.props.cityName.split(' ');
//             $('#province').val(arr[0]);
//             $('#city').val(arr[1]);
//             $('#country').val(arr[2]);
//         }
//     };
//
//     provinceOption = () =>
//         this.json.map((array, index) => (
//             <MenuItem value={array.name} key={index} data-index={index}>
//                 {array.name}
//             </MenuItem>
//         ));
//
//     cityOption = () => {
//         // eslint-disable-next-line react/destructuring-assignment
//         if (parseInt(this.state.provinceIndex, 10) === -1) {
//             return false;
//         }
//         // eslint-disable-next-line react/destructuring-assignment
//         return this.json[this.state.provinceIndex].city.map((array, index) => (
//             <MenuItem value={array.name} key={index} data-index={index}>
//                 {array.name}
//             </MenuItem>
//         ));
//     };
//
//     countryOption = () => {
//         // eslint-disable-next-line react/destructuring-assignment
//         if (parseInt(this.state.cityIndex, 10) === -1) {
//             return false;
//         }
//         // eslint-disable-next-line react/destructuring-assignment
//         return this.json[this.state.provinceIndex].city[this.state.cityIndex].area.map((array, index) => (
//             <MenuItem value={array} key={index} data-index={index}>
//                 {array}
//             </MenuItem>
//         ));
//     };
//
//     provinceChange = (event) => {
//         const e = event.target;
//         let val = e.value;
//         const indexing = e.key;
//         console.log(e);
//         // eslint-disable-next-line react/no-string-refs
//         this.refs.city.value = -1;
//         // eslint-disable-next-line react/no-string-refs
//         this.refs.country.value = -1;
//
//         if (parseInt(val, 10) === -1) {
//             val = '';
//         }
//
//         this.setState(
//             {
//                 cityIndex: -1,
//                 provinceIndex: indexing,
//                 province: e.value,
//                 city: '',
//                 country: ''
//             },
//             () => {
//                 // eslint-disable-next-line react/destructuring-assignment
//                 this.props.callbackParent({
//                     province: val,
//                     // eslint-disable-next-line react/destructuring-assignment
//                     city: this.state.city,
//                     // eslint-disable-next-line react/destructuring-assignment
//                     country: this.state.country
//                 });
//             }
//         );
//     };
//
//     cityChange = (event) => {
//         const e = event.target;
//         let val = e.value;
//         const indexing = e.options[e.selectedIndex].getAttribute('data-index');
//
//         if (parseInt(val, 10) === -1) {
//             val = '';
//         }
//
//         // eslint-disable-next-line react/no-string-refs
//         this.refs.country.value = -1;
//
//         this.setState(
//             {
//                 city: e.value,
//                 cityIndex: indexing,
//                 country: ''
//             },
//             () => {
//                 // eslint-disable-next-line react/destructuring-assignment
//                 this.props.callbackParent({
//                     // eslint-disable-next-line react/destructuring-assignment
//                     province: this.state.province,
//                     city: val,
//                     // eslint-disable-next-line react/destructuring-assignment
//                     country: this.state.country
//                 });
//             }
//         );
//     };
//
//     countryChange = (event) => {
//         const e = event.target;
//         let val = e.value;
//         const indexing = e.options[e.selectedIndex].getAttribute('data-index');
//         if (indexing === -1) {
//             this.setState({
//                 cityIndex: -1,
//                 provinceIndex: indexing
//             });
//             // eslint-disable-next-line react/no-string-refs
//             this.refs.province.value = -1;
//         }
//
//         this.setState({
//             country: e.value
//         });
//
//         if (parseInt(val, 10) === -1) {
//             val = '';
//         }
//
//         // eslint-disable-next-line react/destructuring-assignment
//         this.props.callbackParent({
//             // eslint-disable-next-line react/destructuring-assignment
//             province: this.state.province,
//             // eslint-disable-next-line react/destructuring-assignment
//             city: this.state.city,
//             country: val
//         });
//     };
//
//     render() {
//         return (
//             <div>
//                 <FormControl required sx={{ m: 1, minWidth: 120 }}>
//                     <InputLabel id="demo-simple-select-required-label">省</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-required-label"
//                         id="province"
//                         /* eslint-disable-next-line react/destructuring-assignment */
//                         value={this.props.provinceName ? this.props.provinceName : 'province'}
//                         label="Province *"
//                         /* eslint-disable-next-line react/no-string-refs */
//                         ref="province"
//                         onChange={this.provinceChange}
//                     >
//                         <MenuItem value="">
//                             <em>None</em>
//                         </MenuItem>
//                         {this.provinceOption()}
//                     </Select>
//                 </FormControl>
//                 <FormControl required sx={{ m: 1, minWidth: 120 }}>
//                     <InputLabel id="demo-simple-select-required-label">地级市</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-required-label"
//                         id="city"
//                         /* eslint-disable-next-line react/destructuring-assignment */
//                         value={this.props.cityName ? this.props.cityName : 'city'}
//                         label="city *"
//                         /* eslint-disable-next-line react/no-string-refs */
//                         ref="city"
//                         onChange={this.cityChange}
//                     >
//                         <MenuItem value="">
//                             <em>None</em>
//                         </MenuItem>
//                         {this.cityOption()}
//                     </Select>
//                 </FormControl>
//                 <FormControl required sx={{ m: 1, minWidth: 120 }}>
//                     <InputLabel id="demo-simple-select-required-label">市、县级市</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-required-label"
//                         id="country"
//                         /* eslint-disable-next-line react/destructuring-assignment */
//                         value={this.props.countryName ? this.props.countryName : 'country'}
//                         label="country *"
//                         /* eslint-disable-next-line react/no-string-refs */
//                         ref="country"
//                         onChange={this.countryChange}
//                     >
//                         <MenuItem key="-1" value="" data-index="-1">
//                             <em>None</em>
//                         </MenuItem>
//                         {this.countryOption()}
//                     </Select>
//                 </FormControl>
//             </div>
//         );
//     }
// }
//
// export default City;
