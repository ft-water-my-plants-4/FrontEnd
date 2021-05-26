import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../App.css';

import NewPlant from './newPlantForm';
import Plant from './Plant';

import { fetchPlants } from '../actions/index';

function Dashboard(props) {
	const { plantData, dispatch } = props;

	useEffect(() => {
		dispatch(fetchPlants());
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<NewPlant />
			<div className="plants">
				<h2>Plant Card</h2>
				{plantData.map(plant => {
					return <Plant key={plant.id} plant={plant} />;
				})}
			</div>
		</>
	);
}

const mapStateToProps = state => {
	return {
		...state,
		plantData: state.plantData,
		isLoggedIn: state.isLoggedIn
	};
};

export default connect(mapStateToProps)(Dashboard);
