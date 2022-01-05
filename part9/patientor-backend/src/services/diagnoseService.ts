import { Diagnosis } from '../types/';
import { diagnoses } from '../data/diagnoses';

const getDiagnose = (): Diagnosis[] => {
	return diagnoses;
};
const getDiagnoseDetail = (code: string): Diagnosis | undefined => {
	return diagnoses.find((diagnose) => diagnose.code === code);
};
export { getDiagnose, getDiagnoseDetail };
