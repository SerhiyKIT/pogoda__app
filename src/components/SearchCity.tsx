import React, { useState, useEffect } from "react";
import { Input, Select, Space, Table } from 'antd';
import 'antd/dist/antd.css';
import '../css/SearchCity.css'
import { Days } from "../constant/enum";
import { addState } from "../redux/features/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { tableColumns } from "./tableColums";
import { IFetch } from "../constant/interface";

const { Search } = Input;

export const SearchCity = () => {
  const [city, setCity] = useState<string>('');
  const [daySearch, setDaySearch] = useState<Days>(Days.ONE);
  const data = useSelector((store: AnyAction) => store.data);
  const columns = tableColumns;
  const dispatch = useDispatch();
  const dataSearch = {
    key: '6b69c74caace45d5a7293203221811',
    q: city,
    days: daySearch,
  };

  const url =
    `http://api.weatherapi.com/v1/forecast.json?key=${dataSearch.key}&q=${dataSearch.q}&days=${dataSearch.days}&aqi=no&alerts=no`;

  const searchFetch = (() => {
    fetch(url)
			.then((response: any) => response.json())
			.then((responseData:IFetch) => {
				dispatch(addState(responseData.forecast.forecastday));
			})
  });

  const lication = () => {
    fetch('https://extreme-ip-lookup.com/json/?key=kvQstGNcP6zrXftrbQd1')
      .then(res => res.json())
      .then(response => {
        setCity(response.city);
      })
  };
  
  useEffect(() => {
    lication();
  }, [])

  return (
    <div className="wrapper__search">
      <div className="search__box">
        <div className="search__space">
          <Space direction="vertical">
            <Search placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onSearch={searchFetch}
              enterButton />
          </Space>
        </div>
        <div className="search__day">
          <span>Days prognos: </span>
          <Select
            value={daySearch}
            style={{ width: 60 }}
            onChange={(value) => setDaySearch(value)}
            options={Object.values(Days).map(type =>
            ({
              label: type,
              value: type
            }))}
          />
        </div>
      </div>
      <Table dataSource={data} columns={columns} />;
    </div>
  )
};

export default SearchCity;