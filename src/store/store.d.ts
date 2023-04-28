import { PartogramaChartReducer } from './modules/partogramaChart/types';
import { ClinicalNotesReducer } from './modules/clinicalNotes/types';
import { NonPharmacologicalReducer } from './modules/nonPharmacological/types';
import { PostureReducer } from './modules/posture/types';
import { FluidIntakeReducer } from './modules/fluidintake/types';
import { BleedingReducer } from './modules/bleeding/types';
import { CompanyReducer } from './modules/company/types';
import { AmnioticReducer } from './modules/amnioticFluid/types';
import { ContractionReducer } from './modules/contraction/types';
import { PharmacologicalReducer } from './modules/pharmacological/types';
import { OxytocinReducer } from './modules/oxytocin/types';
import { FetalMonitoringReducer } from './modules/fetalMonitoring/types';
import { HeaderReducer } from './modules/header/types';
import { UserReducer } from './modules/user/types';

interface ApplicationState {
  partogramaChart: PartogramaChartReducer;
  clinicalNotes: ClinicalNotesReducer;
  nonPharmacological: NonPharmacologicalReducer;
  pharmacological: PharmacologicalReducer;
  fluidintake: FluidIntakeReducer;
  posture: PostureReducer;
  bleeding: BleedingReducer;
  auth: PositionReducer;
  company: CompanyReducer;
  amnioticFluid: AmnioticReducer;
  contraction: ContractionReducer;
  oxytocin: OxytocinReducer;
  fetalMonitoring: FetalMonitoringReducer;
  header: HeaderReducer;
  user: UserReducer;
}

declare global {
  declare namespace Store {
    type State = ApplicationState;
  }
}
