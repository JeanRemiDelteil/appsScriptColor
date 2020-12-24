import './__webComponents';
// webComponents import MUST BE FIRST
import { NavigationDetection, NavigationEvent } from './feature-detection';
import { MaestroSetup, MonacoSetup } from './setup';


NavigationDetection.init({
	[NavigationEvent.OLD_IDE_OPEN]: ({ scriptKey }) => MaestroSetup.init(scriptKey),

	[NavigationEvent.SCRIPT_OPEN]: ({ scriptKey }) => MonacoSetup.init(scriptKey),
	[NavigationEvent.SCRIPT_CLOSE]: () => MonacoSetup.destroy(),
});
