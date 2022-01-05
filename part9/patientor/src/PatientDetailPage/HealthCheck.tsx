import React from 'react';
import { HealthCheckEntry } from '../types';
import { nanoid } from 'nanoid';
const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
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
				<p> healthCheckRating: {entry.healthCheckRating}</p>
			</div>
			<br />
		</React.Fragment>
	);
};

export default HealthCheck;
