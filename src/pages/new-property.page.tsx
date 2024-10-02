import { observer } from 'mobx-react-lite';
import UAEDraftForm from '../features/draft-form/concrete-draft-form/UAE-draft-form';
import { match } from 'ts-pattern';

const NewPropertyPage = () => {
  return match('UAE')
    .with('UAE', () => <UAEDraftForm />)
    .otherwise(() => null);
};

export default observer(NewPropertyPage);
