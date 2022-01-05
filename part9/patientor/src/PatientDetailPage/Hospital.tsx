import React from 'react';
import { HospitalEntry } from '../types';
import { nanoid } from 'nanoid';
const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
	return (
		<React.Fragment>
			<div key={nanoid()}>
				<p>
					{entry.date} {entry.description}
				</p>
				<p>specialist: {entry.specialist}</p>
				{entry.diagnosisCodes ? (
					<ul>
						{entry.diagnosisCodes.map((code) => (
							<li key={nanoid()}>{code}</li>
						))}
					</ul>
				) : null}
				<p>
					{entry.discharge.date} {entry.discharge.criteria}
				</p>
			</div>
		</React.Fragment>
	);
};

export default Hospital;
