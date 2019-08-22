import { Department } from './Department';
import { EvaluationParameter } from './EvaluationParameter';

export class EvaluationCriteria {
  evaluationCriteriaId: number;
  department: Department;
  evaluationParameter: EvaluationParameter;
  evaluationCategory: number;
}
