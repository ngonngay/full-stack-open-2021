import React from 'react';
import { OccupationalHealthCareEntry } from '../types';
import { nanoid } from 'nanoid';

const OccupationalHealthCare: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
	return (
		<React.Fragment>
			<div key={nanoid()}>
				<h1>{entry.employerName}</h1>
				<p>
					{entry.date} {entry.description}
				</p>
				<p> specialist: {entry.specialist}</p>
				{entry.diagnosisCodes ? (
					<ul>
						{entry.diagnosisCodes.map((code) => (
							<li key={nanoid()}>{code}</li>
						))}
					</ul>
				) : null}
			</div>
		</React.Fragment>
	);
};

export default OccupationalHealthCare;
