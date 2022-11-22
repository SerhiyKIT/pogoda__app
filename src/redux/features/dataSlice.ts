import { createSlice } from "@reduxjs/toolkit";
import { IData, IForeCastDay } from "../../constant/interface";

export const initialState:IData[] = []

export const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		addState: (state, action) => {
			const newState:IForeCastDay[] = action.payload;
			let newMass: IData[] = []
			 newState.forEach((item:IForeCastDay)  => {
				newMass = [...newMass, {
				date: item.date,
				condition: item.day.condition.text ,
				mintempc: item.day.mintemp_c,
				maxtempc: item.day.maxtemp_c,
				maxwindkph: item.day. maxwind_kph,
				precipmm: item.day.totalprecip_mm,
				humidity: item.day.avghumidity,
			}] })
			return newMass
		},
	}
});

export const { addState } = dataSlice.actions;
export default dataSlice.reducer;
