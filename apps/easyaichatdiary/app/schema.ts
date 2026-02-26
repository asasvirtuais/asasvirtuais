import * as SettingsModule from '@/src/settings';
import * as DaysModule from '@/src/days';
import * as SummariesModule from '@/src/summaries';

export const schema = {
    'Settings': SettingsModule.schema,
    'Days': DaysModule.schema,
    'Summaries': SummariesModule.schema,
};
